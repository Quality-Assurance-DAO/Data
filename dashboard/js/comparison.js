/**
 * Comparison Mode Logic
 * Handles side-by-side comparisons and scenario simulations
 */

class ComparisonManager {
    constructor() {
        this.currentMonth = 0;
    }

    initialize() {
        this.setupScenarioSlider();
    }

    setupScenarioSlider() {
        const slider = document.getElementById('monthSlider');
        const monthLabel = document.getElementById('monthLabel');

        if (!slider || !monthLabel) return;

        slider.addEventListener('input', (e) => {
            this.currentMonth = parseInt(e.target.value);
            monthLabel.textContent = `Month ${this.currentMonth}`;
            this.updateScenarioStats();
        });
    }

    updateScenarioStats() {
        const statsContainer = document.getElementById('scenarioStats');
        if (!statsContainer) return;

        const projectName = window.projectSelector.getCurrentProject();
        if (!projectName || projectName === 'all') {
            statsContainer.innerHTML = '<p class="text-muted">Select a project to view scenario</p>';
            return;
        }

        const approach = window.app.currentApproach;

        if (approach === 'comparison') {
            this.showComparisonScenario(projectName, statsContainer);
        } else {
            this.showSingleScenario(projectName, approach, statsContainer);
        }
    }

    showSingleScenario(projectName, approach, container) {
        const data = window.dataLoader.getScenarioData(projectName, this.currentMonth, approach);
        if (!data) return;

        let html = '';

        if (approach === 'pure') {
            html = `
                <div class="stat-row">
                    <span class="stat-label">Milestones Completed:</span>
                    <span class="stat-value">${data.milestonesCompleted} / 4</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tokens Vested:</span>
                    <span class="stat-value">${Utils.formatNumber(data.vested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tokens Unvested:</span>
                    <span class="stat-value">${Utils.formatNumber(data.unvested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">% Complete:</span>
                    <span class="stat-value">${Utils.formatPercent(data.percentage)}</span>
                </div>
            `;
        } else {
            const statusBadge = data.pastCliff ? '✓ Past Cliff' : '⏸ In Cliff';
            const statusColor = data.pastCliff ? 'green' : 'red';

            html = `
                <div class="stat-row">
                    <span class="stat-label">Status:</span>
                    <span class="stat-value" style="color: ${statusColor}">${statusBadge}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tokens Vested:</span>
                    <span class="stat-value">${Utils.formatNumber(data.vested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Tokens Unvested:</span>
                    <span class="stat-value">${Utils.formatNumber(data.unvested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">% Complete:</span>
                    <span class="stat-value">${Utils.formatPercent(data.percentage)}</span>
                </div>
                ${data.milestonesAchieved.length > 0 ? `
                <div class="stat-row">
                    <span class="stat-label">Recent Milestones:</span>
                    <span class="stat-value" style="font-size: 0.75rem">${data.milestonesAchieved.join(', ')}</span>
                </div>
                ` : ''}
            `;
        }

        container.innerHTML = html;
    }

    showComparisonScenario(projectName, container) {
        // For comparison mode, show both approaches at current month
        const pureData = window.dataLoader.getScenarioData(projectName, this.currentMonth, 'pure');
        const hybridData = window.dataLoader.getScenarioData(projectName, this.currentMonth, 'hybrid');

        if (!pureData || !hybridData) return;

        const difference = pureData.vested - hybridData.vested;
        const diffPercent = pureData.percentage - hybridData.percentage;

        container.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <h4 style="font-size: 0.875rem; margin-bottom: 0.5rem; color: #8B5CF6;">Pure Milestone</h4>
                <div class="stat-row">
                    <span class="stat-label">Vested:</span>
                    <span class="stat-value">${Utils.formatNumber(pureData.vested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Complete:</span>
                    <span class="stat-value">${Utils.formatPercent(pureData.percentage)}</span>
                </div>
            </div>
            
            <div style="margin-bottom: 1rem;">
                <h4 style="font-size: 0.875rem; margin-bottom: 0.5rem; color: #EC4899;">Hybrid Vesting</h4>
                <div class="stat-row">
                    <span class="stat-label">Vested:</span>
                    <span class="stat-value">${Utils.formatNumber(hybridData.vested)}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Complete:</span>
                    <span class="stat-value">${Utils.formatPercent(hybridData.percentage)}</span>
                </div>
            </div>
            
            <div style="border-top: 1px solid #E5E7EB; padding-top: 0.75rem;">
                <h4 style="font-size: 0.875rem; margin-bottom: 0.5rem;">Difference</h4>
                <div class="stat-row">
                    <span class="stat-label">Tokens:</span>
                    <span class="stat-value" style="color: ${difference > 0 ? '#8B5CF6' : '#EC4899'}">
                        ${difference > 0 ? '+' : ''}${Utils.formatNumber(difference)}
                    </span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Percent:</span>
                    <span class="stat-value" style="color: ${diffPercent > 0 ? '#8B5CF6' : '#EC4899'}">
                        ${diffPercent > 0 ? '+' : ''}${Utils.formatPercent(Math.abs(diffPercent))}
                    </span>
                </div>
            </div>
        `;
    }

    // Export comparison data
    exportComparison(projectName) {
        const pureProject = window.dataLoader.getPureProject(projectName);
        const hybridProject = window.dataLoader.getHybridProject(projectName);

        if (!pureProject || !hybridProject) return null;

        return {
            project: projectName,
            funding: pureProject.requested_funding_usd,
            pure: {
                totalTokens: pureProject.total_tokens,
                milestones: pureProject.milestone_releases
            },
            hybrid: {
                totalTokens: hybridProject.total_tokens,
                vestingStructure: hybridProject.vesting_structure,
                timeline: hybridProject.monthly_timeline
            }
        };
    }

    // Generate comparison insights
    generateInsights(projectName) {
        const pureMonth4 = window.dataLoader.getScenarioData(projectName, 4, 'pure');
        const hybridMonth4 = window.dataLoader.getScenarioData(projectName, 4, 'hybrid');

        if (!pureMonth4 || !hybridMonth4) return [];

        const insights = [];

        // Insight 1: Speed difference
        if (pureMonth4.percentage === 100 && hybridMonth4.percentage < 100) {
            insights.push({
                title: 'Speed Protection',
                description: `Pure milestone allows 100% vesting if all milestones completed quickly, while hybrid limits to ${Utils.formatPercent(hybridMonth4.percentage)} at month 4.`,
                type: 'advantage-hybrid'
            });
        }

        // Insight 2: Cliff protection
        const pureMonth0 = window.dataLoader.getScenarioData(projectName, 0, 'pure');
        const hybridMonth0 = window.dataLoader.getScenarioData(projectName, 0, 'hybrid');
        
        if (pureMonth0.percentage > 0 && hybridMonth0.percentage === 0) {
            insights.push({
                title: 'Early Abandonment Protection',
                description: 'Hybrid vesting includes a cliff period that prevents any vesting in the first month, protecting against immediate abandonment.',
                type: 'advantage-hybrid'
            });
        }

        // Insight 3: Maintenance incentive
        insights.push({
            title: 'Maintenance Incentive',
            description: 'Hybrid vesting reserves 10% of tokens for tail vesting (months 6-12), incentivizing long-term support.',
            type: 'feature-hybrid'
        });

        return insights;
    }
}

// Create global instance
window.comparisonManager = new ComparisonManager();

