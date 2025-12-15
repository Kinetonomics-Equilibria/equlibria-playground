#!/bin/bash
# Simple local server for testing the playground

echo "Starting local server..."
echo "Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop"

# Try python3 first, then python, then fallback to npx
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
elif command -v npx &> /dev/null; then
    npx http-server -p 8000
else
    echo "Error: No suitable server found. Install Python or Node.js"
    exit 1
fi
