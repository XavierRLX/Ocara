function disparoAlerta(title, text) {
    const customAlert = document.getElementById('customAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertText = document.getElementById('alertText');
    const alertButton = document.getElementById('alertButton');

    alertTitle.textContent = title;
    alertText.textContent = text;

    customAlert.style.display = 'flex';

    alertButton.onclick = function() {
        customAlert.style.display = 'none';
    };
}
