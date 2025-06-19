#!/bin/bash
set -e

# Ensure dependencies are installed
if [ ! -d node_modules ]; then
  npm install
fi

# Build the project into dist/
npm run build

# Optionally package the build into build/ directory
mkdir -p build
zip -r build/allenatore-nato-demo.zip dist

# Inform user
echo "Build completed. Archive available at build/bolt-manager-demo.zip"