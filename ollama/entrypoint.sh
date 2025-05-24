#!/bin/bash

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be ready
until wget -q --spider http://localhost:11434; do
  echo "Waiting for Ollama server..."
  sleep 1
done

python ./model.py

# Keep the main process running
wait
