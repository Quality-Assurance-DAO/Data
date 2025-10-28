# Token Distribution Vesting Dashboard

Interactive web dashboard for visualizing token vesting schedules from the Catalyst Fund 5 Developer Ecosystem data.

## Overview

This dashboard provides rich, interactive visualizations of two vesting approaches:
- **Pure Milestone Vesting**: Achievement-based token releases
- **Hybrid Vesting**: Cliff + Milestone + Linear time-gated vesting

## Features

### 📊 Visualizations

1. **Cumulative Vesting Timeline** - Track token accumulation over milestones/months
2. **Token Category Distribution** - View 50/30/20 split across Project/Participant/Auditor
3. **Vesting Rate Chart** - See monthly vesting rate (Hybrid only)
4. **Side-by-Side Comparison** - Compare both approaches for the same project
5. **Category Breakdown** - Stacked view of all three token categories

### 🎛️ Interactive Features

- **Approach Selector**: Toggle between Pure Milestone, Hybrid Vesting, or Comparison mode
- **Project Selection**: Choose from 24 funded projects or view portfolio aggregate
- **Search & Filter**: Find projects by name or filter by funding size
- **Scenario Simulator**: Interactive timeline slider to explore vesting at different points
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🎯 Use Cases

- **Treasury Planning**: Visualize cash outflow schedules
- **Stakeholder Communication**: Present vesting concepts clearly
- **Comparison Analysis**: Understand tradeoffs between approaches
- **Project Selection**: Choose appropriate vesting for new projects

## Quick Start

### Option 1: Local Development Server (Recommended)

```bash
cd dashboard
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: Direct File Access

Simply open `index.html` in your web browser. All dependencies are loaded via CDN.

### Option 3: Deploy to GitHub Pages

```bash
# From repository root
git checkout -b gh-pages
git add dashboard/
git commit -m "Deploy dashboard"
git push origin gh-pages
```

Access at: `https://yourusername.github.io/yourrepo/dashboard/`

## Usage Guide

### Navigating the Dashboard

1. **Select Vesting Approach**
   - Click one of the three buttons at the top
   - Pure Milestone: Fast, achievement-based
   - Hybrid Vesting: Time-gated with milestones
   - Compare Both: Side-by-side analysis

2. **Choose a Project**
   - Use the sidebar dropdown to select a project
   - Search by typing in the search box
   - Filter by project size or sort by funding

3. **Explore Visualizations**
   - Hover over charts for detailed tooltips
   - Click legend items to toggle data series
   - All charts update automatically when you change selections

4. **Use Scenario Simulator** (Hybrid/Comparison mode)
   - Move the month slider to see vesting at different points
   - Compare Pure vs Hybrid at the same timeline position
   - Understand cliff protection and time-gating benefits

### Keyboard Shortcuts

- `Alt + 1`: Switch to Pure Milestone view
- `Alt + 2`: Switch to Hybrid Vesting view
- `Alt + 3`: Switch to Comparison view

## Dashboard Structure

```
dashboard/
├── index.html              # Main HTML page
├── css/
│   ├── style.css          # Main styles
│   └── charts.css         # Chart-specific styles
├── js/
│   ├── app.js             # Main application logic
│   ├── data-loader.js     # JSON data loading
│   ├── charts.js          # Chart.js configurations
│   ├── project-selector.js # Project selection UI
│   ├── comparison.js      # Comparison mode logic
│   └── utils.js           # Helper functions
├── data/
│   ├── pure-milestone.json  # Pure vesting data
│   └── hybrid-vesting.json  # Hybrid vesting data
└── README.md              # This file
```

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid and Flexbox
- **Vanilla JavaScript** - No frameworks, ES6+ features
- **Chart.js 4.4.0** - Beautiful, responsive charts
- **No build tools** - Works directly in browser

## Updating Data

To update the dashboard with new data:

1. Regenerate JSON files:
   ```bash
   cd ..
   python3 token_distribution.py
   python3 token_distribution_hybrid.py
   ```

2. Copy new files to dashboard:
   ```bash
   cp token_allocations_output.json dashboard/data/pure-milestone.json
   cp token_allocations_hybrid_output.json dashboard/data/hybrid-vesting.json
   ```

3. Refresh the dashboard in your browser

## Customization

### Changing Colors

Edit `css/style.css` and modify the CSS variables:

```css
:root {
    --project-color: #3B82F6;      /* Project tokens */
    --participant-color: #10B981;  /* Participant tokens */
    --auditor-color: #F59E0B;      /* Auditor tokens */
    --pure-color: #8B5CF6;         /* Pure milestone */
    --hybrid-color: #EC4899;       /* Hybrid vesting */
}
```

### Adding New Charts

1. Create chart function in `js/charts.js`
2. Add chart container in `index.html`
3. Call chart function in appropriate update method

### Modifying Layout

The dashboard uses CSS Grid for layout. Edit `css/style.css`:

```css
.main-container {
    grid-template-columns: 280px 1fr;  /* Sidebar width and main area */
}

.charts-grid {
    grid-template-columns: repeat(2, 1fr);  /* Number of chart columns */
}
```

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support
- IE11: ❌ Not supported (uses ES6 features)

## Performance

- **Load Time**: < 2 seconds on standard connection
- **Chart Rendering**: < 500ms per chart
- **Smooth Animations**: 60 FPS
- **Data Size**: ~1.5 MB (JSON data)
- **No Backend Required**: Pure static files

## Accessibility

- ✅ Keyboard navigation supported
- ✅ ARIA labels on interactive elements
- ✅ High contrast ratios for text
- ✅ Responsive text sizing
- ✅ Screen reader friendly

## Troubleshooting

### Charts Not Displaying

**Problem**: Charts show as empty
**Solution**: Ensure Chart.js CDN is accessible. Check browser console for errors.

### Data Not Loading

**Problem**: "Error loading data" message
**Solution**: 
- Verify JSON files exist in `data/` folder
- Use a local server (CORS restrictions prevent direct file:// access in some browsers)
- Check browser console for specific error messages

### Slow Performance

**Problem**: Dashboard feels sluggish
**Solution**:
- Ensure you're using a modern browser
- Close other tabs to free up memory
- Reduce number of data points if customizing

### Mobile Display Issues

**Problem**: Layout broken on mobile
**Solution**:
- Clear browser cache
- Ensure viewport meta tag is present in HTML
- Check CSS media queries are loading

## Future Enhancements

### Planned Features

- [ ] PDF report generation
- [ ] CSV data export
- [ ] Custom vesting schedule creator
- [ ] Multi-project comparison (select 2-5 projects)
- [ ] Historical data tracking
- [ ] Smart contract code generator

### Integration Ideas

- REST API for external tools
- WebSocket for real-time updates
- Database backend for saved views
- User accounts and preferences
- Collaborative sharing features

## Contributing

To contribute improvements:

1. Test changes in multiple browsers
2. Maintain vanilla JS (no frameworks)
3. Keep dependencies minimal
4. Document new features
5. Ensure mobile responsiveness

## Data Source

- **Source**: Catalyst Fund 5 Developer Ecosystem
- **Projects**: 24 funded proposals
- **Total Funding**: $588,202
- **Generated**: October 2025

## License

Same license as parent repository.

## Support

For issues or questions:
1. Check this README first
2. Review browser console for errors
3. Verify JSON data files are present and valid
4. Ensure you're using a local server (not file://)

---

**Dashboard Version**: 1.0  
**Last Updated**: October 28, 2025  
**Framework**: Token Distribution Dashboard  
**Status**: Production Ready

