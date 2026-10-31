import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

/**
 * Server Wake-Up & Continuous Health Heartbeat Hook
 * 
 * 1. Initial Wake-Up: When a user first lands on the website, repeatedly polls
 *    the /ping endpoint until the backend on Render responds with 1. This warms up
 *    the cold-start container before the user interacts with payments or products.
 * 
 * 2. Continuous Health Check (Anti-Downtime Heartbeat): While the client is active,
 *    pings the server every 3 minutes (180,000 ms). Render free-tier services sleep after
 *    15 minutes of inactivity; pinging every 3 minutes completely prevents the server
 *    from sleeping while visitors are on the site.
 */
export function useServerWakeup({ intervalMs = 180000, retryIntervalMs = 3000 } = {}) {
  const [serverReady, setServerReady] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const retryTimerRef = useRef(null);
  const heartbeatTimerRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // Ping check function
    const performPing = async (isInitialWakeup = false) => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return false;
      }

      try {
        const isUp = await api.ping();
        if (!isMountedRef.current) return false;

        if (isUp) {
          if (!serverReady) {
            setServerReady(true);
            setIsWakingUp(false);
            console.log('⚡ [Render Platform] Server is awake and responsive (ping = 1)');
          }
          return true;
        }
      } catch (err) {
        console.warn('Waiting for server to wake up on Render...', err?.message || err);
      }

      if (!isMountedRef.current) return false;

      // If initial wakeup failed, schedule rapid retry
      if (isInitialWakeup || !serverReady) {
        setIsWakingUp(true);
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = setTimeout(() => {
          if (isMountedRef.current && !serverReady) {
            performPing(true);
          }
        }, retryIntervalMs);
      }

      return false;
    };

    // 1. Initial poll on first landing
    performPing(true);

    // 2. Continuous 3-minute heartbeat interval to prevent Render downtime
    heartbeatTimerRef.current = setInterval(() => {
      if (isMountedRef.current) {
        console.log('💓 [Render Heartbeat] Sending 3-minute keep-alive ping');
        performPing(false);
      }
    }, intervalMs);

    // 3. Re-ping immediately when browser network comes back online
    const handleOnline = () => {
      console.log('🌐 [Network Status] Browser reconnected online. Waking/pinging server...');
      performPing(true);
    };
    window.addEventListener('online', handleOnline);

    return () => {
      isMountedRef.current = false;
      clearTimeout(retryTimerRef.current);
      clearInterval(heartbeatTimerRef.current);
      window.removeEventListener('online', handleOnline);
    };
  }, [intervalMs, retryIntervalMs, serverReady]);

  return { serverReady, isWakingUp };
}
