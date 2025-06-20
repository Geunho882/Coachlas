import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vjvwpfysiwcwiqktyotd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdndwZnlzaXdjd2lxa3R5b3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjM5NTQsImV4cCI6MjA2NTc5OTk1NH0.EY2ucZUR8vt-beSQStqX1iwwpUqjunW5EwQzbrSYJNA'
const OPENAI_API_KEY = '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';

export const supabase = createClient(supabaseUrl, supabaseKey)


// (sorry had to use Ai for help, quite hard to code the chat feature and the design is really weird)

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.querySelector('.chatbtn2');
  const input = document.querySelector('#chat-input');

  sendBtn?.addEventListener('click', async () => {
    const message = input.value.trim();
    if (!message) return;

    // Show user's message
    appendMessage('You', message);
    input.value = '';

    // Save to Supabase
    await sendMessageToDB(message);

    // Get AI reply and display
    const aiReply = await getAIResponse(message);
    appendMessage('Coachlas', aiReply);
  });
});

async function sendMessageToDB(messageText) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert([{ message: messageText }]);

  if (error) console.error('Error saving to Supabase:', error);
}

function appendMessage(sender, text) {
  let chatBox = document.querySelector('.chat-box');
  const msg = document.createElement('p');
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  msg.style.padding = '5px 0';
  chatBox.appendChild(msg);
}

async function getAIResponse(userMessage) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful, friendly fitness assistant called Coachlas." },
        { role: "user", content: userMessage }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
}

