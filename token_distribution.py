#!/usr/bin/env python3
"""
Token Distribution Framework Prototype
======================================

This script applies the Token Distribution Framework from Project-AMM.md to
Catalyst Fund 5 Developer Ecosystem data, calculating token allocations across
three categories: Project, Participant, and Auditor tokens with milestone-based vesting.

Token Allocation Model:
- Project Tokens: 50% - Direct project funding/liquidity
- Participant Tokens: 30% - For developers and contributors  
- Auditor Tokens: 20% - For verification and milestone auditing

Milestone Structure:
- Milestone 1: 25% completion
- Milestone 2: 50% completion
- Milestone 3: 75% completion
- Milestone 4: 100% completion

Conversion Rate: 1 USD = 1 Token Unit
"""

import csv
import json
from datetime import datetime
from typing import List, Dict, Any
from dataclasses import dataclass, asdict


# Configuration Constants
PROJECT_TOKEN_RATIO = 0.50
PARTICIPANT_TOKEN_RATIO = 0.30
AUDITOR_TOKEN_RATIO = 0.20
MILESTONES = [0.25, 0.50, 0.75, 1.00]
MILESTONE_NAMES = ["Milestone 1 (25%)", "Milestone 2 (50%)", "Milestone 3 (75%)", "Milestone 4 (100%)"]
TOKEN_CONVERSION_RATE = 1.0  # 1 USD = 1 Token


@dataclass
class TokenAllocation:
    """Represents token allocation for a single project"""
    proposal_name: str
    requested_funding_usd: float
    total_tokens: float
    project_tokens: float
    participant_tokens: float
    auditor_tokens: float
    milestone_releases: Dict[str, Dict[str, float]]
    

@dataclass
class AllocationSummary:
    """Summary statistics across all projects"""
    total_projects: int
    total_funding_usd: float
    total_tokens: float
    total_project_tokens: float
    total_participant_tokens: float
    total_auditor_tokens: float
    

class TokenDistributionProcessor:
    """Main processor for token distribution calculations"""
    
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.allocations: List[TokenAllocation] = []
        
    def parse_funding_amount(self, funding_str: str) -> float:
        """Parse funding amount from string format like '$7,500' or '$50,000'"""
        try:
            # Remove $, commas, and whitespace
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
                # Filter for FUNDED status
                if row.get('STATUS', '').strip().upper() == 'FUNDED':
                    funded_projects.append(row)
                    
        print(f"Loaded {len(funded_projects)} funded projects")
        return funded_projects
        
    def calculate_token_allocation(self, project: Dict[str, Any]) -> TokenAllocation:
        """Calculate token allocation for a single project"""
        proposal_name = project['Proposal']
        funding_usd = self.parse_funding_amount(project['REQUESTED $'])
        
        # Convert funding to tokens (1:1 ratio)
        total_tokens = funding_usd * TOKEN_CONVERSION_RATE
        
        # Calculate token distribution by category
        project_tokens = total_tokens * PROJECT_TOKEN_RATIO
        participant_tokens = total_tokens * PARTICIPANT_TOKEN_RATIO
        auditor_tokens = total_tokens * AUDITOR_TOKEN_RATIO
        
        # Calculate milestone-based releases
        milestone_releases = {}
        for i, (milestone_pct, milestone_name) in enumerate(zip(MILESTONES, MILESTONE_NAMES)):
            if i == 0:
                release_pct = milestone_pct
            else:
                release_pct = milestone_pct - MILESTONES[i-1]
                
            milestone_releases[milestone_name] = {
                'project_tokens': project_tokens * release_pct,
                'participant_tokens': participant_tokens * release_pct,
                'auditor_tokens': auditor_tokens * release_pct,
                'total_release': total_tokens * release_pct
            }
            
        return TokenAllocation(
            proposal_name=proposal_name,
            requested_funding_usd=funding_usd,
            total_tokens=total_tokens,
            project_tokens=project_tokens,
            participant_tokens=participant_tokens,
            auditor_tokens=auditor_tokens,
            milestone_releases=milestone_releases
        )
        
    def process_all_projects(self):
        """Process all funded projects and calculate allocations"""
        funded_projects = self.load_funded_projects()
        
        for project in funded_projects:
            allocation = self.calculate_token_allocation(project)
            self.allocations.append(allocation)
            
        print(f"Calculated token allocations for {len(self.allocations)} projects")
        
    def generate_summary(self) -> AllocationSummary:
        """Generate summary statistics across all allocations"""
        return AllocationSummary(
            total_projects=len(self.allocations),
            total_funding_usd=sum(a.requested_funding_usd for a in self.allocations),
            total_tokens=sum(a.total_tokens for a in self.allocations),
            total_project_tokens=sum(a.project_tokens for a in self.allocations),
            total_participant_tokens=sum(a.participant_tokens for a in self.allocations),
            total_auditor_tokens=sum(a.auditor_tokens for a in self.allocations)
        )
        
    def export_to_csv(self, output_path: str):
        """Export token allocations to CSV format"""
        with open(output_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            
            # Write header
            header = [
                'Proposal',
                'Requested Funding (USD)',
                'Total Tokens',
                'Project Tokens (50%)',
                'Participant Tokens (30%)',
                'Auditor Tokens (20%)',
                'M1 Project Release',
                'M1 Participant Release',
                'M1 Auditor Release',
                'M2 Project Release',
                'M2 Participant Release',
                'M2 Auditor Release',
                'M3 Project Release',
                'M3 Participant Release',
                'M3 Auditor Release',
                'M4 Project Release',
                'M4 Participant Release',
                'M4 Auditor Release'
            ]
            writer.writerow(header)
            
            # Write project data
            for alloc in self.allocations:
                row = [
                    alloc.proposal_name,
                    f"${alloc.requested_funding_usd:,.2f}",
                    f"{alloc.total_tokens:,.2f}",
                    f"{alloc.project_tokens:,.2f}",
                    f"{alloc.participant_tokens:,.2f}",
                    f"{alloc.auditor_tokens:,.2f}"
                ]
                
                # Add milestone releases
                for milestone_name in MILESTONE_NAMES:
                    milestone = alloc.milestone_releases[milestone_name]
                    row.extend([
                        f"{milestone['project_tokens']:,.2f}",
                        f"{milestone['participant_tokens']:,.2f}",
                        f"{milestone['auditor_tokens']:,.2f}"
                    ])
                    
                writer.writerow(row)
                
            # Add summary row
            summary = self.generate_summary()
            writer.writerow([])
            writer.writerow(['SUMMARY STATISTICS'])
            writer.writerow(['Total Projects', summary.total_projects])
            writer.writerow(['Total Funding (USD)', f"${summary.total_funding_usd:,.2f}"])
            writer.writerow(['Total Tokens', f"{summary.total_tokens:,.2f}"])
            writer.writerow(['Total Project Tokens (50%)', f"{summary.total_project_tokens:,.2f}"])
            writer.writerow(['Total Participant Tokens (30%)', f"{summary.total_participant_tokens:,.2f}"])
            writer.writerow(['Total Auditor Tokens (20%)', f"{summary.total_auditor_tokens:,.2f}"])
            
        print(f"CSV export completed: {output_path}")
        
    def export_to_json(self, output_path: str):
        """Export token allocations to JSON format with hierarchical structure"""
        output_data = {
            'metadata': {
                'generated_at': datetime.now().isoformat(),
                'framework_version': '1.0',
                'token_conversion_rate': TOKEN_CONVERSION_RATE,
                'distribution_ratios': {
                    'project_tokens': PROJECT_TOKEN_RATIO,
                    'participant_tokens': PARTICIPANT_TOKEN_RATIO,
                    'auditor_tokens': AUDITOR_TOKEN_RATIO
                },
                'milestones': MILESTONE_NAMES
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
                'milestone_releases': alloc.milestone_releases
            }
            output_data['allocations'].append(alloc_dict)
            
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2)
            
        print(f"JSON export completed: {output_path}")
        
    def print_summary(self):
        """Print summary statistics to console"""
        summary = self.generate_summary()
        
        print("\n" + "="*70)
        print("TOKEN DISTRIBUTION SUMMARY")
        print("="*70)
        print(f"Total Funded Projects:        {summary.total_projects}")
        print(f"Total Funding:                ${summary.total_funding_usd:,.2f}")
        print(f"Total Tokens Issued:          {summary.total_tokens:,.2f}")
        print(f"\nToken Distribution by Category:")
        print(f"  Project Tokens (50%):       {summary.total_project_tokens:,.2f}")
        print(f"  Participant Tokens (30%):   {summary.total_participant_tokens:,.2f}")
        print(f"  Auditor Tokens (20%):       {summary.total_auditor_tokens:,.2f}")
        print("="*70 + "\n")


def main():
    """Main execution function"""
    print("Token Distribution Framework Prototype")
    print("Processing Catalyst Fund 5 Developer Ecosystem Data\n")
    
    # Initialize processor
    csv_path = 'Project-Catalyst-Fund-5-Developer-Ecosystem.csv'
    processor = TokenDistributionProcessor(csv_path)
    
    # Process projects
    processor.process_all_projects()
    
    # Print summary
    processor.print_summary()
    
    # Export results
    processor.export_to_csv('token_allocations_output.csv')
    processor.export_to_json('token_allocations_output.json')
    
    print("\nProcessing complete!")
    print("Generated files:")
    print("  - token_allocations_output.csv")
    print("  - token_allocations_output.json")


if __name__ == '__main__':
    main()

