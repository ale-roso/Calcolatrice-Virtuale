// Variabili per la gestione del display e della cronologia
let display = document.getElementById('display');
let history = [];

// Funzione per premere i tasti e inserire numeri o operatori nel display
function press(value) {
    display.value += value;
}

// Funzione per pulire il display
function clearDisplay() {
    display.value = '';
}

// Funzione per eseguire il calcolo semplice (da sinistra a destra)
function calculate() {
    try {
        // Suddividiamo l'espressione per operatori e numeri
        let expression = display.value;
        let tokens = expression.split(/([\+\-\*\/])/); // Dividiamo per operatori

        // Eseguiamo i calcoli da sinistra a destra, ignorando la precedenza degli operatori
        let result = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            let operator = tokens[i];
            let nextNumber = parseFloat(tokens[i + 1]);

            if (operator === '+') {
                result += nextNumber;
            } else if (operator === '-') {
                result -= nextNumber;
            } else if (operator === '*') {
                result *= nextNumber;
            } else if (operator === '/') {
                result /= nextNumber;
            }
        }

        // Aggiungiamo l'espressione e il risultato alla cronologia
        history.push(`${expression} = ${result}`);

        // Mostriamo il risultato nel display
        display.value = result;
    } catch (error) {
        // In caso di errore (espressione invalida), mostriamo un messaggio d'errore
        display.value = 'Errore';
    }
}

// Funzione per aprire la cronologia
function openHistory() {
    // Mostriamo il modale della cronologia
    document.getElementById('historyModal').style.display = 'flex';

    // Mostriamo la cronologia all'interno della lista
    let historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Puliamo la lista attuale
    history.forEach(item => {
        let listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

// Funzione per chiudere la cronologia (modal)
function closeHistory() {
    document.getElementById('historyModal').style.display = 'none';
}

// Gestione del pulsante "Torna Indietro" all'interno del modale
document.querySelector('.btn-back').addEventListener('click', function() {
    closeHistory(); // Chiude il modale e ritorna alla calcolatrice
});

// Gestione della chiusura del modale con il pulsante 'x'
document.querySelector('.close').addEventListener('click', function() {
    closeHistory(); // Chiude il modale
});
