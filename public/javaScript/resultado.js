const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';

async function carregaVotos() {
    const url = `${supabaseUrl}/rest/v1/users?select=*`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY'
        },
    });

    if (response.ok) {
        const data = await response.json();
        const totalList = document.getElementById('totalList');
        totalList.innerHTML = '';
        data.forEach((user) => {
            const listItem = document.createElement('div');
            listItem.innerHTML = `
                <p>${user.nameuser}: ${user.totalVotos} votos</p>
            `;
            totalList.appendChild(listItem);
        });
    } else {
        alert('Erro ao carregar a votação');
    }
}

// Chamar a função para carregar os votos quando a página carregar
document.addEventListener('DOMContentLoaded', carregaVotos);
