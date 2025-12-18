require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// FIX: Bulletproof import for the PDF library
const rawPdfLib = require('pdf-parse');
const pdfParse = typeof rawPdfLib === 'function' ? rawPdfLib : (rawPdfLib.default || Object.values(rawPdfLib).find(v => typeof v === 'function'));

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// In-memory state (resets on server restart)
let chatHistory = [];
let documentContext = "";
let currentImagePart = null;

app.post('/chat', upload.single('file'), async (req, res) => {
    try {
        const { message } = req.body;

        if (req.file) {
            // Process PDF or TXT
            if (req.file.mimetype === 'application/pdf' || req.file.mimetype === 'text/plain') {
                const data = req.file.mimetype === 'application/pdf' 
                    ? await pdfParse(req.file.buffer) 
                    : { text: req.file.buffer.toString() };
                documentContext += `\n[Context]: ${data.text}\n`;
            } 
            // Process Images
            else if (req.file.mimetype.startsWith('image/')) {
                currentImagePart = {
                    inlineData: { data: req.file.buffer.toString('base64'), mimeType: req.file.mimetype }
                };
            }
        }

        // Build prompt with history and file context
        let promptParts = [documentContext];
        chatHistory.forEach(msg => promptParts.push(`${msg.role}: ${msg.text}`));
        promptParts.push(`user: ${message}`);

        const finalRequest = currentImagePart ? [currentImagePart, ...promptParts] : promptParts;
        const result = await model.generateContent(finalRequest);
        const responseText = result.response.text();

        // Update session history
        chatHistory.push({ role: 'user', text: message });
        chatHistory.push({ role: 'model', text: responseText });

        res.json({ history: chatHistory });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Reset endpoint
app.post('/reset', (req, res) => {
    chatHistory = [];
    documentContext = "";
    currentImagePart = null;
    res.json({ success: true });
});

app.listen(5000, () => console.log("Server active on port 5000"));