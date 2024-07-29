document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameuser = event.target.nameuser.value;
  const password = event.target.password.value;

  const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';
  const url = `${supabaseUrl}/rest/v1/users?select=*`;
  const response = await fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
      },
  });

  if (response.ok) {
    const data = await response.json();
    const user = data.find(u => u.nameuser === nameuser && u.password === password);
    
    if (user) {
        if (user.ativo) {
            localStorage.setItem('userInfo', JSON.stringify(user));
            window.location.href = 'votacao';
        } else {
            disparoAlerta('Atenção','Usuário inativo, entre em contato com o administrador');
        }
    } else {
        disparoAlerta('Atenção', 'Email ou senha incorretos');
    }
} else {
    alert('Erro ao fazer login');
}
});