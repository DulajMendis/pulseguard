#!/usr/bin/env bash
# PulseGuard Automated Worker
# Pings the check runner endpoint to verify all registered monitors

PULSEGUARD_URL=${1:-"http://localhost:3000"}
echo "[$(date)] Triggering PulseGuard check runner at $PULSEGUARD_URL/api/check..."

RESPONSE=$(curl -s -X POST "$PULSEGUARD_URL/api/check" -H "Content-Type: application/json")
echo "Result: $RESPONSE"
