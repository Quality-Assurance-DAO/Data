/**
 * Utility Functions for Token Distribution Dashboard
 */

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format number with commas
function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(num);
}

// Format percentage
function formatPercent(value) {
    return `${value.toFixed(1)}%`;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Show element
function show(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    if (element) {
        element.style.display = 'block';
    }
}

// Hide element
function hide(element) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    if (element) {
        element.style.display = 'none';
    }
}

// Toggle element visibility
function toggle(element, force) {
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    if (element) {
        if (force !== undefined) {
            element.style.display = force ? 'block' : 'none';
        } else {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    }
}

// Set text content safely
function setText(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text;
    }
}

// Get project size category
function getProjectSizeCategory(funding) {
    if (funding < 10000) return 'small';
    if (funding <= 50000) return 'medium';
    return 'large';
}

// Calculate cumulative array
function calculateCumulative(arr) {
    return arr.reduce((acc, val, i) => {
        acc.push((acc[i - 1] || 0) + val);
        return acc;
    }, []);
}

// Get color by category
function getCategoryColor(category) {
    const colors = {
        'project': '#3B82F6',
        'participant': '#10B981',
        'auditor': '#F59E0B'
    };
    return colors[category.toLowerCase()] || '#6B7280';
}

// Get approach color
function getApproachColor(approach) {
    const colors = {
        'pure': '#8B5CF6',
        'hybrid': '#EC4899'
    };
    return colors[approach.toLowerCase()] || '#6B7280';
}

// Create color with alpha
function colorWithAlpha(color, alpha) {
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Sort array of objects by key
function sortBy(arr, key, ascending = true) {
    return [...arr].sort((a, b) => {
        let aVal = a[key];
        let bVal = b[key];
        
        // Handle nested keys (e.g., 'token_distribution.project_tokens')
        if (key.includes('.')) {
            const keys = key.split('.');
            aVal = keys.reduce((obj, k) => obj[k], a);
            bVal = keys.reduce((obj, k) => obj[k], b);
        }
        
        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }
        
        if (ascending) {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
    });
}

// Filter projects by criteria
function filterProjects(projects, criteria) {
    return projects.filter(project => {
        // Size filter
        if (criteria.size && criteria.size !== 'all') {
            const projectSize = getProjectSizeCategory(project.requested_funding_usd);
            if (projectSize !== criteria.size) return false;
        }
        
        // Search filter
        if (criteria.search) {
            const searchLower = criteria.search.toLowerCase();
            if (!project.proposal_name.toLowerCase().includes(searchLower)) {
                return false;
            }
        }
        
        return true;
    });
}

// Deep clone object
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Wait for element to be ready
function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

// Export for use in other files
window.Utils = {
    formatCurrency,
    formatNumber,
    formatPercent,
    debounce,
    show,
    hide,
    toggle,
    setText,
    getProjectSizeCategory,
    calculateCumulative,
    getCategoryColor,
    getApproachColor,
    colorWithAlpha,
    sortBy,
    filterProjects,
    deepClone,
    waitForElement
};

