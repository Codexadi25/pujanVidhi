let React;
try { React = require('react'); } catch (e) { React = require('../../../../client/node_modules/react'); }
const h = React.createElement;

function OverviewPage({ stats = {} }) {
  return h('div', { id: 'tab-overview', className: 'tab-pane active' },
    h('div', { className: 'pane-header' },
      h('div', null,
        h('h2', null, 'System Telemetry & Platform Overview'),
        h('p', null, 'Real-time telemetry, MongoDB connection health, revenue metrics, and PG uptime.')
      )
    )
  );
}

module.exports = OverviewPage;
