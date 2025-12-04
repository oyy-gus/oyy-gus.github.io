perbarui frontendnya ini, <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OwO Bot - Login</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            overflow: hidden;
            position: relative;
        }

        /* Animated Background */
        .bg-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        .bg-animation span {
            position: absolute;
            display: block;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.05);
            animation: move 25s linear infinite;
            bottom: -150px;
            border-radius: 50%;
        }

        .bg-animation span:nth-child(1) { left: 10%; width: 80px; height: 80px; animation-delay: 0s; }
        .bg-animation span:nth-child(2) { left: 20%; width: 20px; height: 20px; animation-delay: 2s; animation-duration: 12s; }
        .bg-animation span:nth-child(3) { left: 25%; width: 40px; height: 40px; animation-delay: 4s; }
        .bg-animation span:nth-child(4) { left: 40%; width: 60px; height: 60px; animation-delay: 0s; animation-duration: 18s; }
        .bg-animation span:nth-child(5) { left: 70%; width: 30px; height: 30px; animation-delay: 0s; }
        .bg-animation span:nth-child(6) { left: 80%; width: 110px; height: 110px; animation-delay: 3s; }
        .bg-animation span:nth-child(7) { left: 35%; width: 150px; height: 150px; animation-delay: 7s; }
        .bg-animation span:nth-child(8) { left: 55%; width: 25px; height: 25px; animation-delay: 15s; animation-duration: 45s; }
        .bg-animation span:nth-child(9) { left: 65%; width: 15px; height: 15px; animation-delay: 2s; animation-duration: 35s; }
        .bg-animation span:nth-child(10) { left: 90%; width: 90px; height: 90px; animation-delay: 0s; animation-duration: 11s; }

        @keyframes move {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-1500px) rotate(720deg); opacity: 0; }
        }

        /* Login Container */
        .login-container {
            position: relative;
            z-index: 1;
            width: 100%;
            max-width: 440px;
        }

        .login-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 50px 40px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            animation: cardAppear 0.8s ease-out;
        }

        @keyframes cardAppear {
            0% { opacity: 0; transform: translateY(30px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Logo */
        .logo {
            text-align: center;
            margin-bottom: 35px;
        }

        .logo-icon {
            width: 90px;
            height: 90px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 45px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .logo h1 {
            color: #fff;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .logo p {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            font-weight: 400;
        }

        /* Features */
        .features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin: 30px 0;
        }

        .feature {
            background: rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 18px 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .feature:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .feature-icon {
            font-size: 28px;
            margin-bottom: 8px;
            display: block;
        }

        .feature span:last-child {
            color: rgba(255, 255, 255, 0.85);
            font-size: 12px;
            font-weight: 500;
        }

        /* Discord Button */
        .discord-btn {
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);
            color: #fff;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(88, 101, 242, 0.4);
            margin-top: 25px;
        }

        .discord-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(88, 101, 242, 0.5);
        }

        .discord-btn:active {
            transform: translateY(-1px);
        }

        .discord-btn svg {
            width: 24px;
            height: 24px;
        }

        /* Disclaimer */
        .disclaimer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }

        .disclaimer p {
            color: rgba(255, 255, 255, 0.5);
            font-size: 11px;
            line-height: 1.6;
        }

        /* Stats */
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
            text-align: center;
        }

        .stat-value {
            color: #fff;
            font-size: 24px;
            font-weight: 700;
            display: block;
        }

        .stat-label {
            color: rgba(255, 255, 255, 0.6);
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 480px) {
            .login-card {
                padding: 40px 25px;
                border-radius: 20px;
            }

            .logo-icon {
                width: 75px;
                height: 75px;
                font-size: 38px;
            }

            .logo h1 {
                font-size: 24px;
            }

            .features {
                gap: 10px;
            }

            .feature {
                padding: 14px 10px;
            }

            .feature-icon {
                font-size: 24px;
            }

            .feature span:last-child {
                font-size: 11px;
            }

            .discord-btn {
                padding: 14px 20px;
                font-size: 15px;
            }

            .stats {
                gap: 20px;
            }

            .stat-value {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Animated Background -->
    <div class="bg-animation">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
    </div>

    <div class="login-container">
        <div class="login-card">
            <div class="logo">
                <div class="logo-icon">🦉</div>
                <h1>OwO Bot Hunting</h1>
                <p>Automate your OwO experience</p>
            </div>

            <div class="features">
                <div class="feature">
                    <span class="feature-icon">⚡</span>
                    <span>Multi Account</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">🔄</span>
                    <span>Auto Rotation</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">🛡️</span>
                    <span>Anti Captcha</span>
                </div>
                <div class="feature">
                    <span class="feature-icon">📊</span>
                    <span>Real-time Stats</span>
                </div>
            </div>

            <button class="discord-btn" onclick="loginWithDiscord()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Login with Discord
            </button>

            <div class="stats">
                <div class="stat-item">
                    <span class="stat-value">24/7</span>
                    <span class="stat-label">Uptime</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">∞</span>
                    <span class="stat-label">Accounts</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">100%</span>
                    <span class="stat-label">Free</span>
                </div>
            </div>

            <div class="disclaimer">
                <p>⚠️ Use at your own risk. Educational purposes only.<br>We are not affiliated with Discord or OwO Bot.</p>
            </div>
        </div>
    </div>

    <script>
        const CLIENT_ID = '1446041744545415239';
        const REDIRECT_URI = 'https://oyy-gus.github.io/selfbot/callback.html';
        const BACKEND_URL = 'https://oyy-gus.koyeb.app';

        function loginWithDiscord() {
            const scope = 'identify email';
            const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
            window.location.href = url;
        }

        // Check existing session
        (async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) window.location.href = '/selfbot/dashboard.html';
                    else localStorage.clear();
                } catch { localStorage.clear(); }
            }
        })();
    </script>
</body>
</html><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>OwO Bot Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #667eea;
            --primary-dark: #5a67d8;
            --secondary: #764ba2;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --dark: #1a1a2e;
            --darker: #0f0f1a;
            --light: #f8fafc;
            --gray: #94a3b8;
            --card-bg: rgba(255, 255, 255, 0.05);
            --border: rgba(255, 255, 255, 0.1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--darker) 0%, var(--dark) 100%);
            min-height: 100vh;
            color: #fff;
            overflow-x: hidden;
        }

        /* ========== SIDEBAR ========== */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: rgba(15, 15, 26, 0.95);
            backdrop-filter: blur(20px);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .sidebar-header {
            padding: 25px;
            border-bottom: 1px solid var(--border);
        }

        .sidebar-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .logo-text h2 {
            font-size: 18px;
            font-weight: 700;
        }

        .logo-text span {
            font-size: 11px;
            color: var(--gray);
        }

        .sidebar-nav {
            flex: 1;
            padding: 20px 15px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 14px 18px;
            margin-bottom: 8px;
            border-radius: 12px;
            color: var(--gray);
            text-decoration: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .nav-item:hover {
            background: var(--card-bg);
            color: #fff;
        }

        .nav-item.active {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: #fff;
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }

        .nav-icon { font-size: 20px; }
        .nav-text { font-size: 14px; font-weight: 500; }

        .sidebar-footer {
            padding: 20px;
            border-top: 1px solid var(--border);
        }

        .user-card {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .user-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: 2px solid var(--primary);
        }

        .user-info { flex: 1; min-width: 0; }
        .user-name { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-status { font-size: 11px; color: var(--success); }

        .logout-btn {
            padding: 8px 12px;
            background: var(--danger);
            border: none;
            border-radius: 8px;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .logout-btn:hover { background: #dc2626; transform: scale(1.05); }

        /* ========== MOBILE MENU ========== */
        .mobile-header {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(15, 15, 26, 0.98);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border);
            z-index: 999;
            padding: 0 15px;
            align-items: center;
            justify-content: space-between;
        }

        .menu-toggle {
            width: 40px;
            height: 40px;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            color: #fff;
        }

        .mobile-logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .mobile-logo span:first-child { font-size: 24px; }
        .mobile-logo span:last-child { font-weight: 700; }

        .overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: 998;
        }

        .overlay.active { display: block; }
        .sidebar.active { transform: translateX(0); }

        /* ========== MAIN CONTENT ========== */
        .main {
            margin-left: 260px;
            padding: 30px;
            min-height: 100vh;
        }

        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 26px;
            font-weight: 700;
        }

        .bot-status {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 18px;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 50px;
        }

        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--danger);
        }

        .status-dot.online {
            background: var(--success);
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
            50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }

        .status-text { font-size: 13px; color: var(--gray); }

        /* ========== PAGES ========== */
        .page { display: none; animation: fadeIn 0.4s ease; }
        .page.active { display: block; }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* ========== TOOLBAR ========== */
        .toolbar {
            display: flex;
            gap: 12px;
            margin-bottom: 25px;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 20px;
            border: none;
            border-radius: 12px;
            font-family: inherit;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn:hover { transform: translateY(-2px); }
        .btn:active { transform: translateY(0); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .btn-primary { background: linear-gradient(135deg, var(--primary), var(--secondary)); color: #fff; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3); }
        .btn-success { background: var(--success); color: #fff; }
        .btn-danger { background: var(--danger); color: #fff; }
        .btn-warning { background: var(--warning); color: #fff; }
        .btn-secondary { background: rgba(255, 255, 255, 0.1); color: #fff; border: 1px solid var(--border); }
        .btn-sm { padding: 10px 16px; font-size: 13px; }

        /* ========== ACCOUNT CARDS ========== */
        .accounts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;
        }

        .account-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 24px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .account-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
        }

        .account-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            border-color: var(--primary);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .card-title { font-size: 18px; font-weight: 600; }

        .status-badge {
            padding: 6px 14px;
            border-radius: 50px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-badge.running { background: rgba(16, 185, 129, 0.2); color: var(--success); }
        .status-badge.stopped { background: rgba(239, 68, 68, 0.2); color: var(--danger); }
        .status-badge.paused { background: rgba(245, 158, 11, 0.2); color: var(--warning); }

        .card-info {
            margin-bottom: 20px;
        }

        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid var(--border);
            font-size: 13px;
        }

        .info-row:last-child { border-bottom: none; }
        .info-label { color: var(--gray); }
        .info-value { font-weight: 500; }

        .card-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            padding: 15px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .mini-stat { text-align: center; }
        .mini-stat-value { font-size: 20px; font-weight: 700; color: var(--primary); }
        .mini-stat-label { font-size: 10px; color: var(--gray); text-transform: uppercase; }

        .card-actions {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }

        .card-actions .btn { width: 100%; }

        /* ========== STATS PAGE ========== */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
        }

        .stat-icon { font-size: 32px; margin-bottom: 12px; }
        .stat-label { font-size: 12px; color: var(--gray); text-transform: uppercase; margin-bottom: 8px; }
        .stat-value { font-size: 28px; font-weight: 700; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

        .chart-container {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 24px;
        }

        /* ========== SETTINGS PAGE ========== */
        .settings-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
        }

        .settings-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 25px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }

        .form-group { margin-bottom: 20px; }
        .form-label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; }
        
        .form-input, .form-select {
            width: 100%;
            padding: 14px 18px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border);
            border-radius: 12px;
            color: #fff;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.3s;
        }

        .form-input:focus, .form-select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
        }

        .form-hint { font-size: 12px; color: var(--gray); margin-top: 6px; }

        .config-code {
            background: rgba(0, 0, 0, 0.4);
            border-radius: 12px;
            padding: 20px;
            font-family: 'Fira Code', monospace;
            font-size: 12px;
            color: var(--success);
            overflow-x: auto;
            max-height: 350px;
            white-space: pre;
        }

        /* ========== LOGS PAGE ========== */
        .logs-card {
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 24px;
            height: calc(100vh - 180px);
            display: flex;
            flex-direction: column;
        }

        .logs-header {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .logs-content {
            flex: 1;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 12px;
            padding: 15px;
            font-family: 'Fira Code', Consolas, monospace;
            font-size: 12px;
            line-height: 1.8;
            overflow-y: auto;
            color: var(--success);
        }

        .log-entry { padding: 4px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
        .log-entry.error { color: var(--danger); }
        .log-entry.warning { color: var(--warning); }
        .log-entry.info { color: #60a5fa; }
        .log-entry.success { color: var(--success); }

        /* ========== MODAL ========== */
        .modal {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.active { display: flex; }

        .modal-content {
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 24px;
            padding: 32px;
            width: 100%;
            max-width: 450px;
            position: relative;
            animation: modalSlide 0.3s ease;
        }

        @keyframes modalSlide {
            from { opacity: 0; transform: scale(0.95) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 36px;
            height: 36px;
            background: var(--card-bg);
            border: 1px solid var(--border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .modal-close:hover { background: var(--danger); border-color: var(--danger); }
        .modal-title { font-size: 22px; font-weight: 600; margin-bottom: 25px; }

        /* ========== TOAST ========== */
        .toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 16px 24px;
            border-radius: 14px;
            color: #fff;
            font-weight: 500;
            font-size: 14px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
            z-index: 3000;
            max-width: 350px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .toast.active { opacity: 1; transform: translateY(0); }
        .toast.success { background: var(--success); }
        .toast.error { background: var(--danger); }
        .toast.info { background: var(--primary); }
        .toast.warning { background: var(--warning); }

        /* ========== EMPTY STATE ========== */
        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-icon { font-size: 60px; margin-bottom: 20px; opacity: 0.5; }
        .empty-text { color: var(--gray); margin-bottom: 20px; }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 992px) {
            .sidebar { transform: translateX(-100%); }
            .mobile-header { display: flex; }
            .main { margin-left: 0; padding: 80px 20px 20px; }
            .page-title { font-size: 22px; }
        }

        @media (max-width: 640px) {
            .accounts-grid { grid-template-columns: 1fr; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .toolbar { flex-direction: column; }
            .toolbar .btn { width: 100%; }
            .page-header { flex-direction: column; align-items: flex-start; }
            .card-actions { grid-template-columns: 1fr; }
            .stat-value { font-size: 24px; }
            .card-stats { grid-template-columns: repeat(3, 1fr); gap: 5px; }
            .mini-stat-value { font-size: 16px; }
            .toast { left: 20px; right: 20px; bottom: 20px; }
        }

        /* ========== SCROLLBAR ========== */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--gray); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
    </style>
</head>
<body>
    <!-- Mobile Header -->
    <div class="mobile-header">
        <div class="menu-toggle" onclick="toggleSidebar()">☰</div>
        <div class="mobile-logo">
            <span>🦉</span>
            <span>OwO Bot</span>
        </div>
        <div class="bot-status">
            <span class="status-dot" id="mobileStatusDot"></span>
        </div>
    </div>

    <!-- Overlay -->
    <div class="overlay" id="overlay" onclick="toggleSidebar()"></div>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="sidebar-logo">
                <div class="logo-icon">🦉</div>
                <div class="logo-text">
                    <h2>OwO Bot</h2>
                    <span>Dashboard v2.0</span>
                </div>
            </div>
        </div>

        <nav class="sidebar-nav">
            <a class="nav-item active" data-page="accounts">
                <span class="nav-icon">👤</span>
                <span class="nav-text">Accounts</span>
            </a>
            <a class="nav-item" data-page="stats">
                <span class="nav-icon">📊</span>
                <span class="nav-text">Statistics</span>
            </a>
            <a class="nav-item" data-page="settings">
                <span class="nav-icon">⚙️</span>
                <span class="nav-text">Settings</span>
            </a>
            <a class="nav-item" data-page="logs">
                <span class="nav-icon">📜</span>
                <span class="nav-text">Logs</span>
            </a>
        </nav>

        <div class="sidebar-footer">
            <div class="user-card">
                <img class="user-avatar" id="userAvatar" src="https://cdn.discordapp.com/embed/avatars/0.png">
                <div class="user-info">
                    <div class="user-name" id="userName">Loading...</div>
                    <div class="user-status">● Online</div>
                </div>
                <button class="logout-btn" onclick="logout()">Exit</button>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <main class="main">
        <div class="page-header">
            <h1 class="page-title" id="pageTitle">Accounts</h1>
            <div class="bot-status">
                <span class="status-dot" id="botStatusDot"></span>
                <span class="status-text" id="botStatusText">Bot Offline</span>
            </div>
        </div>

        <!-- Accounts Page -->
        <div class="page active" id="accounts-page">
            <div class="toolbar">
                <button class="btn btn-primary" onclick="openModal('addModal')">➕ Add Account</button>
                <button class="btn btn-success" onclick="startAll()">▶️ Start All</button>
                <button class="btn btn-danger" onclick="stopAll()">⏹️ Stop All</button>
                <button class="btn btn-secondary" onclick="loadData()">🔄 Refresh</button>
            </div>
            <div class="accounts-grid" id="accountsGrid">
                <div class="empty-state">
                    <div class="empty-icon">⏳</div>
                    <p class="empty-text">Loading accounts...</p>
                </div>
            </div>
        </div>

        <!-- Stats Page -->
        <div class="page" id="stats-page">
            <div class="stats-grid">
                <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-label">Total Hunts</div><div class="stat-value" id="sHunts">0</div></div>
                <div class="stat-card"><div class="stat-icon">🦉</div><div class="stat-label">OwO Count</div><div class="stat-value" id="sOwo">0</div></div>
                <div class="stat-card"><div class="stat-icon">⚔️</div><div class="stat-label">Battles</div><div class="stat-value" id="sBattles">0</div></div>
                <div class="stat-card"><div class="stat-icon">🛡️</div><div class="stat-label">Captchas</div><div class="stat-value" id="sCaptchas">0</div></div>
                <div class="stat-card"><div class="stat-icon">👥</div><div class="stat-label">Active</div><div class="stat-value" id="sActive">0</div></div>
                <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-label">Success</div><div class="stat-value" id="sSuccess">100%</div></div>
            </div>
            <div class="chart-container"><canvas id="chart"></canvas></div>
        </div>

        <!-- Settings Page -->
        <div class="page" id="settings-page">
            <div class="settings-card">
                <h3 class="settings-title">⚙️ Global Settings</h3>
                <form id="settingsForm">
                    <div class="form-group">
                        <label class="form-label">Min Delay (ms)</label>
                        <input type="number" class="form-input" id="minDelay" value="3000" min="1000">
                        <p class="form-hint">Minimum delay between accounts</p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Max Delay (ms)</label>
                        <input type="number" class="form-input" id="maxDelay" value="5000" min="1000">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Default Action</label>
                        <select class="form-select" id="defaultAction">
                            <option value="pray">🙏 Pray</option>
                            <option value="curse">💀 Curse</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">💾 Save Settings</button>
                </form>
            </div>
            <div class="settings-card">
                <h3 class="settings-title">📄 Configuration</h3>
                <div class="config-code" id="configCode">{}</div>
                <br>
                <button class="btn btn-secondary" onclick="downloadConfig()">📥 Download config.js</button>
            </div>
        </div>

        <!-- Logs Page -->
        <div class="page" id="logs-page">
            <div class="logs-card">
                <div class="logs-header">
                    <button class="btn btn-secondary btn-sm" onclick="clearLogs()">🗑️ Clear</button>
                    <button class="btn btn-primary btn-sm" onclick="addLog('Logs refreshed', 'info')">🔄 Refresh</button>
                    <button class="btn btn-success btn-sm" onclick="exportLogs()">📥 Export</button>
                </div>
                <div class="logs-content" id="logsBox"><div class="log-entry info">[System] Ready</div></div>
            </div>
        </div>
    </main>

    <!-- Add Account Modal -->
    <div class="modal" id="addModal">
        <div class="modal-content">
            <div class="modal-close" onclick="closeModal('addModal')">✕</div>
            <h2 class="modal-title">➕ Add Account</h2>
            <form id="addForm">
                <div class="form-group">
                    <label class="form-label">Account Name</label>
                    <input type="text" class="form-input" id="accName" required placeholder="Main Account">
                </div>
                <div class="form-group">
                    <label class="form-label">Discord Token</label>
                    <input type="password" class="form-input" id="accToken" required placeholder="Your token">
                    <p class="form-hint">⚠️ Keep this secret!</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Channel ID</label>
                    <input type="text" class="form-input" id="accChannel" placeholder="123456789012345678">
                </div>
                <div class="form-group">
                    <label class="form-label">Prefix</label>
                    <input type="text" class="form-input" id="accPrefix" value="owo">
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%">➕ Add Account</button>
            </form>
        </div>
    </div>

    <!-- Edit Account Modal -->
    <div class="modal" id="editModal">
        <div class="modal-content">
            <div class="modal-close" onclick="closeModal('editModal')">✕</div>
            <h2 class="modal-title">✏️ Edit Account</h2>
            <form id="editForm">
                <input type="hidden" id="editId">
                <div class="form-group">
                    <label class="form-label">Account Name</label>
                    <input type="text" class="form-input" id="editName" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Channel ID</label>
                    <input type="text" class="form-input" id="editChannel">
                </div>
                <div class="form-group">
                    <label class="form-label">Prefix</label>
                    <input type="text" class="form-input" id="editPrefix">
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%">💾 Save Changes</button>
            </form>
        </div>
    </div>

    <!-- Toast -->
    <div class="toast" id="toast"></div>

    <script>
        const API = 'https://oyy-gus.koyeb.app';
        const PATH = '/selfbot';
        let socket, userData = { accounts: [], globalSettings: {} }, chart, logs = [];

        // Init
        async function init() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            if (!token) return location.href = PATH + '/';

            if (user.username) document.getElementById('userName').textContent = user.username;
            if (user.avatar && user.discordId) document.getElementById('userAvatar').src = `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`;

            setupNav();
            setupForms();
            await loadData();
            connectSocket();
            setInterval(loadData, 30000);
        }

        // Socket
        function connectSocket() {
            try {
                socket = io(API, { transports: ['websocket', 'polling'] });
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                
                socket.on('connect', () => { 
                    socket.emit('join-room', user.discordId); 
                    setBotStatus(true); 
                    addLog('Connected to server', 'success');
                });
                socket.on('disconnect', () => { setBotStatus(false); addLog('Disconnected', 'error'); });
                socket.on('config-updated', d => { userData = d; render(); addLog('Config updated', 'info'); });
                socket.on('bot-status', d => { setBotStatus(d.online); if (d.accounts) { d.accounts.forEach(a => { const e = userData.accounts?.find(x => x.name === a.name); if (e) Object.assign(e, a); }); render(); }});
            } catch (e) { console.error(e); }
        }

        function setBotStatus(online) {
            const dots = document.querySelectorAll('.status-dot');
            const text = document.getElementById('botStatusText');
            dots.forEach(d => d.classList.toggle('online', online));
            if (text) text.textContent = online ? 'Bot Online' : 'Bot Offline';
        }

        // Load Data
        async function loadData() {
            try {
                const res = await fetch(`${API}/api/config`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
                if (!res.ok) { if (res.status === 401) logout(); throw new Error(); }
                userData = await res.json();
                render();
            } catch (e) { toast('Failed to load', 'error'); }
        }

        // Render
        function render() {
            renderAccounts();
            renderStats();
            renderSettings();
        }

        function renderAccounts() {
            const g = document.getElementById('accountsGrid');
            if (!userData.accounts?.length) {
                g.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p class="empty-text">No accounts yet</p><button class="btn btn-primary" onclick="openModal('addModal')">➕ Add Account</button></div>`;
                return;
            }
            g.innerHTML = userData.accounts.map(a => {
                const running = a.enabled && a.statusHunting === 'aktif';
                const paused = a.captchaDetected;
                let badge = '<span class="status-badge stopped">🔴 Stopped</span>';
                if (paused) badge = '<span class="status-badge paused">⏸️ Paused</span>';
                else if (running) badge = '<span class="status-badge running">🟢 Running</span>';
                else if (a.enabled) badge = '<span class="status-badge" style="background:rgba(245,158,11,0.2);color:#f59e0b">🟡 Ready</span>';
                
                return `<div class="account-card">
                    <div class="card-header"><h3 class="card-title">${a.name}</h3>${badge}</div>
                    <div class="card-info">
                        <div class="info-row"><span class="info-label">Channel</span><span class="info-value">${a.channelId || 'Not set'}</span></div>
                        <div class="info-row"><span class="info-label">Prefix</span><span class="info-value">${a.prefix || 'owo'}</span></div>
                    </div>
                    <div class="card-stats">
                        <div class="mini-stat"><div class="mini-stat-value">${a.totalHunts || 0}</div><div class="mini-stat-label">Hunts</div></div>
                        <div class="mini-stat"><div class="mini-stat-value">${a.owoCount || 0}</div><div class="mini-stat-label">OwO</div></div>
                        <div class="mini-stat"><div class="mini-stat-value">${a.battleCount || 0}</div><div class="mini-stat-label">Battle</div></div>
                    </div>
                    <div class="card-actions">
                        ${running ? `<button class="btn btn-warning btn-sm" onclick="control('${a._id}','stop')">⏹️ Stop</button>` : `<button class="btn btn-success btn-sm" onclick="control('${a._id}','start')" ${!a.channelId ? 'disabled' : ''}>▶️ Start</button>`}
                        <button class="btn btn-secondary btn-sm" onclick="toggle('${a._id}')">${a.enabled ? '🔴 Disable' : '🟢 Enable'}</button>
                        <button class="btn btn-primary btn-sm" onclick="edit('${a._id}')">✏️ Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="del('${a._id}')">🗑️ Delete</button>
                    </div>
                </div>`;
            }).join('');
        }

        function renderStats() {
            if (!userData.accounts) return;
            const t = (k) => userData.accounts.reduce((s, a) => s + (a[k] || 0), 0);
            const hunts = t('totalHunts'), captchas = t('captchaCount');
            document.getElementById('sHunts').textContent = hunts.toLocaleString();
            document.getElementById('sOwo').textContent = t('owoCount').toLocaleString();
            document.getElementById('sBattles').textContent = t('battleCount').toLocaleString();
            document.getElementById('sCaptchas').textContent = captchas.toLocaleString();
            document.getElementById('sActive').textContent = userData.accounts.filter(a => a.enabled && a.statusHunting === 'aktif').length;
            document.getElementById('sSuccess').textContent = (hunts > 0 ? Math.round(((hunts - captchas) / hunts) * 100) : 100) + '%';
        }

        function renderSettings() {
            if (userData.globalSettings) {
                document.getElementById('minDelay').value = userData.globalSettings.minDelayBetweenAccounts || 3000;
                document.getElementById('maxDelay').value = userData.globalSettings.maxDelayBetweenAccounts || 5000;
                document.getElementById('defaultAction').value = userData.globalSettings.action || 'pray';
            }
            document.getElementById('configCode').textContent = JSON.stringify({ owoId: "408785106942164992", accounts: (userData.accounts || []).map(a => ({ name: a.name, token: 'HIDDEN', channelId: a.channelId, prefix: a.prefix, enabled: a.enabled })), globalSettings: userData.globalSettings || {} }, null, 2);
        }

        function updateChart() {
            const ctx = document.getElementById('chart');
            if (!ctx || !userData.accounts) return;
            if (chart) chart.destroy();
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: userData.accounts.map(a => a.name),
                    datasets: [
                        { label: 'Hunts', data: userData.accounts.map(a => a.totalHunts || 0), backgroundColor: '#667eea' },
                        { label: 'OwO', data: userData.accounts.map(a => a.owoCount || 0), backgroundColor: '#10b981' },
                        { label: 'Battles', data: userData.accounts.map(a => a.battleCount || 0), backgroundColor: '#ef4444' }
                    ]
                },
                options: { responsive: true, plugins: { legend: { labels: { color: '#fff' }}}, scales: { x: { ticks: { color: '#94a3b8' }}, y: { ticks: { color: '#94a3b8' }, beginAtZero: true }}}
            });
        }

        // Actions
        async function control(id, action) {
            const a = userData.accounts.find(x => x._id === id);
            toast(`${action === 'start' ? 'Starting' : 'Stopping'} ${a.name}...`, 'info');
            await fetch(`${API}/api/bot/command`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ command: action, target: 'account', accountId: id, accountName: a.name }) });
            toast(`${a.name} ${action}ed!`, 'success');
            addLog(`${a.name} ${action}ed`, 'success');
            setTimeout(loadData, 1500);
        }

        async function startAll() {
            toast('Starting all...', 'info');
            await fetch(`${API}/api/bot/command`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ command: 'startAll', target: 'all' }) });
            toast('All started!', 'success');
            addLog('Started all accounts', 'success');
            setTimeout(loadData, 2000);
        }

        async function stopAll() {
            toast('Stopping all...', 'info');
            await fetch(`${API}/api/bot/command`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ command: 'stopAll', target: 'all' }) });
            toast('All stopped!', 'success');
            addLog('Stopped all accounts', 'warning');
            setTimeout(loadData, 2000);
        }

        async function toggle(id) {
            const a = userData.accounts.find(x => x._id === id);
            await fetch(`${API}/api/config/account/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ enabled: !a.enabled }) });
            toast(`Account ${a.enabled ? 'disabled' : 'enabled'}`, 'success');
            loadData();
        }

        async function del(id) {
            if (!confirm('Delete this account?')) return;
            await fetch(`${API}/api/config/account/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }});
            toast('Deleted', 'success');
            addLog('Account deleted', 'warning');
            loadData();
        }

        function edit(id) {
            const a = userData.accounts.find(x => x._id === id);
            document.getElementById('editId').value = a._id;
            document.getElementById('editName').value = a.name;
            document.getElementById('editChannel').value = a.channelId || '';
            document.getElementById('editPrefix').value = a.prefix || 'owo';
            openModal('editModal');
        }

        // Navigation
        function setupNav() {
            document.querySelectorAll('.nav-item').forEach(n => {
                n.onclick = () => {
                    document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
                    n.classList.add('active');
                    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                    document.getElementById(`${n.dataset.page}-page`).classList.add('active');
                    document.getElementById('pageTitle').textContent = { accounts: 'Accounts', stats: 'Statistics', settings: 'Settings', logs: 'Logs' }[n.dataset.page];
                    if (n.dataset.page === 'stats') updateChart();
                    if (window.innerWidth < 992) toggleSidebar();
                };
            });
        }

        // Forms
        function setupForms() {
            document.getElementById('addForm').onsubmit = async e => {
                e.preventDefault();
                try {
                    const res = await fetch(`${API}/api/config/account`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ name: document.getElementById('accName').value, token: document.getElementById('accToken').value, channelId: document.getElementById('accChannel').value, prefix: document.getElementById('accPrefix').value || 'owo' }) });
                    if (!res.ok) throw new Error((await res.json()).error);
                    toast('Account added!', 'success');
                    addLog('Account added', 'success');
                    closeModal('addModal');
                    e.target.reset();
                    loadData();
                } catch (err) { toast('Error: ' + err.message, 'error'); }
            };

            document.getElementById('editForm').onsubmit = async e => {
                e.preventDefault();
                await fetch(`${API}/api/config/account/${document.getElementById('editId').value}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ name: document.getElementById('editName').value, channelId: document.getElementById('editChannel').value, prefix: document.getElementById('editPrefix').value }) });
                toast('Updated!', 'success');
                closeModal('editModal');
                loadData();
            };

            document.getElementById('settingsForm').onsubmit = async e => {
                e.preventDefault();
                await fetch(`${API}/api/config/global`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ minDelayBetweenAccounts: +document.getElementById('minDelay').value, maxDelayBetweenAccounts: +document.getElementById('maxDelay').value, action: document.getElementById('defaultAction').value }) });
                toast('Settings saved!', 'success');
                addLog('Settings updated', 'info');
            };
        }

        // Logs
        function addLog(msg, type = 'info') {
            logs.unshift({ time: new Date().toLocaleTimeString(), msg, type });
            if (logs.length > 200) logs.pop();
            document.getElementById('logsBox').innerHTML = logs.map(l => `<div class="log-entry ${l.type}">[${l.time}] ${l.msg}</div>`).join('');
        }

        function clearLogs() { logs = []; addLog('Logs cleared', 'info'); }
        function exportLogs() { const b = new Blob([logs.map(l => `[${l.time}] [${l.type.toUpperCase()}] ${l.msg}`).join('\n')], { type: 'text/plain' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'logs.txt'; a.click(); toast('Exported', 'success'); }

        // Utils
        function openModal(id) { document.getElementById(id).classList.add('active'); }
        function closeModal(id) { document.getElementById(id).classList.remove('active'); }
        function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); document.getElementById('overlay').classList.toggle('active'); }
        function toast(msg, type = 'info') { const t = document.getElementById('toast'); t.textContent = msg; t.className = `toast active ${type}`; setTimeout(() => t.classList.remove('active'), 3000); }
        function logout() { localStorage.clear(); location.href = PATH + '/'; }
        function downloadConfig() { const c = { owoId: "408785106942164992", accounts: (userData.accounts || []).map(a => ({ name: a.name, token: 'HIDDEN', channelId: a.channelId, prefix: a.prefix, enabled: a.enabled })), globalSettings: userData.globalSettings }; const b = new Blob([`module.exports = ${JSON.stringify(c, null, 4)};`], { type: 'text/javascript' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'config.js'; a.click(); toast('Downloaded', 'success'); }

        window.onclick = e => { if (e.target.classList.contains('modal')) e.target.classList.remove('active'); };
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Authenticating...</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 50px 40px;
            text-align: center;
            max-width: 400px;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .loader {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 25px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        h2 { color: #fff; font-size: 22px; margin-bottom: 10px; }
        p { color: rgba(255, 255, 255, 0.7); font-size: 14px; }
        
        .error { 
            background: rgba(231, 76, 60, 0.2); 
            color: #ff6b6b; 
            padding: 15px; 
            border-radius: 12px; 
            margin-top: 20px;
            font-size: 13px;
            display: none;
        }

        .btn {
            display: none;
            margin-top: 20px;
            padding: 14px 28px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            border: none;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
        }

        .success-icon {
            font-size: 50px;
            margin-bottom: 15px;
            display: none;
        }

        @media (max-width: 480px) {
            .card { padding: 40px 25px; }
            h2 { font-size: 20px; }
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="loader" id="loader"></div>
        <div class="success-icon" id="successIcon">✅</div>
        <h2 id="title">Authenticating...</h2>
        <p id="message">Please wait while we verify your account</p>
        <div class="error" id="error"></div>
        <a href="/selfbot/" class="btn" id="retryBtn">Try Again</a>
    </div>

    <script>
        const BACKEND_URL = 'https://oyy-gus.koyeb.app';
        const code = new URLSearchParams(window.location.search).get('code');
        const error = new URLSearchParams(window.location.search).get('error');

        async function handleAuth() {
            if (error) return showError('Authorization denied by user');
            if (!code) return showError('No authorization code received');

            try {
                const res = await fetch(`${BACKEND_URL}/api/auth/discord/callback`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Authentication failed');

                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('successIcon').style.display = 'block';
                    document.getElementById('title').textContent = 'Success!';
                    document.getElementById('message').textContent = 'Redirecting to dashboard...';
                    
                    setTimeout(() => window.location.href = '/selfbot/dashboard.html', 1200);
                }
            } catch (e) {
                showError(e.message);
            }
        }

        function showError(msg) {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('title').textContent = 'Error';
            document.getElementById('message').style.display = 'none';
            document.getElementById('error').textContent = msg;
            document.getElementById('error').style.display = 'block';
            document.getElementById('retryBtn').style.display = 'inline-block';
        }

        handleAuth();
    </script>
</body>
</html>PORT=3000
MONGODB_URI=mongodb+srv://bagusds:guss@guss.ecg4jup.mongodb.net/?appName=guss
JWT_SECRET=oyy-gus-selfbot-2025
DISCORD_CLIENT_ID=1446041744545415239
DISCORD_CLIENT_SECRET=yaAnv4LXiMZOHQNwDhqFBNNBRjk8FUjk
DISCORD_REDIRECT_URI=https://oyy-gus.github.io/selfbot/callback.html
FRONTEND_URL=https://oyy-gus.github.io
BOT_SECRET_KEY=12345-JTM-SELFBOT-2025
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);

// ========================================
// CORS - Allow All Origins untuk testing
// ========================================
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-bot-key']
}));

app.use(express.json());

// ========================================
// Socket.io
// ========================================
const io = socketIo(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('join-room', (room) => {
        socket.join(room);
        socket.join(`bot-${room}`);
        console.log(`Joined room: ${room}`);
    });
    socket.on('disconnect', () => console.log('Client disconnected'));
});

app.set('io', io);

// ========================================
// MongoDB Connection
// ========================================
let dbConnected = false;

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('✅ MongoDB connected');
            dbConnected = true;
        })
        .catch(err => {
            console.error('❌ MongoDB error:', err.message);
            console.log('⚠️ Running without database');
        });
} else {
    console.log('⚠️ No MONGODB_URI, running without database');
}

// ========================================
// User Schema
// ========================================
const accountSchema = new mongoose.Schema({
    name: String,
    token: String,
    channelId: String,
    channelIds: [String],
    prefix: { type: String, default: 'owo' },
    statusHunting: { type: String, default: 'nonaktif' },
    enabled: { type: Boolean, default: false },
    huntCount: { type: Number, default: 0 },
    totalHunts: { type: Number, default: 0 },
    captchaCount: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
    discordId: { type: String, unique: true },
    username: String,
    email: String,
    avatar: String,
    accounts: [accountSchema],
    globalSettings: {
        minDelayBetweenAccounts: { type: Number, default: 3000 },
        maxDelayBetweenAccounts: { type: Number, default: 5000 },
        action: { type: String, default: 'pray' }
    }
});

const User = mongoose.model('User', userSchema);

// ========================================
// Middleware
// ========================================
function authToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        next();
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
}

function authBot(req, res, next) {
    const key = req.headers['x-bot-key'];
    if (key !== process.env.BOT_SECRET_KEY) {
        return res.status(401).json({ error: 'Invalid bot key' });
    }
    next();
}

// ========================================
// Routes - Basic
// ========================================
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'OwO Bot API',
        database: dbConnected ? 'connected' : 'disconnected',
        endpoints: ['/health', '/api/auth/discord/callback', '/api/config']
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        database: dbConnected,
        timestamp: new Date()
    });
});

// ========================================
// Routes - Auth
// ========================================
app.post('/api/auth/discord/callback', async (req, res) => {
    const { code } = req.body;
    
    console.log('📥 Auth callback received, code:', code?.substring(0, 10) + '...');
    
    if (!code) {
        return res.status(400).json({ error: 'Code required' });
    }
    
    try {
        // Exchange code for token
        console.log('🔄 Exchanging code for token...');
        
        const tokenRes = await axios.post('https://discord.com/api/oauth2/token',
            new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.DISCORD_REDIRECT_URI
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        
        console.log('✅ Got Discord token');
        
        // Get user info
        const userRes = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenRes.data.access_token}` }
        });
        
        const discordUser = userRes.data;
        console.log('✅ Got user:', discordUser.username);
        
        // Save to database if connected
        let user = null;
        if (dbConnected) {
            user = await User.findOne({ discordId: discordUser.id });
            
            if (!user) {
                user = await User.create({
                    discordId: discordUser.id,
                    username: discordUser.username,
                    email: discordUser.email,
                    avatar: discordUser.avatar,
                    accounts: [],
                    globalSettings: {}
                });
                console.log('✅ Created new user');
            } else {
                user.username = discordUser.username;
                user.avatar = discordUser.avatar;
                await user.save();
                console.log('✅ Updated existing user');
            }
        }
        
        // Generate JWT
        const token = jwt.sign(
            { 
                userId: user?._id || discordUser.id,
                discordId: discordUser.id,
                username: discordUser.username
            },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );
        
        console.log('✅ Auth complete!');
        
        res.json({ 
            token,
            user: {
                id: user?._id || discordUser.id,
                username: discordUser.username,
                avatar: discordUser.avatar,
                discordId: discordUser.id
            }
        });
        
    } catch (error) {
        console.error('❌ Auth error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Authentication failed',
            details: error.response?.data?.error_description || error.message
        });
    }
});

app.get('/api/auth/me', authToken, async (req, res) => {
    try {
        if (dbConnected) {
            const user = await User.findOne({ discordId: req.user.discordId });
            if (user) return res.json(user);
        }
        res.json({ discordId: req.user.discordId, username: req.user.username });
    } catch {
        res.status(500).json({ error: 'Error' });
    }
});

// ========================================
// Routes - Config
// ========================================
app.get('/api/config', authToken, async (req, res) => {
    try {
        if (!dbConnected) {
            return res.json({ accounts: [], globalSettings: {} });
        }
        
        const user = await User.findOne({ discordId: req.user.discordId });
        if (!user) return res.json({ accounts: [], globalSettings: {} });
        
        const safe = user.toObject();
        safe.accounts = safe.accounts.map(a => ({ ...a, token: '***' + (a.token?.slice(-5) || '') }));
        res.json(safe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/config/account', authToken, async (req, res) => {
    try {
        if (!dbConnected) return res.status(500).json({ error: 'Database not connected' });
        
        let user = await User.findOne({ discordId: req.user.discordId });
        if (!user) {
            user = await User.create({ discordId: req.user.discordId, accounts: [] });
        }
        
        const { name, token, channelId, prefix } = req.body;
        if (!name || !token) return res.status(400).json({ error: 'Name and token required' });
        
        user.accounts.push({ name, token, channelId, prefix: prefix || 'owo', enabled: false });
        await user.save();
        
        io.to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Account added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/config/account/:id', authToken, async (req, res) => {
    try {
        if (!dbConnected) return res.status(500).json({ error: 'Database not connected' });
        
        const user = await User.findOne({ discordId: req.user.discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const account = user.accounts.id(req.params.id);
        if (!account) return res.status(404).json({ error: 'Account not found' });
        
        Object.assign(account, req.body);
        await user.save();
        
        io.to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/config/account/:id', authToken, async (req, res) => {
    try {
        if (!dbConnected) return res.status(500).json({ error: 'Database not connected' });
        
        const user = await User.findOne({ discordId: req.user.discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        user.accounts.pull(req.params.id);
        await user.save();
        
        io.to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/config/global', authToken, async (req, res) => {
    try {
        if (!dbConnected) return res.status(500).json({ error: 'Database not connected' });
        
        const user = await User.findOne({ discordId: req.user.discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        Object.assign(user.globalSettings, req.body);
        await user.save();
        
        io.to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Settings saved' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========================================
// Routes - Bot
// ========================================
app.post('/api/bot/command', authToken, async (req, res) => {
    const { command, target, accountId, accountName } = req.body;
    
    try {
        console.log(`📤 Bot command: ${command} for ${target}`);
        
        if (dbConnected) {
            const user = await User.findOne({ discordId: req.user.discordId });
            if (user) {
                io.to(`bot-${user.discordId}`).emit('bot-command', { command, target, accountId, accountName });
                
                // Update status
                if (target === 'account' && accountId) {
                    const acc = user.accounts.id(accountId);
                    if (acc) {
                        acc.statusHunting = command === 'start' ? 'aktif' : 'nonaktif';
                        if (command === 'start') acc.enabled = true;
                        await user.save();
                    }
                } else if (target === 'all') {
                    user.accounts.forEach(acc => {
                        if (acc.channelId) {
                            acc.statusHunting = command === 'startAll' ? 'aktif' : 'nonaktif';
                            if (command === 'startAll') acc.enabled = true;
                        }
                    });
                    await user.save();
                }
                
                io.to(`user-${user.discordId}`).emit('config-updated', user);
            }
        }
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/bot/heartbeat', authBot, async (req, res) => {
    const { discordId, accounts } = req.body;
    
    try {
        if (dbConnected) {
            const user = await User.findOne({ discordId });
            if (user && accounts) {
                accounts.forEach(acc => {
                    const ua = user.accounts.find(a => a.name === acc.name);
                    if (ua) {
                        ua.huntCount = acc.huntCount || 0;
                        ua.totalHunts = acc.totalHunts || ua.totalHunts;
                        ua.statusHunting = acc.statusHunting || ua.statusHunting;
                    }
                });
                await user.save();
                io.to(`user-${discordId}`).emit('bot-status', { online: true, accounts: user.accounts });
            }
        }
        res.json({ status: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/bot/config/:discordId', authBot, async (req, res) => {
    try {
        if (!dbConnected) return res.json({ accounts: [], globalSettings: {} });
        
        const user = await User.findOne({ discordId: req.params.discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        res.json({ accounts: user.accounts, globalSettings: user.globalSettings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========================================
// Error Handler
// ========================================
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
});

// ========================================
// Start Server
// ========================================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/health`);
    console.log(`🔑 Discord Client ID: ${process.env.DISCORD_CLIENT_ID?.substring(0, 5)}...`);
    console.log(`🔗 Redirect URI: ${process.env.DISCORD_REDIRECT_URI}\n`);
});const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/discord/callback', async (req, res) => {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'Code required' });
    
    try {
        const tokenRes = await axios.post('https://discord.com/api/oauth2/token',
            new URLSearchParams({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.DISCORD_REDIRECT_URI
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        
        const userRes = await axios.get('https://discord.com/api/users/@me', {
            headers: { Authorization: `Bearer ${tokenRes.data.access_token}` }
        });
        
        const discordUser = userRes.data;
        let user = await User.findOne({ discordId: discordUser.id });
        
        if (!user) {
            user = await User.create({
                discordId: discordUser.id,
                username: discordUser.username,
                email: discordUser.email,
                avatar: discordUser.avatar
            });
        } else {
            user.username = discordUser.username;
            user.avatar = discordUser.avatar;
            await user.save();
        }
        
        const token = jwt.sign({ userId: user._id, discordId: user.discordId }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({ token, user: { id: user._id, username: user.username, avatar: user.avatar, discordId: user.discordId } });
    } catch (error) {
        console.error('Auth error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

router.get('/me', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-accounts.token');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch { res.status(403).json({ error: 'Invalid token' }); }
});

module.exports = router;const express = require('express');
const router = express.Router();
const User = require('../models/User');

function authBot(req, res, next) {
    if (req.headers['x-bot-key'] !== process.env.BOT_SECRET_KEY) {
        return res.status(401).json({ error: 'Invalid bot key' });
    }
    next();
}

// Heartbeat
router.post('/heartbeat', authBot, async (req, res) => {
    const { discordId, accounts, status } = req.body;
    
    try {
        const user = await User.findOne({ discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        if (accounts && Array.isArray(accounts)) {
            accounts.forEach(acc => {
                const userAcc = user.accounts.find(a => a.name === acc.name);
                if (userAcc) {
                    if (acc.owoCount !== undefined) userAcc.owoCount = acc.owoCount;
                    if (acc.huntCount !== undefined) userAcc.huntCount = acc.huntCount;
                    if (acc.battleCount !== undefined) userAcc.battleCount = acc.battleCount;
                    if (acc.prayCount !== undefined) userAcc.prayCount = acc.prayCount;
                    if (acc.curseCount !== undefined) userAcc.curseCount = acc.curseCount;
                    if (acc.captchaCount !== undefined) userAcc.captchaCount = acc.captchaCount;
                    if (acc.statusHunting) userAcc.statusHunting = acc.statusHunting;
                }
            });
            await user.save();
        }
        
        const io = req.app.get('io');
        io.to(`user-${discordId}`).emit('bot-status', { 
            online: status === 'online',
            accounts: user.accounts 
        });
        
        res.json({ status: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Stats update
router.post('/stats', authBot, async (req, res) => {
    const { discordId, accountName, stats } = req.body;
    
    try {
        const user = await User.findOne({ discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const account = user.accounts.find(a => a.name === accountName);
        if (account) {
            if (stats.owoCount !== undefined) account.owoCount = stats.owoCount;
            if (stats.huntCount !== undefined) account.huntCount = stats.huntCount;
            if (stats.battleCount !== undefined) account.battleCount = stats.battleCount;
            if (stats.prayCount !== undefined) account.prayCount = stats.prayCount;
            if (stats.curseCount !== undefined) account.curseCount = stats.curseCount;
            if (stats.captchaCount !== undefined) account.captchaCount = stats.captchaCount;
            if (stats.statusHunting) account.statusHunting = stats.statusHunting;
            if (stats.lastHuntTime) account.lastHuntTime = stats.lastHuntTime;
            
            await user.save();
            
            console.log(`📊 Stats: ${accountName} - owo=${account.owoCount}, hunt=${account.huntCount}, battle=${account.battleCount}`);
            
            const io = req.app.get('io');
            io.to(`user-${discordId}`).emit('config-updated', user);
        }
        
        res.json({ status: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get config
router.get('/config/:discordId', authBot, async (req, res) => {
    try {
        const user = await User.findOne({ discordId: req.params.discordId });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        res.json({ 
            accounts: user.accounts, 
            globalSettings: user.globalSettings 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const safe = user.toObject();
        safe.accounts = safe.accounts.map(a => ({ ...a, token: '***' + (a.token?.slice(-5) || '') }));
        res.json(safe);
    } catch { res.status(500).json({ error: 'Server error' }); }
});

router.post('/account', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const { name, token, channelId, prefix } = req.body;
        
        if (!name || !token) return res.status(400).json({ error: 'Name and token required' });
        
        user.accounts.push({ name, token, channelId, prefix: prefix || 'owo', enabled: false });
        await user.save();
        
        req.app.get('io').to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Account added' });
    } catch { res.status(500).json({ error: 'Server error' }); }
});

router.put('/account/:id', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        const account = user.accounts.id(req.params.id);
        if (!account) return res.status(404).json({ error: 'Account not found' });
        
        Object.assign(account, req.body);
        await user.save();
        
        req.app.get('io').to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Account updated' });
    } catch { res.status(500).json({ error: 'Server error' }); }
});

router.delete('/account/:id', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.accounts.pull(req.params.id);
        await user.save();
        
        req.app.get('io').to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Account deleted' });
    } catch { res.status(500).json({ error: 'Server error' }); }
});

router.put('/global', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        Object.assign(user.globalSettings, req.body);
        await user.save();
        
        req.app.get('io').to(`user-${user.discordId}`).emit('config-updated', user);
        res.json({ message: 'Settings updated' });
    } catch { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    token: { type: String, required: true },
    channelId: String,
    channelIds: [String],
    currentChannelIndex: { type: Number, default: 0 },
    lastChannelRotation: String,
    prefix: { type: String, default: 'owo' },
    statusHunting: { type: String, default: 'nonaktif' },
    enabled: { type: Boolean, default: false },
    banned: { type: Boolean, default: false },
    captchaDetected: { type: Boolean, default: false },
    
    // Statistics - Based on MESSAGES SENT
    owoCount: { type: Number, default: 0 },         // "owo" commands
    huntCount: { type: Number, default: 0 },        // "owo h" commands
    battleCount: { type: Number, default: 0 },      // "owo b" commands
    prayCount: { type: Number, default: 0 },        // "owo pray" commands
    curseCount: { type: Number, default: 0 },       // "owo curse" commands
    captchaCount: { type: Number, default: 0 },
    
    lastHuntTime: Date
});

const userSchema = new mongoose.Schema({
    discordId: { type: String, unique: true },
    username: String,
    email: String,
    avatar: String,
    accounts: [accountSchema],
    globalSettings: {
        minDelayBetweenAccounts: { type: Number, default: 3000 },
        maxDelayBetweenAccounts: { type: Number, default: 5000 },
        action: { type: String, default: 'pray' }
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

function authenticateBot(req, res, next) {
    if (req.headers['x-bot-key'] !== process.env.BOT_SECRET_KEY) {
        return res.status(401).json({ error: 'Invalid bot key' });
    }
    next();
}

module.exports = { authenticateToken, authenticateBot };