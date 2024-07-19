// cpfValidator.js
function isCPFValid(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Função para calcular o dígito verificador
    function calculateDigit(cpf, factor) {
        let total = 0;
        for (let i = 0; i < factor - 1; i++) {
            total += parseInt(cpf[i]) * (factor - i);
        }
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    // Valida o primeiro dígito verificador
    const digit1 = calculateDigit(cpf, 10);
    if (digit1 !== parseInt(cpf[9])) {
        return false;
    }

    // Valida o segundo dígito verificador
    const digit2 = calculateDigit(cpf, 11);
    if (digit2 !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}
