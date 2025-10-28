# Token Categories

The Token Distribution Framework allocates tokens across three distinct stakeholder categories following a **50/30/20 split**. This allocation model balances operational needs, contributor incentives, and quality assurance.

## Distribution Overview

| Category | Allocation | Purpose | Primary Benefit |
|----------|-----------|---------|-----------------|
| **Project** | 50% | Operational funding | Ensures project sustainability |
| **Participant** | 30% | Contributor rewards | Incentivizes quality work |
| **Auditor** | 20% | Verification services | Maintains accountability |

## Project Tokens (50%)

### What is a Project?

A Project represents the core entity receiving treasury funding to build a product, service, or infrastructure. Projects are accountable for achieving milestones and delivering on promises.

### Role and Responsibilities

**Core Functions**:
- Overall execution and delivery
- Resource management
- Milestone achievement
- Stakeholder communication
- Long-term maintenance

**Example Projects** (from Catalyst Fund 5):
- SDK Development (Rust, Elixir, C#)
- API Services (Blockfrost, IPFS)
- Wallet Integrations (Flutter SDK)
- Developer Tools (Glow Formal Verification)
- Infrastructure (Cardanoscan Explorer)

### Token Utility

Project tokens provide operational liquidity for:

**Infrastructure Costs**:
- Cloud hosting and servers
- Database services
- CDN and bandwidth
- Domain names and SSL certificates

**Third-Party Services**:
- Software licenses
- API subscriptions
- Development tools
- Testing services

**Operating Expenses**:
- Legal and accounting
- Marketing and communications
- Community management
- Administrative costs

### Vesting Implications

**Pure Milestone**:
- 12,500 tokens per milestone (for $50k project)
- Released immediately upon achievement
- Full control over pacing

**Hybrid Vesting**:
- 11,250 tokens per milestone pool
- Vests linearly over 2 months
- Plus 2,500 tail tokens over 6 months
- Ensures sustained engagement

## Participant Tokens (30%)

### What is a Participant?

Participants are individuals actively contributing work to the project. They provide the labor, expertise, and creativity that brings projects to life.

### Types of Participants

#### 1. Developers
**Contributions**:
- Writing code and implementing features
- Bug fixes and optimization
- Architecture and design
- Code review and testing

**Token Allocation**: Based on:
- Lines of code contributed
- Complexity of implementation
- Code quality metrics
- Time invested

#### 2. Designers
**Contributions**:
- User interface design
- User experience optimization
- Visual assets and branding
- Design systems and guidelines

**Token Allocation**: Based on:
- Design deliverables
- User feedback scores
- Iteration and refinement
- Design system completeness

#### 3. Technical Writers
**Contributions**:
- Documentation writing
- Tutorials and guides
- API reference materials
- User manuals

**Token Allocation**: Based on:
- Documentation coverage
- Clarity and quality
- User helpfulness ratings
- Maintenance and updates

#### 4. Community Managers
**Contributions**:
- Community engagement
- Support and assistance
- Communication management
- Social media presence

**Token Allocation**: Based on:
- Community growth metrics
- Engagement levels
- Response times
- User satisfaction

#### 5. Early Adopters
**Contributions**:
- Testing and feedback
- Bug identification
- Feature suggestions
- User advocacy

**Token Allocation**: Based on:
- Testing participation
- Quality of feedback
- Bug reports submitted
- Community advocacy

### Performance vs. Contribution Split

Participant tokens can be divided into two sub-categories:

**Performance Tokens** (15% of total):
- Linked to specific milestones
- Released upon achievement
- Objective metrics

**Contribution Tokens** (15% of total):
- Based on ongoing involvement
- Vested over time
- Subjective assessment

### Benefits for Participants

**Direct Rewards**:
- Fair compensation for labor
- Share in project success
- Ownership and alignment

**Long-Term Alignment**:
- Vesting encourages retention
- Reduces team churn
- Builds commitment

**Governance Rights**:
- Vote on project direction
- Influence feature priorities
- Shape development roadmap

### Example: $50,000 Project

**Total Participant Tokens**: 15,000

**Pure Milestone**:
- Milestone 1: 3,750 tokens
- Milestone 2: 3,750 tokens
- Milestone 3: 3,750 tokens
- Milestone 4: 3,750 tokens

**Hybrid Vesting**:
- Milestone pools: 13,500 (90%)
- Tail vesting: 1,500 (10%)
- Monthly vest from pools: ~1,687 tokens
- Monthly tail vest: ~250 tokens

## Auditor Tokens (20%)

### What is an Auditor?

Auditors are independent third parties who verify that projects are meeting their milestones and delivering on their promises. They provide objective assessment and maintain ecosystem integrity.

### Role and Responsibilities

**Milestone Verification**:
- Review deliverables against stated goals
- Confirm completion quality
- Validate functionality
- Assess user value

**Code Review**:
- Security assessment
- Code quality evaluation
- Best practices compliance
- Performance analysis

**Progress Reporting**:
- Regular status updates
- Transparent communication
- Community accountability
- Issue escalation

**Quality Assurance**:
- Testing and validation
- Standards compliance
- Documentation review
- User experience assessment

### Why Independent Auditors?

**Objectivity**:
- Not part of project team
- No bias toward approval
- Honest assessment

**Expertise**:
- Specialized knowledge
- Industry best practices
- Security awareness

**Accountability**:
- Reputation at stake
- Professional standards
- Community trust

### Compensation Structure

Auditor tokens compensate for:

**Time Investment**:
- Review hours
- Testing time
- Report writing
- Communication

**Expertise**:
- Technical knowledge
- Industry experience
- Specialized skills

**Responsibility**:
- Reputation risk
- Decision authority
- Accountability

### Maintaining Independence

**Conflict of Interest Prevention**:
- Separate token allocation from project
- Public verification results
- Rotation policies
- Clear governance structures

**Incentive Alignment**:
- Paid for thoroughness, not approval
- Reputation-based system
- Long-term relationship focus

### Example: $50,000 Project

**Total Auditor Tokens**: 10,000

**Pure Milestone**:
- Milestone 1: 2,500 tokens
- Milestone 2: 2,500 tokens
- Milestone 3: 2,500 tokens
- Milestone 4: 2,500 tokens

**Hybrid Vesting**:
- Milestone pools: 9,000 (90%)
- Tail vesting: 1,000 (10%)
- Monthly vest from pools: ~1,125 tokens
- Monthly tail vest: ~167 tokens

## Token Distribution Formulas

### Basic Calculation

For any project with funding amount F:

```
Total Tokens (T) = F × Conversion Rate (1:1)

Project Tokens = T × 0.50
Participant Tokens = T × 0.30
Auditor Tokens = T × 0.20
```

### Per-Milestone Distribution (Pure)

For 4 milestones:

```
Per Milestone Release = Category Tokens / 4

Project per milestone = (T × 0.50) / 4
Participant per milestone = (T × 0.30) / 4
Auditor per milestone = (T × 0.20) / 4
```

### Hybrid Vesting Distribution

```
Milestone Allocation (90%):
  Project milestone = (T × 0.50 × 0.90) / 4
  Participant milestone = (T × 0.30 × 0.90) / 4
  Auditor milestone = (T × 0.20 × 0.90) / 4

Tail Allocation (10%):
  Project tail = T × 0.50 × 0.10
  Participant tail = T × 0.30 × 0.10
  Auditor tail = T × 0.20 × 0.10
```

## Design Rationale

### Why 50/30/20?

**50% Project**:
- Ensures operational viability
- Covers infrastructure and services
- Maintains liquidity
- Largest cost component

**30% Participant**:
- Substantial reward for work
- Competitive with market rates
- Incentivizes quality contributors
- Supports team retention

**20% Auditor**:
- Fair compensation for verification
- Attracts quality auditors
- Maintains independence
- Ensures thorough review

### Alternative Ratios

The framework supports custom ratios:

**For Research Projects**: 60/25/15
- More operational funding
- Less contributor allocation
- Smaller audit needs

**For Infrastructure**: 40/35/25
- Less operational overhead
- More developer focus
- Higher quality assurance needs

**For Community Projects**: 45/40/15
- Less infrastructure cost
- Heavy contributor involvement
- Lighter audit requirements

## Visualizing Token Categories

Use the [Interactive Dashboard](https://qadao.io/Token-Distribution-Framework/dashboard/) to explore:

- **Pie Charts**: Visual 50/30/20 distribution
- **Stacked Timelines**: How each category vests
- **Category Breakdowns**: Detailed allocation tables
- **Comparison Views**: Different project sizes

## Next Steps

- **Understand Vesting**: [Vesting Approaches →](Vesting-Approaches)
- **See Implementation**: [Implementation Guide →](Implementation-Guide)
- **Explore Dashboard**: [Dashboard Guide →](Dashboard-Guide)
- **Review Use Cases**: [Use Cases →](Use-Cases)

---

**Key Takeaway**: The 50/30/20 split balances operational needs (Project), contributor incentives (Participant), and quality assurance (Auditor) to create a sustainable, accountable project funding model.

