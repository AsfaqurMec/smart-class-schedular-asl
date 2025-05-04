// const express = require('express');
// const next = require('next');

// const port = process.env.PORT || 3000;
// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.use('/_next', express.static('.next'));
//   server.use('/static', express.static('static'));
//   server.use(express.static('public')); // for public folder assets

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${port}`);
//   });
// });



// const { createServer } = require('http');
// const { parse } = require('url');
// const next = require('next');

// const app = next({
//   dev: false, // Make sure this is false for production
// });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     const { pathname } = parsedUrl;

//     // Serve static files from .next/static
//     if (pathname.startsWith('/_next/') || pathname.startsWith('/static/')) {
//       handle(req, res, parsedUrl);
//     } else {
//       handle(req, res, parsedUrl);
//     }
//   }).listen(process.env.PORT || 3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on port', process.env.PORT || 3000);
//   });
// });
