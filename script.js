// Property Data
const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        price: "$850,000",
        location: "New York, NY",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 2,
        area: "2,150 sq ft",
        status: "For Sale",
        description: "Stunning modern apartment in the heart of downtown with breathtaking city views.",
        image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
        id: 2,
        title: "Luxury Beach Villa",
        price: "$2,500,000",
        location: "Miami, FL",
        type: "villa",
        bedrooms: 5,
        bathrooms: 4,
        area: "4,200 sq ft",
        status: "For Sale",
        description: "Exclusive beachfront villa with private pool and spectacular ocean views.",
        image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
        id: 3,
        title: "Contemporary Family House",
        price: "$650,000",
        location: "Austin, TX",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        area: "3,100 sq ft",
        status: "For Sale",
        description: "Spacious family home with modern amenities and beautiful backyard.",
        image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
        id: 4,
        title: "Downtown Luxury Condo",
        price: "$1,200,000",
        location: "San Francisco, CA",
        type: "condo",
        bedrooms: 2,
        bathrooms: 2,
        area: "1,800 sq ft",
        status: "For Sale",
        description: "Premium condo with high-end finishes and stunning bay views.",
        image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
        id: 5,
        title: "Suburban Dream Home",
        price: "$425,000",
        location: "Seattle, WA",
        type: "house",
        bedrooms: 3,
        bathrooms: 2,
        area: "2,400 sq ft",
        status: "For Sale",
        description: "Charming suburban home perfect for families, with large yard.",
        image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
        id: 6,
        title: "Penthouse Suite",
        price: "$3,800,000",
        location: "Los Angeles, CA",
        type: "apartment",
        bedrooms: 4,
        bathrooms: 4,
        area: "5,000 sq ft",
        status: "For Sale",
        description: "Luxurious penthouse with panoramic city and mountain views.",
        image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    }
];

// State Management
let currentFilter = 'all';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const propertiesGrid = document.getElementById('properties-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchBtn = document.getElementById('search-btn');
const viewMoreBtn = document.getElementById('view-more-btn');
const scheduleBtn = document.getElementById('schedule-btn');
const propertyModal = document.getElementById('property-modal');
const scheduleModal = document.getElementById('schedule-modal');
const modalOverlay = document.getElementById('modal-overlay');
const scheduleOverlay = document.getElementById('schedule-overlay');
const modalClose = document.getElementById('modal-close');
const scheduleClose = document.getElementById('schedule-close');
const contactForm = document.getElementById('contact-form');
const scheduleForm = document.getElementById('schedule-form');
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const searchTabs = document.querySelectorAll('.search-tab');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProperties();
    initializeEventListeners();
    initializeScrollEffects();
    initializeSearchTabs();
});

// Render Properties
function renderProperties(filter = 'all') {
    const filteredProperties = filter === 'all'
        ? properties
        : properties.filter(prop => prop.type === filter);

    propertiesGrid.innerHTML = '';

    filteredProperties.forEach((property, index) => {
        const card = createPropertyCard(property, index);
        propertiesGrid.appendChild(card);
    });
}

// Create Property Card
function createPropertyCard(property, index) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const isFavorite = favorites.includes(property.id);

    card.innerHTML = `
        <div class="property-image" style="background: ${property.image}">
            <button class="property-favorite ${isFavorite ? 'active' : ''}" data-id="${property.id}">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
            <span class="property-badge">${property.status}</span>
        </div>
        <div class="property-details">
            <div class="property-price">${property.price}</div>
            <h3 class="property-title">${property.title}</h3>
            <p class="property-location">📍 ${property.location}</p>
            <div class="property-features">
                <span class="property-feature">🛏️ ${property.bedrooms} Beds</span>
                <span class="property-feature">🚿 ${property.bathrooms} Baths</span>
                <span class="property-feature">📐 ${property.area}</span>
            </div>
            <div class="property-actions">
                <button class="property-btn property-btn-primary" onclick="viewDetails(${property.id})">
                    View Details
                </button>
                <button class="property-btn property-btn-outline" onclick="contactAgent(${property.id})">
                    Contact Agent
                </button>
            </div>
        </div>
    `;

    // Add favorite button listener
    const favoriteBtn = card.querySelector('.property-favorite');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(property.id);
    });

    return card;
}

// Toggle Favorite
function toggleFavorite(propertyId) {
    const index = favorites.indexOf(propertyId);

    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(propertyId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderProperties(currentFilter);

    // Show toast notification
    showToast(index > -1 ? 'Removed from favorites' : 'Added to favorites');
}

// View Property Details
function viewDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div style="padding: 3rem;">
            <div style="width: 100%; height: 400px; background: ${property.image}; border-radius: 16px; margin-bottom: 2rem;"></div>
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2.5rem; margin-bottom: 1rem;">${property.title}</h2>
            <p style="font-size: 1.875rem; color: hsl(220, 85%, 57%); font-weight: 800; margin-bottom: 1rem;">${property.price}</p>
            <p style="color: hsl(220, 10%, 45%); margin-bottom: 2rem;">📍 ${property.location}</p>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding: 2rem; background: hsl(220, 15%, 95%); border-radius: 16px; margin-bottom: 2rem;">
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">🛏️</div>
                    <div style="font-weight: 700; margin-top: 0.5rem;">${property.bedrooms} Bedrooms</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">🚿</div>
                    <div style="font-weight: 700; margin-top: 0.5rem;">${property.bathrooms} Bathrooms</div>
                </div>
                <div style="text-align: center;">
                    <div style="font-size: 2rem;">📐</div>
                    <div style="font-weight: 700; margin-top: 0.5rem;">${property.area}</div>
                </div>
            </div>
            
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; margin-bottom: 1rem;">Description</h3>
            <p style="color: hsl(220, 10%, 45%); line-height: 1.8; margin-bottom: 2rem;">${property.description}</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <button class="btn btn-primary btn-full" onclick="scheduleModal.classList.add('active'); propertyModal.classList.remove('active');">
                    Schedule Tour
                </button>
                <button class="btn btn-outline btn-full" onclick="contactAgent(${property.id})">
                    Contact Agent
                </button>
            </div>
        </div>
    `;

    propertyModal.classList.add('active');
}

// Contact Agent
function contactAgent(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    showToast(`Contacting agent about: ${property.title}`);
    propertyModal.classList.remove('active');

    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Show Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, hsl(220, 85%, 57%) 0%, hsl(260, 85%, 57%) 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.16);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProperties(currentFilter);
        });
    });

    // Search button
    searchBtn.addEventListener('click', () => {
        const location = document.getElementById('location-input').value;
        const propertyType = document.getElementById('property-type').value;
        const priceRange = document.getElementById('price-range').value;

        showToast('Searching properties...');
        console.log('Search:', { location, propertyType, priceRange });
    });

    // View more button
    viewMoreBtn.addEventListener('click', () => {
        showToast('Loading more properties...');
    });

    // Schedule button
    scheduleBtn.addEventListener('click', () => {
        scheduleModal.classList.add('active');
    });

    // Modal close buttons
    modalClose.addEventListener('click', () => {
        propertyModal.classList.remove('active');
    });

    scheduleClose.addEventListener('click', () => {
        scheduleModal.classList.remove('active');
    });

    modalOverlay.addEventListener('click', () => {
        propertyModal.classList.remove('active');
    });

    scheduleOverlay.addEventListener('click', () => {
        scheduleModal.classList.remove('active');
    });

    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Message sent successfully!');
        contactForm.reset();
    });

    // Schedule form
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Tour scheduled successfully!');
        scheduleModal.classList.remove('active');
        scheduleForm.reset();
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '2rem';
            navLinks.style.boxShadow = '0 8px 32px rgba(0,0,0,0.16)';
        }
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Newsletter form
    document.querySelector('.btn-newsletter').addEventListener('click', (e) => {
        e.preventDefault();
        const emailInput = document.querySelector('.newsletter-input');
        if (emailInput.value) {
            showToast('Subscribed successfully!');
            emailInput.value = '';
        }
    });

    // Service card buttons
    document.querySelectorAll('.service-card .btn-text').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Learn more about our services');
        });
    });

    // About CTA button
    const aboutCta = document.querySelector('.about-cta');
    if (aboutCta) {
        aboutCta.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll animations for sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Set initial state for sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
    });
}

// Initialize Search Tabs
function initializeSearchTabs() {
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const searchType = tab.dataset.type;
            showToast(`Switched to ${searchType} mode`);
        });
    });
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add interactivity to all buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);
    }
});

console.log('🏠 LuxeEstate website loaded successfully!');
console.log(`📊 ${properties.length} properties available`);
