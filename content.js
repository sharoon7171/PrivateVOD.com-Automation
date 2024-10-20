// content.js
window.addEventListener('load', () => {
    chrome.storage.sync.get(['clickOption', 'enableAutoClick', 'enableAutoRefresh', 'refreshInterval', 'enableMoveUserActions', 'enableAutoPlayClick'], (data) => {
        // Auto Click Logic
        if (data.enableAutoClick) {
            const button = document.querySelector('a.btn[data-label="Favorite"]'); // Adjust selector as needed
            if (button) {
                const isActive = button.classList.contains('active');
                const clickWhenActive = data.clickOption === 'active';
                const shouldClick = (clickWhenActive && isActive) || (!clickWhenActive && !isActive);

                if (shouldClick) {
                    button.click();

                    // Auto Refresh Logic
                    if (data.enableAutoRefresh) {
                        const refreshInterval = data.refreshInterval || 5; // Default to 5 seconds
                        setTimeout(() => {
                            window.location.reload(); // Refresh the page
                        }, refreshInterval * 1000); // Convert seconds to milliseconds
                    }
                }
            }
        }

        // Move User Actions Logic
        if (data.enableMoveUserActions) {
            const userActions = document.querySelector('.user-actions');
            const targetElement = document.querySelector('.navbar.navbar-expand-xl');

            if (userActions && targetElement) {
                targetElement.parentNode.insertBefore(userActions, targetElement.nextSibling);
            }
        }

        // Auto Click "Watch Now" Button Logic
        const watchNowButton = document.getElementById('ppmWatchNow');
        if (watchNowButton && data.enableAutoPlayClick) { // Check if auto play click is enabled
            watchNowButton.click(); // Simulate click on the button
        }
    });
});
