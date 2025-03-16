from sentence_transformers import SentenceTransformer
# from ollama import chat

MODEL_NAME = 'all-MiniLM-L6-v2'
sentences = ["This is an example sentence", "Each sentence is converted"]

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
embeddings = model.encode(sentences)
print(len(embeddings[0]))
