// =====================================================
// KUESIONER KOPERASI - JAVASCRIPT
// =====================================================

// Google Apps Script Web App URL (GANTI DENGAN URL ANDA)
const SCRIPT_URL = 'https://script.google.com/home/projects/1TZuKeJjRt9W-WOJap50ZrTU_D7r1S4j5mBBPN1ry5UwSTM7WxYjXPIar/edit';

// Storage Keys
const STORAGE_KEY = 'kuesioner_koperasi_data';
const THEME_KEY = 'kuesioner_theme';

// =====================================================
// THEME TOGGLE
// =====================================================

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
}

// =====================================================
// DATA MANAGEMENT
// =====================================================

function saveToStorage(pageData) {
    let allData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allData = { ...allData, ...pageData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    return allData;
}

function getFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}

function loadSavedData() {
    const data = getFromStorage();
    
    // Restore text inputs
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        if (data[input.name]) {
            input.value = data[input.name];
        }
    });
    
    // Restore radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        if (data[input.name] === input.value) {
            input.checked = true;
        }
    });
    
    // Restore checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(input => {
        const checkboxData = data[input.name];
        if (Array.isArray(checkboxData) && checkboxData.includes(input.value)) {
            input.checked = true;
        }
    });
    
    // Trigger conditional inputs
    document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked').forEach(input => {
        handleConditionalInput(input);
    });
}

// =====================================================
// FORM HANDLING
// =====================================================

function collectPageData() {
    const data = {};
    
    // Collect text and number inputs
    document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });
    
    // Collect radio buttons
    document.querySelectorAll('input[type="radio"]:checked').forEach(input => {
        if (input.name) {
            data[input.name] = input.value;
        }
    });
    
    // Collect checkboxes
    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(input => {
        if (input.name) {
            if (!checkboxGroups[input.name]) {
                checkboxGroups[input.name] = [];
            }
            checkboxGroups[input.name].push(input.value);
        }
    });
    
    Object.keys(checkboxGroups).forEach(key => {
        data[key] = checkboxGroups[key];
    });
    
    return data;
}

function validatePage() {
    const requiredGroups = document.querySelectorAll('.question-group[data-required="true"]');
    let isValid = true;
    let firstInvalid = null;
    
    requiredGroups.forEach(group => {
        const inputs = group.querySelectorAll('input');
        const hasValue = Array.from(inputs).some(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                return input.checked;
            }
            return input.value.trim() !== '';
        });
        
        if (!hasValue) {
            group.style.borderLeftColor = '#f44336';
            isValid = false;
            if (!firstInvalid) {
                firstInvalid = group;
            }
        } else {
            group.style.borderLeftColor = '';
        }
    });
    
    if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showAlert('Mohon lengkapi semua pertanyaan yang wajib diisi.');
    }
    
    return isValid;
}

function handleConditionalInput(triggerInput) {
    const conditionalId = triggerInput.dataset.showConditional;
    if (conditionalId) {
        const conditionalInput = document.getElementById(conditionalId);
        if (conditionalInput) {
            if (triggerInput.checked) {
                conditionalInput.classList.add('show');
            } else {
                conditionalInput.classList.remove('show');
            }
        }
    }
}

// =====================================================
// NAVIGATION
// =====================================================

function nextPage(currentPage, nextPageUrl) {
    if (!validatePage()) {
        return;
    }
    
    const pageData = collectPageData();
    saveToStorage(pageData);
    
    window.location.href = nextPageUrl;
}

function prevPage(prevPageUrl) {
    const pageData = collectPageData();
    saveToStorage(pageData);
    
    window.location.href = prevPageUrl;
}

// =====================================================
// FORM SUBMISSION
// =====================================================

async function submitForm() {
    if (!validatePage()) {
        return;
    }
    
    const pageData = collectPageData();
    const allData = saveToStorage(pageData);
    
    showLoading(true);
    
    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(allData)
        });
        
        // Since no-cors, we can't read the response
        // Assume success and redirect
        clearStorage();
        window.location.href = 'success.html';
        
    } catch (error) {
        console.error('Error:', error);
        showAlert('Terjadi kesalahan. Silakan coba lagi.');
        showLoading(false);
    }
}

// =====================================================
// UI HELPERS
// =====================================================

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        if (show) {
            overlay.classList.add('show');
        } else {
            overlay.classList.remove('show');
        }
    }
}

function showAlert(message) {
    alert(message);
}

function updateProgress(current, total) {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        const percentage = (current / total) * 100;
        progressFill.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Halaman ${current} dari ${total}`;
    }
}

// =====================================================
// INITIALIZATION
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Load saved data
    loadSavedData();
    
    // Theme toggle event
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Conditional input handlers
    document.querySelectorAll('[data-show-conditional]').forEach(input => {
        input.addEventListener('change', function() {
            handleConditionalInput(this);
        });
    });
    
    // Auto-save on input change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', function() {
            const pageData = collectPageData();
            saveToStorage(pageData);
        });
    });
});