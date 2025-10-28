# Token Distribution Framework

The Token Distribution Framework provides a comprehensive AMM-based token allocation system for treasury-funded projects. This framework ensures fair distribution across stakeholders while maintaining accountability through milestone-based releases.

## Overview

In an AMM (Automated Market Maker) system where tokens are issued to various participants involved in projects that receive liquidity from treasury drawdowns, tokens are distributed across three key stakeholder categories with distinct utilities and governance rights.

## 1. Token Categories

The framework defines three primary token types, each serving a specific purpose in the project ecosystem:

### Project Tokens (50% Allocation)

**Purpose**: Primary tokens associated with each project's success or utility

Project tokens provide:
- **Project Funding**: Direct capital for ongoing operations
- **Operational Liquidity**: Resources for infrastructure, licenses, and services
- **Market Representation**: Value tied to project success

**Use Cases**:
- Pay for cloud infrastructure and hosting
- License third-party tools and services
- Cover operational expenses
- Maintain liquidity pools

### Participant Tokens (30% Allocation)

**Purpose**: Issued to those directly involved in the project

Participant tokens include two sub-categories:

#### Performance Tokens
- Linked directly to project milestones or performance metrics
- Released upon achievement of specific goals
- Incentivize quality and timely delivery

#### Contribution Tokens
- Based on level of involvement or contribution to the project
- Reward different types of participation:
  - **Developers**: Writing code and building features
  - **Designers**: Creating interfaces and experiences
  - **Technical Writers**: Producing documentation
  - **Community Managers**: Handling communication
  - **Early Adopters**: Testing and providing feedback

### Auditor Tokens (20% Allocation)

**Purpose**: Issued to auditors or independent reviewers who verify milestones

Auditor tokens serve as:

#### Verification Tokens
- Represent trust and verification services provided
- Maintain project integrity
- Ensure milestone completion

#### Incentive Tokens
- Reward auditors for maintaining project integrity
- Compensate milestone verification work
- Encourage transparency and accountability

**Auditor Responsibilities**:
- Milestone verification and confirmation
- Code review for quality and security
- Progress reporting to the community
- Quality assurance throughout project lifecycle

## 2. Liquidity from Treasury

### Initial Liquidity Provision

The treasury provides initial liquidity to AMM pools for each project using:
- Mix of project tokens
- Stablecoins (USDC, DAI, etc.)
- Other cryptocurrencies (ADA, ETH, etc.)

### Token Issuance Strategy

Upon treasury drawdowns for liquidity, tokens are minted and distributed according to the 50/30/20 split:

**To Project (50%)**:
- Ensures project funding
- Provides liquidity for ongoing operations
- Maintains operational stability

**To Participants (30%)**:
- Rewards for their involvement
- Vests over time to incentivize long-term commitment
- Aligns interests with project success

**To Auditors (20%)**:
- Compensation for milestone verification services
- Potentially unlockable or vesting upon successful audit confirmations
- Maintains independence while providing fair compensation

## 3. Token Utility and Governance

### Voting Rights

Different token types grant different governance rights:

**Participant Tokens**:
- Voting power over project direction
- Feature prioritization decisions
- Resource allocation input

**Auditor Tokens**:
- Influence how audits are conducted
- Impact audit funding mechanisms
- Quality standards determination

**Project Tokens**:
- Overall project governance
- Strategic direction decisions
- Partnership and collaboration approvals

### Access to Benefits

Tokens unlock various benefits:
- **Private Sales Access**: Early access to project outputs
- **Dividends**: Share in project success and revenue
- **Specific Services**: Access to premium features or services
- **Priority Support**: Enhanced support and resources

## 4. AMM Functionality

### Multi-Token Pools

Each project maintains its own pool structure:
- Project tokens
- Participant tokens
- Auditor tokens
- Base assets (ETH, ADA, stablecoins)

This allows for:
- Trading between token types
- Price discovery for all categories
- Liquidity provision opportunities

### Price Discovery

The AMM facilitates price discovery through:
- Supply and demand dynamics
- Project performance metrics
- Market sentiment
- Milestone achievement signals

## 5. Milestone-Based Release

### Smart Contract Management

Smart contracts manage token release based on verified milestones:

**Upon Milestone Achievement**:
- Tokens are unlocked automatically
- Or additional tokens are minted
- Distribution occurs according to predefined rules

**Verification Process**:
1. Project submits milestone completion evidence
2. Auditors review and verify deliverables
3. Smart contract triggers token release
4. Tokens distributed to stakeholders

### Dynamic Incentives

As projects hit milestones:
- Token value may increase
- Utility expands
- All parties benefit from success
- Creates positive feedback loop

## 6. Liquidity and Market Dynamics

### Liquidity Incentives

To ensure sufficient liquidity:
- **Liquidity Mining**: Rewards for providing liquidity
- **Trading Fees**: Share of transaction fees
- **Bonus Tokens**: Additional project tokens for liquidity providers

### Market Signals

Token pricing provides valuable signals:
- **Participant Token Price**: Indicates market confidence in team
- **Auditor Token Price**: Reflects audit credibility and trust
- **Project Token Price**: Overall project health indicator

## 7. Risk Management

### Dilution Control

Mechanisms to prevent excessive dilution:
- **Supply Caps**: Maximum token issuance limits
- **Performance-Based Issuance**: Tokens only minted on achievement
- **Burning Mechanisms**: Remove tokens from circulation
- **Vesting Schedules**: Time-based release to prevent flooding

### Conflict of Interest Management

Ensuring auditor independence:
- **Separate Token Allocation**: Distinct from project tokens
- **Governance Structures**: Clear separation of responsibilities
- **Rotation Policies**: Prevent long-term capture
- **Public Reporting**: Transparent audit results

## 8. Regulatory Compliance

### Token Classification

Each token type must be:
- **Classified Correctly**: Security vs. utility determination
- **Compliant with Regulations**: Local and international laws
- **Properly Disclosed**: Clear communication of rights and risks

### Transparency Requirements

All token issuances and audits:
- **Logged On-Chain**: Immutable record keeping
- **Publicly Verifiable**: Anyone can audit the system
- **Real-Time Reporting**: Current status always available
- **Historical Tracking**: Complete audit trail

## Challenges

### Complexity
- Managing multiple token types with different utilities
- Coordinating governance across token categories
- Maintaining system integrity
- **Mitigation**: Clear documentation, automated systems, robust testing

### Misalignment of Incentives
- Risk that auditor/participant incentives don't align with project success
- Potential for gaming the system
- **Mitigation**: Careful incentive design, vesting schedules, performance metrics

### Market Volatility
- New token types can introduce volatility
- Price discovery takes time
- **Mitigation**: Gradual launches, liquidity support, education

### Regulatory Scrutiny
- Multiple token types may attract regulatory attention
- Classification challenges
- **Mitigation**: Legal review, compliance programs, transparent operations

## Framework Benefits

### Integration
Creates a cohesive ecosystem where:
- All parties have a stake in success
- Incentives are aligned across stakeholders
- Accountability is built into the structure

### Innovation
Promotes through:
- Fair reward distribution
- Clear success metrics
- Transparent operations

### Accountability
Ensured via:
- Independent audits
- Milestone verification
- On-chain transparency
- Market-driven signals

## Implementation Approaches

The framework supports multiple vesting implementations:

### Pure Milestone Vesting
- Achievement-based releases
- Fast execution for trusted teams
- Simple and straightforward
- [Learn more →](Vesting-Approaches#pure-milestone-vesting)

### Hybrid Vesting
- Time-gated releases
- Cliff period for protection
- Tail vesting for maintenance
- [Learn more →](Vesting-Approaches#hybrid-vesting)

## Real-World Application

This framework has been applied to **24 Catalyst Fund 5 Developer Ecosystem projects** totaling **$588,202** in funding, demonstrating its practical viability and effectiveness.

**Explore the results**: [Interactive Dashboard](https://qadao.io/Token-Distribution-Framework/dashboard/)

## Next Steps

- **Understand Token Categories**: [Token Categories →](Token-Categories)
- **Compare Vesting Approaches**: [Vesting Approaches →](Vesting-Approaches)
- **Implement the Framework**: [Implementation Guide →](Implementation-Guide)
- **Explore Use Cases**: [Use Cases →](Use-Cases)

---

**Note**: This framework requires careful design to balance interests and ensure system integrity. Consult with legal and technical experts before implementation in production environments.

