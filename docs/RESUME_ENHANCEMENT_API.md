# Resume Enhancement API Integration

## Overview
This document describes the implementation of the resume enhancement feature that sends user input and extracted resume data to a backend API for AI-powered improvements.

## Frontend Implementation

### 1. API Service (`template.service.ts`)

**Endpoint**: `POST http://localhost:3000/api/resume/enhance`

**Request Interface**:
```typescript
interface EnhanceResumeRequest {
  userInput: string;      // User's enhancement request
  resumeData: any;        // Extracted resume data in JSON format
}
```

**Response Interface**:
```typescript
interface EnhanceResumeResponse {
  success: boolean;       // Whether the enhancement was successful
  enhancedData?: any;     // Enhanced resume data (same structure as input)
  message?: string;       // Success message
  error?: string;         // Error message if failed
}
```

### 2. Component Integration (`resume-editor.component.ts`)

The `sendMessage()` method now:
1. Extracts current resume data from the editor
2. Sends user input + resume data to the backend API
3. Receives enhanced data from the backend
4. Automatically updates the resume with enhanced content
5. Provides user feedback via alerts

## Backend Requirements

### API Endpoint Specification

**URL**: `POST /api/resume/enhance`

**Request Body**:
```json
{
  "userInput": "Make the summary more professional",
  "resumeData": {
    "name": "John Doe",
    "email": "john@example.com",
    "summary": "I am a developer...",
    "experience": [...],
    "education": [...],
    ...
  }
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "enhancedData": {
    "name": "John Doe",
    "email": "john@example.com",
    "summary": "Accomplished software developer with...",
    "experience": [...],
    "education": [...],
    ...
  },
  "message": "Resume enhanced successfully!"
}
```

**Error Response** (400/500):
```json
{
  "success": false,
  "error": "Failed to enhance resume: AI service unavailable"
}
```

## Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Resume enhancement endpoint
app.post('/api/resume/enhance', async (req, res) => {
  try {
    const { userInput, resumeData } = req.body;
    
    // Validate input
    if (!userInput || !resumeData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: userInput and resumeData'
      });
    }
    
    console.log('Enhancement Request:', { userInput, resumeData });
    
    // TODO: Call your AI service (OpenAI, Claude, etc.)
    // Example with OpenAI:
    // const enhancedData = await enhanceWithAI(userInput, resumeData);
    
    // For now, return mock enhanced data
    const enhancedData = {
      ...resumeData,
      summary: `[ENHANCED] ${resumeData.summary || 'Professional summary enhanced by AI'}`
    };
    
    res.json({
      success: true,
      enhancedData,
      message: 'Resume enhanced successfully!'
    });
    
  } catch (error) {
    console.error('Enhancement Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
```

## Configuration

### Update Backend URL

To change the backend URL, edit `template.service.ts`:

```typescript
private apiBaseUrl = 'http://localhost:3000/api'; // Change this to your backend URL
```

For production:
```typescript
private apiBaseUrl = 'https://your-backend.com/api';
```

## Testing

### 1. Start Backend Server
```bash
node server.js  # or your backend start command
```

### 2. Test the Frontend
1. Open the resume editor
2. Type a message in the chat input (e.g., "Make the summary more professional")
3. Press Enter or click Send
4. The system will:
   - Extract current resume data
   - Send to backend API
   - Receive enhanced data
   - Update the resume automatically

### 3. Error Handling

The frontend provides specific error messages for:
- **Network errors** (status 0): "Cannot connect to backend server"
- **404 errors**: "API endpoint not found"
- **Other errors**: Displays the error message from backend

## Resume Data Structure

The extracted resume data follows this structure:

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "location": "string",
  "linkedin": "string",
  "summary": "string",
  "experience": [
    {
      "title": "string",
      "company": "string",
      "from": "string",
      "to": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "degree": "string",
      "school": "string",
      "year": "string"
    }
  ],
  "skills": ["string"],
  "certifications": ["string"]
}
```

## AI Integration Examples

### OpenAI Integration
```javascript
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function enhanceWithAI(userInput, resumeData) {
  const prompt = `
User Request: ${userInput}

Current Resume Data:
${JSON.stringify(resumeData, null, 2)}

Please enhance the resume based on the user's request and return the complete enhanced resume data in JSON format.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content);
}
```

### Claude Integration
```javascript
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function enhanceWithAI(userInput, resumeData) {
  const message = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: `Enhance this resume based on: ${userInput}\n\nResume: ${JSON.stringify(resumeData)}`
    }]
  });

  return JSON.parse(message.content[0].text);
}
```

## Security Considerations

1. **API Authentication**: Add authentication to your backend API
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate and sanitize all inputs
4. **CORS**: Configure CORS properly for production
5. **API Keys**: Store AI service API keys securely in environment variables

## Troubleshooting

### "Cannot connect to backend server"
- Ensure backend is running on http://localhost:3000
- Check CORS configuration
- Verify firewall settings

### "API endpoint not found"
- Verify the route is `/api/resume/enhance`
- Check backend routing configuration

### Resume not updating after enhancement
- Check browser console for errors
- Verify the enhanced data structure matches the original
- Ensure data-field attributes are present in the template

## Next Steps

1. Set up your backend server
2. Integrate with an AI service (OpenAI, Claude, etc.)
3. Test the enhancement feature
4. Add authentication and security measures
5. Deploy to production
