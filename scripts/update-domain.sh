#!/usr/bin/env bash
# Usage: ./scripts/update-domain.sh example.com
# Updates nginx configs and env variables with your domain
set -e
DOMAIN="$1"
if [ -z "$DOMAIN" ]; then
  echo "Usage: $0 example.com"
  exit 1
fi

if [ -f .env ]; then
  sed -i "s#^REACT_APP_URL=.*#REACT_APP_URL=https://app.$DOMAIN#" .env
  sed -i "s#^REACT_APP_API_URL=.*#REACT_APP_API_URL=https://api.$DOMAIN#" .env
fi

for f in nginx/default.conf nginx/default-with-ssl.conf; do
  [ -f "$f" ] || continue
  sed -i "s#royaltyx.co#$DOMAIN#g" "$f"
  sed -i "s#app.royaltyx.co#app.$DOMAIN#g" "$f"
  sed -i "s#api.royaltyx.co#api.$DOMAIN#g" "$f"
  sed -i "s#flower.royaltyx.co#flower.$DOMAIN#g" "$f"
  sed -i "s#www.royaltyx.co#www.$DOMAIN#g" "$f"
done
