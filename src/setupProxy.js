const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/suggestions',
    createProxyMiddleware({
      target: 'http://localhost:8091/poc/customer',
      changeOrigin: true,
    })
  );
  app.use(
    '/findById',
    createProxyMiddleware({
      target: 'http://localhost:8091/poc/customer',
      changeOrigin: true,
    })
  );
};