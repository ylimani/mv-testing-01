console.log("App logic loaded. Content is managed directly in index.html.");

// --- 1. 3D Model Viewer Progress Handler (iOS FIX INCLUDED) ---
// This handles the loading bar display for the 3D model.
const onProgress = (event) => {
    const progressBar = event.target.querySelector('.progress-bar');
    const updatingBar = event.target.querySelector('.update-bar');
    
    if (!progressBar || !updatingBar) return;
    
    // Update the width of the bar
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
    
    if (event.detail.totalProgress === 1) {
        // Loaded: Add the 'hide' class to make it fade out
        progressBar.classList.add('hide');
        // Optional: Stop listening once loaded to save resources
        event.target.removeEventListener('progress', onProgress);
    } else {
        // Loading: Remove the 'hide' class so it is visible
        progressBar.classList.remove('hide');
    }
};

// Select the model viewer ONCE
const modelViewer = document.querySelector('model-viewer');
if (modelViewer) {
    modelViewer.addEventListener('progress', onProgress);
}

// --- 2. Modal Elements ---
const infoButton = document.getElementById('openInfoModal');
const modal = document.getElementById('infoModal');
const closeModalButton = document.getElementById('closeModal');

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// --- 3. Modal Functions ---

// Function to open the modal
function openInfoModal() {
    // Ensure the first tab (Shqip) is active when opened
    switchTab('shqip');

    modal.classList.add('open');
    // Prevent scrolling on the main body when modal is open
    document.body.style.overflow = 'hidden';
}

// Function to close the modal
function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Function to switch tabs and update styling
function switchTab(tabId) {
    // A. Deactivate all content and buttons
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    tabButtons.forEach(button => {
        button.classList.remove('active', 'bg-white', 'shadow-md');
        // Ensure inactive tabs have the gray background
        button.classList.add('bg-gray-200');
    });

    // B. Activate the selected content and button
    const selectedContent = document.getElementById(`content-${tabId}`);
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    
    if (selectedContent) selectedContent.classList.remove('hidden');
    if (selectedButton) {
        selectedButton.classList.add('active', 'bg-white', 'shadow-md');
        selectedButton.classList.remove('bg-gray-200');
    }
}

// --- 4. Event Listeners ---

// Open Modal
if (infoButton) {
    infoButton.addEventListener('click', openInfoModal);
}

// Close Modal
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Close on overlay click
if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Tab Switcher Click Handler
tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const tabId = event.currentTarget.getAttribute('data-tab');
        if (tabId) {
            switchTab(tabId);
        }
    });
});

// Initial setup: ensure the first tab is visible on page load
document.addEventListener('DOMContentLoaded', () => {
    switchTab('shqip');
});
