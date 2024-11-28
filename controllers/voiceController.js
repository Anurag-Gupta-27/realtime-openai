import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Set the paths to ffmpeg and ffprobe
ffmpeg.setFfmpegPath(ffmpegPath);  // Path to ffmpeg
ffmpeg.setFfprobePath(ffprobePath.path);  // Path to ffprobe

export default async function processAudio(audio, formattedDuration) {
    // Process the audio and calculate the duration
    try {
        console.log(`Processing audio with mimetype: ${audio.mimetype}`);
        // const duration = await calculateDuration(audio);
        console.log(`User spoke for ${formattedDuration}`);
        return { duration: formattedDuration };
    } catch (error) {
        console.error('Error processing audio:', error);
        return { error: 'Failed to process audio' };
    }
}

// async function calculateDuration(audio) {
//     if (!audio.buffer) {
//         throw new Error('No audio buffer provided');
//     }

//     console.log(`Audio mimetype: ${audio.mimetype}, buffer size: ${audio.buffer.length}`);

//     if (audio.mimetype === 'audio/webm') {
//         try {
//             const duration = await getAudioDuration(audio.buffer);
//             console.log(`Calculated duration: ${duration}`);
//             return duration;
//         } catch (error) {
//             console.error('Error calculating duration with ffprobe:', error);
//             throw error;
//         }
//     } else {
//         console.error('Unsupported audio type');
//         throw new Error('Unsupported audio type');
//     }
// }

// function getAudioDuration(buffer) {
//     return new Promise((resolve, reject) => {
//         const __filename = fileURLToPath(import.meta.url);
//         const __dirname = dirname(__filename);

//         const tmpFilePath = `${__dirname}/temp.webm`;

//         try {
//             writeFileSync(tmpFilePath, buffer);
//             console.log(`Temporary file created at: ${tmpFilePath}`);
//         } catch (writeError) {
//             console.error('Error writing temporary file:', writeError);
//             return reject('Failed to write temporary file');
//         }

//         ffmpeg.ffprobe(tmpFilePath, (err, metadata) => {
//             if (err) {
//                 console.error('Error in ffprobe:', err);
//                 return reject('Error in ffprobe: ' + err);
//             }

//             console.log('FFprobe metadata:', metadata);

//             if (metadata && metadata.format && metadata.format.duration) {
//                 const duration = parseFloat(metadata.format.duration);
//                 console.log(`Extracted duration: ${duration}`);
//                 resolve(duration);
//             } else {
//                 console.error('Duration not found in metadata');
//                 reject('Duration not found in metadata');
//             }
//         });
//     });
// }

// // Function to format the duration in min:sec:ms
// function formatDuration(durationInSeconds) {
//     if (isNaN(durationInSeconds) || durationInSeconds <= 0) {
//         return '0:00:000';  // Return a default value if duration is invalid
//     }

//     const minutes = Math.floor(durationInSeconds / 60);
//     const seconds = Math.floor(durationInSeconds % 60);
//     const milliseconds = Math.floor((durationInSeconds % 1) * 1000);

//     // Return the duration in min:sec:ms format
//     return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
// }
