import axios from 'axios';

const API_URL = import.meta.env.PROD 
  ? '/api'  // 生产环境使用相对路径
  : 'http://localhost:3001/api';  // 开发环境使用本地地址

interface PartialResult {
  type: 'partial';
  text: string;
  isLast: boolean;
}

export const processText = async (
  text: string,
  onPartialResult: (text: string, isLast: boolean) => void
): Promise<void> => {
  try {
    console.log('=== API REQUEST START ===');
    console.log('Making API request to:', `${API_URL}/process-text`);
    console.log('Request payload:', { text });

    const response = await axios.post(`${API_URL}/process-text`, { text }, {
      responseType: 'text',
      onDownloadProgress: (progressEvent: any) => {
        if (!progressEvent.event.target.responseText) {
          return;
        }

        console.log('=== DOWNLOAD PROGRESS ===');
        const rawData = progressEvent.event.target.responseText;
        console.log('Raw response length:', rawData.length);
        
        try {
          // 尝试直接解析整个响应
          const result = JSON.parse(rawData);
          console.log('Parsed complete response:', result);
          if (result.text) {
            onPartialResult(result.text, true);
            return;
          }
        } catch (e) {
          // 如果不能解析整个响应，尝试按行解析
          const lines = rawData.split('\n').filter(Boolean);
          console.log('Processing response lines:', lines.length);
          
          lines.forEach((line: string, index: number) => {
            try {
              const result = JSON.parse(line);
              console.log('Parsed line result:', result);
              if (result.text) {
                onPartialResult(result.text, index === lines.length - 1);
              }
            } catch (e) {
              console.warn('Cannot parse line:', line);
            }
          });
        }
      }
    });

    // 确保最后一次更新状态
    if (response.data) {
      console.log('=== FINAL RESPONSE ===');
      try {
        const finalResult = typeof response.data === 'string' 
          ? JSON.parse(response.data)
          : response.data;
        
        if (finalResult.text) {
          onPartialResult(finalResult.text, true);
        }
      } catch (error) {
        console.error('Error parsing final response:', error);
      }
    }

    console.log('=== API REQUEST END ===');
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}; 