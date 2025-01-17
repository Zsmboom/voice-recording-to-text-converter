import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const processText = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/process-text`, { text });
    return response.data.processedText;
  } catch (error) {
    console.error('处理文本时出错:', error);
    throw new Error('处理文本时出错');
  }
}; 