# Token Distribution Framework & Catalyst Fund 5 Data

This repository implements a **Token Distribution Framework** prototype applied to Cardano's Catalyst Fund 5 Developer Ecosystem data, demonstrating how blockchain treasury funding can be structured with milestone-based token allocations across multiple stakeholder categories.

## Overview

The repository combines:
1. **Token Distribution Framework** - A comprehensive AMM-based token allocation system for treasury-funded projects
2. **Catalyst Fund 5 Data** - Real funding data from 24 successful Cardano developer ecosystem proposals
3. **Two Vesting Implementations** - Pure milestone-based and hybrid time+milestone approaches
4. **Python Scripts** - Automated processing and allocation calculation with dual output formats

## Two Vesting Approaches

This repository implements **two distinct vesting mechanisms**, each suited for different project types and governance needs:

### Approach 1: Pure Milestone Vesting

**Achievement-based token releases with no time constraints**

Tokens unlock immediately when milestones are achieved. Projects control their own pace and can complete all milestones quickly if they deliver quality work fast.

**How It Works:**
- 4 milestones (25%, 50%, 75%, 100%)
- Each milestone unlocks 25% of tokens immediately
- No time requirements between milestones
- 100% vesting possible within weeks if all milestones completed

**Best For:**
- ✓ Small to medium projects ($1,000 - $15,000)
- ✓ Simple, well-defined deliverables
- ✓ Trusted teams with proven track records
- ✓ Short timeline projects (1-3 months)
- ✓ One-time outputs (tools, documentation, integrations)

**Script:** `token_distribution.py`  
**Outputs:** `token_allocations_output.csv`, `token_allocations_output.json`  
**Documentation:** See `TOKEN_DISTRIBUTION_README.md`

### Approach 2: Hybrid Vesting (Cliff + Milestone + Linear)

**Sophisticated time-gated vesting with achievement milestones**

Combines milestone achievements with time-based linear vesting to create balanced incentives. Milestones unlock token "pools" that vest gradually over time, ensuring long-term commitment.

**How It Works:**

**Phase 1: Cliff Period (Month 0-1)**
- 30-day cliff where no tokens vest
- Prevents very early abandonment

**Phase 2: Milestone + Linear Vesting (Months 1-6)**
- 90% of tokens allocated to milestones
- Milestones unlock token pools when achieved
- Each pool vests linearly over 2 months
- Multiple pools can vest simultaneously

**Phase 3: Tail Vesting (Months 6-12)**
- 10% of tokens vest linearly
- Incentivizes maintenance and long-term support
- Smooth final distribution

**Best For:**
- ✓ Large projects ($20,000+)
- ✓ Complex deliverables requiring sustained effort
- ✓ New or unproven teams needing accountability
- ✓ Infrastructure requiring ongoing maintenance
- ✓ Long timeline projects (6-12 months)
- ✓ High-value DAO treasury allocations

**Script:** `token_distribution_hybrid.py`  
**Outputs:** `token_allocations_hybrid_output.csv`, `token_allocations_hybrid_output.json`  
**Documentation:** See `HYBRID_VESTING_README.md`

## Approach Comparison

| Feature | Pure Milestone | Hybrid Vesting |
|---------|----------------|----------------|
| **Vesting Trigger** | Achievement only | Achievement + Time |
| **Minimum Duration** | None (instant) | 12 months |
| **Speed Control** | Project decides | Fixed timeline |
| **Vesting Pattern** | Lumpy (25% chunks) | Smooth (gradual) |
| **Cliff Period** | None | 30 days |
| **Early Abandonment Risk** | High | Low |
| **Maintenance Incentive** | None | 10% tail vesting |
| **Anti-Gaming** | Low | High |
| **Cashflow Predictability** | Low | High |
| **Complexity** | Simple | Moderate |
| **If milestones done in 1 month** | 100% vested | 11% vested, rest over time |

## Decision Guide

**Choose Pure Milestone Vesting if:**
- Your project has clear, simple deliverables
- You trust the team to self-pace responsibly
- Timeline is naturally short (< 3 months)
- Funding amount is modest (< $15k)
- Project is one-time delivery (no maintenance)

**Choose Hybrid Vesting if:**
- Project involves complex, sustained work
- Team accountability is important
- Maintenance and support are required
- Funding amount is significant (> $20k)
- You want to prevent rush-to-completion gaming
- Smooth cashflow is important for planning

**Not sure?** For treasury allocations, hybrid vesting provides better risk management and incentive alignment.

## Token Distribution Framework

Both approaches use the same core token allocation model based on `Project-AMM.md`:

### Token Categories (50/30/20 Split)

- **Project Tokens (50%)** - Direct project funding and operational liquidity
- **Participant Tokens (30%)** - Rewards for developers, contributors, and team members
- **Auditor Tokens (20%)** - Compensation for verification services and milestone auditing

### Understanding the Stakeholders

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

## Quick Start

### Prerequisites
- Python 3.6 or higher
- No external dependencies (uses standard library only)

### Running Pure Milestone Vesting

```bash
python3 token_distribution.py
```

Generates:
- `token_allocations_output.csv` - Tabular format with milestone breakdowns
- `token_allocations_output.json` - Hierarchical structure

### Running Hybrid Vesting

```bash
python3 token_distribution_hybrid.py
```

Generates:
- `token_allocations_hybrid_output.csv` - Month-by-month vesting timeline
- `token_allocations_hybrid_output.json` - Detailed vesting schedules

Both scripts process all 24 funded projects and display summary statistics.

## Repository Contents

### Documentation
- **`README.md`** (this file) - Main overview and comparison of both approaches
- **`TOKEN_DISTRIBUTION_README.md`** - Detailed pure milestone vesting documentation
- **`HYBRID_VESTING_README.md`** - Detailed hybrid vesting documentation
- **`Project-AMM.md`** - Token Distribution Framework specification

### Source Data
- **`Project-Catalyst-Fund-5-Developer-Ecosystem.csv`** - 46 proposals, 24 funded projects

### Implementation Scripts
- **`token_distribution.py`** - Pure milestone vesting implementation
- **`token_distribution_hybrid.py`** - Hybrid vesting implementation (Cliff + Milestone + Linear)

### Generated Outputs

**Pure Milestone Vesting:**
- `token_allocations_output.csv` - 18 columns with milestone release schedules
- `token_allocations_output.json` - Hierarchical allocation data

**Hybrid Vesting:**
- `token_allocations_hybrid_output.csv` - Month-by-month vesting progression
- `token_allocations_hybrid_output.json` - Detailed vesting timeline with pool management

## Data Produced

### Source Data Summary

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

### Pure Milestone Vesting Output

**Structure:** 4 milestones with immediate releases

| Milestone | Release % | Tokens per Milestone |
|-----------|-----------|----------------------|
| M1 (25%) | 25% | 147,050.50 |
| M2 (50%) | 25% | 147,050.50 |
| M3 (75%) | 25% | 147,050.50 |
| M4 (100%) | 25% | 147,050.50 |

**Example Project:** Cardano Rust SDK ($50,000)
- M1: 12,500 tokens (instant)
- M2: 12,500 tokens (instant)
- M3: 12,500 tokens (instant)
- M4: 12,500 tokens (instant)
- **Time to 100%:** As fast as milestones completed

### Hybrid Vesting Output

**Structure:** 13-month timeline with cliff, milestone pools, and tail vesting

| Phase | Duration | Tokens | Description |
|-------|----------|--------|-------------|
| Cliff | Month 0 | 0 | No vesting |
| Milestone Phase | Months 1-6 | 529,381.80 (90%) | Pools unlock and vest |
| Tail Phase | Months 6-12 | 58,820.20 (10%) | Linear vesting |

**Example Project:** Cardano Rust SDK ($50,000)

| Month | Event | Tokens Vested | Cumulative | % |
|-------|-------|---------------|------------|---|
| 0 | CLIFF | 0 | 0 | 0% |
| 1 | M1 unlocks | 5,625 | 5,625 | 11.2% |
| 2 | M2 unlocks | 11,250 | 16,875 | 33.8% |
| 3 | Pools vesting | 5,625 | 22,500 | 45.0% |
| 4 | M3 unlocks | 5,625 | 28,125 | 56.2% |
| 5 | Pools vesting | 5,625 | 33,750 | 67.5% |
| 6 | M4 unlocks | 5,625 | 39,375 | 78.8% |
| 7-12 | Tail vesting | ~833/mo | 50,000 | 100% |

**Time to 100%:** Fixed at 12 months

## Detailed Example Comparison

### Scenario: $50,000 Project Completes All Milestones in Month 2

**Pure Milestone Vesting:**
```
Month 2: All 4 milestones achieved
Result: 50,000 tokens (100%) immediately available
Risk: Team could disappear after payout
```

**Hybrid Vesting:**
```
Month 2: Milestones 1-4 all achieved
Result: Only 16,875 tokens (33.8%) vested
Remaining: 33,125 tokens vest gradually over 10 more months
Benefit: Team must stay engaged; can't cash out and abandon
```

### Scenario: Team Quits After 2 Weeks

**Pure Milestone Vesting:**
```
If M1 achieved: 12,500 tokens (25%) already received
Team leaves with tokens
```

**Hybrid Vesting:**
```
Still in cliff period: 0 tokens vested
Team gets nothing if they quit early
Cliff protects treasury from false starts
```

## Projects Included

The framework is applied to 24 funded projects including:

| Project | Funding | Tokens |
|---------|---------|--------|
| Artificial Intelligence/ML API | $80,000 | 80,000 |
| NFT-DAO EZ-Name | $59,842 | 59,842 |
| Cardano Rust SDK update for Alonzo | $50,000 | 50,000 |
| NFT Key | $50,000 | 50,000 |
| Free Commerce payment gateway | $52,500 | 52,500 |
| Glow Formal verification | $60,000 | 60,000 |
| Websocket link for Blockfrost API | $18,000 | 18,000 |
| Cardano JS API | $15,000 | 15,000 |
| Elixir SDK | $12,000 | 12,000 |
| And 15 more... | | |

**Total across all projects:** $588,202 / 588,202 tokens

## Output File Formats

### CSV Format

Both approaches generate CSV files with:
- Proposal names and funding amounts
- Token allocations by category (Project, Participant, Auditor)
- Vesting schedules (milestone or monthly)
- Summary statistics section
- Fully searchable and spreadsheet-compatible

**Pure Milestone CSV:** 18 columns with M1-M4 release data  
**Hybrid Vesting CSV:** 32 columns with Month 0-12 vesting progression

### JSON Format

Hierarchical structure containing:

**Metadata:**
- Generation timestamp
- Framework version
- Vesting type (milestone or hybrid)
- Configuration parameters
- Distribution ratios

**Summary:**
- Aggregate statistics
- Total funding and tokens
- Category breakdowns
- Vesting structure summary

**Allocations:**
- Array of all projects
- Per-project token distribution
- Milestone/monthly vesting schedules
- Detailed timeline data

## Framework Benefits

### For Projects
- **Guaranteed Funding**: 50% allocation ensures operational capital
- **Milestone Incentives**: Releases encourage progress tracking
- **Flexibility**: Choose vesting approach matching project needs
- **Pure Milestone**: Fast access to funds for trusted teams
- **Hybrid Vesting**: Predictable cashflow for long-term planning

### For Participants
- **Direct Incentives**: 30% allocation rewards contributions
- **Pure Milestone**: Quick payouts for completed work
- **Hybrid Vesting**: Salary-like monthly vesting plus milestone bonuses
- **Long-term Alignment**: Vesting encourages retention
- **Governance Rights**: Token-based participation in decisions

### For Auditors
- **Fair Compensation**: 20% allocation for verification services
- **Pure Milestone**: Paid per milestone verification
- **Hybrid Vesting**: Ongoing compensation for continuous monitoring
- **Performance Linked**: Releases tied to successful audits
- **Independence**: Token-based incentives reduce conflicts of interest

### For Ecosystem
- **Transparency**: All allocations auditable and on-chain ready
- **Accountability**: Milestone requirements ensure delivery
- **Risk Management**: Hybrid vesting protects against gaming
- **Market Efficiency**: Token prices signal project health
- **Flexibility**: Multiple vesting options for different needs
- **Innovation**: Aligned incentives promote ecosystem growth

## Design Decisions

### Token Conversion Rate
**1 USD = 1 Token Unit**  
Simple 1:1 mapping for prototype clarity. Production implementation would use market-driven pricing or stablecoin pegging.

### Distribution Ratios
**50/30/20 Split (Project/Participant/Auditor)**  
Balances operational needs (50%) with stakeholder incentives (30% + 20%). Could be adjusted per project type.

### Pure Milestone Configuration
- **4 equal milestones**: 25% each
- **Immediate unlock**: No vesting delay
- **Rationale**: Simple, achievement-focused for trusted teams

### Hybrid Vesting Configuration
- **Cliff**: 30 days (prevents early abandonment)
- **Milestone pools**: Vest over 2 months (smooth releases)
- **Tail vesting**: 10% over 6 months (maintenance incentive)
- **Total duration**: 12 months (ensures sustained engagement)
- **Rationale**: Balanced risk management and incentive alignment

### When Each Approach Makes Sense

**Pure Milestone** emphasizes delivery speed and trusts teams to self-regulate. Works when:
- Project scope is clear and bounded
- Team has proven track record
- Fast execution is valuable
- Funding amount is manageable risk

**Hybrid Vesting** emphasizes sustained quality and accountability. Works when:
- Project requires long-term commitment
- Team accountability is important
- Large treasury allocation needs protection
- Maintenance and support are critical

## Use Cases

### Treasury Management
Apply these frameworks to:
- **DAO treasury distributions** - Hybrid vesting for governance token allocations
- **Grant program funding** - Pure milestone for small grants, hybrid for large ones
- **Ecosystem development funds** - Both approaches based on project size
- **Community-driven project funding** - Let proposers choose their vesting approach

### Token Economics
Model and analyze:
- **Stakeholder incentive structures** - Compare how vesting affects behavior
- **Vesting schedule impacts** - Simulate token supply over time
- **Token supply dynamics** - Model release rates and market effects
- **Governance token distribution** - Design voting power accumulation

### Project Funding
Demonstrate:
- **Fair distribution mechanisms** - Transparent allocation formulas
- **Accountability through milestones** - Clear progress tracking
- **Multi-stakeholder alignment** - Incentivizes all parties
- **Risk management** - Hybrid vesting protects treasury
- **Transparent allocation processes** - All calculations verifiable

## Advanced Configurations

Both scripts are designed to be configurable for different needs:

### Pure Milestone Variations
```python
# Current: 4 milestones, 25% each
MILESTONES = [0.25, 0.50, 0.75, 1.00]

# Could configure:
# More frequent: [0.10, 0.20, 0.30, 0.40, 0.50, ...]
# Weighted: [0.10, 0.20, 0.30, 0.40]  # Back-loaded
# Variable per project type
```

### Hybrid Vesting Variations
```python
# Current configuration
CLIFF_PERIOD_DAYS = 30
MILESTONE_VESTING_MONTHS = 2
TAIL_VESTING_RATIO = 0.10

# Research projects might use:
CLIFF_PERIOD_DAYS = 60        # Longer setup
TAIL_VESTING_RATIO = 0.15     # More maintenance

# Quick integrations might use:
CLIFF_PERIOD_DAYS = 14        # Faster start
MILESTONE_PERIOD_MONTHS = 3   # Shorter timeline
```

## Future Enhancements

### Immediate Extensions
1. **Web dashboard** - Visualize vesting schedules with charts
2. **Smart contract templates** - Deploy-ready Solidity/Plutus contracts
3. **Multi-currency support** - Handle ADA, USD, other stablecoins
4. **Variable ratios** - Per-project customization of 50/30/20 split
5. **Hybrid of hybrids** - Mix both approaches for different token categories

### Advanced Features
6. **AMM pool integration** - Automated market maker functionality
7. **Price discovery** - Model token price dynamics
8. **Governance integration** - Token-weighted voting systems
9. **Performance metrics** - Link vesting to measurable KPIs
10. **Penalty mechanisms** - Clawbacks for missed milestones
11. **Accelerated vesting** - Bonuses for exceptional delivery
12. **Real-time tracking** - Live milestone achievement monitoring

### Data Integration
13. **Historical performance** - Import actual project outcomes
14. **Predictive modeling** - ML-based success prediction
15. **Risk scoring** - Automated vesting approach recommendations
16. **Portfolio management** - Multi-project treasury optimization

## About Catalyst Fund 5

Project Catalyst is Cardano's innovation engine and community funding mechanism. Fund 5's Developer Ecosystem challenge funded projects that enhance Cardano's development tools, SDKs, APIs, and infrastructure. This data represents real-world blockchain treasury allocations totaling $588,202 across 24 projects.

**Challenge:** Developer Ecosystem  
**Fund:** Catalyst Fund 5  
**Total Available:** $250,000 (oversubscribed)  
**Funded Projects:** 24 of 46 proposals  
**Success Rate:** 52%

The two vesting approaches in this repository provide alternative models for how such treasury distributions could be structured to optimize for different governance goals.

## Technical Implementation

### Code Quality
- **Clean Python 3** - No external dependencies
- **Type hints** - Using dataclasses for clarity
- **Modular design** - Easy to extend and customize
- **Well-documented** - Clear function names and comments
- **Tested** - Validated calculations and output formats

### Data Integrity
- **Consistent formatting** - All CSV rows have proper column counts
- **Validated calculations** - Token sums verified
- **No rounding errors** - Precise decimal handling
- **Complete audit trail** - Every allocation traceable

### Output Compatibility
- **CSV**: Excel, Google Sheets, pandas compatible
- **JSON**: API-ready, JavaScript-friendly
- **Both**: Human and machine readable

## License

See `LICENSE` file for details.

## Getting Help

### Documentation
- **Quick overview**: This README
- **Pure milestone details**: `TOKEN_DISTRIBUTION_README.md`
- **Hybrid vesting details**: `HYBRID_VESTING_README.md`
- **Framework theory**: `Project-AMM.md`

### Choosing an Approach
Not sure which vesting approach to use? Consider:
1. What's the project size? (< $15k → Pure, > $20k → Hybrid)
2. Is team accountability a concern? (Yes → Hybrid, No → Pure)
3. Is maintenance required? (Yes → Hybrid, No → Pure)
4. Timeline? (< 3 months → Pure, 6-12 months → Hybrid)

When in doubt, **hybrid vesting provides better risk management** for DAO treasuries.

---

**Repository Status:** Production-Ready Prototype  
**Framework Version:** 2.0 (with dual vesting approaches)  
**Last Updated:** October 28, 2025  
**Data Source:** Catalyst Fund 5 Developer Ecosystem (24 funded projects)  
**Implementations:** Pure Milestone + Hybrid (Cliff + Milestone + Linear)
