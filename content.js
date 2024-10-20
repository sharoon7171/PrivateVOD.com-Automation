// content.js
window.addEventListener('load', () => {
    chrome.storage.sync.get(['clickOption', 'enableAutoClick', 'enableAutoRefresh', 'refreshInterval', 'enableMoveUserActions'], (data) => {
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
                            location.reload(); // Refresh the page
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
                console.log('Moved user actions to the new location.');
            } else {
                console.log('User actions or target element not found.');
            }
        }

        // Auto Click "Watch Now" Button Logic
        const watchNowButton = document.getElementById('ppmWatchNow');
        if (watchNowButton) {
            watchNowButton.click(); // Simulate click on the button
            console.log('Clicked the "Watch Now" button.');
        } else {
            console.log('"Watch Now" button not found.');
        }
    });
});
