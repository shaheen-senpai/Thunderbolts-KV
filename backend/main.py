import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Generative AI
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not set in .env file")

genai.configure(api_key=api_key)

# Safety settings for Gemini
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
]

# Define message model
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

# Chat route
@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Format messages for Gemini
        prompt = "\n".join([
            f"{'Human' if msg.role == 'user' else 'Assistant'}: {msg.content}" 
            for msg in request.messages
        ])
        
        # Get the model - Using Gemini Flash 2 for free tier
        model = genai.GenerativeModel(
            model_name="gemini-2.0-flash",
            safety_settings=safety_settings
        )
        
        # Generate content
        response = model.generate_content(prompt)
        text = response.text
        
        return {"role": "assistant", "content": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process your request: {str(e)}")

# Function to stream response
async def stream_response(prompt):
    model = genai.GenerativeModel(
        model_name="gemini-2.0-flash", 
        safety_settings=safety_settings
    )
    
    response = model.generate_content(prompt, stream=True)
    
    for chunk in response:
        chunk_text = chunk.text
        if chunk_text:
            yield f"data: {{'content': '{chunk_text}'}}\n\n"
    
    yield "data: [DONE]\n\n"

# Chat stream route (for streaming responses)
@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    try:
        # Format messages for Gemini
        prompt = "\n".join([
            f"{'Human' if msg.role == 'user' else 'Assistant'}: {msg.content}" 
            for msg in request.messages
        ])
        
        # Return streaming response
        return StreamingResponse(
            stream_response(prompt),
            media_type="text/event-stream"
        )
    except Exception as e:
        # Handle error in streaming format
        async def error_stream():
            yield f"data: {{'error': 'Failed to process your request: {str(e)}'}}\n\n"
        
        return StreamingResponse(
            error_stream(),
            media_type="text/event-stream"
        )

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "OK"}

# Run the server with uvicorn
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "5001"))  # Changed to port 5001
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
