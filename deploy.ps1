# PowerShell deployment script for Windows
param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName
)

Write-Host "Deploying SPA to S3 bucket: $BucketName" -ForegroundColor Green

# Create S3 bucket
aws s3 mb s3://$BucketName --region us-east-1

# Enable static website hosting
aws s3 website s3://$BucketName --index-document index.html --error-document index.html

# Upload files
aws s3 sync . s3://$BucketName --exclude "*.ps1" --exclude "*.json" --exclude "README.md" --exclude ".git/*"

# Set public read policy
$policy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BucketName/*"
        }
    ]
}
"@

$policy | Out-File -FilePath policy.json -Encoding utf8 -NoNewline
aws s3api put-bucket-policy --bucket $BucketName --policy file://policy.json
Remove-Item policy.json

Write-Host "Deployment complete!" -ForegroundColor Green
Write-Host "Website URL: http://$BucketName.s3-website-us-east-1.amazonaws.com" -ForegroundColor Yellow