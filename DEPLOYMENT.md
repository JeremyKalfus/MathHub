# 🚀 Deployment Guide for GitHub Pages

This guide will help you deploy the Math Training Hub to GitHub Pages so it can be accessed online.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., `math-training-hub`)
4. Make sure it's set to "Public" (required for free GitHub Pages)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all files from your local `math-training-hub` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. Add a commit message like "Initial commit - Math Training Hub"
4. Click "Commit changes"

### Option B: Using Git Command Line
```bash
# Navigate to your project folder
cd /path/to/math-training-hub

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - Math Training Hub"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/math-training-hub.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab (in the repository menu)
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Access Your Website

1. GitHub will process your site (this may take a few minutes)
2. Your website will be available at:
   `https://YOUR_USERNAME.github.io/math-training-hub`
3. You can find the exact URL in the Pages settings

## Step 5: Custom Domain (Optional)

If you have a custom domain, you can:
1. Add a `CNAME` file to your repository with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Update the Pages settings to use your custom domain

## Troubleshooting

### Common Issues:

1. **Site not loading**: Wait a few minutes for GitHub to process the site
2. **404 Error**: Make sure `index.html` is in the root directory
3. **Styling issues**: Check that all CSS and JS files are properly linked
4. **Repository not public**: GitHub Pages requires public repositories for free accounts

### Updating Your Site:

To update your site:
1. Make changes to your local files
2. Commit and push changes to GitHub
3. GitHub Pages will automatically update (may take a few minutes)

## Features After Deployment:

✅ **Free Hosting**: No cost for hosting
✅ **Custom URL**: Your own GitHub Pages URL
✅ **Automatic Updates**: Changes are deployed automatically
✅ **HTTPS**: Secure connection by default
✅ **Mobile Friendly**: Responsive design works on all devices

## Next Steps:

1. Share your website URL with students or colleagues
2. Bookmark the site for easy access
3. Consider adding more math topics
4. Customize the design to match your preferences

---

**Your Math Training Hub is now live on the web! 🎉**
