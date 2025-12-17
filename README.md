# stats-aggregator
Single Page Application to capture and display Government Stats from Public Domains, hosted on AWS S3.

## Quick Start

1. **Configure AWS CLI**:
   ```bash
   aws configure
   ```

2. **Deploy to S3**:
   ```powershell
   .\deploy.ps1 -BucketName "your-unique-bucket-name"
   ```

3. **Access your SPA**: `http://your-bucket-name.s3-website-us-east-1.amazonaws.com`

## Project Structure

- `index.html` - Main SPA page
- `app.js` - Application logic
- `styles.css` - Styling
- `deploy.ps1` - AWS deployment script
- `aws-config.json` - AWS configuration

## Features

- Responsive design
- Mock government statistics display
- AWS S3 static website hosting
- One-command deployment

## Customization

Modify `app.js` to integrate with actual government APIs (Census Bureau, BLS, etc.).
