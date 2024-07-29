const supabaseUrl = 'https://pzjmkmgqjxvmhmhuddiy.supabase.co';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if (userInfo) {
    document.getElementById('nameuser').innerHTML = `${userInfo.nameuser}, escolha o cara! `;
    if (userInfo.votonameuser != null) {
        document.getElementById('meuVoto').innerHTML = `${userInfo.votonameuser}`;
    } else {
        document.getElementById('meuVoto').innerHTML = 'Nenhum voto';
    }
} else {
    alert('Informações do usuário não encontradas');
}

async function populateUserList() {
    const url = `${supabaseUrl}/rest/v1/users?ativo=eq.true`; // Filtra usuários ativos
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
        },
    });

    if (response.ok) {
        const users = await response.json();
        const voteSelect = document.getElementById('vote');
        voteSelect.innerHTML = '';  
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id; 
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

    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;


    if (userInfo.votou) {
        disparoAlerta('Atenção', 'Você já votou!');
        submitButton.disabled = false;
        return;
    }

    const userUrl = `${supabaseUrl}/rest/v1/users?id=eq.${selectedUserId}`;
    let response = await fetch(userUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey,
        },
    });

    if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
            let user = users[0];
            const newTotalVotos = user.totalVotos + 1;

            const updateUrl = `${supabaseUrl}/rest/v1/users?id=eq.${selectedUserId}`;
            response = await fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey,
                },
                body: JSON.stringify({ totalVotos: newTotalVotos }),
            });

            if (response.ok) {
                const voterId = userInfo.id; 
                const voterUpdateUrl = `${supabaseUrl}/rest/v1/users?id=eq.${voterId}`;
                response = await fetch(voterUpdateUrl, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': apiKey,
                    },
                    body: JSON.stringify({
                        votou: true,
                        votonameuser: user.nameuser
                    }),
                });

                if (response.ok) {
                    disparoAlerta( 'Parabéns','Votação confirmada com sucesso!');
                    userInfo.votou = true;
                    userInfo.votonameuser = user.nameuser;
                    submitButton.disabled = false;

                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    document.getElementById('meuVoto').innerHTML = `${user.nameuser}`;
                } else {
                    const data = await response.json();
                    alert('Erro ao atualizar o campo "votou" ou "votonameuser": ' + data.error);
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

document.addEventListener('DOMContentLoaded', populateUserList);
