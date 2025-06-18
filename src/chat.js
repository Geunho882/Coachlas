import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vjvwpfysiwcwiqktyotd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqdndwZnlzaXdjd2lxa3R5b3RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMjM5NTQsImV4cCI6MjA2NTc5OTk1NH0.EY2ucZUR8vt-beSQStqX1iwwpUqjunW5EwQzbrSYJNA'

export const supabase = createClient(supabaseUrl, supabaseKey)


// (sorry had to use Ai for help, quite hard to code the chat feature)

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.querySelector('.chatbtn2');
  const input = document.querySelector('#chat-input');

  sendBtn?.addEventListener('click', () => {
    const message = input.value.trim();
    if (message) {
      sendMessage(message);
      input.value = '';
    }
  });

  async function sendMessage(messageText) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{ message: messageText }]);

    if (error) {
      console.error('Error sending message:', error);
    } else {
      console.log('Message stored:', data);
    }
  }
});
