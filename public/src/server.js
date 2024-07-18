import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = 3000;

// Configure Supabase
const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware para servir arquivos estáticos
app.use(express.static('src/public'));

// Middleware para processar dados JSON
app.use(express.json());

// Rota para criação de usuário
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ user });
});

// Rota para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { session, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ session });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
