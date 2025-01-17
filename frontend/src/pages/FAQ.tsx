import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    question: '支持哪些语言的语音识别？',
    answer: '目前主要支持中文（普通话）的语音识别。我们正在努力添加更多语言的支持。'
  },
  {
    question: '语音识别的准确率如何？',
    answer: '在良好的录音环境下，语音识别的准确率可以达到95%以上。为了获得最佳效果，建议在安静的环境中使用，并确保发音清晰。'
  },
  {
    question: '如何提高识别准确率？',
    answer: '1. 使用优质麦克风\n2. 选择安静的环境\n3. 说话语速适中\n4. 发音清晰准确\n5. 避免背景噪音'
  },
  {
    question: 'AI文本优化具体会做什么？',
    answer: 'AI会对录音转换的文本进行以下优化：\n1. 自动添加标点符号\n2. 优化语句结构\n3. 调整段落分布\n4. 纠正语法错误\n5. 提升文章的连贯性和可读性'
  },
  {
    question: '是否支持长时间录音？',
    answer: '是的，系统支持长时间录音。但建议将较长的内容分成多个片段录制，这样可以更好地控制质量和进行分段处理。'
  },
  {
    question: '如何导出转换后的文本？',
    answer: '您可以直接复制转换后的文本，或使用导出按钮将文本保存为Word、PDF等格式的文件。'
  }
];

export const FAQ = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        常见问题解答
      </Typography>
      
      {faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              style={{ whiteSpace: 'pre-line' }}
              color="text.secondary"
            >
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}; 