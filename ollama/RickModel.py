from huggingface_hub import hf_hub_download

print("Downloading models from huggingface hub...")
model_path = hf_hub_download(
    repo_id="falcon281/RickLLama-3.2-3B",
    filename="unsloth.Q8_0.gguf",
    repo_type="model",
    local_dir="./Rick",
)

modelfile_path = hf_hub_download(
    repo_id="falcon281/RickLLama-3.2-3B",
    filename="Modelfile",
    repo_type="model",
    local_dir="./Rick",
)

print("Downloaded model path:", model_path)
