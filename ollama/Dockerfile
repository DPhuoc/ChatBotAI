FROM ollama/ollama

# Install wget
RUN apt-get update && apt-get install -y wget python3 python3-pip

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY RickModel.py /RickModel.py
COPY TranThanhModel.py /TranThanhModel.py

ENTRYPOINT ["/entrypoint.sh"]
