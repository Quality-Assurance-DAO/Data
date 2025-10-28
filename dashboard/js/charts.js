/**
 * Chart.js Configurations and Rendering
 * Handles all chart creation and updates
 */

class ChartManager {
    constructor() {
        this.charts = {};
        this.currentApproach = 'pure';
        this.currentProject = null;
    }

    destroyChart(chartId) {
        if (this.charts[chartId]) {
            this.charts[chartId].destroy();
            delete this.charts[chartId];
        }
    }

    destroyAll() {
        Object.keys(this.charts).forEach(id => this.destroyChart(id));
    }

    // Create cumulative vesting timeline chart
    createTimelineChart(projectName, approach = 'pure') {
        const data = window.dataLoader.getTimelineData(projectName, approach);
        if (!data) return;

        this.destroyChart('chartTimeline');

        const ctx = document.getElementById('chartTimeline');
        if (!ctx) return;

        this.charts.chartTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Project Tokens',
                        data: data.datasets.project,
                        borderColor: '#3B82F6',
                        backgroundColor: Utils.colorWithAlpha('#3B82F6', 0.1),
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Participant Tokens',
                        data: data.datasets.participant,
                        borderColor: '#10B981',
                        backgroundColor: Utils.colorWithAlpha('#10B981', 0.1),
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Auditor Tokens',
                        data: data.datasets.auditor,
                        borderColor: '#F59E0B',
                        backgroundColor: Utils.colorWithAlpha('#F59E0B', 0.1),
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + Utils.formatNumber(context.parsed.y) + ' tokens';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Create token distribution pie chart
    createDistributionChart(projectName, approach = 'pure') {
        const data = window.dataLoader.getDistributionData(projectName, approach);
        if (!data) return;

        this.destroyChart('chartDistribution');

        const ctx = document.getElementById('chartDistribution');
        if (!ctx) return;

        this.charts.chartDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        '#3B82F6',
                        '#10B981',
                        '#F59E0B'
                    ],
                    borderWidth: 2,
                    borderColor: '#FFFFFF'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = Utils.formatNumber(context.parsed);
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${label}: ${value} tokens (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Create vesting rate chart (Hybrid only)
    createRateChart(projectName) {
        const data = window.dataLoader.getVestingRateData(projectName);
        if (!data) return;

        this.destroyChart('chartRate');

        const ctx = document.getElementById('chartRate');
        if (!ctx) return;

        // Color bars based on whether milestone was achieved
        const backgroundColors = data.milestones.map(isMilestone => 
            isMilestone ? '#EC4899' : '#E5E7EB'
        );

        this.charts.chartRate = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Tokens Vested',
                    data: data.rates,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return Utils.formatNumber(context.parsed.y) + ' tokens';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Create comparison chart (both approaches side by side)
    createComparisonChart(projectName) {
        const pureData = window.dataLoader.getTimelineData(projectName, 'pure');
        const hybridData = window.dataLoader.getTimelineData(projectName, 'hybrid');
        
        if (!pureData || !hybridData) return;

        this.destroyChart('chartComparison');

        const ctx = document.getElementById('chartComparison');
        if (!ctx) return;

        this.charts.chartComparison = new Chart(ctx, {
            type: 'line',
            data: {
                labels: hybridData.labels, // Use hybrid labels (longer timeline)
                datasets: [
                    {
                        label: 'Pure Milestone',
                        data: [
                            0,
                            pureData.datasets.total[0],
                            pureData.datasets.total[1],
                            pureData.datasets.total[2],
                            pureData.datasets.total[3],
                            ...Array(8).fill(pureData.datasets.total[3])
                        ],
                        borderColor: '#8B5CF6',
                        backgroundColor: Utils.colorWithAlpha('#8B5CF6', 0.1),
                        borderWidth: 3,
                        pointRadius: 5,
                        tension: 0
                    },
                    {
                        label: 'Hybrid Vesting',
                        data: hybridData.datasets.total,
                        borderColor: '#EC4899',
                        backgroundColor: Utils.colorWithAlpha('#EC4899', 0.1),
                        borderWidth: 3,
                        pointRadius: 3,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + Utils.formatNumber(context.parsed.y) + ' tokens (' + 
                                       ((context.parsed.y / context.dataset.data[context.dataset.data.length - 1]) * 100).toFixed(1) + '%)';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Create category breakdown chart (stacked area)
    createCategoriesChart(projectName, approach = 'pure') {
        const data = window.dataLoader.getTimelineData(projectName, approach);
        if (!data) return;

        this.destroyChart('chartCategories');

        const ctx = document.getElementById('chartCategories');
        if (!ctx) return;

        this.charts.chartCategories = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Project',
                        data: data.datasets.project,
                        borderColor: '#3B82F6',
                        backgroundColor: Utils.colorWithAlpha('#3B82F6', 0.6),
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Participant',
                        data: data.datasets.participant,
                        borderColor: '#10B981',
                        backgroundColor: Utils.colorWithAlpha('#10B981', 0.6),
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Auditor',
                        data: data.datasets.auditor,
                        borderColor: '#F59E0B',
                        backgroundColor: Utils.colorWithAlpha('#F59E0B', 0.6),
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + Utils.formatNumber(context.parsed.y);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Create portfolio overview chart
    createPortfolioChart(approach = 'pure') {
        const data = window.dataLoader.getPortfolioData(approach);
        if (!data) return;

        this.destroyChart('chartTimeline');

        const ctx = document.getElementById('chartTimeline');
        if (!ctx) return;

        this.charts.chartTimeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Total Tokens Vested (All Projects)',
                    data: data.values,
                    borderColor: Utils.getApproachColor(approach),
                    backgroundColor: Utils.colorWithAlpha(Utils.getApproachColor(approach), 0.1),
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return Utils.formatNumber(context.parsed.y) + ' tokens';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return Utils.formatNumber(value);
                            }
                        }
                    }
                }
            }
        });
    }

    // Update all charts for a project
    updateChartsForProject(projectName, approach = 'pure') {
        this.currentProject = projectName;
        this.currentApproach = approach;

        if (projectName === 'all') {
            // Portfolio view
            this.createPortfolioChart(approach);
            Utils.hide('chartDistribution');
            Utils.hide('chartRateCard');
            Utils.hide('chartCategories');
        } else if (approach === 'comparison') {
            // Comparison mode
            Utils.hide('chartTimeline');
            Utils.hide('chartDistribution');
            Utils.hide('chartRateCard');
            Utils.hide('chartCategories');
            Utils.show('chartComparisonCard');
            this.createComparisonChart(projectName);
        } else {
            // Regular single project view
            Utils.hide('chartComparisonCard');
            this.createTimelineChart(projectName, approach);
            this.createDistributionChart(projectName, approach);
            this.createCategoriesChart(projectName, approach);
            
            if (approach === 'hybrid') {
                Utils.show('chartRateCard');
                this.createRateChart(projectName);
            } else {
                Utils.hide('chartRateCard');
            }
        }
    }
}

// Create global instance
window.chartManager = new ChartManager();

