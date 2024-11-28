// import { WebSocketServer } from 'ws';
// import { RealtimeClient } from '@openai/realtime-api-beta';

// console.log('Starting server.js...');

// export class RealtimeRelay {
//     constructor(apiKey) {
//         this.apiKey = apiKey;
//         this.sockets = new WeakMap();
//         this.wss = null;
//     }

//     listen(server) {
//         try {
//             console.log('Initializing WebSocketServer...');
//             this.wss = new WebSocketServer({ server });
//             console.log('WebSocketServer initialized.');
//             this.wss.on('connection', this.connectionHandler.bind(this));
//             this.log(`WebSocketServer is using the same port as HTTP server`);
//         } catch (e) {
//             this.log(`Error initializing WebSocketServer: ${e.message}`);
//             process.exit(1);
//         }
//     }

//     async connectionHandler(ws, req) {
//         if (!req.url) {
//             this.log('No URL provided, closing connection.');
//             ws.close();
//             return;
//         }

//         const url = new URL(req.url, `http://${req.headers.host}`);
//         const pathname = url.pathname;

//         if (pathname !== '/') {
//             this.log(`Invalid pathname: "${pathname}"`);
//             ws.close();
//             return;
//         }

//         this.log(`Connecting with key "${this.apiKey.slice(0, 3)}..."`);
//         const client = new RealtimeClient({ apiKey: this.apiKey });

//         client.realtime.on('server.*', (event) => {
//             this.log(`Relaying "${event.type}" to Client`);
//             ws.send(JSON.stringify(event));
//         });
//         client.realtime.on('close', () => ws.close());

//         const messageQueue = [];
//         const messageHandler = (data) => {
//             try {
//                 const event = JSON.parse(data);
//                 this.log(`Relaying "${event.type}" to OpenAI`);
//                 client.realtime.send(event.type, event);
//             } catch (e) {
//                 console.error(e.message);
//                 this.log(`Error parsing event from client: ${data}`);
//             }
//         };
//         ws.on('message', (data) => {
//             if (!client.isConnected()) {
//                 messageQueue.push(data);
//             } else {
//                 messageHandler(data);
//             }
//         });
//         ws.on('close', () => client.disconnect());

//         try {
//             this.log(`Connecting to OpenAI...`);
//             await client.connect();
//         } catch (e) {
//             this.log(`Error connecting to OpenAI: ${e.message}`);
//             ws.close();
//             return;
//         }
//         this.log(`Connected to OpenAI successfully!`);
//         while (messageQueue.length) {
//             messageHandler(messageQueue.shift());
//         }
//     }

//     log(...args) {
//         console.log(`[RealtimeRelay]`, ...args);
//     }

import processAudio from './controllers/voiceController.js';

export default async function handleAudio(audioData, formattedDuration) {
    try {
        const result = await processAudio(audioData, formattedDuration);
        console.log(`Audio processed successfully: ${JSON.stringify(result)}`);
    } catch (error) {
        console.log(`Error processing audio: ${error.message}`);
    }
}


