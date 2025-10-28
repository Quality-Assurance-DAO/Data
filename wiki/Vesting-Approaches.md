# Vesting Approaches

The Token Distribution Framework supports two distinct vesting mechanisms: **Pure Milestone Vesting** (achievement-based) and **Hybrid Vesting** (time-gated with milestones). Each approach serves different project types and governance needs.

## Quick Comparison

| Feature | Pure Milestone | Hybrid Vesting |
|---------|---------------|----------------|
| **Trigger** | Achievement only | Achievement + Time |
| **Duration** | Variable (no minimum) | Fixed (12 months) |
| **Speed** | Project controls | Time-constrained |
| **Pattern** | Lumpy (25% chunks) | Smooth (gradual) |
| **Cliff** | None | 30 days |
| **Abandonment Risk** | High | Low |
| **Maintenance** | No incentive | 10% tail vesting |
| **Gaming Risk** | Higher | Lower |
| **Cashflow** | Unpredictable | Predictable |
| **Complexity** | Simple | Moderate |
| **Best For** | Trusted teams, small projects | New teams, large projects |

## Pure Milestone Vesting

### Overview

Achievement-based token releases with no time constraints. Tokens unlock immediately when milestones are achieved, allowing projects to control their own pace.

### How It Works

```
Milestone 1 (25%) → 25% tokens released immediately
Milestone 2 (50%) → 25% tokens released immediately  
Milestone 3 (75%) → 25% tokens released immediately
Milestone 4 (100%) → 25% tokens released immediately
```

**Timeline**: As fast as milestones can be completed (potentially days or weeks)

### Token Distribution

For a $50,000 project (50,000 tokens):

| Milestone | Project | Participant | Auditor | Total |
|-----------|---------|-------------|---------|-------|
| M1 (25%) | 6,250 | 3,750 | 2,500 | 12,500 |
| M2 (50%) | 6,250 | 3,750 | 2,500 | 12,500 |
| M3 (75%) | 6,250 | 3,750 | 2,500 | 12,500 |
| M4 (100%) | 6,250 | 3,750 | 2,500 | 12,500 |

**Total**: 25,000 Project + 15,000 Participant + 10,000 Auditor = 50,000 tokens

### Advantages

✅ **Fast Execution**: Teams can move quickly
✅ **Simple**: Easy to understand and implement  
✅ **Flexible**: Project controls timeline  
✅ **Motivating**: Immediate rewards for achievements
✅ **Low Overhead**: Minimal tracking required

### Disadvantages

❌ **Gaming Risk**: Teams might rush milestones
❌ **No Protection**: Can't prevent early abandonment  
❌ **Lumpy Cashflow**: Unpredictable treasury impact
❌ **No Maintenance Incentive**: Nothing after completion
❌ **Trust Required**: Assumes team good faith

### Best Use Cases

**Small Projects** (< $15,000):
- Low risk if team abandons
- Simple deliverables
- Short natural timeline

**Trusted Teams**:
- Proven track record
- Existing reputation
- Low abandonment risk

**Simple Deliverables**:
- Clear success criteria
- Easy to verify
- Objective milestones

**Short Timeline**:
- 1-3 month projects
- One-time outputs
- No maintenance needed

### Real-World Example

**Metadata oracle endpoint in Yoroi** ($1,200):
- Small, focused project
- Trusted Yoroi team
- Simple integration
- **Perfect for pure milestone**

**Result**: Fast execution, immediate value, minimal risk

---

## Hybrid Vesting (Cliff + Milestone + Linear)

### Overview

Sophisticated time-gated vesting with achievement milestones. Combines milestone achievements with linear time-based vesting to create balanced incentives and risk management.

### How It Works

#### Phase 1: Cliff Period (Month 0-1)
- **Duration**: 30 days
- **Tokens Vested**: 0%
- **Purpose**: Prevent very early abandonment
- **Effect**: No tokens if team quits immediately

#### Phase 2: Milestone + Linear (Months 1-6)
- **Duration**: 6 months
- **Tokens Allocated**: 90% of total
- **Mechanism**: 
  - Milestones unlock token "pools"
  - Each pool vests linearly over 2 months
  - Multiple pools can vest simultaneously
- **Effect**: Smooth, predictable releases

#### Phase 3: Tail Vesting (Months 6-12)
- **Duration**: 6 months
- **Tokens Allocated**: 10% of total
- **Mechanism**: Linear vesting
- **Purpose**: Incentivize maintenance and support
- **Effect**: Ongoing team engagement

### Token Distribution

For a $50,000 project (50,000 tokens):

**Milestone Allocation** (90% = 45,000 tokens):
- Per milestone pool: 11,250 tokens
- Vests over 2 months: 5,625 tokens/month

**Tail Allocation** (10% = 5,000 tokens):
- Linear over 6 months: ~833 tokens/month

### Month-by-Month Timeline

| Month | Event | Vested This Month | Cumulative | % Complete |
|-------|-------|-------------------|------------|------------|
| 0 | CLIFF | 0 | 0 | 0% |
| 1 | M1 unlocks | 5,625 | 5,625 | 11.2% |
| 2 | M2 unlocks | 11,250 | 16,875 | 33.8% |
| 3 | Pools vest | 5,625 | 22,500 | 45.0% |
| 4 | M3 unlocks | 5,625 | 28,125 | 56.2% |
| 5 | Pools vest | 5,625 | 33,750 | 67.5% |
| 6 | M4 unlocks | 5,625 | 39,375 | 78.8% |
| 7 | Tail begins | 5,833 | 45,208 | 90.4% |
| 8 | Tail | 833 | 46,042 | 92.1% |
| 9 | Tail | 833 | 46,875 | 93.8% |
| 10 | Tail | 833 | 47,708 | 95.4% |
| 11 | Tail | 833 | 48,542 | 97.1% |
| 12 | Tail | 1,458 | 50,000 | 100.0% |

### Advantages

✅ **Risk Management**: Cliff protects against early exits  
✅ **Predictable**: Smooth, scheduled releases  
✅ **Anti-Gaming**: Can't rush for quick payout
✅ **Maintenance**: Tail vesting incentivizes support
✅ **Accountability**: Time requirements ensure commitment
✅ **Treasury Planning**: Predictable cash outflow

### Disadvantages

❌ **Slower**: Minimum 12 months to full vesting
❌ **Complex**: More rules and tracking  
❌ **Rigid**: Less flexibility for fast teams
❌ **Overhead**: Requires timeline monitoring

### Best Use Cases

**Large Projects** (> $20,000):
- Significant treasury risk
- Complex deliverables
- Long-term commitment needed

**New Teams**:
- Unproven track record
- Accountability important
- Higher abandonment risk

**Complex Work**:
- Sustained effort required
- Multiple phases
- Ongoing maintenance

**Infrastructure**:
- Long-term support needed
- Continuous updates
- Community reliance

### Real-World Example

**Artificial Intelligence/ML API** ($80,000):
- Large allocation
- Complex implementation
- Ongoing maintenance
- **Perfect for hybrid vesting**

**Result**: Protected treasury, sustained team engagement, quality delivery

---

## Decision Framework

### Choose Pure Milestone If:

- ✓ Project < $15,000 (manageable risk)
- ✓ Team has proven track record
- ✓ Deliverables are simple and clear
- ✓ Timeline naturally short (< 3 months)
- ✓ One-time output, no maintenance
- ✓ Fast execution is valuable
- ✓ Treasury can absorb potential loss

### Choose Hybrid Vesting If:

- ✓ Project > $20,000 (significant risk)
- ✓ Team is new or unproven
- ✓ Deliverables are complex
- ✓ Timeline is long (6-12 months)
- ✓ Maintenance is required
- ✓ Accountability is important
- ✓ Predictable cashflow needed
- ✓ Anti-gaming protection desired

### Still Unsure?

**Default Recommendation**: **Hybrid Vesting**

Hybrid vesting provides better risk management for DAO treasuries and ensures long-term project success through sustained engagement.

---

## Scenario Comparisons

### Scenario 1: Team Completes All Milestones in Month 2

**Pure Milestone**:
- ✅ 100% vested (50,000 tokens)
- ✅ Team can access all funds
- ❌ Could disappear after payout
- ❌ No maintenance incentive

**Hybrid Vesting**:
- ✓ 33.8% vested (16,875 tokens)
- ✓ Remaining vests over 10 months
- ✓ Team must stay engaged
- ✓ Treasury protected

**Difference**: 33,125 tokens (66.2%) still locked in hybrid

### Scenario 2: Team Quits After 2 Weeks

**Pure Milestone**:
- If M1 completed: 25% paid out (12,500 tokens lost)
- If M1 not completed: 0% paid out (no loss)
- No protection period

**Hybrid Vesting**:
- Still in cliff: 0% paid out
- Treasury fully protected
- Zero token loss

**Advantage**: Hybrid cliff saves 12,500 tokens

### Scenario 3: Project Needs Maintenance (Month 7+)

**Pure Milestone**:
- 100% already vested
- No incentive to maintain
- Team might move on
- Users may suffer

**Hybrid Vesting**:
- 10% still vesting (5,000 tokens)
- Team incentivized to support
- Smooth transition
- Users protected

**Advantage**: Hybrid tail keeps team engaged

---

## Implementation

### Running Pure Milestone

```bash
python3 token_distribution.py
```

**Outputs**:
- `token_allocations_output.csv` (18 columns)
- `token_allocations_output.json` (hierarchical)

### Running Hybrid Vesting

```bash
python3 token_distribution_hybrid.py
```

**Outputs**:
- `token_allocations_hybrid_output.csv` (32 columns with monthly timeline)
- `token_allocations_hybrid_output.json` (detailed vesting schedules)

### Visualizing Both

**Interactive Dashboard**: [https://qadao.io/Token-Distribution-Framework/dashboard/](https://qadao.io/Token-Distribution-Framework/dashboard/)

Features:
- Toggle between approaches
- Side-by-side comparison
- Scenario simulator
- Filter by project size

---

## Configuration

Both approaches are highly configurable:

### Pure Milestone Variations

```python
# Current: 4 milestones, 25% each
MILESTONES = [0.25, 0.50, 0.75, 1.00]

# Alternative: More frequent
MILESTONES = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00]

# Alternative: Weighted (back-loaded)
MILESTONES = [0.10, 0.20, 0.30, 0.40]  # 40% at completion
```

### Hybrid Vesting Variations

```python
# Current configuration
CLIFF_PERIOD_DAYS = 30
MILESTONE_VESTING_MONTHS = 2
TAIL_VESTING_RATIO = 0.10

# For research projects (longer timeline)
CLIFF_PERIOD_DAYS = 60
MILESTONE_PERIOD_MONTHS = 12
TAIL_VESTING_RATIO = 0.15

# For quick integrations (shorter timeline)
CLIFF_PERIOD_DAYS = 14
MILESTONE_PERIOD_MONTHS = 3
TAIL_VESTING_RATIO = 0.05
```

---

## Next Steps

- **Explore Dashboard**: [Dashboard Guide →](Dashboard-Guide)
- **Implement Framework**: [Implementation Guide →](Implementation-Guide)
- **Review Use Cases**: [Use Cases →](Use-Cases)
- **Understand Token Categories**: [Token Categories →](Token-Categories)

---

**Key Takeaway**: Choose Pure Milestone for speed and simplicity with trusted teams. Choose Hybrid Vesting for risk management and sustained engagement with accountability needs.

