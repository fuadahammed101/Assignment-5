// Data for cards
const services = [
  {
    id: 1,
    icon: 'assets/emergency.png',
    name: 'National Emergency Number',
    englishName: 'National Emergency',
    number: '999',
    category: 'All',
  },
  {
    id: 2,
    icon: 'assets/police.png',
    name: 'Police Helpline Number',
    englishName: 'Police',
    number: '999',
    category: 'Police',
  },
  {
    id: 3,
    icon: 'assets/fire-service.png',
    name: 'Fire Service Number',
    englishName: 'Fire Service',
    number: '999',
    category: 'Fire',
  },
  {
    id: 4,
    icon: 'assets/ambulance.png',
    name: 'Ambulance Service',
    englishName: 'Ambulance',
    number: '1994-999999',
    category: 'Health',
  },
  {
    id: 5,
    icon: 'assets/brac.png',
    name: 'Women & Child Helpline',
    englishName: 'Women & Child Helpline',
    number: '109',
    category: 'Help',
  },
  {
    id: 6,
    icon: 'assets/brac.png',
    name: 'Anti-Corruption Helpline',
    englishName: 'Anti-Corruption',
    number: '106',
    category: 'Govt.',
  },
  {
    id: 7,
    icon: 'assets/ambulance.png',
    name: 'Electricity Helpline',
    englishName: 'Electricity Outage',
    number: '16216',
    category: 'Electricity',
  },
  {
    id: 8,
    icon: 'assets/brac.png',
    name: 'Brac Helpline',
    englishName: 'Brac',
    number: '16445',
    category: 'NGO',
  },
  {
    id: 9,
    icon: 'assets/Bangladesh-Railway.png',
    name: 'Bangladesh Railway Helpline',
    englishName: 'Bangladesh Railway',
    number: '163',
    category: 'Travel',
  },
];

// State variables
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
const callHistory = [];

// DOM elements
const cardsSection = document.querySelector('.cards-section');
const heartCountValue = document.getElementById('heartCountValue');
const coinCountValue = document.getElementById('coinCountValue');
const copyCountValue = document.getElementById('copyCount');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Helper: format time as HH:MM:SS AM/PM
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
}

// Render cards
function renderCards() {
  cardsSection.innerHTML = '';
  services.forEach(service => {
    const card = document.createElement('article');
    card.className = 'card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${service.name} card`);

    const badgeClass = `card-badge${service.category === 'Fire' ? ' badge-fire' : ''}`;
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon" aria-hidden="true">
          <img src="${service.icon}" alt="" />
        </div>
        <div class="card-title-group">
          <h2 class="card-title">${service.name}</h2>
          <p class="card-subtitle">${service.englishName}</p>
        </div>
        <img src="assets/heart.png" alt="Heart icon" class="card-heart" role="button" tabindex="0" aria-pressed="false" aria-label="Like ${service.name}" data-id="${service.id}" />
      </div>
      <div class="card-number" aria-label="Hotline number">${service.number}</div>
      <div class="${badgeClass}" aria-label="Category">${service.category}</div>
      <div class="card-buttons">
        <button class="btn-copy" aria-label="Copy hotline number for ${service.name}" data-number="${service.number}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
          Copy
        </button>
        <button class="btn-call" aria-label="Call hotline number for ${service.name}" data-id="${service.id}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1A17.92 17.92 0 013 6a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
          Call
        </button>
      </div>
    `;

    cardsSection.appendChild(card);
  });
}

// Update navbar counts
function updateCounts() {
  heartCountValue.textContent = heartCount;
  coinCountValue.textContent = coinCount;
  copyCountValue.textContent = `${copyCount} Copy`;
}

// Add call to history
function addCallToHistory(service) {
  const now = new Date();
  const timeStr = formatTime(now);
  callHistory.unshift({ name: service.name, number: service.number, time: timeStr });
  renderHistory();
}

// Render call history
function renderHistory() {
  historyList.innerHTML = '';
  if (callHistory.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No call history yet.';
    emptyMsg.style.color = '#666';
    emptyMsg.style.fontStyle = 'italic';
    historyList.appendChild(emptyMsg);
    return;
  }
  callHistory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.setAttribute('role', 'listitem');
    div.textContent = `${item.name} - ${item.number}`;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = item.time;
    div.appendChild(timeSpan);
    historyList.appendChild(div);
  });
}

// Event delegation for card buttons and hearts
cardsSection.addEventListener('click', e => {
  const target = e.target;

  // Heart icon click
  if (target.classList.contains('card-heart')) {
    const id = target.getAttribute('data-id');
    if (!target.classList.contains('liked')) {
      target.classList.add('liked');
      target.setAttribute('aria-pressed', 'true');
      heartCount++;
      updateCounts();
    }
    return;
  }

  // Copy button click
  if (target.closest('.btn-copy')) {
    const btn = target.closest('.btn-copy');
    const number = btn.getAttribute('data-number');
    navigator.clipboard.writeText(number).then(() => {
      alert(`Copied hotline number: ${number}`);
      copyCount++;
      updateCounts();
    }).catch(() => {
      alert('Failed to copy to clipboard.');
    });
    return;
  }

  // Call button click
  if (target.closest('.btn-call')) {
    const btn = target.closest('.btn-call');
    const id = btn.getAttribute('data-id');
    const service = services.find(s => s.id == id);
    if (!service) return;

    if (coinCount < 20) {
      alert('Insufficient coins to make a call.');
      return;
    }

    alert(`Calling ${service.name} at ${service.number}`);
    coinCount -= 20;
    updateCounts();
    addCallToHistory(service);
    return;
  }
});

// accessibility for heart icons
cardsSection.addEventListener('keydown', e => {
  if (e.target.classList.contains('card-heart') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    e.target.click();
  }
});

// Clear history button
clearHistoryBtn.addEventListener('click', () => {
  callHistory.length = 0;
  renderHistory();
});

// Initial render
renderCards();
updateCounts();
renderHistory();
