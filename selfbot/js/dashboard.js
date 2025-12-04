const API_URL = 'https://oyy-gus.koyeb.app';
let socket;
let userData = {};

// Initialize dashboard
async function init() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = '/selfbot/';
        return;
    }
    
    // Set user info
    document.getElementById('username').textContent = user.username;
    if (user.avatar) {
        document.getElementById('userAvatar').src = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
    }
    
    // Connect to WebSocket
    connectWebSocket();
    
    // Load user data
    await loadUserData();
    
    // Setup navigation
    setupNavigation();
    
    // Setup forms
    setupForms();
}

function connectWebSocket() {
    socket = io(API_URL, {
        transports: ['websocket']
    });
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    socket.emit('join-room', user.discordId);
    
    socket.on('config-updated', (data) => {
        userData = data;
        renderAccounts();
    });
    
    socket.on('bot-status', (data) => {
        updateBotStatus(data);
    });
}

// ... rest of dashboard.js code sama, hanya update logout function:

function logout() {
    localStorage.clear();
    window.location.href = '/selfbot/';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);