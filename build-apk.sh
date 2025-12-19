#!/bin/bash

# CleanBoost APK Build Script
# Use this script to build the APK using EAS Cloud

set -e

echo "================================"
echo "🚀 CleanBoost APK Build"
echo "================================"
echo ""

# Check if EAS is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    npm install -g eas-cli
fi

# Check if logged in
echo "🔐 Checking EAS login..."
if ! eas whoami &> /dev/null; then
    echo "⚠️  You need to login to Expo first"
    echo "Run: eas login"
    exit 1
fi

echo "✅ Logged in to Expo"
echo ""

# Build APK
echo "🔨 Building APK..."
echo "This may take 15-30 minutes..."
echo ""

eas build --platform android --non-interactive --wait

echo ""
echo "================================"
echo "✅ Build Complete!"
echo "================================"
echo ""
echo "📥 Downloading APK..."
echo ""

# Get the latest build
BUILD_ID=$(eas build:list --platform android --limit 1 --json | jq -r '.[0].id')
echo "Build ID: $BUILD_ID"

# Try to download
if eas build:download --id "$BUILD_ID" --path ./cleanboost.apk; then
    echo ""
    echo "✅ APK downloaded: ./cleanboost.apk"
    echo ""
    echo "📱 To install on your phone:"
    echo "   adb install ./cleanboost.apk"
    echo ""
    echo "Or copy the file to your phone and install manually"
else
    echo ""
    echo "⚠️  Could not download APK automatically"
    echo "Visit: https://expo.dev/projects to download manually"
fi

echo ""
echo "================================"
echo "Done! 🎉"
echo "================================"
