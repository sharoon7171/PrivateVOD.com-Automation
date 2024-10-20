// content.js
window.addEventListener('load', () => {
    chrome.storage.sync.get({
        enableExtension: true,
        clickOption: 'active',
        enableAutoClick: true,
        enableAutoRefresh: true,
        refreshInterval: 5,
        enableMoveUserActions: false,
        enableAutoPlayClick: true
    }, (data) => {
        // Check if the extension is enabled
        if (!data.enableExtension) {
            console.log('Extension is disabled');
            return; // Exit if the extension is disabled
        }

        // Auto Click Logic - Only execute if URL contains "video.html"
        if (data.enableAutoClick && window.location.href.includes('video.html')) {
            const button = document.querySelector('a.btn[data-label="Favorite"]');
            if (button) {
                const isActive = button.classList.contains('active');
                const clickWhenActive = data.clickOption === 'active';
                const shouldClick = (clickWhenActive && isActive) || (!clickWhenActive && !isActive);

                if (shouldClick) {
                    button.click();

                    // Auto Refresh Logic
                    if (data.enableAutoRefresh) {
                        setTimeout(() => {
                            window.location.reload();
                        }, data.refreshInterval * 1000);
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
        if (data.enableAutoPlayClick) {
            const watchNowButton = document.getElementById('ppmWatchNow');
            if (watchNowButton) {
                watchNowButton.click();
            }
        }
    });
});
