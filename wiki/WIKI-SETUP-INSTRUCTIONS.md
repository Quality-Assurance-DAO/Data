# Wiki Setup Instructions

This directory contains wiki pages ready to be uploaded to the GitHub Wiki for the Token-Distribution-Framework repository.

## Files Created

- `Home.md` - Main wiki landing page
- `Token-Distribution-Framework.md` - Core framework documentation (from Project-AMM.md)
- `Token-Categories.md` - Detailed explanation of 50/30/20 split
- `Vesting-Approaches.md` - Comparison of Pure Milestone vs Hybrid
- `_Sidebar.md` - Navigation sidebar for all wiki pages

## Option 1: Upload via GitHub Web Interface (Easiest)

### Step 1: Enable Wiki

1. Go to https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework
2. Click on "Settings" tab
3. Scroll down to "Features" section
4. Check the "Wikis" checkbox

### Step 2: Create Initial Wiki Page

1. Go to "Wiki" tab in your repository
2. Click "Create the first page"
3. Title: "Home"
4. Copy content from `wiki/Home.md` and paste it
5. Click "Save Page"

### Step 3: Add Additional Pages

For each remaining wiki file:

1. Click "New Page" button
2. Enter the page title (without .md extension):
   - Token-Distribution-Framework
   - Token-Categories
   - Vesting-Approaches
3. Copy content from the corresponding `.md` file
4. Click "Save Page"

### Step 4: Add Sidebar

1. Click "Add a custom sidebar"
2. Copy content from `_Sidebar.md`
3. Click "Save Page"

## Option 2: Clone and Push Wiki Repository (Advanced)

### Step 1: Clone Wiki Repo

```bash
git clone https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework.wiki.git
cd Token-Distribution-Framework.wiki
```

### Step 2: Copy Wiki Files

```bash
# From the main repository directory
cp wiki/*.md Token-Distribution-Framework.wiki/
```

### Step 3: Commit and Push

```bash
cd Token-Distribution-Framework.wiki
git add .
git commit -m "Add comprehensive wiki pages based on Project-AMM.md"
git push origin master
```

## Option 3: Upload via Git (Current Directory)

If you're in the wiki directory already:

```bash
# Initialize if not already a git repo
cd wiki
git init
git remote add origin https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework.wiki.git

# Add and commit files
git add *.md
git commit -m "Initial wiki setup with comprehensive documentation"

# Push to wiki
git push -u origin master
```

## Verification

After uploading, verify by visiting:
https://github.com/Quality-Assurance-DAO/Token-Distribution-Framework/wiki

You should see:
- ✅ Home page with overview
- ✅ Sidebar navigation on the right
- ✅ All pages accessible via links
- ✅ Proper formatting and images

## Customization

### Updating Content

To update wiki pages:
1. Edit the `.md` files in the `wiki/` directory
2. Copy updated content to GitHub (web interface or git push)

### Adding New Pages

1. Create new `.md` file in `wiki/` directory
2. Add link to `_Sidebar.md` for navigation
3. Upload via your preferred method

### Linking Between Pages

Use this format for internal links:
```markdown
[Link Text](Page-Name)
```

Example:
```markdown
See [Token Categories](Token-Categories) for details.
```

## Troubleshooting

### Wiki Not Appearing
- Ensure "Wikis" is enabled in repository settings
- Refresh the page after enabling

### Formatting Issues
- GitHub Wiki supports GitHub Flavored Markdown
- Test complex formatting in a preview tool first

### Broken Links
- Use kebab-case for page names (Token-Distribution-Framework)
- Don't include `.md` extension in links
- Links are case-sensitive

## Additional Pages to Create (Optional)

You may want to add these pages later:
- `Implementation-Guide.md` - Detailed script usage
- `Dashboard-Guide.md` - Dashboard navigation help
- `Use-Cases.md` - Real-world applications
- `Data-Schema.md` - JSON/CSV structure reference
- `Deployment-Guide.md` - Hosting instructions
- `API-Reference.md` - For future API development

## Support

For issues with wiki setup:
1. Check GitHub Wiki documentation: https://docs.github.com/en/communities/documenting-your-project-with-wikis
2. Open an issue in the main repository
3. Check GitHub status for service issues

---

**Ready?** Choose your preferred method and get the wiki live!

