const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://turbo-fishstick-xx7w749gggrf6r9g-5000.app.github.dev',
      changeOrigin: true,
    })
  );
};
