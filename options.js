// options.js

// Function to save all options
function saveOptions() {
    const isExtensionEnabled = document.getElementById('enableExtension').checked;
    const isEnabledAutoClick = document.getElementById('enableAutoClick').checked;
    const isEnabledAutoRefresh = document.getElementById('enableAutoRefresh').checked;
    const selectedOption = document.querySelector('input[name="clickOption"]:checked').value;
    const refreshInterval = document.querySelector('input[name="refreshInterval"]:checked').value;
    const isEnabledMoveUserActions = document.getElementById('enableMoveUserActions').checked;
    const isEnabledAutoPlayClick = document.getElementById('enableAutoPlayClick').checked;

    // Save all options in one go
    chrome.storage.sync.set({
        enableExtension: isExtensionEnabled,
        enableAutoClick: isEnabledAutoClick,
        enableAutoRefresh: isEnabledAutoRefresh,
        clickOption: selectedOption,
        refreshInterval: parseInt(refreshInterval, 10),
        enableMoveUserActions: isEnabledMoveUserActions,
        enableAutoPlayClick: isEnabledAutoPlayClick
    }, () => {
        console.log('Options saved');
    });
}

// Load saved options
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        enableExtension: true,
        clickOption: 'active',
        enableAutoClick: true,
        enableAutoRefresh: true,
        refreshInterval: 5,
        enableMoveUserActions: false,
        enableAutoPlayClick: true
    }, (items) => {
        // Set the radio button based on saved option
        document.getElementById('enableExtension').checked = items.enableExtension;
        document.querySelector(`input[name="clickOption"][value="${items.clickOption}"]`).checked = true;
        // Set the checkbox based on saved state
        document.getElementById('enableAutoClick').checked = items.enableAutoClick;
        document.getElementById('enableAutoRefresh').checked = items.enableAutoRefresh;
        if (items.refreshInterval) {
            document.querySelector(`input[name="refreshInterval"][value="${items.refreshInterval}"]`).checked = true;
        }
        document.getElementById('enableMoveUserActions').checked = items.enableMoveUserActions;
        document.getElementById('enableAutoPlayClick').checked = items.enableAutoPlayClick;

        // Remove the loading class to show the options
        document.body.classList.remove('loading');
    });
});

// Event listener for all input elements to auto-save
document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', saveOptions);
});
