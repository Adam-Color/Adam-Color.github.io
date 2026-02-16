async function getLatestRelease() {
    try {
        const response = await fetch('https://api.github.com/repos/Adam-Color/AppUsageGUI/releases/latest');
        const data = await response.json();
        
        // Extract the download URLs for Windows and macOS
        const windowsDownload = data.assets.find(asset => asset.name.includes('WINDOWS'))?.browser_download_url;
        const macDownload = data.assets.find(asset => asset.name.includes('macOS'))?.browser_download_url;
        
        // Detect OS and set appropriate download link
        const os = detectOS();
        const downloadLink = document.getElementById("download-link");
        
        if (os === "macos" && macDownload) {
            downloadLink.href = macDownload;
            downloadLink.textContent = "Download for macOS";
        } else if (os === "windows" && windowsDownload) {
            downloadLink.href = windowsDownload;
            downloadLink.textContent = "Download for Windows";
        } else if (windowsDownload) {
            // Fallback to Windows if OS detection fails
            downloadLink.href = windowsDownload;
            downloadLink.textContent = "Download";
        } else if (macDownload) {
            // Fallback to macOS if Windows not available
            downloadLink.href = macDownload;
            downloadLink.textContent = "Download";
        }
        
    } catch (error) {
        console.error('Error fetching latest release:', error);
        // Fallback to manual links if API fails
        const os = detectOS();
        const downloadLink = document.getElementById("download-link");
        
        if (os === "macos") {
            downloadLink.href = 'https://github.com/Adam-Color/AppUsageGUI/releases/download/v1.8.3/AppUsageGUI_v1.8.3_macOS_arm64_setup.dmg';
            downloadLink.textContent = "Download for macOS";
        } else if (os === "windows") {
            downloadLink.href = 'https://github.com/Adam-Color/AppUsageGUI/releases/download/v1.8.3/AppUsageGUI_v1.8.3_WINDOWS_setup.exe';
            downloadLink.textContent = "Download for Windows";
        } else {
            downloadLink.href = 'https://github.com/Adam-Color/AppUsageGUI/releases';
            downloadLink.textContent = "Download from GitHub";
        }
    }
}

// Function to detect OS
function detectOS() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Win") !== -1 || userAgent.indexOf("Windows") !== -1) {
        return "windows";
    } else if (userAgent.indexOf("Mac") !== -1 || userAgent.indexOf("Macintosh") !== -1 || userAgent.indexOf("MacIntel") !== -1) {
        return "macos";
    } else if (userAgent.indexOf("Linux") !== -1) {
        return "linux";
    } else {
        return "unknown";
    }
}

// Run on page load
window.addEventListener("load", getLatestRelease);

