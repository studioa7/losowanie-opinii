document.addEventListener('DOMContentLoaded', () => {
    // Elementy DOM
    const fileUpload = document.getElementById('file-upload');
    const fileName = document.getElementById('file-name');
    const opinionDisplay = document.getElementById('opinion-display');
    const drawButton = document.getElementById('draw-button');
    const opinionsCount = document.getElementById('opinions-count');
    const currentOpinion = document.getElementById('current-opinion');
    
    // Zmienne globalne
    let opinions = [];
    let usedOpinions = [];
    let currentOpinionIndex = -1;
    
    // Obsługa wczytywania pliku
    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        // Aktualizacja nazwy pliku
        fileName.textContent = `Wybrany plik: ${file.name}`;
        
        // Wczytanie zawartości pliku
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const content = e.target.result;
            processFileContent(content);
        };
        
        reader.onerror = () => {
            showError('Wystąpił błąd podczas wczytywania pliku.');
        };
        
        reader.readAsText(file);
    });
    
    // Przetwarzanie zawartości pliku
    function processFileContent(content) {
        // Podział tekstu na linie i usunięcie pustych linii
        opinions = content.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        // Reset zmiennych
        usedOpinions = [];
        currentOpinionIndex = -1;
        
        // Aktualizacja licznika opinii
        opinionsCount.textContent = `Liczba opinii: ${opinions.length}`;
        currentOpinion.textContent = 'Opinia nr: -';
        
        // Aktywacja przycisku losowania
        if (opinions.length > 0) {
            drawButton.disabled = false;
            opinionDisplay.innerHTML = '<p class="placeholder">Kliknij "Losuj opinię", aby wylosować opinię</p>';
        } else {
            drawButton.disabled = true;
            showError('Plik nie zawiera żadnych opinii.');
        }
    }
    
    // Obsługa przycisku losowania
    drawButton.addEventListener('click', () => {
        if (opinions.length === 0) {
            return;
        }
        
        // Jeśli wszystkie opinie zostały już wylosowane, resetujemy
        if (usedOpinions.length === opinions.length) {
            usedOpinions = [];
            showNotification('Wszystkie opinie zostały już wylosowane. Rozpoczynam nową serię losowań.');
        }
        
        // Losowanie opinii, która nie była jeszcze użyta
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * opinions.length);
        } while (usedOpinions.includes(randomIndex));
        
        // Dodanie wylosowanej opinii do użytych
        usedOpinions.push(randomIndex);
        currentOpinionIndex = randomIndex;
        
        // Wyświetlenie wylosowanej opinii
        displayOpinion(opinions[randomIndex]);
        
        // Aktualizacja licznika
        currentOpinion.textContent = `Opinia nr: ${randomIndex + 1}`;
        
        // Efekt animacji
        animateOpinionDisplay();
    });
    
    // Wyświetlanie opinii
    function displayOpinion(opinion) {
        opinionDisplay.innerHTML = `<p>${opinion}</p>`;
    }
    
    // Animacja wyświetlania opinii
    function animateOpinionDisplay() {
        opinionDisplay.classList.add('animate');
        setTimeout(() => {
            opinionDisplay.classList.remove('animate');
        }, 500);
    }
    
    // Wyświetlanie błędu
    function showError(message) {
        opinionDisplay.innerHTML = `<p class="error">${message}</p>`;
    }
    
    // Wyświetlanie powiadomienia
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Dodanie stylów dla animacji i powiadomień
    addAnimationStyles();
    
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            #opinion-display.animate {
                animation: fadeIn 0.5s ease-out;
            }
            
            .error {
                color: #e53935;
                font-weight: bold;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--primary-color);
                color: white;
                padding: 12px 20px;
                border-radius: 5px;
                box-shadow: var(--box-shadow);
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s, transform 0.3s;
                z-index: 1000;
            }
            
            .notification.show {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});