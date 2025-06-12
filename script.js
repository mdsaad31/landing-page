// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated Statistics
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Tree Counter Animation
function animateTreeCounter() {
    let count = 0;
    const target = 12482;
    const speed = 100; // Lower is faster
    const counter = document.getElementById('tree-counter');

    const updateCounter = () => {
        const increment = target / speed;
        count += increment;
        if (count < target) {
            counter.innerHTML = Math.floor(count).toLocaleString();
            setTimeout(updateCounter, 20);
        } else {
            counter.innerHTML = target.toLocaleString();
        }
    };

    updateCounter();
}

// Initialize animations when elements are in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'trees-planted') {
                animateValue('trees-planted', 0, 1245678, 2000);
                animateValue('waste-recycled', 0, 856321, 2000);
                animateValue('water-saved', 0, 12456, 2000);
                animateValue('volunteers', 0, 98765, 2000);
            } else if (entry.target.id === 'tree-counter') {
                animateTreeCounter();
            }
        }
    });
}, { threshold: 0.5 });

observer.observe(document.getElementById('trees-planted'));
observer.observe(document.getElementById('tree-counter'));

// Carbon Calculator
const carbonForm = document.getElementById('carbonForm');
const calculatorResult = document.getElementById('calculatorResult');
const carbonValue = document.getElementById('carbonValue');
const carbonComparison = document.getElementById('carbonComparison');
const carbonTips = document.getElementById('carbonTips');

carbonForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const miles = parseFloat(document.getElementById('miles').value) || 0;
    const flights = parseFloat(document.getElementById('flights').value) || 0;
    const diet = document.getElementById('diet').value;

    // Calculate carbon footprint (simplified calculation)
    const electricityCO2 = electricity * 0.4 * 12; // kg CO2/year
    const gasCO2 = gas * 5.3 * 12; // kg CO2/year
    const milesCO2 = miles * 0.4 * 12; // kg CO2/year
    const flightsCO2 = flights * 200; // kg CO2/year

    let dietCO2;
    switch (diet) {
        case 'meat': dietCO2 = 3000; break;
        case 'average': dietCO2 = 2500; break;
        case 'vegetarian': dietCO2 = 1500; break;
        case 'vegan': dietCO2 = 1000; break;
        default: dietCO2 = 2500;
    }

    const totalCO2 = electricityCO2 + gasCO2 + milesCO2 + flightsCO2 + dietCO2;

    // Display results
    carbonValue.textContent = Math.round(totalCO2).toLocaleString();

    // Comparison
    const avgCO2 = 16000; // Average US annual carbon footprint
    const comparisonPercent = Math.round((totalCO2 / avgCO2) * 100);

    if (totalCO2 < avgCO2) {
        carbonComparison.textContent = `That's ${100 - comparisonPercent}% better than the average person!`;
    } else {
        carbonComparison.textContent = `That's ${comparisonPercent - 100}% higher than the average person.`;
    }

    // Tips
    let tips = [];

    if (electricityCO2 > 2000) {
        tips.push("Consider switching to renewable energy providers or installing solar panels.");
    }

    if (milesCO2 > 1000) {
        tips.push("Try carpooling, using public transportation, or switching to an electric vehicle.");
    }

    if (diet === 'meat') {
        tips.push("Reducing meat consumption can significantly lower your carbon footprint.");
    }

    if (flightsCO2 > 500) {
        tips.push("Consider video conferencing instead of short flights when possible.");
    }

    if (tips.length === 0) {
        tips.push("You're doing great! Keep up the sustainable habits.");
    }

    carbonTips.innerHTML = "<strong>Tips to reduce further:</strong><br>" + tips.join("<br>• ");

    // Show result
    calculatorResult.style.display = 'block';

    // Scroll to results
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});