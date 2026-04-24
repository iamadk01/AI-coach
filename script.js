import { GoogleGenerativeAI } from "https://esm.run/@google/genai";

// ⚠️ REPLACE THE KEY BELOW WITH YOUR KEY IN QUOTES
const API_KEY = "AIzaSyBJAmIo66NF0xtle7XrKamfCLMNmyi6EZk"; 
const genAI = new GoogleGenerativeAI(API_KEY);

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = inputField.value;

    if (!userText) return;

    // Show User Message
    chatBox.innerHTML += `<div class="message user"><b>You:</b> ${userText}</div>`;
    inputField.value = "";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // System Prompt: This is the "Personality" of your coach
        const prompt = `You are a strict but witty productivity coach for a CSBS engineering student named Adnan. 
        The user is procrastinating. Their excuse is: "${userText}". 
        Give a short, 2-sentence reality check and tell them to get back to work.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Show AI Message
        chatBox.innerHTML += `<div class="message ai"><b>Coach:</b> ${text}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<div class="message ai">Error: Check the console!</div>`;
    }
}

// Critical: This connects the button in HTML to the function in JS
window.sendMessage = sendMessage;
