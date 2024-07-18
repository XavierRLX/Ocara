document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    console.log('Enviando requisição para /signup');
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('Resposta recebida:', data);
    if (data.error) {
      alert(data.error);
    } else {
      alert('Usuário criado com sucesso!');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('Erro ao criar usuário.');
  }
});
