let React;
try {
  React = require('react');
} catch (e) {
  try {
    React = require('../../../../client/node_modules/react');
  } catch (e2) {
    React = {
      createElement: (type, props, ...children) => ({
        type,
        props: { ...props, children: children.flat() },
        children: children.flat()
      })
    };
  }
}
const h = React.createElement;

function AdminDashboardTemplate({ title = 'PoojanVidhi Server Control Center', initialTab = 'telemetry' }) {
  return h('html', { lang: 'en', 'data-theme': 'dark' },
    h('head', null,
      h('meta', { charSet: 'UTF-8' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      h('title', null, title),
      h('link', { rel: 'icon', type: 'image/jpeg', href: '/images/PoojanVidhi_Logo.jpeg' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
      h('link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }),
      h('link', {
        href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
        rel: 'stylesheet'
      }),
      h('link', { rel: 'stylesheet', href: '/css/admin.css' }),
      h('script', {
        dangerouslySetInnerHTML: {
          __html: `
            (function() {
              try {
                var theme = localStorage.getItem('poojanvidhi_admin_theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `
        }
      })
    ),
    h('body', null,
      h('div', { id: 'toast-container', className: 'toast-container' }),
      h('div', { id: 'auth-screen-container' }),
      h('div', { id: 'topbar-container' }),
      h('div', { id: 'nav-container' }),
      h('main', { className: 'main-content', id: 'pages-container' }),
      h('div', { id: 'modals-container' }),
      h('script', { type: 'module', src: '/js/admin.js?v=2.7' })
    )
  );
}

module.exports = AdminDashboardTemplate;
