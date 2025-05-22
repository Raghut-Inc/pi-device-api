#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "=== [1/5] System dependencies ==="
sudo apt-get update
sudo apt-get install -y \
  sox libsox-fmt-all \
  python3-venv python3-dev libatlas-base-dev portaudio19-dev \
  npm \
  python3-picamera2 \
  libcamera-apps libcamera-tools

echo "=== [2/5] Python venv setup ==="
if [ ! -d "venv" ]; then
    python3 -m venv --system-site-packages venv
    echo "Virtual environment created."
else
    echo "Virtual environment already exists."
fi

echo "=== [3/5] Activate venv ==="
# shellcheck disable=SC1091
source venv/bin/activate

echo "=== [4/5] Python packages ==="
pip install --upgrade pip
pip install numpy==1.26.4
pip install requests flask opencv-python-headless
pip install ultralytics
pip install openvino openvino-dev

echo "=== [5/5] Node.js packages ==="
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️ package.json not found! Skipping npm install."
fi

echo "✅ Setup complete! Your environment (including camera streaming) is ready."