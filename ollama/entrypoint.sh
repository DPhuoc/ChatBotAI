#!/bin/bash

# Start Ollama in the background
ollama serve &

# Wait for Ollama to be ready
until wget -q --spider http://localhost:11434; do
  echo "Waiting for Ollama server..."
  sleep 1
done

pip install huggingface-hub
# python3 ./RickModel.py
python3 ./TranThanhModel.py
# ollama create rick-llm -f ./Rick/Modelfile
ollama create tranthanh-llm -f ./TranThanh/Modelfile

# Keep the main process running
wait
