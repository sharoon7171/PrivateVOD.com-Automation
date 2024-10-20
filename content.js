// content.js
window.addEventListener('load', () => {
    chrome.storage.sync.get(['clickOption', 'enableAutoClick', 'enableAutoRefresh', 'refreshInterval'], (data) => {
        if (data.enableAutoClick) { // Check if auto-click is enabled
            const button = document.querySelector('a.btn[data-label="Favorite"]'); // Adjust selector as needed
            if (button) {
                const isActive = button.classList.contains('active');
                const clickWhenActive = data.clickOption === 'active';
                const shouldClick = (clickWhenActive && isActive) || (!clickWhenActive && !isActive);

                if (shouldClick) {
                    button.click();

                    // Check if auto-refresh is enabled
                    if (data.enableAutoRefresh) {
                        const refreshInterval = data.refreshInterval || 5; // Default to 5 seconds
                        setTimeout(() => {
                            location.reload(); // Refresh the page
                        }, refreshInterval * 1000); // Convert seconds to milliseconds
                    }
                }
            }
        }
    });
});
