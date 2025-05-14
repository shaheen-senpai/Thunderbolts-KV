#!/bin/bash

# Navigate to backend directory
cd "$(dirname "$0")"

# Check if conda environment exists
if ! conda env list | grep -q "chatgpt_backend"; then
    echo "Creating conda environment..."
    conda create -n chatgpt_backend python=3.10 -y
fi

# Activate conda environment
eval "$(conda shell.zsh hook)"
conda activate chatgpt_backend

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
