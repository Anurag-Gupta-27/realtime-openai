import { RealtimeClient } from '../node_modules/@openai/realtime-api-beta/lib/client.js';
import { WavRecorder, WavStreamPlayer } from '../../controllers/voiceController.js'

const LOCAL_RELAY_SERVER_URL = ''; // Set your relay server URL if needed
const apiKey = LOCAL_RELAY_SERVER_URL ? '' : localStorage.getItem('tmp::voice_api_key') || '';

const wavRecorder = new WavRecorder({ sampleRate: 24000 });
const wavStreamPlayer = new WavStreamPlayer({ sampleRate: 24000 });
const client = new RealtimeClient(
    LOCAL_RELAY_SERVER_URL ? { url: LOCAL_RELAY_SERVER_URL } : {
        apiKey: apiKey,
        dangerouslyAllowAPIKeyInBrowser: true,
    }
);

let isConnected = false;
let isRecording = false;

async function connectConversation() {
    console.log("Connecting to conversation");
    try {
        const startTime = new Date().toISOString();
        isConnected = true;

        await wavRecorder.begin();
        await wavStreamPlayer.connect();
        await client.connect();
        client.sendUserMessageContent([{ type: `input_text`, text: `Hello!` }]);

        if (client.getTurnDetectionType() === 'server_vad') {
            await wavRecorder.record((data) => client.appendInputAudio(data.mono));
        }
    } catch (error) {
        console.error('Error connecting:', error);
    }
}

async function disconnectConversation() {
    try {
        isConnected = false;

        client.disconnect();
        await wavRecorder.end();
        await wavStreamPlayer.interrupt();
    } catch (error) {
        console.error('Error disconnecting:', error);
    }
}

async function startRecording() {
    try {
        isRecording = true;
        const trackSampleOffset = await wavStreamPlayer.interrupt();
        if (trackSampleOffset?.trackId) {
            const { trackId, offset } = trackSampleOffset;
            await client.cancelResponse(trackId, offset);
        }
        await wavRecorder.record((data) => client.appendInputAudio(data.mono));
    } catch (error) {
        console.error('Error starting recording:', error);
    }
}

async function stopRecording() {
    try {
        isRecording = false;
        await wavRecorder.pause();
        client.createResponse();
    } catch (error) {
        console.error('Error stopping recording:', error);
    }
}

// Export functions if needed
export { connectConversation, disconnectConversation, startRecording, stopRecording };