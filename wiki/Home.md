# Token Distribution Framework Wiki

Welcome to the Token Distribution Framework wiki! This comprehensive guide covers everything you need to understand, implement, and use token vesting systems for blockchain treasury management.

## 🌟 Quick Links

- **[Interactive Dashboard](https://qadao.io/Token-Distribution-Framework/dashboard/)** - Visualize vesting schedules
- **[Token Distribution Framework](Token-Distribution-Framework)** - Core framework concepts
- **[Token Categories](Token-Categories)** - Project, Participant, and Auditor tokens
- **[Vesting Approaches](Vesting-Approaches)** - Pure Milestone vs Hybrid vesting
- **[Implementation Guide](Implementation-Guide)** - How to use the Python scripts
- **[Dashboard Guide](Dashboard-Guide)** - Navigate the interactive dashboard
- **[Use Cases](Use-Cases)** - Real-world applications

## 📊 Overview

This repository implements a **Token Distribution Framework** for blockchain treasury management, applied to real Catalyst Fund 5 Developer Ecosystem data ($588,202 across 24 projects).

### What's Included

1. **Two Vesting Approaches**
   - Pure Milestone: Achievement-based, fast execution
   - Hybrid Vesting: Time-gated with cliff and tail periods

2. **Python Implementations**
   - Complete scripts for both vesting approaches
   - JSON and CSV output generation
   - Real-world data processing

3. **Interactive Web Dashboard**
   - 6 interactive Chart.js visualizations
   - Compare approaches side-by-side
   - Scenario simulator with timeline slider
   - Filter and explore 24 real projects

4. **Comprehensive Documentation**
   - Framework theory and rationale
   - Implementation guides
   - Use case examples

## 🚀 Getting Started

### For Users

1. **Explore the Dashboard**: Visit the [live dashboard](https://qadao.io/Token-Distribution-Framework/dashboard/) to visualize vesting schedules
2. **Understand the Framework**: Read about the [Token Distribution Framework](Token-Distribution-Framework)
3. **Choose an Approach**: Learn about [Vesting Approaches](Vesting-Approaches) to decide which fits your needs

### For Developers

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework.git
   cd Token-Distribution-Framework
   ```

2. **Run the Scripts**:
   ```bash
   # Pure Milestone Vesting
   python3 token_distribution.py
   
   # Hybrid Vesting
   python3 token_distribution_hybrid.py
   ```

3. **Launch Dashboard Locally**:
   ```bash
   cd dashboard
   python3 -m http.server 8000
   # Open http://localhost:8000
   ```

### For Treasury Managers

1. Review [Use Cases](Use-Cases) to see how this applies to your needs
2. Use the [Dashboard](https://qadao.io/Token-Distribution-Framework/dashboard/) to model different scenarios
3. Compare [Vesting Approaches](Vesting-Approaches) for your project size and risk profile

## 📈 Key Statistics

- **24 Funded Projects** analyzed
- **$588,202** total funding
- **588,202** tokens issued
- **2 Vesting Approaches** implemented
- **6 Interactive Charts** in dashboard
- **1,872 Vesting Data Points** (Hybrid approach)

## 🎯 Framework Benefits

### For Projects
- Guaranteed operational funding (50% allocation)
- Milestone incentives for progress
- Predictable cashflow with hybrid vesting

### For Participants
- Direct contribution rewards (30% allocation)
- Performance bonuses through milestones
- Long-term alignment through vesting

### For Auditors
- Fair compensation for verification (20% allocation)
- Performance-linked releases
- Independence maintained through token structure

### For Ecosystem
- Complete transparency and auditability
- Accountability through milestones
- Risk management via hybrid vesting
- Market efficiency through token signals

## 📚 Documentation Structure

### Core Concepts
- **[Token Distribution Framework](Token-Distribution-Framework)** - AMM-based distribution system
- **[Token Categories](Token-Categories)** - Understanding the 50/30/20 split
- **[Vesting Approaches](Vesting-Approaches)** - Comparing Pure vs Hybrid

### Implementation
- **[Implementation Guide](Implementation-Guide)** - Using the Python scripts
- **[Dashboard Guide](Dashboard-Guide)** - Navigating the web interface
- **[Data Schema](Data-Schema)** - Understanding JSON output formats

### Applications
- **[Use Cases](Use-Cases)** - Treasury management, grants, DAOs
- **[Deployment Guide](Deployment-Guide)** - Hosting the dashboard
- **[API Reference](API-Reference)** - Extending the framework

## 🔧 Technical Stack

### Python Scripts
- **Language**: Python 3.6+
- **Dependencies**: None (uses standard library)
- **Output**: CSV and JSON formats

### Web Dashboard
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js 4.4.0 (via CDN)
- **Build**: None required (pure static files)
- **Deployment**: Any static host (GitHub Pages, Netlify, Vercel)

## 🤝 Contributing

We welcome contributions! See areas for improvement:

- Additional vesting schedule variations
- New chart types for dashboard
- Integration with smart contracts
- Multi-currency support
- Real-time data feeds

## 📝 License

This project follows the repository's license terms.

## 📧 Support

- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join conversations in GitHub Discussions
- **Documentation**: All guides available in this wiki

---

**Repository**: [Token-Distribution-Framework](https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework)  
**Dashboard**: [https://qadao.io/Token-Distribution-Framework/dashboard/](https://qadao.io/Token-Distribution-Framework/dashboard/)  
**Version**: 2.0 (Dual Vesting Approaches)  
**Last Updated**: October 2025

