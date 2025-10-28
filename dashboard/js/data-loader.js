/**
 * Data Loader for Token Distribution Dashboard
 * Loads and parses both pure milestone and hybrid vesting JSON data
 */

class DataLoader {
    constructor() {
        this.pureData = null;
        this.hybridData = null;
        this.loaded = false;
    }

    async loadAll() {
        try {
            const [pureResponse, hybridResponse] = await Promise.all([
                fetch('data/pure-milestone.json'),
                fetch('data/hybrid-vesting.json')
            ]);

            if (!pureResponse.ok || !hybridResponse.ok) {
                throw new Error('Failed to load data files');
            }

            this.pureData = await pureResponse.json();
            this.hybridData = await hybridResponse.json();
            this.loaded = true;

            return {
                pure: this.pureData,
                hybrid: this.hybridData
            };
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }

    getPureData() {
        return this.pureData;
    }

    getHybridData() {
        return this.hybridData;
    }

    getPureProject(projectName) {
        if (!this.pureData) return null;
        return this.pureData.allocations.find(
            p => p.proposal_name === projectName
        );
    }

    getHybridProject(projectName) {
        if (!this.hybridData) return null;
        return this.hybridData.allocations.find(
            p => p.proposal_name === projectName
        );
    }

    getAllProjects() {
        if (!this.pureData) return [];
        return this.pureData.allocations;
    }

    getSummary(approach = 'pure') {
        const data = approach === 'pure' ? this.pureData : this.hybridData;
        return data ? data.summary : null;
    }

    getMetadata(approach = 'pure') {
        const data = approach === 'pure' ? this.pureData : this.hybridData;
        return data ? data.metadata : null;
    }

    // Get vesting timeline data for charts
    getTimelineData(projectName, approach = 'pure') {
        if (approach === 'pure') {
            const project = this.getPureProject(projectName);
            if (!project) return null;

            // Extract milestone data
            const milestones = ['Milestone 1 (25%)', 'Milestone 2 (50%)', 'Milestone 3 (75%)', 'Milestone 4 (100%)'];
            const labels = ['M1', 'M2', 'M3', 'M4'];
            
            // Calculate cumulative tokens
            let cumulativeProject = 0;
            let cumulativeParticipant = 0;
            let cumulativeAuditor = 0;
            let cumulativeTotal = 0;

            const projectData = [];
            const participantData = [];
            const auditorData = [];
            const totalData = [];

            milestones.forEach(milestone => {
                const release = project.milestone_releases[milestone];
                cumulativeProject += release.project_tokens;
                cumulativeParticipant += release.participant_tokens;
                cumulativeAuditor += release.auditor_tokens;
                cumulativeTotal += release.total_release;

                projectData.push(cumulativeProject);
                participantData.push(cumulativeParticipant);
                auditorData.push(cumulativeAuditor);
                totalData.push(cumulativeTotal);
            });

            return {
                labels,
                datasets: {
                    project: projectData,
                    participant: participantData,
                    auditor: auditorData,
                    total: totalData
                }
            };
        } else {
            // Hybrid vesting
            const project = this.getHybridProject(projectName);
            if (!project) return null;

            const labels = project.monthly_timeline.map(m => `M${m.month}`);
            const projectData = project.monthly_timeline.map(m => m.cumulative_vested.project);
            const participantData = project.monthly_timeline.map(m => m.cumulative_vested.participant);
            const auditorData = project.monthly_timeline.map(m => m.cumulative_vested.auditor);
            const totalData = project.monthly_timeline.map(m => 
                m.cumulative_vested.project + 
                m.cumulative_vested.participant + 
                m.cumulative_vested.auditor
            );

            return {
                labels,
                datasets: {
                    project: projectData,
                    participant: participantData,
                    auditor: auditorData,
                    total: totalData
                }
            };
        }
    }

    // Get token distribution (50/30/20)
    getDistributionData(projectName, approach = 'pure') {
        const project = approach === 'pure' 
            ? this.getPureProject(projectName)
            : this.getHybridProject(projectName);

        if (!project) return null;

        return {
            labels: ['Project (50%)', 'Participant (30%)', 'Auditor (20%)'],
            values: [
                project.token_distribution.project_tokens,
                project.token_distribution.participant_tokens,
                project.token_distribution.auditor_tokens
            ]
        };
    }

    // Get vesting rate data (Hybrid only)
    getVestingRateData(projectName) {
        const project = this.getHybridProject(projectName);
        if (!project) return null;

        const labels = project.monthly_timeline.map(m => `Month ${m.month}`);
        const rates = project.monthly_timeline.map(m => 
            m.vested_this_month.project + 
            m.vested_this_month.participant + 
            m.vested_this_month.auditor
        );

        const milestones = project.monthly_timeline.map(m => m.milestones_achieved.length > 0);

        return {
            labels,
            rates,
            milestones
        };
    }

    // Get data for scenario simulator
    getScenarioData(projectName, month, approach = 'pure') {
        if (approach === 'pure') {
            const project = this.getPureProject(projectName);
            if (!project) return null;

            // For pure milestone, month represents milestones completed
            const milestones = ['Milestone 1 (25%)', 'Milestone 2 (50%)', 'Milestone 3 (75%)', 'Milestone 4 (100%)'];
            let vested = 0;
            const numMilestones = Math.min(month, 4);

            for (let i = 0; i < numMilestones; i++) {
                vested += project.milestone_releases[milestones[i]].total_release;
            }

            return {
                vested,
                unvested: project.total_tokens - vested,
                percentage: (vested / project.total_tokens) * 100,
                milestonesCompleted: numMilestones
            };
        } else {
            const project = this.getHybridProject(projectName);
            if (!project) return null;

            if (month < 0 || month >= project.monthly_timeline.length) return null;

            const snapshot = project.monthly_timeline[month];
            const vested = snapshot.cumulative_vested.project + 
                          snapshot.cumulative_vested.participant + 
                          snapshot.cumulative_vested.auditor;

            return {
                vested,
                unvested: project.total_tokens - vested,
                percentage: snapshot.vested_percentages.total,
                month,
                pastCliff: snapshot.past_cliff,
                milestonesAchieved: snapshot.milestones_achieved
            };
        }
    }

    // Get aggregate portfolio data
    getPortfolioData(approach = 'pure') {
        const data = approach === 'pure' ? this.pureData : this.hybridData;
        if (!data) return null;

        if (approach === 'pure') {
            // Aggregate all projects
            const labels = ['M1', 'M2', 'M3', 'M4'];
            const milestones = ['Milestone 1 (25%)', 'Milestone 2 (50%)', 'Milestone 3 (75%)', 'Milestone 4 (100%)'];
            
            const totalByMilestone = [0, 0, 0, 0];
            
            data.allocations.forEach(project => {
                milestones.forEach((milestone, i) => {
                    totalByMilestone[i] += project.milestone_releases[milestone].total_release;
                });
            });

            // Calculate cumulative
            const cumulative = Utils.calculateCumulative(totalByMilestone);

            return {
                labels,
                values: cumulative
            };
        } else {
            // Hybrid - aggregate monthly
            const labels = Array.from({length: 13}, (_, i) => `M${i}`);
            const monthlyTotals = Array(13).fill(0);

            data.allocations.forEach(project => {
                project.monthly_timeline.forEach((month, i) => {
                    monthlyTotals[i] += month.cumulative_vested.project + 
                                       month.cumulative_vested.participant + 
                                       month.cumulative_vested.auditor;
                });
            });

            return {
                labels,
                values: monthlyTotals
            };
        }
    }
}

// Create global instance
window.dataLoader = new DataLoader();

