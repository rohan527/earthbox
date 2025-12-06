// Builder page functionality

let currentStep = 1;
let totalSteps = 5;
let score = 0;
let selections = {
    container: null,
    base: null,
    plants: [],
    decorations: []
};

// Step configuration
const stepData = {
    1: {
        title: "Choose Your Container",
        subtitle: "Select the perfect home for your terrarium",
        options: [
            { id: 'sphere', name: 'Glass Sphere', price: 25, emoji: '🔮', description: 'Classic round shape, perfect for display' },
            { id: 'cube', name: 'Geometric Cube', price: 30, emoji: '📦', description: 'Modern design with clean lines' },
            { id: 'cylinder', name: 'Tall Cylinder', price: 28, emoji: '🥛', description: 'Great for vertical plant arrangements' },
            { id: 'bowl', name: 'Wide Bowl', price: 22, emoji: '🥣', description: 'Open top design for easy maintenance' }
        ]
    },
    2: {
        title: "Select Your Base Layer",
        subtitle: "Foundation for healthy plant growth",
        options: [
            { id: 'gravel', name: 'Natural Gravel', price: 8, emoji: '🪨', description: 'Excellent drainage and natural look' },
            { id: 'sand', name: 'Colored Sand', price: 10, emoji: '🏖️', description: 'Decorative layers in various colors' },
            { id: 'soil', name: 'Premium Soil Mix', price: 12, emoji: '🌱', description: 'Nutrient-rich organic blend' },
            { id: 'charcoal', name: 'Activated Charcoal', price: 9, emoji: '⚫', description: 'Keeps terrarium fresh and clean' }
        ]
    },
    3: {
        title: "Add Your Plants",
        subtitle: "Choose 2-4 plants for your ecosystem (select multiple)",
        multiple: true,
        options: [
            { id: 'fern', name: 'Mini Fern', price: 12, emoji: '🌿', description: 'Loves humidity, easy care' },
            { id: 'moss', name: 'Living Moss', price: 8, emoji: '🍀', description: 'Ground cover, vibrant green' },
            { id: 'succulent', name: 'Tiny Succulent', price: 10, emoji: '🌵', description: 'Low water, high charm' },
            { id: 'ivy', name: 'Trailing Ivy', price: 11, emoji: '🌿', description: 'Cascading beauty' },
            { id: 'peperomia', name: 'Peperomia', price: 13, emoji: '🪴', description: 'Colorful leaves, compact' },
            { id: 'fitonia', name: 'Nerve Plant', price: 14, emoji: '🌺', description: 'Stunning patterns' }
        ]
    },
    4: {
        title: "Add Decorations",
        subtitle: "Make it uniquely yours (optional, select multiple)",
        multiple: true,
        optional: true,
        options: [
            { id: 'rocks', name: 'Decorative Rocks', price: 5, emoji: '💎', description: 'Natural stone accents' },
            { id: 'crystals', name: 'Crystals', price: 8, emoji: '💠', description: 'Sparkle and energy' },
            { id: 'figurine', name: 'Mini Figurine', price: 7, emoji: '🦊', description: 'Cute woodland creatures' },
            { id: 'driftwood', name: 'Driftwood', price: 6, emoji: '🪵', description: 'Natural wood piece' },
            { id: 'shells', name: 'Seashells', price: 5, emoji: '🐚', description: 'Beach vibes' },
            { id: 'none', name: 'No Decorations', price: 0, emoji: '✨', description: 'Keep it simple and natural' }
        ]
    }
};

// Initialize builder
function initBuilder() {
    updateStepDisplay();
    renderOptions();
    updateProgress();
}

function selectOption(category, id, name, price, emoji) {
    const step = stepData[currentStep];
    
    if (step.multiple) {
        // Multiple selection (plants, decorations)
        const index = selections[category].findIndex(item => item.id === id);
        
        if (index > -1) {
            // Deselect
            selections[category].splice(index, 1);
            score -= 10;
        } else {
            // Select
            if (category === 'decorations' && id === 'none') {
                // Clear all decorations if "none" selected
                selections.decorations = [{ id, name, price, emoji }];
            } else {
                // Remove "none" if selecting an actual item
                selections[category] = selections[category].filter(item => item.id !== 'none');
                
                // Add new selection
                if (category === 'plants' && selections.plants.length < 4) {
                    selections[category].push({ id, name, price, emoji });
                    score += 10;
                } else if (category === 'decorations') {
                    selections[category].push({ id, name, price, emoji });
                    score += 5;
                }
            }
        }
        
        updateSelectionUI(category);
    } else {
        // Single selection (container, base)
        selections[category] = { id, name, price, emoji };
        score += 20;
        
        // Mark step as completed
        markStepCompleted(currentStep);
        
        // Unlock achievement
        if (currentStep === 1) {
            unlockAchievement(0, 'First Choice 🎨');
        }
        
        updateSelectionUI(category);
    }
    
    updatePreview();
    updateSummary();
    updatePrice();
    updateProgress();
    updateNavigationButtons();
}

function updateSelectionUI(category) {
    const step = stepData[currentStep];
    const cards = document.querySelectorAll('.option-card');
    
    cards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        
        if (step.multiple) {
            const isSelected = selections[category].some(item => item.id === cardId);
            card.classList.toggle('selected', isSelected);
            
            const btn = card.querySelector('.btn-select');
            if (isSelected) {
                btn.textContent = 'Selected ✓';
                btn.classList.add('btn-secondary');
                btn.classList.remove('btn-primary');
            } else {
                btn.textContent = 'Select';
                btn.classList.add('btn-primary');
                btn.classList.remove('btn-secondary');
            }
        } else {
            const isSelected = selections[category] && selections[category].id === cardId;
            card.classList.toggle('selected', isSelected);
        }
    });
}

function updatePreview() {
    const preview = document.getElementById('terrarium-preview');
    preview.classList.add('building');
    
    // Update container
    const containerLayer = document.getElementById('container-layer');
    if (selections.container) {
        containerLayer.innerHTML = selections.container.emoji;
        containerLayer.style.opacity = '1';
    }
    
    // Update base
    const baseLayer = document.getElementById('base-layer');
    if (selections.base) {
        baseLayer.innerHTML = selections.base.emoji;
        baseLayer.style.opacity = '0.8';
        baseLayer.style.fontSize = '6rem';
        baseLayer.style.bottom = '0';
        baseLayer.style.top = 'auto';
    }
    
    // Update plants
    const plantsLayer = document.getElementById('plants-layer');
    if (selections.plants.length > 0) {
        plantsLayer.innerHTML = selections.plants.map(plant => 
            `<span style="font-size: 3rem;">${plant.emoji}</span>`
        ).join('');
        plantsLayer.style.opacity = '1';
    }
    
    // Update decorations
    const decorationLayer = document.getElementById('decoration-layer');
    if (selections.decorations.length > 0 && selections.decorations[0].id !== 'none') {
        decorationLayer.innerHTML = selections.decorations.map(dec => 
            `<span style="font-size: 2rem; margin: 0.5rem;">${dec.emoji}</span>`
        ).join('');
        decorationLayer.style.opacity = '1';
    }
}

function updateSummary() {
    const summary = document.getElementById('selection-summary');
    let html = '';
    
    if (selections.container) {
        html += `<div class="summary-item"><strong>Container:</strong> ${selections.container.name}</div>`;
    }
    
    if (selections.base) {
        html += `<div class="summary-item"><strong>Base:</strong> ${selections.base.name}</div>`;
    }
    
    if (selections.plants.length > 0) {
        const plantNames = selections.plants.map(p => p.name).join(', ');
        html += `<div class="summary-item"><strong>Plants:</strong> ${plantNames}</div>`;
    }
    
    if (selections.decorations.length > 0 && selections.decorations[0].id !== 'none') {
        const decorNames = selections.decorations.map(d => d.name).join(', ');
        html += `<div class="summary-item"><strong>Decorations:</strong> ${decorNames}</div>`;
    }
    
    if (html) {
        summary.innerHTML = html;
    } else {
        summary.innerHTML = '<p class="empty-summary">Start by choosing a container!</p>';
    }
}

function updatePrice() {
    let total = 0;
    
    if (selections.container) total += selections.container.price;
    if (selections.base) total += selections.base.price;
    
    selections.plants.forEach(plant => total += plant.price);
    selections.decorations.forEach(dec => total += dec.price);
    
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

function updateProgress() {
    let completed = 0;
    
    if (selections.container) completed++;
    if (selections.base) completed++;
    if (selections.plants.length > 0) completed++;
    if (selections.decorations.length > 0 || currentStep > 4) completed++;
    
    const percentage = (completed / 4) * 100;
    document.getElementById('progress-fill').style.width = `${percentage}%`;
    document.getElementById('progress-percent').textContent = Math.round(percentage);
    document.getElementById('score').textContent = score;
}

function updateStepDisplay() {
    document.getElementById('current-step').textContent = currentStep;
    
    // Update step indicators in sidebar
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        }
        
        const statusEl = step.querySelector('.step-status');
        if (isStepCompleted(stepNum)) {
            step.classList.add('completed');
            statusEl.textContent = 'Completed';
        } else if (stepNum === currentStep) {
            statusEl.textContent = 'In Progress';
        } else {
            statusEl.textContent = 'Pending';
        }
    });
}

function isStepCompleted(stepNum) {
    switch(stepNum) {
        case 1: return selections.container !== null;
        case 2: return selections.base !== null;
        case 3: return selections.plants.length > 0;
        case 4: return selections.decorations.length > 0;
        case 5: return false; // Review step
        default: return false;
    }
}

function markStepCompleted(stepNum) {
    const step = document.querySelector(`.step[data-step="${stepNum}"]`);
    if (step) {
        step.classList.add('completed');
        step.querySelector('.step-status').textContent = 'Completed';
    }
}

function renderOptions() {
    const optionsGrid = document.getElementById('options-grid');
    const optionsTitle = document.getElementById('options-title');
    const optionsSubtitle = document.getElementById('options-subtitle');
    
    if (currentStep === 5) {
        // Review step
        showReviewStep();
        return;
    }
    
    const step = stepData[currentStep];
    optionsTitle.textContent = step.title;
    optionsSubtitle.textContent = step.subtitle;
    
    optionsGrid.innerHTML = step.options.map(option => `
        <div class="option-card" data-step="${currentStep}" data-id="${option.id}" data-name="${option.name}" data-price="${option.price}" data-emoji="${option.emoji}">
            <div class="option-image">${option.emoji}</div>
            <h3>${option.name}</h3>
            <p>${option.description}</p>
            <span class="option-price">+$${option.price}</span>
            <button class="btn btn-primary btn-select" onclick="selectOption('${getCategory()}', '${option.id}', '${option.name}', ${option.price}, '${option.emoji}')">Select</button>
        </div>
    `).join('');
}

function getCategory() {
    switch(currentStep) {
        case 1: return 'container';
        case 2: return 'base';
        case 3: return 'plants';
        case 4: return 'decorations';
        default: return '';
    }
}

function showReviewStep() {
    const optionsGrid = document.getElementById('options-grid');
    const optionsTitle = document.getElementById('options-title');
    const optionsSubtitle = document.getElementById('options-subtitle');
    
    optionsTitle.textContent = "Review Your Creation";
    optionsSubtitle.textContent = "Everything looks good? Complete your order!";
    
    optionsGrid.innerHTML = `
        <div class="review-message">
            <h2>🎉 Your Terrarium is Ready!</h2>
            <p>Review your selections and complete your order.</p>
            <button class="btn btn-primary-large" onclick="completeBuilder()" style="margin-top: 2rem;">Complete & Order</button>
        </div>
    `;
    
    optionsGrid.style.display = 'block';
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStepDisplay();
        renderOptions();
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStepDisplay();
        renderOptions();
        updateNavigationButtons();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentStep === 1;
    
    const step = stepData[currentStep];
    const canProceed = step ? (
        step.multiple ? 
            (step.optional || selections[getCategory()].length > 0) :
            (selections[getCategory()] !== null)
    ) : true;
    
    nextBtn.disabled = !canProceed;
    
    if (currentStep === 5) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

function unlockAchievement(index, name) {
    const achievements = document.querySelectorAll('.achievement');
    if (achievements[index]) {
        achievements[index].classList.remove('locked');
        achievements[index].classList.add('unlocked');
    }
}

function completeBuilder() {
    // Check achievements
    if (selections.plants.length >= 3) {
        unlockAchievement(1, 'Plant Parent 🌱');
        score += 20;
    }
    
    if (selections.decorations.length > 0 && selections.decorations[0].id !== 'none') {
        unlockAchievement(2, 'Decorator 💎');
        score += 15;
    }
    
    unlockAchievement(3, 'Master Builder 🏆');
    score += 50;
    
    updateProgress();
    
    // Show completion modal
    showCompletionModal();
}

function showCompletionModal() {
    const modal = document.getElementById('completion-modal');
    const finalScore = document.getElementById('final-score');
    const modalSummary = document.getElementById('modal-summary');
    const modalPrice = document.getElementById('modal-price');
    
    finalScore.textContent = score;
    
    let summaryHTML = '';
    if (selections.container) summaryHTML += `<p><strong>Container:</strong> ${selections.container.name}</p>`;
    if (selections.base) summaryHTML += `<p><strong>Base:</strong> ${selections.base.name}</p>`;
    if (selections.plants.length > 0) {
        summaryHTML += `<p><strong>Plants:</strong> ${selections.plants.map(p => p.name).join(', ')}</p>`;
    }
    if (selections.decorations.length > 0 && selections.decorations[0].id !== 'none') {
        summaryHTML += `<p><strong>Decorations:</strong> ${selections.decorations.map(d => d.name).join(', ')}</p>`;
    }
    
    modalSummary.innerHTML = summaryHTML;
    
    let total = 0;
    if (selections.container) total += selections.container.price;
    if (selections.base) total += selections.base.price;
    selections.plants.forEach(p => total += p.price);
    selections.decorations.forEach(d => total += d.price);
    
    modalPrice.innerHTML = `<span>Total Price:</span><span>$${total.toFixed(2)}</span>`;
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('completion-modal');
    modal.classList.remove('show');
    
    // Reset builder
    currentStep = 1;
    score = 0;
    selections = {
        container: null,
        base: null,
        plants: [],
        decorations: []
    };
    
    // Reset achievements
    document.querySelectorAll('.achievement').forEach(ach => {
        ach.classList.remove('unlocked');
        ach.classList.add('locked');
    });
    
    initBuilder();
}

function orderTerrarium() {
    // Close the modal first
    const modal = document.getElementById('completion-modal');
    modal.classList.remove('show');
    
    // Show a styled notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
    `;
    notification.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
        <h2 style="color: var(--dark-color); margin-bottom: 1rem;">Order Received!</h2>
        <p style="color: #666; margin-bottom: 1.5rem;">Thank you for your order! In a real application, this would process your payment and order.</p>
        <button onclick="this.parentElement.remove(); location.reload();" style="background: var(--primary-color); color: white; padding: 12px 30px; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer;">Got it!</button>
    `;
    document.body.appendChild(notification);
}

// Initialize on page load
if (document.querySelector('.builder-container')) {
    initBuilder();
}
