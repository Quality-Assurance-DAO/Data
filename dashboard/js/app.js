/**
 * Main Application Logic
 * Initializes and coordinates all dashboard components
 */

class DashboardApp {
    constructor() {
        this.currentApproach = 'pure';
        this.initialized = false;
    }

    async initialize() {
        try {
            // Show loading state
            Utils.show('loadingState');
            Utils.hide('errorState');
            Utils.hide('summaryCards');
            Utils.hide('chartsContainer');

            // Load data
            await window.dataLoader.loadAll();

            // Initialize components
            const projects = window.dataLoader.getAllProjects();
            window.projectSelector.initialize(projects);
            window.comparisonManager.initialize();

            // Setup event listeners
            this.setupApproachSelector();
            
            // Set initial view
            window.projectSelector.selectProject('all');
            
            // Hide loading, show content
            Utils.hide('loadingState');
            Utils.show('summaryCards');
            Utils.show('chartsContainer');

            // Update vesting type in summary
            this.updateVestingTypeDisplay();

            this.initialized = true;

            // Initial dashboard update
            this.updateDashboard();

        } catch (error) {
            console.error('Initialization error:', error);
            Utils.hide('loadingState');
            Utils.show('errorState');
        }
    }

    setupApproachSelector() {
        const buttons = document.querySelectorAll('.approach-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const approach = btn.dataset.approach;
                this.setApproach(approach);
            });
        });
    }

    setApproach(approach) {
        this.currentApproach = approach;

        // Update button states
        document.querySelectorAll('.approach-btn').forEach(btn => {
            if (btn.dataset.approach === approach) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update vesting type display
        this.updateVestingTypeDisplay();

        // Show/hide scenario section
        if (approach === 'hybrid' || approach === 'comparison') {
            const currentProject = window.projectSelector.getCurrentProject();
            if (currentProject && currentProject !== 'all') {
                Utils.show('scenarioSection');
            }
        } else {
            Utils.hide('scenarioSection');
        }

        // Update dashboard
        this.updateDashboard();
    }

    updateVestingTypeDisplay() {
        const vestingTypeEl = document.getElementById('vestingType');
        if (!vestingTypeEl) return;

        const labels = {
            'pure': 'Pure Milestone',
            'hybrid': 'Hybrid Vesting',
            'comparison': 'Comparison Mode'
        };

        vestingTypeEl.textContent = labels[this.currentApproach] || 'Pure Milestone';
    }

    updateDashboard() {
        if (!this.initialized) return;

        const projectName = window.projectSelector.getCurrentProject();
        
        if (!projectName) {
            projectName = 'all';
        }

        // Update charts
        window.chartManager.updateChartsForProject(projectName, this.currentApproach);

        // Update scenario stats if visible
        if (this.currentApproach === 'hybrid' || this.currentApproach === 'comparison') {
            window.comparisonManager.updateScenarioStats();
        }
    }

    // Export current view as image (future enhancement)
    exportView() {
        alert('Export functionality coming soon!');
    }

    // Refresh data (future enhancement)
    async refreshData() {
        try {
            Utils.show('loadingState');
            await window.dataLoader.loadAll();
            this.updateDashboard();
            Utils.hide('loadingState');
        } catch (error) {
            console.error('Refresh error:', error);
            alert('Error refreshing data');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DashboardApp();
    window.app.initialize();
});

// Handle window resize for chart responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.app && window.app.initialized) {
            window.app.updateDashboard();
        }
    }, 250);
});

// Keyboard shortcuts (future enhancement)
document.addEventListener('keydown', (e) => {
    // Alt + 1: Pure Milestone
    if (e.altKey && e.key === '1') {
        e.preventDefault();
        if (window.app) {
            window.app.setApproach('pure');
        }
    }
    
    // Alt + 2: Hybrid Vesting
    if (e.altKey && e.key === '2') {
        e.preventDefault();
        if (window.app) {
            window.app.setApproach('hybrid');
        }
    }
    
    // Alt + 3: Comparison
    if (e.altKey && e.key === '3') {
        e.preventDefault();
        if (window.app) {
            window.app.setApproach('comparison');
        }
    }
});

