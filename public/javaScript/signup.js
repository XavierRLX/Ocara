const supabaseUrl = "https://pzjmkmgqjxvmhmhuddiy.supabase.co";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6am1rbWdxanh2bWhtaHVkZGl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEyNDMzMjAsImV4cCI6MjAzNjgxOTMyMH0.SgizVK5qT6ibYWQ4GRO1Ppy9cuaNTvchy-bsWT-0YYY";
const adminPassword = "Nul2024@";

document.getElementById("registerForm").addEventListener("submit", async (event) => { event.preventDefault();

    //    const inputPassword = prompt("Por favor, insira a senha de administrador:");

    //     if (inputPassword !== adminPassword) {
    //         alert('Senha de administrador incorreta!');
    //         return;
    //     }

    const cpfInput = document.getElementById("cpf");
    const cpf = cpfInput.value;

    if (!isCPFValid(cpf)) {
        alert("CPF inválido. Por favor, insira um CPF válido.");
        return;
    }

    document.addEventListener("DOMContentLoaded", () => {
      const form = document.getElementById("cpfForm");
      form.addEventListener("submit", validateCPFInput);
    });

    const nameuser = event.target.nameuser.value;
    const password = event.target.password.value;

    const url = `${supabaseUrl}/rest/v1/users`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ nameuser, password }),
    });

    if (response.ok) {
      alert("Usuário cadastrado com sucesso!");
      event.target.nameuser.value = "";
      event.target.password.value = "";
    } else {
      const data = await response.json();
      alert("Erro: " + data.error);
    }
  });
