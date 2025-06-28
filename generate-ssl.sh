#!/bin/bash

# SSL Certificate Generation Script for RoyaltyX
# This script generates SSL certificates for the first time

echo "🔐 Starting SSL certificate generation for RoyaltyX domains..."

# Create necessary directories
echo "📁 Creating certificate directories..."
mkdir -p nginx/certificates nginx/html

# Start nginx for certificate validation
echo "🚀 Starting nginx for certificate validation..."
docker-compose -f docker-compose.certbot.yml up -d nginx

# Wait for nginx to be ready
echo "⏳ Waiting for nginx to be ready..."
sleep 10

# Generate certificates
echo "📜 Generating SSL certificates..."
docker-compose -f docker-compose.certbot.yml run --rm certbot

# Check if certificates were generated successfully
if [ -d "nginx/certificates/live/royaltyx.co" ]; then
    echo "✅ SSL certificates generated successfully!"
    echo "📂 Certificates are stored in: nginx/certificates/live/royaltyx.co/"
    
    # Stop the temporary nginx
    echo "🛑 Stopping temporary nginx..."
    docker-compose -f docker-compose.certbot.yml down
    
    echo "🎉 Certificate generation complete!"
    echo ""
    echo "Next steps:"
    echo "1. Uncomment the SSL server blocks in nginx/default.conf"
    echo "2. Start your production environment with: docker-compose -f production.yml up -d"
    echo ""
else
    echo "❌ Certificate generation failed!"
    echo "Please check the logs above for errors."
    echo "Common issues:"
    echo "- Domain DNS not pointing to this server"
    echo "- Firewall blocking port 80"
    echo "- Domain not accessible from the internet"
    
    # Stop the temporary nginx
    docker-compose -f docker-compose.certbot.yml down
    exit 1
fi
