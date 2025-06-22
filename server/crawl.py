from newspaper import Article

url = "https://eva.vn/lang-sao/tran-thanh-thong-tin-tieu-su-va-su-nghiep-dien-xuat-c20a485699.html"
article = Article(url, language="vi")
article.download()
article.parse()

with open("wikipedia_output.txt", "w", encoding="utf-8") as f:
    f.write(article.text)

print("Đã lưu nội dung vào wikipedia_output.txt")
