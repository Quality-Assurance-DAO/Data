# Token Distribution Framework Prototype

## Overview

This prototype applies the **Token Distribution Framework** (from `Project-AMM.md`) to the Catalyst Fund 5 Developer Ecosystem data. It implements a comprehensive token allocation system across three categories with milestone-based vesting for 24 funded projects totaling $588,202 in funding.

## Framework Implementation

### Token Categories (50/30/20 Split)

The framework distributes tokens across three stakeholder categories:

1. **Project Tokens (50%)**: Direct project funding and liquidity for ongoing operations
2. **Participant Tokens (30%)**: Rewards for developers, contributors, and team members
3. **Auditor Tokens (20%)**: Compensation for verification services and milestone auditing

### Milestone-Based Vesting

Tokens are released across 4 milestones to incentivize progress and accountability:

- **Milestone 1 (25%)**: Initial project setup and first deliverables
- **Milestone 2 (50%)**: Mid-project progress checkpoint
- **Milestone 3 (75%)**: Near-completion validation
- **Milestone 4 (100%)**: Final delivery and project completion

Each milestone releases 25% of the total token allocation across all three categories.

### Token Conversion

- **Conversion Rate**: 1 USD = 1 Token Unit
- **Total Token Supply**: 588,202 tokens (matching total funding)

## Key Features

### 1. Data Processing
- Parses the Catalyst Fund 5 CSV data
- Filters for FUNDED projects only (24 projects)
- Extracts and cleanses funding amounts
- Handles currency formatting ($, commas)

### 2. Token Calculations
For each funded project, calculates:
- Total token allocation (1:1 with USD funding)
- Distribution across three token categories (50/30/20)
- Release schedule across four milestones
- Per-milestone allocations for each category

### 3. Output Generation
Generates two comprehensive output formats:
- **CSV**: Tabular data with milestone breakdowns
- **JSON**: Hierarchical structure with metadata and summary statistics

## Usage

### Prerequisites
- Python 3.6 or higher
- No external dependencies required (uses standard library only)

### Running the Script

```bash
python3 token_distribution.py
```

The script will:
1. Load and parse `Project-Catalyst-Fund-5-Developer-Ecosystem.csv`
2. Process all funded projects
3. Calculate token allocations with milestone schedules
4. Generate output files:
   - `token_allocations_output.csv`
   - `token_allocations_output.json`
5. Display summary statistics to console

### Example Output

```
TOKEN DISTRIBUTION SUMMARY
======================================================================
Total Funded Projects:        24
Total Funding:                $588,202.00
Total Tokens Issued:          588,202.00

Token Distribution by Category:
  Project Tokens (50%):       294,101.00
  Participant Tokens (30%):   176,460.60
  Auditor Tokens (20%):       117,640.40
======================================================================
```

## Output Files

### CSV Format (`token_allocations_output.csv`)

Tabular format with the following columns:
- Proposal name
- Requested funding (USD)
- Total tokens
- Token distribution by category (Project, Participant, Auditor)
- Milestone releases (M1-M4) for each token category
- Summary statistics section at the end

### JSON Format (`token_allocations_output.json`)

Hierarchical structure containing:
- **Metadata**: Generation timestamp, framework version, distribution ratios
- **Summary**: Aggregate statistics across all projects
- **Allocations**: Detailed array of all project allocations with milestone schedules

Example structure for a single project:

```json
{
  "proposal_name": "Testnet Cardanoscan Explorer",
  "requested_funding_usd": 7500.0,
  "total_tokens": 7500.0,
  "token_distribution": {
    "project_tokens": 3750.0,
    "participant_tokens": 2250.0,
    "auditor_tokens": 1500.0
  },
  "milestone_releases": {
    "Milestone 1 (25%)": {
      "project_tokens": 937.5,
      "participant_tokens": 562.5,
      "auditor_tokens": 375.0,
      "total_release": 1875.0
    },
    ...
  }
}
```

## Example: Token Allocation Breakdown

### Project: "Cardano Rust SDK update for Alonzo"
- **Funding**: $50,000
- **Total Tokens**: 50,000

#### Category Distribution:
- Project Tokens: 25,000 (50%)
- Participant Tokens: 15,000 (30%)
- Auditor Tokens: 10,000 (20%)

#### Milestone Releases (each 25%):
| Milestone | Project | Participant | Auditor | Total |
|-----------|---------|-------------|---------|-------|
| M1 (25%)  | 6,250   | 3,750       | 2,500   | 12,500 |
| M2 (50%)  | 6,250   | 3,750       | 2,500   | 12,500 |
| M3 (75%)  | 6,250   | 3,750       | 2,500   | 12,500 |
| M4 (100%) | 6,250   | 3,750       | 2,500   | 12,500 |

## Design Decisions & Assumptions

### Token Conversion Rate
- **Choice**: 1 USD = 1 Token Unit
- **Rationale**: Simple 1:1 mapping for prototype; real implementation would need market-driven pricing

### Distribution Ratios
- **Choice**: 50/30/20 split (Project/Participant/Auditor)
- **Rationale**: Balances project funding needs with stakeholder incentives
- **Project (50%)**: Ensures adequate liquidity for operations
- **Participant (30%)**: Rewards active contributors
- **Auditor (20%)**: Compensates verification services

### Milestone Structure
- **Choice**: Equal 25% releases across 4 milestones
- **Rationale**: Provides regular checkpoints and incentivizes consistent progress
- **Real-world consideration**: Could be customized per-project based on complexity

### Vesting Approach
- **Current**: Equal distribution across milestones
- **Alternative considerations**:
  - Front-loaded for operational capital
  - Back-loaded to incentivize completion
  - Variable based on project risk profile

## Alignment with Token Distribution Framework

This prototype implements the following concepts from `Project-AMM.md`:

### ✓ Token Categories (Section 1)
- Project Tokens for liquidity and operations
- Participant Tokens for contributors
- Auditor Tokens for verification services

### ✓ Milestone-Based Release (Section 5)
- Smart contract-ready milestone structure
- Token unlock schedules based on progress
- Dynamic incentives for achievement

### ✓ Token Utility and Governance (Section 3)
- Different token types for different stakeholder roles
- Framework supports future governance mechanisms
- Structured for voting rights and benefit access

### Future Enhancements (Not Yet Implemented)
- AMM pool functionality and liquidity provision
- Price discovery mechanisms
- Liquidity incentives and market dynamics
- Risk management (dilution control)
- Regulatory compliance tracking

## Project Statistics

### Summary
- **Funded Projects**: 24
- **Total Funding**: $588,202
- **Total Tokens**: 588,202
- **Average Funding per Project**: $24,508.42

### Token Distribution
- **Project Tokens**: 294,101 (50%)
- **Participant Tokens**: 176,460.60 (30%)
- **Auditor Tokens**: 117,640.40 (20%)

### Funding Range
- **Largest Project**: $80,000 (Artificial Intelligence/ML API)
- **Smallest Project**: $5 (Quality-Assurance-DAO)
- **Median Funding**: $11,040

## Next Steps & Extensions

### Immediate Extensions
1. **Add variable vesting schedules** based on project size or complexity
2. **Implement time-based vesting** alongside milestone-based releases
3. **Add risk-adjusted allocations** for high-risk/high-reward projects
4. **Create visualization dashboard** for token distribution analytics

### Advanced Features
1. **AMM Integration**: Implement automated market maker pools
2. **Liquidity Provision**: Calculate initial liquidity requirements
3. **Price Discovery**: Model token price dynamics
4. **Governance System**: Implement voting mechanisms for each token type
5. **Performance Metrics**: Link token releases to KPIs
6. **Smart Contract Templates**: Generate deployment-ready contracts

### Data Integration
1. **Historical Performance**: Import actual project completion data
2. **Milestone Tracking**: Real-time milestone achievement monitoring
3. **Token Holder Management**: Track token distribution to individuals
4. **Audit Trail**: Complete transaction history for transparency

## Framework Benefits

### For Projects
- **Guaranteed Funding**: 50% allocation ensures operational capital
- **Milestone Incentives**: Regular releases encourage progress
- **Market Liquidity**: AMM-ready structure for future trading

### For Participants
- **Direct Incentives**: 30% allocation rewards contributions
- **Vesting Schedule**: Long-term alignment with project success
- **Governance Rights**: Token-based participation in decisions

### For Auditors
- **Fair Compensation**: 20% allocation for verification services
- **Performance Linked**: Releases tied to successful audits
- **Independence**: Token-based incentives reduce conflicts of interest

### For Ecosystem
- **Transparency**: All allocations on-chain and auditable
- **Accountability**: Milestone-based releases ensure progress
- **Market Efficiency**: Token prices signal project health
- **Innovation**: Aligned incentives promote ecosystem growth

## License

This prototype follows the license terms of the parent repository.

## Contact & Contributions

For questions, suggestions, or contributions related to the Token Distribution Framework prototype, please refer to the main repository documentation.

---

**Generated**: October 28, 2025  
**Framework Version**: 1.0  
**Prototype Status**: Functional - Ready for Testing and Extension

