
/** app for groupchat */

const express = require('express');
const app = express();

// serve stuff in static/ folder

app.use(express.static('static/'));

/** Handle websocket chat */

const server = require('http').createServer(app);
// allow for app.ws routes for websocket routes
const wsExpress = require('express-ws')(app);

const ChatUser = require('./ChatUser');

/** Handle a persistent connection to /chat/[roomName]
 *
 * Note that this is only called *once* per client --- not every time
 * a particular websocket chat is sent.
 *
 * `ws` becomes the socket for the client; it is specific to that visitor.
 * The `ws.send` method is how we'll send messages back to that socket.
 */

app.ws('/chat/:roomName', function(ws, req, next) {
  try {
    const user = new ChatUser(
      ws.send.bind(ws), // fn to call to message this user
      req.params.roomName // name of room for user
    );

    // register handlers for message-received, connection-closed

    ws.on('message', function(data) {
      try {
        user.handleMessage(data);
      } catch (err) {
        console.error(err);
      }
    });

    ws.on('close', function() {
      try {
        user.handleClose();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});

/** serve homepage --- just static HTML
 *
 * Allow any roomName to come after homepage --- client JS will find the
 * roomname in the URL.
 *
 * */

app.get('/:roomName', function(req, res, next) {
  res.sendFile(`${__dirname}/chat.html`);
});


// /** Handle websocket chat */

// // allow for app.ws routes for websocket routes


// /** Handle a persistent connection to /chat/[roomName]
//  *
//  * Note that this is only called *once* per client --- not every time
//  * a particular websocket chat is sent.
// *
// * `ws` becomes the socket for the client; it is specific to that visitor.
// * The `ws.send` method is how we'll send messages back to that socket.
// */

// const express = require('express')
// const app = express()

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ server: server });
// var expressWs = require('express-ws')(app);
// var router = express.Router();
// const ChatUsder = require('./ChatUser');

// app.use(express.static('static/'));
// app.use("/ws-stuff", router);
// app.use(function (req, res, next) {
//   console.log('middleware');
//   req.testing = 'testing';
//   return next();
// });

// wss.on('connection', function connection(ws, request) {
//     ws.on('message', function incoming(message) {
//         console.log(message)

//         ws.send('Tobi from thoughtbot fusion team.');
//     });
// });


// app.get('/:roomName', function(req, res, next) {
//     res.sendFile(`${__dirname}/chat.html`);
//   });
  



// app.get('/', function(req, res, next){
//   console.log('get route', req.testing);
//   res.end();
// });



// app.ws('/echo', function(ws, req) {
//   ws.on('message', function(msg) {
//     ws.send(msg);
//   });
// });



// router.ws('/echo', function(ws, req) {
//   ws.on('message', function(msg) {
//     ws.send(msg);
//   });
// });


// app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     console.log(msg);
//   });
//   console.log('socket', req.testing);
// });

// // app.listen(3000);

// // app.get('/', (req, res) => res.send('Hello World!'))

// app.ws('/chat/:roomName', function(ws, req, next) {
//   try {
//     const user = new ChatUser(
//       ws.send.bind(ws), // fn to call to message this user
//       req.params.roomName // name of room for user
//       );
      
//                           // register handlers for message-received, connection-closed

//     ws.on('message', function(data) {
//         try {
//             user.handleMessage(data);
//           } catch (err) {
//         console.error(err);
//       }
//     });

//     ws.on('close', function() {
//         try {
//             user.handleClose();
//           } catch (err) {
//               console.error(err);
//             }
//           });
//         } catch (err) {
//             console.error(err);
//           }
//         });
        
        // /** serve homepage --- just static HTML
        //  *
        //  * Allow any roomName to come after homepage --- client JS will find the
        //  * roomname in the URL.
        //  *
        //  * */
        

          // module.exports = app;
          
          server.listen(9000, () => console.log(`Lisening on port :9000`))