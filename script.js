console.log("App logic loaded. Content is managed directly in index.html.");

// --- 3D Model Viewer Progress Handler ---
// This handles the loading bar display for the 3D model.
const onProgress = (event) => {
    const progressBar = event.target.querySelector('.progress-bar');
    const updatingBar = event.target.querySelector('.update-bar');
    
    if (!progressBar || !updatingBar) return;
    
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
    
    if (event.detail.totalProgress === 1) {
        // Hide the bar once loading is complete
        progressBar.classList.add('hide');
        event.target.removeEventListener('progress', onProgress);
    } else {
        progressBar.classList.remove('hide');
    }
};

const modelViewer = document.querySelector('model-viewer');
if (modelViewer) {
    modelViewer.addEventListener('progress', onProgress);
}

// --- Modal Elements ---
const infoButton = document.getElementById('openInfoModal');
const modal = document.getElementById('infoModal');
const closeModalButton = document.getElementById('closeModal');

const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// NOTE: The content variables (shqipText, englishText, serbianText) 
// and the corresponding document.getElementById calls have been removed 
// because all content now lives in index.html.

// Function to open the modal
function openInfoModal() {
    // CONTENT INJECTION LINES REMOVED HERE.
    
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
    // 1. Deactivate all content and buttons
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    tabButtons.forEach(button => {
        button.classList.remove('active', 'bg-white', 'shadow-md');
        // Ensure inactive tabs have the gray background
        button.classList.add('bg-gray-200');
    });

    // 2. Activate the selected content and button
    const selectedContent = document.getElementById(`content-${tabId}`);
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    
    if (selectedContent) selectedContent.classList.remove('hidden');
    if (selectedButton) {
        selectedButton.classList.add('active', 'bg-white', 'shadow-md');
        selectedButton.classList.remove('bg-gray-200');
    }
}

// --- Event Listeners ---

// Open Modal
infoButton.addEventListener('click', openInfoModal);

// Close Modal
closeModalButton.addEventListener('click', closeModal);

// Close on overlay click
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

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
