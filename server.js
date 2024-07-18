const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const port = 3000;

const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'signup.html'));
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error('Error creating user:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { session, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      console.error('Error logging in:', error.message);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ session });
  } catch (err) {
    console.error('Unexpected error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
