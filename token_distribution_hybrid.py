#!/usr/bin/env python3
"""
Token Distribution Framework - Hybrid Vesting (Cliff + Milestone + Linear)
============================================================================

This script implements a sophisticated hybrid vesting system that combines:
- Cliff Period: Initial period where no tokens vest (prevents early abandonment)
- Milestone Unlocks: Achievements that unlock token "pools"
- Linear Vesting: Pools vest linearly over time after unlock
- Tail Vesting: Remaining tokens vest slowly for maintenance incentive

Token Allocation Model:
- Project Tokens: 50% - Direct project funding/liquidity
- Participant Tokens: 30% - For developers and contributors  
- Auditor Tokens: 20% - For verification and milestone auditing

Hybrid Vesting Structure:
- Month 0-1: Cliff period (no vesting)
- Months 1-6: Milestone unlocks with linear vesting
- Months 6-12: Tail vesting (10% of tokens for maintenance)

Conversion Rate: 1 USD = 1 Token Unit
"""

import csv
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Tuple
from dataclasses import dataclass, asdict, field


# Configuration Constants
PROJECT_TOKEN_RATIO = 0.50
PARTICIPANT_TOKEN_RATIO = 0.30
AUDITOR_TOKEN_RATIO = 0.20
TOKEN_CONVERSION_RATE = 1.0  # 1 USD = 1 Token

# Hybrid Vesting Configuration
CLIFF_PERIOD_DAYS = 30  # 1 month cliff
MILESTONE_PERIOD_MONTHS = 6  # 6 months for milestone completion
TAIL_VESTING_MONTHS = 6  # Additional 6 months tail vesting
TAIL_VESTING_RATIO = 0.10  # 10% of tokens vest in tail period
MILESTONE_VESTING_MONTHS = 2  # Each milestone pool vests over 2 months

# Milestone definitions with timing
MILESTONES = [
    {"name": "Milestone 1 (25%)", "completion_pct": 0.25, "target_month": 1},
    {"name": "Milestone 2 (50%)", "completion_pct": 0.50, "target_month": 2},
    {"name": "Milestone 3 (75%)", "completion_pct": 0.75, "target_month": 4},
    {"name": "Milestone 4 (100%)", "completion_pct": 1.00, "target_month": 6}
]


@dataclass
class MilestoneVestingSchedule:
    """Represents vesting schedule for a single milestone"""
    milestone_name: str
    unlock_month: int
    pool_size_project: float
    pool_size_participant: float
    pool_size_auditor: float
    vesting_months: int
    monthly_vest_project: float
    monthly_vest_participant: float
    monthly_vest_auditor: float


@dataclass
class MonthlyVestingSnapshot:
    """Snapshot of vesting status at a specific month"""
    month: int
    days_elapsed: int
    
    # Cliff status
    past_cliff: bool
    
    # Milestone achievements (assumed for calculation)
    milestones_achieved: List[str]
    
    # New tokens unlocked this month
    new_project_unlocked: float
    new_participant_unlocked: float
    new_auditor_unlocked: float
    
    # Tokens vested this month (from linear vesting)
    project_vested_this_month: float
    participant_vested_this_month: float
    auditor_vested_this_month: float
    
    # Cumulative vested tokens
    cumulative_project_vested: float
    cumulative_participant_vested: float
    cumulative_auditor_vested: float
    
    # Percentage of total vested
    project_vested_pct: float
    participant_vested_pct: float
    auditor_vested_pct: float
    total_vested_pct: float


@dataclass
class HybridTokenAllocation:
    """Represents hybrid vesting allocation for a single project"""
    proposal_name: str
    requested_funding_usd: float
    total_tokens: float
    project_tokens: float
    participant_tokens: float
    auditor_tokens: float
    
    # Vesting configuration
    cliff_days: int
    milestone_period_months: int
    tail_vesting_months: int
    total_duration_months: int
    
    # Token split between milestone and tail
    milestone_tokens: float
    tail_tokens: float
    
    # Milestone vesting schedule
    milestone_schedule: List[MilestoneVestingSchedule] = field(default_factory=list)
    
    # Monthly vesting timeline
    monthly_timeline: List[MonthlyVestingSnapshot] = field(default_factory=list)


@dataclass
class HybridAllocationSummary:
    """Summary statistics for hybrid vesting"""
    total_projects: int
    total_funding_usd: float
    total_tokens: float
    total_project_tokens: float
    total_participant_tokens: float
    total_auditor_tokens: float
    
    # Vesting split
    total_milestone_tokens: float
    total_tail_tokens: float
    
    # Average vesting parameters
    avg_project_duration_months: float
    cliff_period_days: int


class HybridVestingProcessor:
    """Main processor for hybrid vesting calculations"""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.allocations: List[HybridTokenAllocation] = []
        
    def parse_funding_amount(self, funding_str: str) -> float:
        """Parse funding amount from string format like '$7,500' or '$50,000'"""
        try:
            cleaned = funding_str.replace('$', '').replace(',', '').strip()
            return float(cleaned)
        except (ValueError, AttributeError):
            return 0.0
            
    def load_funded_projects(self) -> List[Dict[str, Any]]:
        """Load and filter funded projects from CSV"""
        funded_projects = []
        
        with open(self.csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                if row.get('STATUS', '').strip().upper() == 'FUNDED':
                    funded_projects.append(row)
                    
        print(f"Loaded {len(funded_projects)} funded projects")
        return funded_projects
    
    def calculate_milestone_schedule(
        self,
        project_tokens: float,
        participant_tokens: float,
        auditor_tokens: float
    ) -> List[MilestoneVestingSchedule]:
        """Calculate milestone-based vesting schedule"""
        
        # Calculate tokens allocated to milestone vesting (90% of total)
        milestone_ratio = 1.0 - TAIL_VESTING_RATIO
        milestone_project = project_tokens * milestone_ratio
        milestone_participant = participant_tokens * milestone_ratio
        milestone_auditor = auditor_tokens * milestone_ratio
        
        schedule = []
        num_milestones = len(MILESTONES)
        
        for i, milestone in enumerate(MILESTONES):
            # Each milestone unlocks equal portion
            pool_pct = 1.0 / num_milestones
            
            pool_project = milestone_project * pool_pct
            pool_participant = milestone_participant * pool_pct
            pool_auditor = milestone_auditor * pool_pct
            
            # Calculate monthly vesting amounts
            monthly_project = pool_project / MILESTONE_VESTING_MONTHS
            monthly_participant = pool_participant / MILESTONE_VESTING_MONTHS
            monthly_auditor = pool_auditor / MILESTONE_VESTING_MONTHS
            
            schedule.append(MilestoneVestingSchedule(
                milestone_name=milestone["name"],
                unlock_month=milestone["target_month"],
                pool_size_project=pool_project,
                pool_size_participant=pool_participant,
                pool_size_auditor=pool_auditor,
                vesting_months=MILESTONE_VESTING_MONTHS,
                monthly_vest_project=monthly_project,
                monthly_vest_participant=monthly_participant,
                monthly_vest_auditor=monthly_auditor
            ))
            
        return schedule
    
    def calculate_monthly_timeline(
        self,
        project_tokens: float,
        participant_tokens: float,
        auditor_tokens: float,
        milestone_schedule: List[MilestoneVestingSchedule]
    ) -> List[MonthlyVestingSnapshot]:
        """Calculate month-by-month vesting timeline"""
        
        total_duration = MILESTONE_PERIOD_MONTHS + TAIL_VESTING_MONTHS
        timeline = []
        
        # Track cumulative vesting
        cumulative_project = 0.0
        cumulative_participant = 0.0
        cumulative_auditor = 0.0
        
        # Track active milestone pools (unlocked and vesting)
        active_pools = []
        
        # Calculate tail vesting monthly amounts
        tail_project = project_tokens * TAIL_VESTING_RATIO
        tail_participant = participant_tokens * TAIL_VESTING_RATIO
        tail_auditor = auditor_tokens * TAIL_VESTING_RATIO
        
        tail_monthly_project = tail_project / TAIL_VESTING_MONTHS
        tail_monthly_participant = tail_participant / TAIL_VESTING_MONTHS
        tail_monthly_auditor = tail_auditor / TAIL_VESTING_MONTHS
        
        for month in range(total_duration + 1):
            days_elapsed = month * 30  # Approximate
            past_cliff = days_elapsed >= CLIFF_PERIOD_DAYS
            
            new_project_unlocked = 0.0
            new_participant_unlocked = 0.0
            new_auditor_unlocked = 0.0
            
            project_vested_this_month = 0.0
            participant_vested_this_month = 0.0
            auditor_vested_this_month = 0.0
            
            milestones_achieved = []
            
            # Check if any milestones unlock this month
            for ms in milestone_schedule:
                if ms.unlock_month == month and past_cliff:
                    active_pools.append({
                        'milestone': ms,
                        'months_remaining': ms.vesting_months,
                        'unlocked_month': month
                    })
                    new_project_unlocked += ms.pool_size_project
                    new_participant_unlocked += ms.pool_size_participant
                    new_auditor_unlocked += ms.pool_size_auditor
                    milestones_achieved.append(ms.milestone_name)
            
            # Calculate vesting from active pools
            if past_cliff and month > 0:
                pools_to_remove = []
                for pool in active_pools:
                    if pool['months_remaining'] > 0:
                        project_vested_this_month += pool['milestone'].monthly_vest_project
                        participant_vested_this_month += pool['milestone'].monthly_vest_participant
                        auditor_vested_this_month += pool['milestone'].monthly_vest_auditor
                        pool['months_remaining'] -= 1
                        
                        if pool['months_remaining'] == 0:
                            pools_to_remove.append(pool)
                
                # Remove fully vested pools
                for pool in pools_to_remove:
                    active_pools.remove(pool)
                
                # Add tail vesting if in tail period
                if month > MILESTONE_PERIOD_MONTHS:
                    project_vested_this_month += tail_monthly_project
                    participant_vested_this_month += tail_monthly_participant
                    auditor_vested_this_month += tail_monthly_auditor
            
            # Update cumulative
            cumulative_project += project_vested_this_month
            cumulative_participant += participant_vested_this_month
            cumulative_auditor += auditor_vested_this_month
            
            # Calculate percentages
            total_tokens = project_tokens + participant_tokens + auditor_tokens
            cumulative_total = cumulative_project + cumulative_participant + cumulative_auditor
            
            snapshot = MonthlyVestingSnapshot(
                month=month,
                days_elapsed=days_elapsed,
                past_cliff=past_cliff,
                milestones_achieved=milestones_achieved,
                new_project_unlocked=new_project_unlocked,
                new_participant_unlocked=new_participant_unlocked,
                new_auditor_unlocked=new_auditor_unlocked,
                project_vested_this_month=project_vested_this_month,
                participant_vested_this_month=participant_vested_this_month,
                auditor_vested_this_month=auditor_vested_this_month,
                cumulative_project_vested=cumulative_project,
                cumulative_participant_vested=cumulative_participant,
                cumulative_auditor_vested=cumulative_auditor,
                project_vested_pct=(cumulative_project / project_tokens * 100) if project_tokens > 0 else 0,
                participant_vested_pct=(cumulative_participant / participant_tokens * 100) if participant_tokens > 0 else 0,
                auditor_vested_pct=(cumulative_auditor / auditor_tokens * 100) if auditor_tokens > 0 else 0,
                total_vested_pct=(cumulative_total / total_tokens * 100) if total_tokens > 0 else 0
            )
            
            timeline.append(snapshot)
        
        return timeline
        
    def calculate_hybrid_allocation(self, project: Dict[str, Any]) -> HybridTokenAllocation:
        """Calculate hybrid vesting allocation for a single project"""
        proposal_name = project['Proposal']
        funding_usd = self.parse_funding_amount(project['REQUESTED $'])
        
        # Convert funding to tokens
        total_tokens = funding_usd * TOKEN_CONVERSION_RATE
        
        # Calculate token distribution by category
        project_tokens = total_tokens * PROJECT_TOKEN_RATIO
        participant_tokens = total_tokens * PARTICIPANT_TOKEN_RATIO
        auditor_tokens = total_tokens * AUDITOR_TOKEN_RATIO
        
        # Calculate milestone vs tail split
        milestone_tokens = total_tokens * (1.0 - TAIL_VESTING_RATIO)
        tail_tokens = total_tokens * TAIL_VESTING_RATIO
        
        # Calculate milestone schedule
        milestone_schedule = self.calculate_milestone_schedule(
            project_tokens, participant_tokens, auditor_tokens
        )
        
        # Calculate monthly timeline
        monthly_timeline = self.calculate_monthly_timeline(
            project_tokens, participant_tokens, auditor_tokens, milestone_schedule
        )
        
        total_duration = MILESTONE_PERIOD_MONTHS + TAIL_VESTING_MONTHS
        
        return HybridTokenAllocation(
            proposal_name=proposal_name,
            requested_funding_usd=funding_usd,
            total_tokens=total_tokens,
            project_tokens=project_tokens,
            participant_tokens=participant_tokens,
            auditor_tokens=auditor_tokens,
            cliff_days=CLIFF_PERIOD_DAYS,
            milestone_period_months=MILESTONE_PERIOD_MONTHS,
            tail_vesting_months=TAIL_VESTING_MONTHS,
            total_duration_months=total_duration,
            milestone_tokens=milestone_tokens,
            tail_tokens=tail_tokens,
            milestone_schedule=milestone_schedule,
            monthly_timeline=monthly_timeline
        )
        
    def process_all_projects(self):
        """Process all funded projects and calculate hybrid allocations"""
        funded_projects = self.load_funded_projects()
        
        for project in funded_projects:
            allocation = self.calculate_hybrid_allocation(project)
            self.allocations.append(allocation)
            
        print(f"Calculated hybrid vesting for {len(self.allocations)} projects")
        
    def generate_summary(self) -> HybridAllocationSummary:
        """Generate summary statistics"""
        return HybridAllocationSummary(
            total_projects=len(self.allocations),
            total_funding_usd=sum(a.requested_funding_usd for a in self.allocations),
            total_tokens=sum(a.total_tokens for a in self.allocations),
            total_project_tokens=sum(a.project_tokens for a in self.allocations),
            total_participant_tokens=sum(a.participant_tokens for a in self.allocations),
            total_auditor_tokens=sum(a.auditor_tokens for a in self.allocations),
            total_milestone_tokens=sum(a.milestone_tokens for a in self.allocations),
            total_tail_tokens=sum(a.tail_tokens for a in self.allocations),
            avg_project_duration_months=MILESTONE_PERIOD_MONTHS + TAIL_VESTING_MONTHS,
            cliff_period_days=CLIFF_PERIOD_DAYS
        )
        
    def export_to_csv(self, output_path: str):
        """Export hybrid vesting to CSV format"""
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Header
            header = [
                'Proposal',
                'Funding (USD)',
                'Total Tokens',
                'Project Tokens',
                'Participant Tokens',
                'Auditor Tokens',
                'Cliff (Days)',
                'Duration (Months)',
                'Milestone Tokens (90%)',
                'Tail Tokens (10%)'
            ]
            
            # Add monthly columns
            max_months = MILESTONE_PERIOD_MONTHS + TAIL_VESTING_MONTHS
            for month in range(max_months + 1):
                header.extend([
                    f'Month {month} Total Vested',
                    f'Month {month} Vested %'
                ])
            
            writer.writerow(header)
            
            # Project data
            for alloc in self.allocations:
                row = [
                    alloc.proposal_name,
                    f"${alloc.requested_funding_usd:,.2f}",
                    f"{alloc.total_tokens:,.2f}",
                    f"{alloc.project_tokens:,.2f}",
                    f"{alloc.participant_tokens:,.2f}",
                    f"{alloc.auditor_tokens:,.2f}",
                    alloc.cliff_days,
                    alloc.total_duration_months,
                    f"{alloc.milestone_tokens:,.2f}",
                    f"{alloc.tail_tokens:,.2f}"
                ]
                
                # Add monthly vesting data
                for snapshot in alloc.monthly_timeline:
                    cumulative_total = (snapshot.cumulative_project_vested + 
                                       snapshot.cumulative_participant_vested + 
                                       snapshot.cumulative_auditor_vested)
                    row.extend([
                        f"{cumulative_total:,.2f}",
                        f"{snapshot.total_vested_pct:.1f}%"
                    ])
                
                writer.writerow(row)
            
            # Summary section
            summary = self.generate_summary()
            empty_cols = [''] * (len(header) - 2)
            
            writer.writerow([''] * len(header))
            writer.writerow(['HYBRID VESTING SUMMARY'] + empty_cols + [''])
            writer.writerow(['Total Projects', summary.total_projects] + empty_cols)
            writer.writerow(['Total Funding (USD)', f"${summary.total_funding_usd:,.2f}"] + empty_cols)
            writer.writerow(['Total Tokens', f"{summary.total_tokens:,.2f}"] + empty_cols)
            writer.writerow(['Milestone Tokens (90%)', f"{summary.total_milestone_tokens:,.2f}"] + empty_cols)
            writer.writerow(['Tail Tokens (10%)', f"{summary.total_tail_tokens:,.2f}"] + empty_cols)
            writer.writerow(['Cliff Period', f"{summary.cliff_period_days} days"] + empty_cols)
            writer.writerow(['Avg Duration', f"{summary.avg_project_duration_months} months"] + empty_cols)
            
        print(f"CSV export completed: {output_path}")
        
    def export_to_json(self, output_path: str):
        """Export hybrid vesting to JSON format"""
        output_data = {
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'framework_version': '2.0-hybrid',
                'vesting_type': 'Cliff + Milestone + Linear',
                'token_conversion_rate': TOKEN_CONVERSION_RATE,
                'distribution_ratios': {
                    'project_tokens': PROJECT_TOKEN_RATIO,
                    'participant_tokens': PARTICIPANT_TOKEN_RATIO,
                    'auditor_tokens': AUDITOR_TOKEN_RATIO
                },
                'vesting_configuration': {
                    'cliff_period_days': CLIFF_PERIOD_DAYS,
                    'milestone_period_months': MILESTONE_PERIOD_MONTHS,
                    'tail_vesting_months': TAIL_VESTING_MONTHS,
                    'tail_vesting_ratio': TAIL_VESTING_RATIO,
                    'milestone_vesting_months': MILESTONE_VESTING_MONTHS
                }
            },
            'summary': asdict(self.generate_summary()),
            'allocations': []
        }
        
        for alloc in self.allocations:
            alloc_dict = {
                'proposal_name': alloc.proposal_name,
                'requested_funding_usd': alloc.requested_funding_usd,
                'total_tokens': alloc.total_tokens,
                'token_distribution': {
                    'project_tokens': alloc.project_tokens,
                    'participant_tokens': alloc.participant_tokens,
                    'auditor_tokens': alloc.auditor_tokens
                },
                'vesting_structure': {
                    'cliff_days': alloc.cliff_days,
                    'total_duration_months': alloc.total_duration_months,
                    'milestone_tokens': alloc.milestone_tokens,
                    'tail_tokens': alloc.tail_tokens
                },
                'milestone_schedule': [
                    {
                        'milestone_name': ms.milestone_name,
                        'unlock_month': ms.unlock_month,
                        'pool_sizes': {
                            'project': ms.pool_size_project,
                            'participant': ms.pool_size_participant,
                            'auditor': ms.pool_size_auditor
                        },
                        'vesting_months': ms.vesting_months,
                        'monthly_vest': {
                            'project': ms.monthly_vest_project,
                            'participant': ms.monthly_vest_participant,
                            'auditor': ms.monthly_vest_auditor
                        }
                    }
                    for ms in alloc.milestone_schedule
                ],
                'monthly_timeline': [
                    {
                        'month': snap.month,
                        'days_elapsed': snap.days_elapsed,
                        'past_cliff': snap.past_cliff,
                        'milestones_achieved': snap.milestones_achieved,
                        'new_unlocked': {
                            'project': snap.new_project_unlocked,
                            'participant': snap.new_participant_unlocked,
                            'auditor': snap.new_auditor_unlocked
                        },
                        'vested_this_month': {
                            'project': snap.project_vested_this_month,
                            'participant': snap.participant_vested_this_month,
                            'auditor': snap.auditor_vested_this_month
                        },
                        'cumulative_vested': {
                            'project': snap.cumulative_project_vested,
                            'participant': snap.cumulative_participant_vested,
                            'auditor': snap.cumulative_auditor_vested
                        },
                        'vested_percentages': {
                            'project': snap.project_vested_pct,
                            'participant': snap.participant_vested_pct,
                            'auditor': snap.auditor_vested_pct,
                            'total': snap.total_vested_pct
                        }
                    }
                    for snap in alloc.monthly_timeline
                ]
            }
            output_data['allocations'].append(alloc_dict)
            
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2)
            
        print(f"JSON export completed: {output_path}")
        
    def print_summary(self):
        """Print summary statistics to console"""
        summary = self.generate_summary()
        
        print("\n" + "="*70)
        print("HYBRID VESTING SUMMARY (Cliff + Milestone + Linear)")
        print("="*70)
        print(f"Total Funded Projects:        {summary.total_projects}")
        print(f"Total Funding:                ${summary.total_funding_usd:,.2f}")
        print(f"Total Tokens Issued:          {summary.total_tokens:,.2f}")
        print(f"\nToken Distribution by Category:")
        print(f"  Project Tokens (50%):       {summary.total_project_tokens:,.2f}")
        print(f"  Participant Tokens (30%):   {summary.total_participant_tokens:,.2f}")
        print(f"  Auditor Tokens (20%):       {summary.total_auditor_tokens:,.2f}")
        print(f"\nVesting Structure:")
        print(f"  Milestone Tokens (90%):     {summary.total_milestone_tokens:,.2f}")
        print(f"  Tail Tokens (10%):          {summary.total_tail_tokens:,.2f}")
        print(f"  Cliff Period:               {summary.cliff_period_days} days")
        print(f"  Total Duration:             {summary.avg_project_duration_months} months")
        print("="*70 + "\n")
    
    def print_example_project(self):
        """Print detailed example for one project"""
        if not self.allocations:
            return
            
        # Find a good example (Cardano Rust SDK - $50k project)
        example = None
        for alloc in self.allocations:
            if "Rust SDK" in alloc.proposal_name:
                example = alloc
                break
        
        if not example:
            example = self.allocations[1]  # Second project as fallback
            
        print("\n" + "="*70)
        print("EXAMPLE: Detailed Hybrid Vesting Timeline")
        print("="*70)
        print(f"Project: {example.proposal_name}")
        print(f"Funding: ${example.requested_funding_usd:,.2f}")
        print(f"Total Tokens: {example.total_tokens:,.2f}")
        print(f"\nVesting Parameters:")
        print(f"  Cliff Period: {example.cliff_days} days")
        print(f"  Milestone Period: {example.milestone_period_months} months")
        print(f"  Tail Period: {example.tail_vesting_months} months")
        print(f"  Total Duration: {example.total_duration_months} months")
        print(f"\n" + "-"*70)
        print(f"{'Month':<8} {'Days':<8} {'Milestone':<25} {'Vested':<15} {'%':<10}")
        print("-"*70)
        
        for snap in example.monthly_timeline:
            milestone_str = ', '.join(snap.milestones_achieved) if snap.milestones_achieved else '-'
            if len(milestone_str) > 24:
                milestone_str = milestone_str[:21] + '...'
            cumulative = (snap.cumulative_project_vested + 
                         snap.cumulative_participant_vested + 
                         snap.cumulative_auditor_vested)
            
            cliff_marker = "" if snap.past_cliff else " [CLIFF]"
            print(f"{snap.month:<8} {snap.days_elapsed:<8} {milestone_str:<25} "
                  f"{cumulative:>12,.0f}   {snap.total_vested_pct:>5.1f}%{cliff_marker}")
        
        print("="*70 + "\n")


def main():
    """Main execution function"""
    print("Token Distribution Framework - Hybrid Vesting")
    print("Implementation: Cliff + Milestone + Linear")
    print("Processing Catalyst Fund 5 Developer Ecosystem Data\n")
    
    # Initialize processor
    csv_path = 'Project-Catalyst-Fund-5-Developer-Ecosystem.csv'
    processor = HybridVestingProcessor(csv_path)
    
    # Process projects
    processor.process_all_projects()
    
    # Print summary
    processor.print_summary()
    
    # Print example
    processor.print_example_project()
    
    # Export results
    processor.export_to_csv('token_allocations_hybrid_output.csv')
    processor.export_to_json('token_allocations_hybrid_output.json')
    
    print("\nProcessing complete!")
    print("Generated files:")
    print("  - token_allocations_hybrid_output.csv")
    print("  - token_allocations_hybrid_output.json")


if __name__ == '__main__':
    main()

