/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import 'script!../node_modules/xdomain/dist/xdomain.min'

window.xdomain.slaves({
  'http://localhost:5000': '/proxy.html',
  'http://10.0.2.2:5000': '/proxy.html',
})
