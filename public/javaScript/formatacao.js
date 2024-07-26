function formatName(name) {
    // Converte tudo para minúsculas e separa pelo ponto
    let parts = name.toLowerCase().split('.');

    // Capitaliza a primeira letra de cada parte
    for (let i = 0; i < parts.length; i++) {
        parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
    }

    // Junta as partes com um espaço
    return parts.join(' ');
}

// Pega o elemento <h2> pelo ID
let nameElement = document.getElementById('nameuser');

// Pega o conteúdo do <h2>
let name = nameElement.textContent || nameElement.innerText;

// Formata o nome
let formattedName = formatName(name);

// Atualiza o conteúdo do <h2> com o nome formatado
nameElement.textContent = formattedName;