const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
 if (userInfo) {
     document.getElementById('nameuser').innerHTML = `${userInfo.nameuser} `;
 } else {
     alert('Informações do usuário não encontradas');
 }


 async function populateUserList() {
    const url = `${supabaseUrl}/rest/v1/users`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
        },
    });

    if (response.ok) {
        const users = await response.json();
        const voteSelect = document.getElementById('vote');
        voteSelect.innerHTML = '';  // Clear existing options
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;  // Use user ID as the value
            option.textContent = user.nameuser;
            voteSelect.appendChild(option);
        });
    } else {
        console.error('Erro ao buscar usuários');
    }
}

document.getElementById('voteForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedUserId = document.getElementById('vote').value;

    // Fetch the current totalVotos for the selected user
    const userUrl = `${supabaseUrl}/rest/v1/users?id=eq.${selectedUserId}`;
    let response = await fetch(userUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
        },
    });

    if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
            let user = users[0];
            const newTotalVotos = user.totalVotos + 1;

            // Atualizar o totalVotos para o usuário selecionado
            const updateUrl = `${supabaseUrl}/rest/v1/users?id=eq.${selectedUserId}`;
            response = await fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
                },
                body: JSON.stringify({ totalVotos: newTotalVotos }),
            });

            if (response.ok) {
                // Atualizar o campo 'votou' para true para a pessoa que votou
                const voterId = userInfo.id; 
                const voterUpdateUrl = `${supabaseUrl}/rest/v1/users?id=eq.${voterId}`;
                response = await fetch(voterUpdateUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY',
                    },
                    body: JSON.stringify({ votou: true }),
                });

                if (response.ok) {
                    alert('Votação confirmada com sucesso!');
                } else {
                    const data = await response.json();
                    alert('Erro ao atualizar o campo "votou": ' + data.error);
                }
            } else {
                const data = await response.json();
                alert('Erro ao atualizar o total de votos: ' + data.error);
            }
        } else {
            alert('Usuário não encontrado.');
        }
    } else {
        alert('Erro ao buscar usuário.');
    }
});

// Populate the user list when the page loads
document.addEventListener('DOMContentLoaded', populateUserList);
