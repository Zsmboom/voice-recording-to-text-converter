const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

// 环境变量检查
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '已设置' : '未设置',
  BASE_URL: process.env.BASE_URL || '未设置'
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://vip.apiyi.com/v1",
  timeout: 30000, // 增加超时时间到30秒
  maxRetries: 2
});

const app = express();

// 配置CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://voice-recording-to-text-converter.vercel.app', 'https://recordingtotextconverter.it.com', 'https://www.recordingtotextconverter.it.com']
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));

// 预检请求处理
app.options('/api/process-text', cors(corsOptions));

// 健康检查端点
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    env: process.env.NODE_ENV,
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
});

// 将文本分成句子
function splitIntoSentences(text) {
  // 使用标点符号和换行符分割文本
  return text.split(/(?<=[。！？.!?\n])\s*/);
}

app.post('/api/process-text', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      console.error('No text provided in request');
      return res.status(400).json({ error: '需要提供文本内容' });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API密钥未配置');
      return res.status(500).json({ error: 'OpenAI API配置错误' });
    }

    console.log('Processing text:', { length: text.length, preview: text.substring(0, 100) });

    // 将文本分成句子
    const sentences = splitIntoSentences(text);
    console.log('Split into sentences:', { count: sentences.length });
    
    let currentBatch = '';
    let batchCount = 0;

    // 设置响应头，支持流式传输
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    // 每3个句子处理一次
    for (let i = 0; i < sentences.length; i++) {
      currentBatch += sentences[i];
      batchCount++;

      if (batchCount >= 3 || i === sentences.length - 1) {
        console.log('Processing batch:', { 
          batchNumber: Math.floor(i / 3) + 1, 
          sentenceCount: batchCount,
          batchPreview: currentBatch.substring(0, 100)
        });

        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
              {
                role: "system",
                content: `你是一个专业的文字编辑，负责将口述内容整理成结构清晰的文章。请严格遵循以下要求：
1. 严格保持原文的内容，不能新增、不能删减、不能扩展解释
2. 只需要对原文进行条理性的整理和分类
3. 修正明显的口误或不通顺的表达
4. 生成一个简单的标题，直接概括主要内容
5. 使用 Markdown 格式输出
6. 保持作者的第一人称视角
7. 如果原文内容很少，不要强行分段或加入过多结构`
              },
              {
                role: "user",
                content: currentBatch
              }
            ],
            temperature: 0.1, // 进一步降低随机性，确保更严格地遵循原文
            max_tokens: 1000,
            presence_penalty: 0,
            frequency_penalty: 0.3,
          });

          const processedBatch = completion.choices[0].message.content;
          console.log('Processed batch result:', { 
            length: processedBatch.length,
            preview: processedBatch.substring(0, 100)
          });

          // 发送处理后的批次
          res.write(JSON.stringify({
            type: 'partial',
            text: processedBatch,
            isLast: i === sentences.length - 1
          }) + '\n');

        } catch (batchError) {
          console.error('Error processing batch:', {
            batchNumber: Math.floor(i / 3) + 1,
            error: batchError.message,
            response: batchError.response?.data
          });
          throw batchError;
        }

        // 重置批次
        currentBatch = '';
        batchCount = 0;
      }
    }

    console.log('Processing completed successfully');
    res.end();
  } catch (error) {
    console.error('处理文本时出错:', error.message);
    console.error('错误详情:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL,
        headers: error.config.headers
      } : 'No config available'
    });
    
    // 发送更详细的错误信息
    res.status(500).json({ 
      error: '处理文本时出错',
      details: error.message,
      type: error.name,
      errorCode: error.response?.status || error.code,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL
      } : null
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 导出处理函数供Vercel使用
module.exports = app; 