import express from 'express';
import multer from 'multer';
import handleAudio from './server.js'; // Import the handleAudio function
import cors from 'cors';

const app = express();
const upload = multer(); // Use multer to handle form-data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001/' // Allow requests from your EJS frontend
}));

// Endpoint to handle audio upload
app.post('/process-audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No audio file uploaded' });
        }
        
        // Get duration from form data
        const duration = parseInt(req.body.duration) || 0;
        
        // Format duration as mm:ss:ms
        const ms = duration % 1000;
        const seconds = Math.floor((duration / 1000) % 60);
        const minutes = Math.floor(duration / (1000 * 60));
        
        const formattedDuration = `${minutes}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(3, '0')}`;
        
        console.log(`User spoke for ${formattedDuration}`);
        
        // Pass the duration to handleAudio
        const response = await handleAudio(req.file, formattedDuration);
        
        // Send back the actual recorded duration
        res.json({ 
            message: 'Audio processed successfully', 
            duration: formattedDuration 
        });
    } catch (error) {
        console.error('Error processing audio:', error);
        res.status(500).json({ error: 'Failed to process audio' });
    }
});

// Start the Node.js server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Node.js server is running on http://localhost:${PORT}`);
});
