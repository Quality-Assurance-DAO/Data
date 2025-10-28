/**
 * Project Selector and Filtering Logic
 */

class ProjectSelector {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentProject = null;
        this.filters = {
            search: '',
            size: 'all',
            sort: 'name'
        };
    }

    initialize(projects) {
        this.projects = projects;
        this.filteredProjects = [...projects];
        this.setupEventListeners();
        this.populateProjectList();
    }

    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => {
                this.filters.search = e.target.value;
                this.applyFilters();
            }, 300));
        }

        // Size filter
        const sizeFilter = document.getElementById('filterSize');
        if (sizeFilter) {
            sizeFilter.addEventListener('change', (e) => {
                this.filters.size = e.target.value;
                this.applyFilters();
            });
        }

        // Sort
        const sortSelect = document.getElementById('sortBy');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.filters.sort = e.target.value;
                this.applyFilters();
            });
        }

        // Project selector
        const projectSelector = document.getElementById('projectSelector');
        if (projectSelector) {
            projectSelector.addEventListener('change', (e) => {
                this.selectProject(e.target.value);
            });
        }
    }

    applyFilters() {
        // Apply search and size filters
        this.filteredProjects = Utils.filterProjects(this.projects, {
            search: this.filters.search,
            size: this.filters.size
        });

        // Apply sorting
        const sortKey = this.filters.sort;
        if (sortKey === 'name') {
            this.filteredProjects = Utils.sortBy(this.filteredProjects, 'proposal_name', true);
        } else if (sortKey === 'funding-asc') {
            this.filteredProjects = Utils.sortBy(this.filteredProjects, 'requested_funding_usd', true);
        } else if (sortKey === 'funding-desc') {
            this.filteredProjects = Utils.sortBy(this.filteredProjects, 'requested_funding_usd', false);
        } else if (sortKey === 'tokens') {
            this.filteredProjects = Utils.sortBy(this.filteredProjects, 'total_tokens', false);
        }

        this.populateProjectList();
    }

    populateProjectList() {
        const selector = document.getElementById('projectSelector');
        if (!selector) return;

        // Clear existing options except first
        while (selector.options.length > 1) {
            selector.remove(1);
        }

        // Add filtered projects
        this.filteredProjects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.proposal_name;
            option.textContent = `${project.proposal_name} (${Utils.formatCurrency(project.requested_funding_usd)})`;
            selector.appendChild(option);
        });

        // If current project is not in filtered list, reset to "all"
        if (this.currentProject && this.currentProject !== 'all') {
            const stillExists = this.filteredProjects.some(p => p.proposal_name === this.currentProject);
            if (!stillExists) {
                selector.value = 'all';
                this.selectProject('all');
            }
        }
    }

    selectProject(projectName) {
        this.currentProject = projectName;

        if (projectName === 'all') {
            this.showPortfolioView();
        } else {
            this.showProjectView(projectName);
        }

        // Trigger charts update
        if (window.app) {
            window.app.updateDashboard();
        }
    }

    showPortfolioView() {
        // Hide project details
        Utils.hide('projectDetails');
        
        // Show summary cards
        Utils.show('summaryCards');
        
        // Update summary cards with aggregate data
        const summary = window.dataLoader.getSummary(window.app.currentApproach);
        if (summary) {
            Utils.setText('totalProjects', summary.total_projects);
            Utils.setText('totalFunding', Utils.formatCurrency(summary.total_funding_usd));
            Utils.setText('totalTokens', Utils.formatNumber(summary.total_tokens));
        }

        // Hide scenario section
        Utils.hide('scenarioSection');
        
        // Hide data table
        Utils.hide('dataTable');
    }

    showProjectView(projectName) {
        const approach = window.app ? window.app.currentApproach : 'pure';
        const project = approach === 'pure' 
            ? window.dataLoader.getPureProject(projectName)
            : window.dataLoader.getHybridProject(projectName);

        if (!project) return;

        // Show project details
        Utils.show('projectDetails');
        Utils.setText('projectTitle', project.proposal_name);
        Utils.setText('projectFunding', Utils.formatCurrency(project.requested_funding_usd));
        Utils.setText('projectTokens', Utils.formatNumber(project.total_tokens));
        Utils.setText('projectTokenValue', Utils.formatNumber(project.token_distribution.project_tokens));
        Utils.setText('participantTokenValue', Utils.formatNumber(project.token_distribution.participant_tokens));
        Utils.setText('auditorTokenValue', Utils.formatNumber(project.token_distribution.auditor_tokens));

        // Show summary cards with project-specific data
        Utils.show('summaryCards');
        Utils.setText('totalProjects', '1');
        Utils.setText('totalFunding', Utils.formatCurrency(project.requested_funding_usd));
        Utils.setText('totalTokens', Utils.formatNumber(project.total_tokens));

        // Show scenario section for hybrid
        if (approach === 'hybrid' || approach === 'comparison') {
            Utils.show('scenarioSection');
        } else {
            Utils.hide('scenarioSection');
        }

        // Show data table
        this.updateDataTable(projectName, approach);
    }

    updateDataTable(projectName, approach) {
        const tableHead = document.getElementById('tableHead');
        const tableBody = document.getElementById('tableBody');
        
        if (!tableHead || !tableBody) return;

        Utils.show('dataTable');

        if (approach === 'pure') {
            const project = window.dataLoader.getPureProject(projectName);
            if (!project) return;

            // Build table header
            tableHead.innerHTML = `
                <tr>
                    <th>Milestone</th>
                    <th>Project Tokens</th>
                    <th>Participant Tokens</th>
                    <th>Auditor Tokens</th>
                    <th>Total Release</th>
                    <th>Cumulative</th>
                </tr>
            `;

            // Build table body
            let cumulative = 0;
            const milestones = ['Milestone 1 (25%)', 'Milestone 2 (50%)', 'Milestone 3 (75%)', 'Milestone 4 (100%)'];
            
            tableBody.innerHTML = milestones.map(milestone => {
                const release = project.milestone_releases[milestone];
                cumulative += release.total_release;
                return `
                    <tr>
                        <td><strong>${milestone}</strong></td>
                        <td>${Utils.formatNumber(release.project_tokens)}</td>
                        <td>${Utils.formatNumber(release.participant_tokens)}</td>
                        <td>${Utils.formatNumber(release.auditor_tokens)}</td>
                        <td>${Utils.formatNumber(release.total_release)}</td>
                        <td><strong>${Utils.formatNumber(cumulative)}</strong></td>
                    </tr>
                `;
            }).join('');

        } else if (approach === 'hybrid') {
            const project = window.dataLoader.getHybridProject(projectName);
            if (!project) return;

            // Build table header
            tableHead.innerHTML = `
                <tr>
                    <th>Month</th>
                    <th>Milestones</th>
                    <th>Vested This Month</th>
                    <th>Cumulative Vested</th>
                    <th>% Complete</th>
                </tr>
            `;

            // Build table body
            tableBody.innerHTML = project.monthly_timeline.map(month => {
                const monthlyTotal = month.vested_this_month.project + 
                                    month.vested_this_month.participant + 
                                    month.vested_this_month.auditor;
                const cumulativeTotal = month.cumulative_vested.project + 
                                       month.cumulative_vested.participant + 
                                       month.cumulative_vested.auditor;
                
                const milestoneText = month.milestones_achieved.length > 0 
                    ? month.milestones_achieved.join(', ') 
                    : (month.month === 0 ? 'CLIFF' : '-');

                return `
                    <tr>
                        <td><strong>Month ${month.month}</strong></td>
                        <td>${milestoneText}</td>
                        <td>${Utils.formatNumber(monthlyTotal)}</td>
                        <td>${Utils.formatNumber(cumulativeTotal)}</td>
                        <td>${Utils.formatPercent(month.vested_percentages.total)}</td>
                    </tr>
                `;
            }).join('');
        }
    }

    getCurrentProject() {
        return this.currentProject;
    }

    getFilteredProjects() {
        return this.filteredProjects;
    }
}

// Create global instance
window.projectSelector = new ProjectSelector();

