from app import db, create_app
from app.models import RagDocument
from sentence_transformers import SentenceTransformer

embedder = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
# Hoặc: 'paraphrase-multilingual-MiniLM-L12-v2' nếu muốn nhẹ hơn

app = create_app()

with open("wikipedia_output.txt", "r", encoding="utf-8") as f:
    raw_text = f.read()
    docs = [doc.strip() for doc in raw_text.split("\n\n") if doc.strip()]

with app.app_context():
    for doc in docs:
        emb = embedder.encode(doc).tolist()
        rag = RagDocument(content=doc, embedding=emb)
        db.session.add(rag)
    db.session.commit()
    print("Đã nạp dữ liệu RAG từ wikipedia_output.txt với model tiếng Việt.")
