# 语音录制转文本项目

这是一个基于Web的语音录制应用，可以将语音实时转换为文本，并使用AI进行文本优化和整理。

## 功能特点

- 实时语音录制
- 语音转文本
- AI文本优化
- 响应式界面设计
- 支持中文识别

## 技术栈

### 前端
- React
- TypeScript
- Material-UI
- Web Speech API
- Axios

### 后端
- Node.js
- Express
- OpenAI API

## 安装说明

1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装前端依赖
```bash
cd frontend
npm install
```

3. 安装后端依赖
```bash
cd backend
npm install
```

4. 配置环境变量
```bash
cd backend
cp .env.example .env
```
然后编辑 `.env` 文件，添加你的 OpenAI API 密钥。

## 运行项目

1. 启动后端服务
```bash
cd backend
npm run dev
```

2. 启动前端服务
```bash
cd frontend
npm run dev
```

3. 访问应用
打开浏览器访问 `http://localhost:5173`

## 使用说明

1. 点击"开始录音"按钮开始录制语音
2. 说话时，文字会实时显示在屏幕上
3. 点击"停止录音"按钮结束录制
4. 系统会自动处理录制的文本，并显示优化后的结果

## 注意事项

- 请使用支持Web Speech API的现代浏览器（推荐使用Chrome）
- 确保有可用的麦克风设备
- 需要有效的OpenAI API密钥
- 确保有稳定的网络连接 