# Token Distribution Framework & Catalyst Fund 5 Data

This repository implements a **Token Distribution Framework** prototype applied to Cardano's Catalyst Fund 5 Developer Ecosystem data, demonstrating how blockchain treasury funding can be structured with milestone-based token allocations across multiple stakeholder categories.

## Overview

The repository combines:
1. **Token Distribution Framework** - A comprehensive AMM-based token allocation system for treasury-funded projects
2. **Catalyst Fund 5 Data** - Real funding data from 24 successful Cardano developer ecosystem proposals
3. **Python Implementation** - Automated processing and allocation calculation with dual output formats

## What This Repository Does

### Token Distribution Framework

Based on the framework outlined in `Project-AMM.md`, this system distributes tokens across three stakeholder categories:

- **Project Tokens (50%)** - Direct project funding and operational liquidity
- **Participant Tokens (30%)** - Rewards for developers, contributors, and team members
- **Auditor Tokens (20%)** - Compensation for verification services and milestone auditing

#### Understanding the Stakeholders

**What is a Project?**  
A Project represents the core entity receiving treasury funding to build a product, service, or infrastructure. In the Catalyst Fund 5 context, projects include things like SDK development, API services, wallet integrations, and developer tools. The project entity manages the overall execution, deliverables, and is accountable for achieving milestones. Project tokens provide operational liquidity for expenses like infrastructure, licenses, third-party services, and general operating costs.

**What is a Participant?**  
Participants are the individuals actively contributing work to the project. This includes:
- **Developers** writing code and building features
- **Designers** creating user interfaces and experiences
- **Technical writers** producing documentation
- **Community managers** handling communication and support
- **Early adopters** testing and providing feedback

Participant tokens reward these contributors for their labor and expertise, aligning their incentives with project success. These tokens can vest over time to encourage long-term commitment and reduce churn.

**What is an Auditor?**  
Auditors are independent third parties who verify that projects are meeting their milestones and delivering on their promises. Their role includes:
- **Milestone verification** - Confirming deliverables match stated goals
- **Code review** - Assessing quality and security of implementations
- **Progress reporting** - Providing transparent updates to the community
- **Quality assurance** - Ensuring projects maintain standards

Auditor tokens compensate these verification services and create accountability in the funding ecosystem. By having independent auditors with financial incentive (but separate from the project team), the system maintains integrity while reducing conflicts of interest.

### Milestone-Based Vesting

Tokens are released incrementally across 4 milestones to ensure accountability and incentivize progress:

1. **Milestone 1 (25%)** - Initial project setup and first deliverables
2. **Milestone 2 (50%)** - Mid-project progress checkpoint
3. **Milestone 3 (75%)** - Near-completion validation
4. **Milestone 4 (100%)** - Final delivery and project completion

### Real-World Application

The prototype processes actual Catalyst Fund 5 Developer Ecosystem proposals, calculating token allocations for 24 funded projects totaling **$588,202** in funding, demonstrating how the framework applies to real treasury distributions.

## Repository Contents

### Core Files

- **`token_distribution.py`** - Main Python script implementing the token distribution framework
- **`Project-AMM.md`** - Token Distribution Framework specification and rationale
- **`Project-Catalyst-Fund-5-Developer-Ecosystem.csv`** - Source data: 46 proposals, 24 funded

### Generated Data Files

#### `token_allocations_output.csv`
Tabular format with 18 columns containing:
- Proposal names and requested funding
- Total token allocations (1 USD = 1 Token)
- Token distribution by category (Project, Participant, Auditor)
- Milestone-based release schedules (M1-M4) for each category
- Summary statistics section

**Sample Row:**
```csv
Cardano Rust SDK update for Alonzo,$50,000.00,50,000.00,25,000.00,15,000.00,10,000.00,6,250.00,3,750.00,2,500.00,...
```

#### `token_allocations_output.json`
Hierarchical format with:
- **Metadata** - Generation timestamp, framework version, distribution ratios
- **Summary** - Aggregate statistics across all projects
- **Allocations** - Detailed array of all project allocations with nested milestone schedules

**Sample Structure:**
```json
{
  "metadata": {
    "generated_at": "2025-10-28T02:06:35.506336",
    "framework_version": "1.0",
    "token_conversion_rate": 1.0,
    "distribution_ratios": {
      "project_tokens": 0.5,
      "participant_tokens": 0.3,
      "auditor_tokens": 0.2
    }
  },
  "summary": {
    "total_projects": 24,
    "total_funding_usd": 588202.0,
    "total_tokens": 588202.0
  },
  "allocations": [...]
}
```

### Documentation

- **`TOKEN_DISTRIBUTION_README.md`** - Comprehensive prototype documentation with examples, design decisions, and extension suggestions

## Data Produced

### Aggregate Statistics

From 24 funded Catalyst Fund 5 Developer Ecosystem projects:

| Metric | Value |
|--------|-------|
| Total Projects | 24 |
| Total Funding | $588,202 |
| Total Tokens Issued | 588,202 |
| Project Tokens (50%) | 294,101.00 |
| Participant Tokens (30%) | 176,460.60 |
| Auditor Tokens (20%) | 117,640.40 |
| Average Funding per Project | $24,508.42 |

### Token Allocation Example

**Project:** Cardano Rust SDK update for Alonzo  
**Funding:** $50,000  

| Category | Total Allocation | M1 Release | M2 Release | M3 Release | M4 Release |
|----------|------------------|------------|------------|------------|------------|
| Project (50%) | 25,000 | 6,250 | 6,250 | 6,250 | 6,250 |
| Participant (30%) | 15,000 | 3,750 | 3,750 | 3,750 | 3,750 |
| Auditor (20%) | 10,000 | 2,500 | 2,500 | 2,500 | 2,500 |
| **Total** | **50,000** | **12,500** | **12,500** | **12,500** | **12,500** |

### Projects Included

The framework is applied to 24 funded projects including:
- Testnet Cardanoscan Explorer ($7,500)
- Cardano Rust SDK update for Alonzo ($50,000)
- C# SDK for Blockfrost API ($9,000)
- Elixir SDK ($12,000)
- Cardano JS API ($15,000)
- NFT Key ($50,000)
- Artificial Intelligence/ML API ($80,000)
- And 17 more developer ecosystem projects

## How to Use

### Prerequisites
- Python 3.6 or higher
- No external dependencies (uses standard library only)

### Running the Script

```bash
python3 token_distribution.py
```

### Output

The script will:
1. Parse the Catalyst Fund 5 CSV data
2. Filter for funded projects
3. Calculate token allocations with milestone schedules
4. Generate two output files:
   - `token_allocations_output.csv` (tabular format)
   - `token_allocations_output.json` (hierarchical format)
5. Display summary statistics to console

### Console Output Example

```
Token Distribution Framework Prototype
Processing Catalyst Fund 5 Developer Ecosystem Data

Loaded 24 funded projects
Calculated token allocations for 24 projects

======================================================================
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

CSV export completed: token_allocations_output.csv
JSON export completed: token_allocations_output.json

Processing complete!
```

## Key Features

### Data Processing
- Automatic parsing and cleaning of funding amounts
- Filtering for funded vs. unfunded proposals
- Currency formatting handling ($, commas)

### Token Calculations
- 1:1 USD to token conversion ratio
- 50/30/20 distribution across three stakeholder categories
- Equal 25% releases across four milestones
- Per-milestone allocations for each token category

### Output Formats
- **CSV**: Spreadsheet-compatible tabular data
- **JSON**: API-ready hierarchical structure with metadata

### Validation
- All CSV rows have consistent 18-column structure
- Proper formatting for searchability and parsing
- Complete audit trail with summary statistics

## Framework Benefits

### For Projects
- Guaranteed operational funding (50% allocation)
- Milestone incentives encourage consistent progress
- AMM-ready structure for future token trading

### For Contributors
- Direct participation incentives (30% allocation)
- Long-term alignment through vesting
- Token-based governance rights

### For Auditors
- Fair compensation for verification (20% allocation)
- Performance-linked releases
- Reduced conflict of interest through structured incentives

### For Ecosystem
- Complete transparency and auditability
- Accountability through milestone-based releases
- Market efficiency via token price signals
- Aligned incentives promoting ecosystem growth

## Design Decisions

### Token Conversion Rate
**1 USD = 1 Token Unit**  
Simple 1:1 mapping for prototype clarity. Production implementation would use market-driven pricing.

### Distribution Ratios
**50/30/20 Split**  
Balances project operational needs (50%) with stakeholder incentives (30% + 20%).

### Milestone Structure
**Equal 25% Releases**  
Provides regular progress checkpoints. Could be customized per-project based on complexity.

### Vesting Approach
**Milestone-Based vs. Time-Based**  
Current implementation uses milestone completion. Alternative: hybrid time + milestone vesting.

## Future Enhancements

### Immediate Extensions
- Variable vesting schedules based on project size
- Time-based vesting alongside milestone releases
- Risk-adjusted allocations for high-risk projects
- Visualization dashboard for token analytics

### Advanced Features
- AMM pool integration with liquidity provision
- Price discovery mechanisms and market dynamics
- Governance system with voting mechanisms
- Performance metrics linked to token releases
- Smart contract templates for on-chain deployment

### Data Integration
- Historical project performance data
- Real-time milestone achievement tracking
- Token holder management system
- Complete transaction audit trail

## Framework Alignment

This prototype implements core concepts from the Token Distribution Framework:

✅ **Token Categories** - Project, Participant, and Auditor tokens  
✅ **Milestone-Based Release** - Smart contract-ready milestone structure  
✅ **Token Utility** - Framework supports governance and benefits  
✅ **Transparency** - All allocations auditable and traceable  

**Not Yet Implemented:**
- AMM pool functionality and liquidity provision
- Price discovery mechanisms
- Risk management and dilution control
- Regulatory compliance tracking

## Use Cases

### Treasury Management
Apply this framework to:
- DAO treasury distributions
- Grant program funding
- Ecosystem development funds
- Community-driven project funding

### Token Economics
Model and analyze:
- Stakeholder incentive structures
- Vesting schedule impacts
- Token supply dynamics
- Governance token distribution

### Project Funding
Demonstrate:
- Fair distribution mechanisms
- Accountability through milestones
- Multi-stakeholder alignment
- Transparent allocation processes

## About Catalyst Fund 5

Project Catalyst is Cardano's innovation engine and community funding mechanism. Fund 5's Developer Ecosystem challenge funded projects that enhance Cardano's development tools, SDKs, APIs, and infrastructure. This data represents real-world blockchain treasury allocations.

## License

See `LICENSE` file for details.

## Documentation

For detailed technical documentation, see:
- `TOKEN_DISTRIBUTION_README.md` - Complete prototype documentation
- `Project-AMM.md` - Token Distribution Framework specification

---

**Repository Status:** Active Prototype  
**Framework Version:** 1.0  
**Last Updated:** October 28, 2025  
**Data Source:** Catalyst Fund 5 Developer Ecosystem (24 funded projects)
