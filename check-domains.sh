#!/bin/bash

# Domain connectivity check script for SSL certificate generation

echo "🔍 Checking domain connectivity for SSL certificate generation..."
echo ""

DOMAINS=("royaltyx.co" "www.royaltyx.co" "api.royaltyx.co" "app.royaltyx.co" "flower.royaltyx.co")
SERVER_IP="5.161.127.178"

echo "📍 Server IP: $SERVER_IP"
echo ""

# Check DNS resolution
echo "🌐 Checking DNS resolution..."
for domain in "${DOMAINS[@]}"; do
    echo -n "  $domain: "
    resolved_ip=$(dig +short $domain | tail -n1)
    if [ "$resolved_ip" = "$SERVER_IP" ]; then
        echo "✅ Resolves to $resolved_ip"
    elif [ -z "$resolved_ip" ]; then
        echo "❌ No DNS record found"
    else
        echo "⚠️  Resolves to $resolved_ip (expected $SERVER_IP)"
    fi
done

echo ""

# Check if port 80 is accessible
echo "🔌 Checking port 80 accessibility..."
if command -v nc >/dev/null 2>&1; then
    for domain in "${DOMAINS[@]}"; do
        echo -n "  $domain:80: "
        if timeout 5 nc -z $domain 80 2>/dev/null; then
            echo "✅ Port 80 is open"
        else
            echo "❌ Port 80 is not accessible"
        fi
    done
else
    echo "  ⚠️  netcat (nc) not available, skipping port check"
fi

echo ""

# Check HTTP response
echo "🌍 Checking HTTP response..."
for domain in "${DOMAINS[@]}"; do
    echo -n "  http://$domain: "
    response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 5 "http://$domain" 2>/dev/null)
    if [ "$response" = "200" ]; then
        echo "✅ HTTP 200 OK"
    elif [ "$response" = "000" ]; then
        echo "❌ Connection failed"
    else
        echo "⚠️  HTTP $response"
    fi
done

echo ""

# Check if nginx is running
echo "🐳 Checking Docker containers..."
if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q nginx; then
    echo "✅ Nginx container is running"
    docker ps --format "table {{.Names}}\t{{.Status}}" | grep nginx
else
    echo "❌ Nginx container is not running"
fi

echo ""

# Check firewall (if ufw is available)
echo "🔥 Checking firewall status..."
if command -v ufw >/dev/null 2>&1; then
    ufw_status=$(ufw status | head -n1)
    echo "  $ufw_status"
    if ufw status | grep -q "80.*ALLOW"; then
        echo "✅ Port 80 is allowed in firewall"
    else
        echo "⚠️  Port 80 may be blocked by firewall"
    fi
else
    echo "  ⚠️  UFW not available, check your firewall manually"
fi

echo ""
echo "📋 Summary:"
echo "  1. Ensure all domains resolve to $SERVER_IP"
echo "  2. Ensure port 80 is open and accessible from the internet"
echo "  3. Ensure nginx container is running"
echo "  4. Ensure firewall allows port 80"
echo ""
echo "💡 If all checks pass, try running the SSL generation script again:"
echo "  ./generate-ssl.sh"
