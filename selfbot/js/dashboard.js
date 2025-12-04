// Configuration
const API_URL = 'https://oyy-gus.koyeb.app';
const BASE_PATH = '/selfbot';

let socket = null;
let userData = {};
let logs = [];
let chart = null;

// Initialize dashboard
async function init() {
    console.log('🚀 Initializing dashboard...');
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        console.log('❌ No token found, redirecting to login');
        window.location.href = BASE_PATH + '/';
        return;
    }
    
    // Set user info
    if (user.username) {
        document.getElementById('username').textContent = user.username;
    }
    
    if (user.avatar && user.discordId) {
        document.getElementById('userAvatar').src = 
            `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;
    }
    
    // Setup event listeners
    setupNavigation();
    setupForms();
    
    // Load initial data
    await loadUserData();
    
    // Connect to WebSocket after data loaded
    connectWebSocket();
}

// Connect to WebSocket for real-time updates
function connectWebSocket() {
    console.log('📡 Connecting to WebSocket...');
    
    try {
        socket = io(API_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });
        
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        socket.on('connect', () => {
            console.log('✅ WebSocket connected');
            socket.emit('join-room', user.discordId);
            updateBotStatus({ online: true });
        });
        
        socket.on('disconnect', () => {
            console.log('❌ WebSocket disconnected');
            updateBotStatus({ online: false });
        });
        
        socket.on('config-updated', (data) => {
            console.log('📥 Config updated:', data);
            userData = data;
            renderAccounts();
            updateStats();
        });
        
        socket.on('bot-status', (data) => {
            console.log('🤖 Bot status:', data);
            updateBotStatus(data);
        });
        
        socket.on('error', (error) => {
            console.error('❌ Socket error:', error);
        });
        
    } catch (error) {
        console.error('❌ Failed to connect WebSocket:', error);
        showToast('WebSocket connection failed', 'error');
    }
}

// Load user data from API
async function loadUserData() {
    const token = localStorage.getItem('token');
    
    console.log('📥 Loading user data...');
    
    try {
        const response = await fetch(`${API_URL}/api/config`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                showToast('Session expired, please login again', 'error');
                logout();
                return;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        userData = await response.json();
        console.log('✅ User data loaded:', userData);
        
        // Render data
        renderAccounts();
        updateStats();
        updateSettings();
        
    } catch (error) {
        console.error('❌ Error loading data:', error);
        showToast('Failed to load data: ' + error.message, 'error');
    }
}

// Render accounts grid
function renderAccounts() {
    const grid = document.getElementById('accountsGrid');
    
    if (!userData.accounts || userData.accounts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>😴 No accounts added yet</p>
                <button class="btn btn-primary" onclick="showAddAccountModal()">Add Your First Account</button>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = userData.accounts.map(account => `
        <div class="account-card" data-id="${account._id}">
            <div class="account-header">
                <h3>${account.name}</h3>
                <span class="account-status ${getStatusClass(account)}" title="${getStatusText(account)}"></span>
            </div>
            <div class="account-info">
                <p><strong>Channel:</strong> ${account.channelId || 'Not set'}</p>
                <p><strong>Prefix:</strong> ${account.prefix}</p>
                <p><strong>Status:</strong> ${getStatusText(account)}</p>
                <p><strong>Hunts:</strong> ${account.huntCount || 0} / ${account.totalHunts || 0}</p>
                ${account.lastHuntTime ? `<p><small>Last: ${new Date(account.lastHuntTime).toLocaleString()}</small></p>` : ''}
            </div>
            <div class="account-actions">
                <button onclick="toggleAccount('${account._id}')" class="btn ${account.enabled ? 'btn-danger' : 'btn-success'}">
                    ${account.enabled ? '⏸️ Disable' : '▶️ Enable'}
                </button>
                <button onclick="editAccount('${account._id}')" class="btn btn-secondary">✏️ Edit</button>
                <button onclick="deleteAccount('${account._id}')" class="btn btn-danger">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// Get status class for account
function getStatusClass(account) {
    if (!account.enabled) return 'inactive';
    if (account.statusHunting === 'aktif') return 'active';
    if (account.captchaDetected) return 'paused';
    return 'inactive';
}

// Get status text for account
function getStatusText(account) {
    if (!account.enabled) return '🔴 Disabled';
    if (account.captchaDetected) return '⏸️ Captcha';
    if (account.statusHunting === 'aktif') return '🟢 Active';
    return '🟡 Ready';
}

// Setup navigation
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
            
            const targetPage = document.getElementById(`${pageName}-page`);
            if (targetPage) {
                targetPage.classList.add('active');
                
                // Load page specific data
                if (pageName === 'logs') {
                    refreshLogs();
                } else if (pageName === 'stats') {
                    updateChart();
                }
            }
        });
    });
}

// Setup forms
function setupForms() {
    // Add account form
    const addForm = document.getElementById('addAccountForm');
    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const token = localStorage.getItem('token');
            const data = {
                name: document.getElementById('accountName').value,
                token: document.getElementById('accountToken').value,
                channelId: document.getElementById('channelId').value,
                prefix: document.getElementById('prefix').value || 'owo'
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
                    showToast('Account added successfully!', 'success');
                    closeModal();
                    await loadUserData();
                } else {
                    const error = await response.json();
                    throw new Error(error.error || 'Failed to add account');
                }
            } catch (error) {
                showToast('Error: ' + error.message, 'error');
            }
        });
    }
    
    // Edit account form
    const editForm = document.getElementById('editAccountForm');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const accountId = document.getElementById('editAccountId').value;
            const token = localStorage.getItem('token');
            
            const data = {
                name: document.getElementById('editAccountName').value,
                channelId: document.getElementById('editChannelId').value,
                prefix: document.getElementById('editPrefix').value,
                statusHunting: document.getElementById('editStatus').value
            };
            
            try {
                const response = await fetch(`${API_URL}/api/config/account/${accountId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    showToast('Account updated successfully!', 'success');
                    closeEditModal();
                    await loadUserData();
                } else {
                    throw new Error('Failed to update account');
                }
            } catch (error) {
                showToast('Error: ' + error.message, 'error');
            }
        });
    }
    
    // Global settings form
    const settingsForm = document.getElementById('globalSettingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', async (e) => {
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
                    showToast('Settings saved successfully!', 'success');
                } else {
                    throw new Error('Failed to save settings');
                }
            } catch (error) {
                showToast('Error: ' + error.message, 'error');
            }
        });
    }
}

// Toggle account enable/disable
async function toggleAccount(accountId) {
    const token = localStorage.getItem('token');
    const account = userData.accounts.find(a => a._id === accountId);
    
    if (!account) return;
    
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
            showToast(`Account ${account.enabled ? 'disabled' : 'enabled'}`, 'success');
            await loadUserData();
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Edit account
function editAccount(accountId) {
    const account = userData.accounts.find(a => a._id === accountId);
    if (!account) return;
    
    document.getElementById('editAccountId').value = account._id;
    document.getElementById('editAccountName').value = account.name;
    document.getElementById('editChannelId').value = account.channelId || '';
    document.getElementById('editPrefix').value = account.prefix;
    document.getElementById('editStatus').value = account.statusHunting;
    
    document.getElementById('editAccountModal').classList.add('show');
}

// Delete account
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
            showToast('Account deleted successfully!', 'success');
            await loadUserData();
        }
    } catch (error) {
        showToast('Error: ' + error.message, 'error');
    }
}

// Update stats
function updateStats() {
    if (!userData.accounts) return;
    
    const totalHunts = userData.accounts.reduce((sum, acc) => sum + (acc.totalHunts || 0), 0);
    const activeAccounts = userData.accounts.filter(acc => acc.enabled && acc.statusHunting === 'aktif').length;
    const totalCaptchas = userData.accounts.reduce((sum, acc) => sum + (acc.captchaCount || 0), 0);
    const successRate = totalHunts > 0 ? Math.round(((totalHunts - totalCaptchas) / totalHunts) * 100) : 100;
    
    document.getElementById('totalHunts').textContent = totalHunts.toLocaleString();
    document.getElementById('activeAccounts').textContent = activeAccounts;
    document.getElementById('totalCaptchas').textContent = totalCaptchas;
    document.getElementById('successRate').textContent = successRate + '%';
}

// Update settings display
function updateSettings() {
    if (userData.globalSettings) {
        document.getElementById('minDelay').value = userData.globalSettings.minDelayBetweenAccounts || 3000;
        document.getElementById('maxDelay').value = userData.globalSettings.maxDelayBetweenAccounts || 5000;
        document.getElementById('defaultAction').value = userData.globalSettings.action || 'pray';
    }
    
    // Update config display
    const configObj = generateConfigObject();
    document.getElementById('configDisplay').textContent = JSON.stringify(configObj, null, 2);
}

// Update bot status indicator
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

// Update chart
function updateChart() {
    const ctx = document.getElementById('huntChart');
    if (!ctx) return;
    
    if (chart) {
        chart.destroy();
    }
    
    const labels = userData.accounts ? userData.accounts.map(a => a.name) : [];
    const data = userData.accounts ? userData.accounts.map(a => a.totalHunts || 0) : [];
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Hunts',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Refresh functions
function refreshAccounts() {
    loadUserData();
}

async function refreshLogs() {
    // This would fetch logs from backend
    const logsEl = document.getElementById('logsContent');
    logsEl.innerHTML = '<div class="log-entry">[' + new Date().toLocaleTimeString() + '] Logs refreshed</div>';
}

function clearLogs() {
    document.getElementById('logsContent').innerHTML = '<div class="log-entry">Logs cleared</div>';
    logs = [];
}

// Modal functions
function showAddAccountModal() {
    document.getElementById('addAccountModal').classList.add('show');
    document.getElementById('addAccountForm').reset();
}

function closeModal() {
    document.getElementById('addAccountModal').classList.remove('show');
}

function closeEditModal() {
    document.getElementById('editAccountModal').classList.remove('show');
}

// Click outside modal to close
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// Generate config object for download
function generateConfigObject() {
    if (!userData.accounts) return {};
    
    return {
        owoId: "408785106942164992",
        accounts: userData.accounts.map(acc => ({
            name: acc.name,
            token: acc.token || 'HIDDEN',
            channelId: acc.channelId,
            channelIds: acc.channelIds || [],
            currentChannelIndex: 0,
            lastChannelRotation: null,
            prefix: acc.prefix,
            statusHunting: acc.statusHunting,
            enabled: acc.enabled
        })),
        globalSettings: userData.globalSettings || {
            minDelayBetweenAccounts: 3000,
            maxDelayBetweenAccounts: 5000,
            action: 'pray'
        }
    };
}

// Download config file
function downloadConfig() {
    const config = generateConfigObject();
    const configStr = `module.exports = ${JSON.stringify(config, null, 4)};`;
    
    const blob = new Blob([configStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
    URL.revokeObjectURL(url);
    
    showToast('Config file downloaded!', 'success');
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Start/Stop all accounts (placeholder - would send command to bot)
async function startAllAccounts() {
    showToast('Starting all accounts...', 'info');
    // Would send command to bot via backend
}

async function stopAllAccounts() {
    showToast('Stopping all accounts...', 'info');
    // Would send command to bot via backend
}

// Logout
function logout() {
    localStorage.clear();
    window.location.href = BASE_PATH + '/';
}

// Error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}