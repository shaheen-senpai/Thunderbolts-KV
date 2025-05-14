# ChatGPT Clone

This project is a clone of the OpenAI ChatGPT web interface that uses several other AI instead of OpenAI's API. It features a modern, responsive UI that closely resembles the official ChatGPT interface.

## Features

- 🎨 ChatGPT-like user interface
- 🧠 Conversation history saved in browser storage
- 🔄 Regenerate responses
- 📊 Markdown support for code blocks and formatting
- 📱 Responsive design

## Prerequisites

- Node.js (v14 or higher)
- A Google Gemini API key (free tier available)

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/chatgpt-clone.git
cd chatgpt-clone
```

2. **Set up your Gemini API key**

Add your API key to the `.env` file in the `backend` folder.

3. **Install dependencies**

```bash
# Install all dependencies (frontend and backend)
npm run install:all
```

4. **Start the application**

```bash
# Using the start script (recommended)
./start.sh

# Or manually
npm start
```

This will start both the frontend and backend servers:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage

1. Open http://localhost:3000 in your browser
2. Start a new chat using the "New chat" button in the sidebar
3. Type your message and press Enter to send
4. Use the conversation history in the sidebar to navigate between different chats

## Troubleshooting

If you encounter any issues:

1. Make sure your Gemini API key is correctly set in the backend `.env` file
2. Check that both frontend and backend servers are running
3. Clear your browser cache and local storage if you experience UI issues

## License

MIT

## Disclaimer

This project is not affiliated with, endorsed by, or sponsored by OpenAI or Google. It is an independent project created for educational purposes only.
