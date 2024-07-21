const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';

async function loadUsers() {
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
        const userList = document.getElementById('userList');
        userList.innerHTML = ''; // Limpar a lista de usuários
        data.forEach(user => {
            const userItem = document.createElement('div');
            const status = user.ativo ? 'Ativo' : 'Inativo';
            const activateButton = !user.ativo ? `<button onclick="activateUser('${user.id}')">ATIVAR</button>` : '';

            userItem.innerHTML = `
                <p><strong>Usuário:</strong> ${user.nameuser}</p>
                <p><strong>Status:</strong> ${status}</p>
                ${activateButton}
                <button onclick="deleteUser('${user.id}')">Excluir</button>
                <hr>
            `;
            userList.appendChild(userItem);
        });
    } else {
        alert('Erro ao carregar a lista de usuários');
    }
}

async function deleteUser(id) {
    const url = `${supabaseUrl}/rest/v1/users?id=eq.${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
        },
    });

    if (response.ok) {
        alert('Usuário excluído com sucesso!');
        loadUsers(); // Carregar a lista de usuários após a exclusão
    } else {
        alert('Erro ao excluir o usuário');
    }
}

async function activateUser(id) {
    if (!confirm('Tem certeza que deseja ativar este usuário?')) return;

    const url = `${supabaseUrl}/rest/v1/users?id=eq.${id}`;
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
        },
        body: JSON.stringify({ ativo: true })
    });

    if (response.ok) {
        alert('Usuário ativado com sucesso!');
        loadUsers(); // Recarregar a lista de usuários após a ativação
    } else {
        alert('Erro ao ativar o usuário');
    }
}

loadUsers(); // Carregar a lista de usuários quando a página é carregada
