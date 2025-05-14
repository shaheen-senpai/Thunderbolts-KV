import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set in .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

// Configure the safety settings for Gemini
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Chat route
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Format messages for Gemini
    const prompt = messages
      .map((msg: any) => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    // Get the model - Using Gemini Flash 2 for free tier
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings,
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ 
      role: 'assistant',
      content: text
    });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    return res.status(500).json({ error: 'Failed to process your request' });
  }
});

// Chat stream route (for streaming responses)
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Set headers for streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Format messages for Gemini
    const prompt = messages
      .map((msg: any) => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
      .join('\n');
    
    // Get the model - Using Gemini Flash 2 for free tier
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings,
    });

    // Generate streaming content
    const streamingResult = await model.generateContentStream(prompt);

    // Handle the stream
    for await (const chunk of streamingResult.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ content: chunkText })}\n\n`);
      }
    }

    // End the stream
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error in chat stream endpoint:', error);
    res.write(`data: ${JSON.stringify({ error: 'Failed to process your request' })}\n\n`);
    res.end();
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
