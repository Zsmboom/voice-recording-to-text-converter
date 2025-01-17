const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://vip.apiyi.com/v1"
});

app.post('/api/process-text', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: '需要提供文本内容' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `你是一个专业的文字编辑，负责将口述内容整理成结构清晰的文章。请遵循以下要求：
1. 从内容中提炼一个核心观点作为标题
2. 使用树状结构组织文章，包括：
   - 主标题（核心观点）
   - 一级标题（主要论点）
   - 二级内容（论点展开和论据）
3. 严格遵守：
   - 不能删除任何观点
   - 不能新增任何观点
   - 只能对原有内容进行重新组织和结构化
   - 必须使用第一人称（我、我的、我认为等）来表达，保持作者的个人视角
4. 语气要求：
   - 使用"我认为"、"我的观点是"、"在我看来"等第一人称表达
   - 保持作者的个人语气和态度
   - 让读者感觉是在读作者的个人见解
5. 使用 Markdown 格式输出
6. 确保内容的逻辑性和可读性`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const processedText = completion.choices[0].message.content;

    res.json({ processedText });
  } catch (error) {
    console.error('处理文本时出错:', error.message);
    console.error('错误详情:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: '处理文本时出错',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
}); 