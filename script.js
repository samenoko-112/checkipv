async function getIPAddress() {
    try {
        // サードパーティのサービスを利用してIPアドレスを取得
        let response = await fetch('https://api64.ipify.org?format=json');
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('IPアドレスの取得に失敗しました:', error);
        return null;
    }
}

function determineIPVersion(ip) {
    // IPv4とIPv6の正規表現パターン
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Pattern = /^[a-fA-F0-9:]+$/;

    if (ipv4Pattern.test(ip)) {
        return 'IPv4';
    } else if (ipv6Pattern.test(ip)) {
        return 'IPv6';
    } else {
        return '未知の形式';
    }
}

async function displayIPInfo() {
    const ipAddressElement = document.getElementById('ip-address');
    const ipVersionElement = document.getElementById('ip-version');

    const ipAddress = await getIPAddress();
    if (ipAddress) {
        ipAddressElement.textContent = `${ipAddress}`;
        const ipVersion = determineIPVersion(ipAddress);
        ipVersionElement.textContent = `${ipVersion}`;
    } else {
        ipAddressElement.textContent = 'IPアドレスの取得に失敗しました。';
        ipVersionElement.textContent = 'IPバージョンの判定に失敗しました。';
    }
}

// ページが読み込まれた時にIP情報を表示
window.onload = displayIPInfo;