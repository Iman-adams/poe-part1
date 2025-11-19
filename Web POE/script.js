// =========================================================
// CAPE MALAY KITCHEN - COMPLETE INTERACTIVE EFFECTS
// =========================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION GLOW & BOUNCE EFFECT ==========
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Mouse enter - glow and bounce
        link.addEventListener('mouseenter', function() {
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('nav-active'));
            // Add active to hovered link
            this.classList.add('nav-active');
        });
        
        // Mouse leave - return to normal
        link.addEventListener('mouseleave', function() {
            // Only remove if it's not the current page
            if (!this.classList.contains('current-page')) {
                this.classList.remove('nav-active');
            }
        });
        
        // Mark current page
        const currentPage = window.location.pathname.split('/').pop();
        if (this.getAttribute('href') === currentPage) {
            this.classList.add('current-page', 'nav-active');
        }
    });
    
    // ========== RECIPE CARD HOVER BOUNCE EFFECT ==========
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        // Hover bounce effect only - NO FLIP
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
    
    // ========== WORD-BY-WORD GLOW EFFECT ==========
    function addWordGlowToElement(element) {
        if (element.classList.contains('glow-processed')) return;
        
        const text = element.innerHTML;
        // Wrap each word in a span, preserving HTML structure
        const wrappedText = text.replace(
            /\b(\w+)\b/g, 
            '<span class="glow-word">$1</span>'
        );
        element.innerHTML = wrappedText;
        element.classList.add('glow-processed');
    }
    
    function initializeWordGlow() {
        // Apply to all text elements
        const textElements = document.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, p, li, section, main, .site-footer p'
        );
        
        textElements.forEach(element => {
            addWordGlowToElement(element);
        });
        
        // Add hover events to all glow words
        const glowWords = document.querySelectorAll('.glow-word');
        glowWords.forEach(word => {
            word.addEventListener('mouseenter', function() {
                this.classList.add('word-glow-active');
            });
            
            word.addEventListener('mouseleave', function() {
                this.classList.remove('word-glow-active');
            });
        });
    }
    
    // Initialize word glow effects
    initializeWordGlow();
    
    // ========== FORM INPUT EFFECTS ==========
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 15px rgba(245, 185, 66, 0.5)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ========== IMAGE HOVER EFFECTS ==========
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ========== FORM VALIDATION & FUNCTIONALITY ==========
    
    // Enquiry Form
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateEnquiryForm()) {
                calculateCostEstimate();
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateContactForm()) {
                prepareEmail();
            }
        });
    }

    // New Estimate button
    const newEstimateBtn = document.getElementById('newEstimate');
    if (newEstimateBtn) {
        newEstimateBtn.addEventListener('click', function() {
            document.getElementById('estimateResult').style.display = 'none';
            enquiryForm.style.display = 'block';
            enquiryForm.reset();
        });
    }

    // New Message button
    const newMessageBtn = document.getElementById('newMessage');
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            document.getElementById('formSuccess').style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
        });
    }
    
    console.log('Cape Malay Kitchen interactive effects loaded!');
});

// ========== FORM VALIDATION FUNCTIONS ==========

// Enquiry Form Validation
function validateEnquiryForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const recipeType = document.getElementById('recipeType');
    const servings = document.getElementById('servings');

    // Clear previous errors
    clearErrors();

    // Name validation
    if (!name.value.trim()) {
        showError('nameError', 'Please enter your name');
        isValid = false;
    }

    // Email validation
    if (!email.value.trim()) {
        showError('emailError', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Recipe type validation
    if (!recipeType.value) {
        showError('recipeTypeError', 'Please select a recipe type');
        isValid = false;
    }

    // Servings validation
    if (!servings.value || servings.value < 1) {
        showError('servingsError', 'Please enter a valid number of servings');
        isValid = false;
    }

    return isValid;
}

// Contact Form Validation
function validateContactForm() {
    let isValid = true;
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('subject');
    const message = document.getElementById('contactMessage');

    // Clear previous errors
    clearErrors();

    // Name validation
    if (!name.value.trim()) {
        showError('contactNameError', 'Please enter your name');
        isValid = false;
    }

    // Email validation
    if (!email.value.trim()) {
        showError('contactEmailError', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('contactEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    // Subject validation
    if (!subject.value) {
        showError('subjectError', 'Please select a subject');
        isValid = false;
    }

    // Message validation
    if (!message.value.trim()) {
        showError('contactMessageError', 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('contactMessageError', 'Message should be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

// Calculate Cost Estimate
function calculateCostEstimate() {
    const recipeType = document.getElementById('recipeType').value;
    const servings = parseInt(document.getElementById('servings').value);
    const ingredientQuality = document.getElementById('ingredientQuality').value;
    const urgency = document.getElementById('urgency').value;

    // Base costs for different recipe types
    const baseCosts = {
        'main': 120,
        'bread': 60,
        'dessert': 80,
        'drink': 40,
        'savoury': 70
    };

    // Quality multipliers
    const qualityMultipliers = {
        'budget': 0.8,
        'standard': 1,
        'premium': 1.5,
        'organic': 2
    };

    // Urgency multipliers
    const urgencyMultipliers = {
        'casual': 1,
        'moderate': 1.2,
        'urgent': 1.5
    };

    let baseCost = baseCosts[recipeType] || 80;
    let totalCost = baseCost * servings * qualityMultipliers[ingredientQuality] * urgencyMultipliers[urgency];

    // Display result
    const resultDiv = document.getElementById('estimateResult');
    const resultContent = document.getElementById('resultContent');
    
    const recipeTypeNames = {
        'main': 'Main Dish',
        'bread': 'Bread',
        'dessert': 'Dessert',
        'drink': 'Drink',
        'savoury': 'Savoury'
    };

    const qualityNames = {
        'budget': 'Budget Friendly',
        'standard': 'Standard Quality',
        'premium': 'Premium Quality',
        'organic': 'Organic'
    };

    resultContent.innerHTML = `
        <div class="estimate-details">
            <p><strong>Recipe Type:</strong> ${recipeTypeNames[recipeType]}</p>
            <p><strong>Servings:</strong> ${servings}</p>
            <p><strong>Ingredient Quality:</strong> ${qualityNames[ingredientQuality]}</p>
            <p><strong>Urgency:</strong> ${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</p>
            <div class="total-cost">
                <h4>Estimated Total Cost: R${Math.round(totalCost)}</h4>
                <p class="cost-breakdown">This includes all ingredients and basic preparation costs.</p>
            </div>
        </div>
        <div class="next-steps">
            <p>We'll email you a detailed ingredient list and preparation instructions.</p>
            <p>For personalized cooking classes or advanced techniques, please contact us directly.</p>
        </div>
    `;

    document.getElementById('enquiryForm').style.display = 'none';
    resultDiv.style.display = 'block';
}

// Prepare Email for Contact Form
function prepareEmail() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('contactMessage').value;
    const newsletter = document.getElementById('newsletter').checked;

    const subjectText = {
        'general': 'General Inquiry',
        'recipe': 'Recipe Question',
        'cultural': 'Cultural Question',
        'collaboration': 'Collaboration Request',
        'feedback': 'Website Feedback',
        'other': 'Other Inquiry'
    };

    const emailSubject = `Cape Malay Kitchen: ${subjectText[subject]} from ${name}`;
    
    let emailBody = `Name: ${name}\n`;
    emailBody += `Email: ${email}\n`;
    emailBody += `Subject: ${subjectText[subject]}\n`;
    emailBody += `Newsletter Subscription: ${newsletter ? 'Yes' : 'No'}\n\n`;
    emailBody += `Message:\n${message}\n\n`;
    emailBody += `Sent from Cape Malay Kitchen website`;

    const emailLink = document.getElementById('emailLink');
    emailLink.href = `mailto:info@capemalaykitchen.org?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
}

// ========== UTILITY FUNCTIONS ==========

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});