console.log("App logic loaded.");


// --- 3D Model Viewer Progress Handler ---
const onProgress = (event) => {
    const progressBar = event.target.querySelector('.progress-bar');
    const updatingBar = event.target.querySelector('.update-bar');
    
    if (!progressBar || !updatingBar) return;
    
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
    
    if (event.detail.totalProgress === 1) {
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

const modalContentShqip = document.getElementById('content-shqip');
const modalContentEnglish = document.getElementById('content-english');
const modalContentSerbian = document.getElementById('content-serbian');

// --- Content Variables (Copied from HTML file) ---

const englishText = `
    <h4 class="text-xl font-bold mb-3 text-gray-900">The Orbital Explorer Suit</h4>
    <p>This 3D model represents a modern astronaut suit designed for extended missions in low Earth orbit (LEO). The suit, designated 'Astra-V,' features advanced life support systems, including a closed-loop recycling system for oxygen and water, and a multi-layered thermal control shell. The primary material is a high-density poly-fiber, providing robust protection against micrometeoroids and dangerous radiation exposure.</p>
    
    <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Key Features:</h4>
    <ul class="list-disc list-inside space-y-1">
        <li><strong>Mobility:</strong> Advanced joint bearings in the shoulders and hips allow for superior articulation during EVA (Extra-Vehicular Activity).</li>
        <li><strong>Comms:</strong> Integrated helmet communication array with redundant channels for reliable voice and data transmission.</li>
        <li><strong>Propulsion:</strong> Equipped with a self-contained maneuvering unit (SAFER) backpack for emergency relocation.</li>
    </ul>
    <p class="mt-4 text-sm text-red-600 font-medium">Disclaimer: This model is provided for visualization purposes only and should not be used for flight planning or real-world space operations.</p>
`;

const shqipText = `
    <h4 class="text-xl font-bold mb-3 text-gray-900">Kostumi i Eksploruesit Orbital</h4>
    <p>Ky model 3D përfaqëson një kostum modern astronauti të projektuar për misione të zgjatura në orbitën e ulët të Tokës (LEO). Kostumi, i emërtuar 'Astra-V,' përmban sisteme të avancuara të mbështetjes së jetës, duke përfshirë një sistem riciklimi me qark të mbyllur për oksigjenin dhe ujin, si dhe një shtresë shumë-funksionale për kontrollin termik. Materiali kryesor është një polifibër me densitet të lartë, që ofron mbrojtje të fortë kundër mikrometeoritëve dhe ekspozimit ndaj rrezatimit të rrezikshëm.</p>
    
    <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Karakteristikat Kryesore:</h4>
    <ul class="list-disc list-inside space-y-1">
        <li><strong>Lëvizshmëria:</strong> Kushinetat e avancuara të kyçeve në shpatulla dhe ije lejojnë artikulim superior gjatë EVA (Aktiviteti Jashtë-Automjetit).</li>
        <li><strong>Komunikimi:</strong> Sistemi i integruar i komunikimit në helmetë me kanale të tepërta për transmetim të besueshëm të zërit dhe të dhënave.</li>
        <li><strong>Shtytja:</strong> I pajisur me një njësi manovruese të pavarur (SAFER) në shpinë për zhvendosje emergjente.</li>
    </ul>
    <p class="mt-4 text-sm text-red-600 font-medium">Mohim Përgjegjësie: Ky model ofrohet vetëm për qëllime vizualizimi dhe nuk duhet të përdoret për planifikimin e fluturimeve ose operacionet reale hapësinore.</p>
`;

const serbianText = `
    <h4 class="text-xl font-bold mb-3 text-gray-900">Orbitalno Istraživačko Odelo</h4>
    <p>Ovaj 3D model predstavlja moderno astronautsko odelo dizajnirano za produžene misije u niskoj Zemljinoj orbiti (LEO). Odelo, nazvano 'Astra-V', poseduje napredne sisteme za održavanje života, uključujući sistem zatvorene petlje za reciklažu kiseonika i vode, kao i višeslojnu školjku za termičku kontrolu. Primarni materijal je polifiber visoke gustine, koji pruža robusnu zaštitu od mikrometeoroida i opasnog izlaganja zračenju.</p>
    
    <h4 class="text-lg font-semibold mt-4 mb-2 text-gray-800">Ključne Karakteristike:</h4>
    <ul class="list-disc list-inside space-y-1">
        <li><strong>Pokretljivost:</strong> Napredni ležajevi zglobova u ramenima i kukovima omogućavaju superiornu artikulaciju tokom EVA (Ekstra-Vozilne Aktivnosti).</li>
        <li><strong>Komunikacija:</strong> Integrisani komunikacioni niz u kacigi sa redundantnim kanalima za pouzdan prenos glasa i podataka.</li>
        <li><strong>Pogonski Sistem:</strong> Opremljen samostalnom manevarskom jedinicom (SAFER) rancem za hitno premeštanje.</li>
    </ul>
    <p class="mt-4 text-sm text-red-600 font-medium">Odricanje od Odgovornosti: Ovaj model je obezbeđen isključivo u svrhu vizualizacije i ne bi trebalo da se koristi za planiranje letova ili stvarne svemirske operacije.</p>
`;


// Function to open the modal
function openInfoModal() {
    // Populate all tab content divs with the unique, translated text
    modalContentShqip.innerHTML = shqipText;
    modalContentEnglish.innerHTML = englishText;
    modalContentSerbian.innerHTML = serbianText;
    
    // Ensure the first tab (Shqip) is active when opened
    switchTab('shqip');

    modal.classList.add('open');
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
        button.classList.remove('active');
        // Ensure inactive tabs have the gray background
        button.classList.add('bg-gray-200');
        button.classList.remove('bg-white', 'shadow-md');
    });

    // 2. Activate the selected content and button
    const selectedContent = document.getElementById(`content-${tabId}`);
    const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    
    if (selectedContent) selectedContent.classList.remove('hidden');
    if (selectedButton) {
        selectedButton.classList.add('active');
        // Set active tab background to white and add shadow
        selectedButton.classList.add('bg-white', 'shadow-md');
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

// Initial setup for the first tab
// Note: Since this is outside DOMContentLoaded in JSFiddle, it runs immediately.
switchTab('shqip');