const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voiceController');

router.post('/voice/:voiceId', voiceController.handleVoiceChat.bind(voiceController));

module.exports = router;