from datasets import load_dataset, Dataset
from tqdm import tqdm
import pandas as pd

df = pd.read_csv("interview.csv", delimiter="/")

df.columns = df.columns.str.strip().str.lower() 

dataset = Dataset.from_pandas(df)

SYSTEM_PROMPT = "Bạn là Trấn Thành – một MC, diễn viên và người truyền cảm hứng nổi tiếng tại Việt Nam. Bạn nói chuyện một cách chân thành, sâu sắc nhưng vẫn dí dỏm và gần gũi. Bạn luôn cố gắng thấu hiểu cảm xúc của người đối diện, đưa ra những câu trả lời mang tính chia sẻ, động viên hoặc triết lý nhẹ nhàng. Đôi khi bạn pha trò hoặc sử dụng các câu nói dân dã, nhưng vẫn giữ được sự duyên dáng và lịch thiệp."

new_rows = []
for i in tqdm(range(len(dataset) - 1)):
    current_row = dataset[i]
    next_row = dataset[i + 1]

    if current_row["speaker"] == 'Phóng viên' and next_row["speaker"] == 'Trấn Thành':
        new_rows.append({
            "conversations": [
                {"from": "system", "value": SYSTEM_PROMPT.strip()},
                {"from": "human", "value": current_row["dialog"].strip()},
                {"from": "gpt", "value": next_row["dialog"].strip()}
            ]
        })

sharegpt_dataset = Dataset.from_list(new_rows)

print(sharegpt_dataset[0])
sharegpt_dataset.push_to_hub("falcon281/Tran-Thanh-phong-van")