import { GoogleGenerativeAI } from "https://esm.run/@google/genai";

const API_KEY = "YOUR_GEMINI_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

// This tells the AI how to act (Personality)
const systemInstruction = "You are a strict but wise productivity coach. The user is procrastinating on social media. Your goal is to convince them to get back to their CSBS engineering studies. Be witty, direct, and slightly intimidating about their future if they keep wasting time.";

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = inputField.value;

    if (!userText) return;

    // Show User Message
    chatBox.innerHTML += `<div class="message user">${userText}</div>`;
    inputField.value = "";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `${systemInstruction}\nUser says: ${userText}`;
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Show AI Message
        chatBox.innerHTML += `<div class="message ai">${responseText}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div class="message ai">Error: Check your API Key!</div>`;
    }
}

window.sendMessage = sendMessage;
