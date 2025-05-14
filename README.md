# Losowanie Opinii X

Aplikacja webowa do losowania opinii z predefiniowanej listy oraz wystawiania ich na różnych platformach.

## Spis treści

- [Opis](#opis)
- [Funkcjonalności](#funkcjonalności)
- [Instalacja](#instalacja)
- [Użytkowanie](#użytkowanie)
- [Struktura projektu](#struktura-projektu)
- [Technologie](#technologie)

## Opis

Aplikacja "Losowanie Opinii X" umożliwia losowanie opinii z predefiniowanej listy, wybór opinii oraz wystawianie ich na różnych platformach (Google, Trustindex, Facebook). Aplikacja posiada intuicyjny interfejs użytkownika, panel administracyjny do konfiguracji adresów URL platform oraz funkcję kopiowania opinii do schowka.

## Funkcjonalności

### 1. Losowanie opinii
- Losowanie opinii z predefiniowanej listy
- Wyświetlanie wylosowanej opinii
- Możliwość ponownego losowania

### 2. Wybór opinii
- Wybór wylosowanej opinii
- Potwierdzenie wyboru opinii
- Oznaczanie wybranych opinii jako wykorzystane

### 3. Wystawianie opinii na platformach
- Wystawianie opinii na platformie Google
- Wystawianie opinii na platformie Trustindex
- Wystawianie opinii na platformie Facebook
- Automatyczne kopiowanie opinii do schowka
- Otwieranie odpowiedniej platformy w nowej karcie przeglądarki

### 4. Panel administracyjny
- Konfiguracja adresów URL platform
- Zapisywanie ustawień w localStorage
- Łatwy dostęp do panelu z poziomu głównego interfejsu

### 5. Dodatkowe funkcje
- Śledzenie liczby dostępnych i wykorzystanych opinii
- Lista wszystkich opinii z oznaczeniem wykorzystanych
- Powiadomienia o wykonanych akcjach
- Responsywny design działający na różnych urządzeniach

## Instalacja

Aplikacja nie wymaga instalacji, wystarczy otworzyć plik `index.html` w przeglądarce internetowej.

1. Pobierz lub sklonuj repozytorium
2. Otwórz plik `index.html` w przeglądarce internetowej

## Użytkowanie

### Konfiguracja adresów URL platform

Przed rozpoczęciem korzystania z aplikacji, należy skonfigurować adresy URL platform:

1. Kliknij przycisk "Panel Administratora" w prawym dolnym rogu
2. Wprowadź adresy URL dla platform:
   - Google URL (np. https://www.google.com/maps/place/...)
   - Trustindex URL (np. https://www.trustindex.io/...)
   - Facebook URL (np. https://www.facebook.com/...)
3. Kliknij przycisk "Zapisz"

### Losowanie i wybór opinii

1. Kliknij przycisk "Losuj opinię", aby wylosować opinię
2. Jeśli chcesz wybrać wylosowaną opinię, kliknij przycisk "Wybierz opinię"
3. Potwierdź wybór opinii, klikając przycisk "Tak, wybierz"

### Wystawianie opinii na platformach

Po wybraniu opinii, pojawią się przyciski do wystawiania opinii na platformach:

1. Kliknij przycisk platformy, na której chcesz wystawić opinię (Google, Trustindex, Facebook)
2. Opinia zostanie automatycznie skopiowana do schowka
3. Otworzy się nowa karta przeglądarki z wybraną platformą
4. Wklej skopiowaną opinię na platformie

## Struktura projektu

- `index.html` - struktura interfejsu użytkownika
- `style.css` - style CSS aplikacji
- `script.js` - logika JavaScript aplikacji

## Technologie

- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage API
- Clipboard API

---

© 2025 | Studio A7