// options.js

// Function to save all options
function saveOptions() {
    const isEnabledAutoClick = document.getElementById('enableAutoClick').checked;
    const isEnabledAutoRefresh = document.getElementById('enableAutoRefresh').checked;
    const selectedOption = document.querySelector('input[name="clickOption"]:checked').value;
    const refreshInterval = document.querySelector('input[name="refreshInterval"]:checked').value;
    const isEnabledMoveUserActions = document.getElementById('enableMoveUserActions').checked;

    // Save all options in one go
    chrome.storage.sync.set({
        enableAutoClick: isEnabledAutoClick,
        enableAutoRefresh: isEnabledAutoRefresh,
        clickOption: selectedOption,
        refreshInterval: parseInt(refreshInterval, 10),
        enableMoveUserActions: isEnabledMoveUserActions
    }, () => {
        console.log('Options saved:', {
            enableAutoClick: isEnabledAutoClick,
            enableAutoRefresh: isEnabledAutoRefresh,
            clickOption: selectedOption,
            refreshInterval: refreshInterval,
            enableMoveUserActions: isEnabledMoveUserActions
        });
    });
}

// Load saved options
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['clickOption', 'enableAutoClick', 'enableAutoRefresh', 'refreshInterval', 'enableMoveUserActions'], (data) => {
        // Set the radio button based on saved option
        if (data.clickOption) {
            document.querySelector(`input[name="clickOption"][value="${data.clickOption}"]`).checked = true;
        }
        // Set the checkbox based on saved state
        document.getElementById('enableAutoClick').checked = data.enableAutoClick !== undefined ? data.enableAutoClick : true;
        document.getElementById('enableAutoRefresh').checked = data.enableAutoRefresh !== undefined ? data.enableAutoRefresh : true;
        if (data.refreshInterval) {
            document.querySelector(`input[name="refreshInterval"][value="${data.refreshInterval}"]`).checked = true;
        }
        document.getElementById('enableMoveUserActions').checked = data.enableMoveUserActions !== undefined ? data.enableMoveUserActions : false;
    });
});

// Event listener for all input elements to auto-save
document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', saveOptions);
});
