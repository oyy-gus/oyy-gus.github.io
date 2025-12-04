const API_URL = 'https://your-backend.koyeb.app';
let socket;
let userData = {};

// Initialize dashboard
async function init() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        window.location.href = '/';
        return;
    }
    
    // Set user info
    document.getElementById('username').textContent = user.username;
    document.getElementById('userAvatar').src = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
    
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

async function loadUserData() {
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/api/config`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        userData = await response.json();
        renderAccounts();
        updateStats();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderAccounts() {
    const grid = document.getElementById('accountsGrid');
    grid.innerHTML = '';
    
    if (!userData.accounts || userData.accounts.length === 0) {
        grid.innerHTML = '<p>No accounts added yet. Click "Add Account" to get started.</p>';
        return;
    }
    
    userData.accounts.forEach(account => {
        const card = createAccountCard(account);
        grid.appendChild(card);
    });
}

function createAccountCard(account) {
    const div = document.createElement('div');
    div.className = 'account-card';
    
    let statusClass = 'inactive';
    let statusText = 'Offline';
    
    if (account.enabled && account.statusHunting === 'aktif') {
        statusClass = 'active';
        statusText = 'Active';
    } else if (account.enabled) {
        statusClass = 'paused';
        statusText = 'Paused';
    }
    
    div.innerHTML = `
        <div class="account-header">
            <h3>${account.name}</h3>
            <span class="account-status ${statusClass}"></span>
        </div>
        <div class="account-info">
            <p>Channel: ${account.channelId || 'Not set'}</p>
            <p>Prefix: ${account.prefix}</p>
            <p>Status: ${statusText}</p>
            <p>Hunts: ${account.huntCount || 0}</p>
        </div>
        <div class="account-actions">
            <button onclick="toggleAccount('${account._id}')" class="btn btn-primary">
                ${account.enabled ? 'Disable' : 'Enable'}
            </button>
            <button onclick="editAccount('${account._id}')" class="btn btn-secondary">Edit</button>
            <button onclick="deleteAccount('${account._id}')" class="btn btn-danger">Delete</button>
        </div>
    `;
    
    return div;
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Show page
            const pageName = item.dataset.page;
            pages.forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(`${pageName}-page`).classList.add('active');
        });
    });
}

function setupForms() {
    // Add account form
    document.getElementById('addAccountForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const data = {
            name: document.getElementById('accountName').value,
            token: document.getElementById('accountToken').value,
            channelId: document.getElementById('channelId').value,
            prefix: document.getElementById('prefix').value
        };
        
        try {
            const response = await fetch(`${API_URL}/api/config/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                closeModal();
                loadUserData();
                showNotification('Account added successfully!', 'success');
            }
        } catch (error) {
            showNotification('Error adding account', 'error');
        }
    });
    
    // Global settings form
    document.getElementById('globalSettingsForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const data = {
            minDelayBetweenAccounts: parseInt(document.getElementById('minDelay').value),
            maxDelayBetweenAccounts: parseInt(document.getElementById('maxDelay').value),
            action: document.getElementById('defaultAction').value
        };
        
        try {
            const response = await fetch(`${API_URL}/api/config/global`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                showNotification('Settings saved successfully!', 'success');
            }
        } catch (error) {
            showNotification('Error saving settings', 'error');
        }
    });
}

function showAddAccountModal() {
    document.getElementById('addAccountModal').classList.add('show');
}

function closeModal() {
    document.getElementById('addAccountModal').classList.remove('show');
    document.getElementById('addAccountForm').reset();
}

async function toggleAccount(accountId) {
    const token = localStorage.getItem('token');
    const account = userData.accounts.find(a => a._id === accountId);
    
    try {
        const response = await fetch(`${API_URL}/api/config/account/${accountId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                enabled: !account.enabled
            })
        });
        
        if (response.ok) {
            loadUserData();
        }
    } catch (error) {
        console.error('Error toggling account:', error);
    }
}

async function deleteAccount(accountId) {
    if (!confirm('Are you sure you want to delete this account?')) return;
    
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`${API_URL}/api/config/account/${accountId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            loadUserData();
            showNotification('Account deleted successfully!', 'success');
        }
    } catch (error) {
        showNotification('Error deleting account', 'error');
    }
}

function updateBotStatus(data) {
    const statusEl = document.getElementById('botStatus');
    if (data.online) {
        statusEl.classList.remove('offline');
        statusEl.classList.add('online');
    } else {
        statusEl.classList.remove('online');
        statusEl.classList.add('offline');
    }
}

function updateStats() {
    if (!userData.accounts) return;
    
    const totalHunts = userData.accounts.reduce((sum, acc) => sum + (acc.totalHunts || 0), 0);
    const activeAccounts = userData.accounts.filter(acc => acc.enabled && acc.statusHunting === 'aktif').length;
    const totalCaptchas = userData.accounts.reduce((sum, acc) => sum + (acc.captchaCount || 0), 0);
    
    document.getElementById('totalHunts').textContent = totalHunts;
    document.getElementById('activeAccounts').textContent = activeAccounts;
    document.getElementById('totalCaptchas').textContent = totalCaptchas;
}

function downloadConfig() {
    const config = generateConfigFile();
    const blob = new Blob([config], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
}

function generateConfigFile() {
    const configObj = {
        owoId: "408785106942164992",
        accounts: userData.accounts.map(acc => ({
            name: acc.name,
            token: acc.token,
            channelId: acc.channelId,
            channelIds: acc.channelIds || [],
            currentChannelIndex: 0,
            lastChannelRotation: null,
            prefix: acc.prefix,
            statusHunting: acc.statusHunting,
            enabled: acc.enabled
        })),
        globalSettings: userData.globalSettings
    };
    
    return `module.exports = ${JSON.stringify(configObj, null, 4)};`;
}

function showNotification(message, type) {
    // Implement notification system
    console.log(`[${type}] ${message}`);
}

function logout() {
    localStorage.clear();
    window.location.href = '/';
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);