document.addEventListener('DOMContentLoaded', () => {
    // Elementy DOM
    const opinionDisplay = document.getElementById('opinion-display');
    const drawButton = document.getElementById('draw-button');
    const selectButton = document.getElementById('select-button');
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');
    const confirmationModal = document.getElementById('confirmation-modal');
    const selectedOpinionText = document.querySelector('.selected-opinion');
    const opinionsList = document.getElementById('opinions-list');
    const opinionsCountSpan = document.querySelector('#opinions-count span');
    const usedOpinionsCountSpan = document.querySelector('#used-opinions-count span');
    
    // Nowe elementy DOM
    const platformButtonsContainer = document.querySelector('.platform-buttons-container');
    const googleButton = document.getElementById('google-button');
    const trustindexButton = document.getElementById('trustindex-button');
    const facebookButton = document.getElementById('facebook-button');
    
    // Elementy panelu administracyjnego
    const adminToggleButton = document.getElementById('admin-toggle-button');
    const adminPanel = document.getElementById('admin-panel');
    const adminSaveButton = document.getElementById('admin-save-button');
    const adminCloseButton = document.getElementById('admin-close-button');
    const googleUrlInput = document.getElementById('google-url');
    const trustindexUrlInput = document.getElementById('trustindex-url');
    const facebookUrlInput = document.getElementById('facebook-url');
    
    // Debugowanie - sprawdzenie, czy elementy DOM zostały znalezione
    console.log('platformButtonsContainer:', platformButtonsContainer);
    console.log('googleButton:', googleButton);
    console.log('trustindexButton:', trustindexButton);
    console.log('facebookButton:', facebookButton);
    
    // Baza opinii na stałe zapisana w programie
    const opinions = [
        "Świetna obsługa klienta, polecam!",
        "Produkt spełnił moje oczekiwania, jestem bardzo zadowolony.",
        "Szybka dostawa i profesjonalna obsługa.",
        "Najlepszy sklep internetowy z jakim miałem do czynienia.",
        "Jakość produktów jest na najwyższym poziomie.",
        "Bardzo dobry kontakt ze sprzedawcą.",
        "Polecam wszystkim, którzy cenią sobie jakość i profesjonalizm.",
        "Zamówienie zostało zrealizowane błyskawicznie.",
        "Świetny stosunek jakości do ceny.",
        "Obsługa klienta na medal!",
        "Produkty są zgodne z opisem, jestem zadowolony z zakupu.",
        "Bardzo miła i pomocna obsługa klienta.",
        "Szybka realizacja zamówienia, wszystko zgodnie z opisem.",
        "Profesjonalne podejście do klienta.",
        "Najlepsza firma z jaką współpracowałem.",
        "Polecam z czystym sumieniem!",
        "Bardzo dobra komunikacja i szybka realizacja.",
        "Produkty wysokiej jakości, warte swojej ceny.",
        "Jestem pod wrażeniem profesjonalizmu tej firmy.",
        "Świetna obsługa i szybka dostawa, polecam!"
    ];
    
    // Zmienne globalne
    let usedOpinions = [];
    let currentOpinionIndex = -1;
    let selectedOpinion = '';
    
    // Inicjalizacja aplikacji
    function init() {
        // Wczytanie zapisanych adresów URL platform
        loadPlatformUrls();
        
        // Aktualizacja licznika opinii
        updateCounters();
        
        // Generowanie listy opinii
        renderOpinionsList();
        
        // Dodanie nasłuchiwania zdarzeń
        drawButton.addEventListener('click', drawRandomOpinion);
        selectButton.addEventListener('click', showConfirmationModal);
        confirmButton.addEventListener('click', confirmOpinionSelection);
        cancelButton.addEventListener('click', hideConfirmationModal);
        
        // Nasłuchiwanie zdarzeń dla przycisków platform
        googleButton.addEventListener('click', () => openPlatform('google'));
        trustindexButton.addEventListener('click', () => openPlatform('trustindex'));
        facebookButton.addEventListener('click', () => openPlatform('facebook'));
        
        // Nasłuchiwanie zdarzeń dla panelu administracyjnego
        adminToggleButton.addEventListener('click', toggleAdminPanel);
        adminSaveButton.addEventListener('click', savePlatformUrls);
        adminCloseButton.addEventListener('click', closeAdminPanel);
        
        // Debugowanie - sprawdzenie, czy inicjalizacja przebiegła pomyślnie
        console.log('Inicjalizacja aplikacji zakończona');
    }
    
    // Losowanie opinii
    function drawRandomOpinion() {
        // Sprawdzenie, czy są dostępne opinie
        const availableOpinions = opinions.filter((_, index) => !usedOpinions.includes(index));
        
        if (availableOpinions.length === 0) {
            opinionDisplay.innerHTML = '<p class="placeholder">Wszystkie opinie zostały już wykorzystane!</p>';
            drawButton.disabled = true;
            selectButton.disabled = true;
            return;
        }
        
        // Losowanie indeksu opinii, która nie była jeszcze użyta
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * opinions.length);
        } while (usedOpinions.includes(randomIndex));
        
        // Zapisanie wylosowanego indeksu
        currentOpinionIndex = randomIndex;
        
        // Wyświetlenie wylosowanej opinii
        displayOpinion(opinions[randomIndex]);
        
        // Aktywacja przycisku wyboru
        selectButton.disabled = false;
        
        // Ukrycie przycisków platform
        platformButtonsContainer.style.display = 'none';
        
        // Animacja wyświetlania opinii
        animateOpinionDisplay();
        
        // Debugowanie
        console.log('Wylosowano opinię:', opinions[randomIndex]);
    }
    
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
    
    // Pokazanie modalu potwierdzenia
    function showConfirmationModal() {
        if (currentOpinionIndex === -1) return;
        
        selectedOpinionText.textContent = opinions[currentOpinionIndex];
        confirmationModal.classList.add('show');
        
        // Debugowanie
        console.log('Pokazano modal potwierdzenia');
    }
    
    // Ukrycie modalu potwierdzenia
    function hideConfirmationModal() {
        confirmationModal.classList.remove('show');
    }
    
    // Potwierdzenie wyboru opinii
    function confirmOpinionSelection() {
        if (currentOpinionIndex === -1) return;
        
        // Zapisanie wybranej opinii
        selectedOpinion = opinions[currentOpinionIndex];
        
        // Dodanie opinii do wykorzystanych
        usedOpinions.push(currentOpinionIndex);
        
        // Aktualizacja liczników
        updateCounters();
        
        // Aktualizacja listy opinii
        updateOpinionsList();
        
        // Ukrycie modalu
        hideConfirmationModal();
        
        // Dezaktywacja przycisku wyboru
        selectButton.disabled = true;
        
        // Wyświetlenie komunikatu o wybranej opinii
        opinionDisplay.innerHTML = '<p>Opinia została wybrana. Możesz teraz wystawić ją na jednej z platform:</p>';
        
        // Pokazanie przycisków platform
        platformButtonsContainer.style.display = 'block';
        
        // Debugowanie
        console.log('Potwierdzono wybór opinii');
        console.log('platformButtonsContainer.style.display =', platformButtonsContainer.style.display);
        
        // Sprawdzenie, czy są jeszcze dostępne opinie
        if (usedOpinions.length === opinions.length) {
            drawButton.disabled = true;
            showNotification('Wszystkie opinie zostały już wykorzystane!');
        }
    }
    
    // Aktualizacja liczników
    function updateCounters() {
        const availableCount = opinions.length - usedOpinions.length;
        opinionsCountSpan.textContent = availableCount;
        usedOpinionsCountSpan.textContent = usedOpinions.length;
    }
    
    // Generowanie listy opinii
    function renderOpinionsList() {
        opinionsList.innerHTML = '';
        
        opinions.forEach((opinion, index) => {
            const li = document.createElement('li');
            li.textContent = opinion;
            li.dataset.index = index;
            
            if (usedOpinions.includes(index)) {
                li.classList.add('used');
            }
            
            opinionsList.appendChild(li);
        });
    }
    
    // Aktualizacja listy opinii
    function updateOpinionsList() {
        const items = opinionsList.querySelectorAll('li');
        
        items.forEach(item => {
            const index = parseInt(item.dataset.index);
            if (usedOpinions.includes(index)) {
                item.classList.add('used');
            }
        });
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
    
    // Dodanie stylów dla powiadomień
    function addNotificationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: var(--accent-color);
                color: var(--secondary-color);
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
    
    // Funkcje dla panelu administracyjnego
    
    // Przełączanie widoczności panelu administracyjnego
    function toggleAdminPanel() {
        adminPanel.classList.add('show');
        console.log('Otwarto panel administratora');
    }
    
    // Zamykanie panelu administracyjnego
    function closeAdminPanel() {
        adminPanel.classList.remove('show');
    }
    
    // Zapisywanie adresów URL platform
    function savePlatformUrls() {
        const platformUrls = {
            google: googleUrlInput.value.trim(),
            trustindex: trustindexUrlInput.value.trim(),
            facebook: facebookUrlInput.value.trim()
        };
        
        localStorage.setItem('platformUrls', JSON.stringify(platformUrls));
        
        showNotification('Adresy URL zostały zapisane!');
        closeAdminPanel();
        
        // Debugowanie
        console.log('Zapisano adresy URL platform:', platformUrls);
    }
    
    // Wczytywanie adresów URL platform
    function loadPlatformUrls() {
        const savedUrls = localStorage.getItem('platformUrls');
        
        if (savedUrls) {
            const platformUrls = JSON.parse(savedUrls);
            
            googleUrlInput.value = platformUrls.google || '';
            trustindexUrlInput.value = platformUrls.trustindex || '';
            facebookUrlInput.value = platformUrls.facebook || '';
            
            // Debugowanie
            console.log('Wczytano adresy URL platform:', platformUrls);
        }
    }
    
    // Otwieranie platformy z wybraną opinią
    function openPlatform(platform) {
        if (!selectedOpinion) {
            showNotification('Najpierw wybierz opinię!');
            return;
        }
        
        const savedUrls = localStorage.getItem('platformUrls');
        
        if (!savedUrls) {
            showNotification('Najpierw ustaw adresy URL platform w panelu administratora!');
            return;
        }
        
        const platformUrls = JSON.parse(savedUrls);
        let url = '';
        
        switch (platform) {
            case 'google':
                url = platformUrls.google;
                break;
            case 'trustindex':
                url = platformUrls.trustindex;
                break;
            case 'facebook':
                url = platformUrls.facebook;
                break;
        }
        
        if (!url) {
            showNotification(`Adres URL dla platformy ${platform} nie został ustawiony!`);
            return;
        }
        
        // Otwieranie platformy w nowym oknie
        const newWindow = window.open(url, '_blank');
        
        // Kopiowanie opinii do schowka
        copyToClipboard(selectedOpinion);
        
        showNotification('Opinia została skopiowana do schowka. Możesz ją wkleić na platformie.');
        
        // Debugowanie
        console.log(`Otwarto platformę ${platform} z opinią:`, selectedOpinion);
    }
    
    // Kopiowanie tekstu do schowka
    function copyToClipboard(text) {
        // Tworzenie tymczasowego elementu textarea
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        // Zaznaczenie i kopiowanie tekstu
        textarea.select();
        document.execCommand('copy');
        
        // Usunięcie tymczasowego elementu
        document.body.removeChild(textarea);
    }
    
    // Inicjalizacja aplikacji
    addNotificationStyles();
    init();
});