// import express from 'express';
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import App from '../website/App';
// import localStorage from '../lib/localStorage'
// import path from 'path'
// import * as globals from '../lib/globals'

// const port = 3000;
// const server = express();
// localStorage.setItem('WebServerPid',process.pid)

// // server.use(express.static(path.join(__dirname, 'build')));
// server.use( '/public', express.static( path.resolve(globals.InstallationDir() + '/dsm/public') ) );

// server.get( "/", ( req, res ) => {
//   const jsx = ( <App /> );
//   const reactDom = renderToString( jsx );

//   res.writeHead( 200, { "Content-Type": "text/html" } );
//   res.end( htmlTemplate( reactDom ) );
// } );

// server.listen(3000, () => console.log('Example app listening on port 3000!'))

// process.on('beforeExit',()=>{
//   localStorage.clear()
//   process.exit(0)
// })

// function htmlTemplate( reactDom ) {
//   return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//           <meta charset="utf-8">
//           <title>ReR</title>
//       </head>
//       <body>
//           <div id="app">${ reactDom }</div>
//           <script src="./public/webClient.js"></script>
//       </body>
//       </html>
//   `;
// }




