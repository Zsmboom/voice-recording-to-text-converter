import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? '/api'  // 生产环境使用相对路径
  : 'http://localhost:3001/api';  // 开发环境使用本地地址

export const processText = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/process-text`, { text });
    return response.data.processedText;
  } catch (error) {
    console.error('处理文本时出错:', error);
    throw new Error('处理文本时出错');
  }
}; 