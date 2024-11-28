import express from 'express';
import config from '../config/config.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/voice:id', (req, res) => {
    // Pass an empty events array or mock data
    res.render(`voice${req.params.id}`, {
        events: [], // Initialize with empty array
        pageTitle: `Voice Chat ${req.params.id}`
    });
});

// Dynamic route configuration
Object.entries(config.routes).forEach(([key, path]) => {
    router.get(path, (req, res) => {
        res.render(key);
    });
});

export default router;