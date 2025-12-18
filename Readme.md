# Gemini Chatbot Integration Task
[cite_start]**Name:** RISHAV [cite: 1]  
[cite_start]**Roll No:** 2K22/EE/218 [cite: 1]  

---

## 1. Overview
[cite_start]This project is a minimal web-based chatbot built using Google's Gemini API[cite: 3]. [cite_start]It is designed to demonstrate API integration, file handling, and simple in-memory state management[cite: 6]. [cite_start]The application supports text conversation, document uploads (PDF/TXT), and image analysis (PNG/JPG)[cite: 4].

## 2. Core Features
* [cite_start]**Minimal Chat UI:** A clean interface to type messages and view bot responses[cite: 9, 11].
* [cite_start]**Document Support:** Upload and extract text from PDF and TXT files for context-aware Q&A[cite: 16, 21].
* [cite_start]**Image Support:** Upload PNG/JPG images for the Gemini model to analyze alongside user messages[cite: 17, 23, 24].
* [cite_start]**Basic Chat Context:** Tracks conversation history, document text, and images for the current session only[cite: 26, 28, 29, 30].
* [cite_start]**New Chat / Reset:** A dedicated button to clear history and reset context for a fresh session[cite: 18, 38, 41, 42, 43].

## 3. Constraints & Architecture
* [cite_start]**Backend:** Node.js/Express server[cite: 75].
* [cite_start]**Frontend:** React framework[cite: 76].
* [cite_start]**Storage:** All state is stored in-memory; no database or persistent sessions are used[cite: 77, 78].
* [cite_start]**File Handling:** Simple text extraction for documents and Base64 encoding for images[cite: 79, 81].

---

## 4. Installation & Setup

### Prerequisites
* Node.js (v18 or higher recommended)
* A Google Gemini API Key

### Step 1: Clone and Navigate
```bash
git clone <your-repository-url>
cd gemini-chatbot