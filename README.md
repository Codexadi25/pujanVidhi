# Diwali Pujan Vidhi — paywalled bilingual landing page
Needs: Node 18.11+, MongoDB (local or Atlas URI in server/.env), Razorpay TEST keys in server/.env
1. `npm run setup`   (installs root, server, client)
2. Edit `server/.env` -> RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (+ MONGO_URI if not local)
3. `npm run dev`     -> Web http://localhost:5173 · API http://localhost:5000 · Price admin http://localhost:5000/admin (key = ADMIN_KEY)
Test card/UPI: use Razorpay test mode credentials. Deploy: server -> Render, client -> Firebase (set VITE_API_URL, FRONTEND_URL).
Razorpay webhook (optional safety net): POST /api/v1/webhook/razorpay, event payment.captured.
