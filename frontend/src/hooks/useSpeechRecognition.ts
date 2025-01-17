import { useState, useEffect, useCallback } from 'react';

export interface Language {
  code: string;
  name: string;
  localName: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en-US', name: 'English (US)', localName: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)', localName: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish', localName: 'Español' },
  { code: 'fr-FR', name: 'French', localName: 'Français' },
  { code: 'de-DE', name: 'German', localName: 'Deutsch' },
  { code: 'it-IT', name: 'Italian', localName: 'Italiano' },
  { code: 'pt-BR', name: 'Portuguese', localName: 'Português' },
  { code: 'ru-RU', name: 'Russian', localName: 'Русский' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', localName: '简体中文' },
  { code: 'ja-JP', name: 'Japanese', localName: '日本語' },
  { code: 'ko-KR', name: 'Korean', localName: '한국어' },
  { code: 'hi-IN', name: 'Hindi', localName: 'हिन्दी' },
];

interface UseSpeechRecognitionReturn {
  text: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  setText: (value: string | ((prevText: string) => string)) => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage.code;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          }
        }
        
        if (finalTranscript) {
          setText(finalTranscript);
        }
      };

      recognition.onend = () => {
        if (isListening) {
          recognition.start();
        } else {
          setIsListening(false);
        }
      };

      setRecognition(recognition);
    }
  }, [selectedLanguage]);

  const startListening = useCallback(() => {
    if (recognition) {
      setText('');
      recognition.start();
      setIsListening(true);
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
    selectedLanguage,
    setSelectedLanguage,
    setText,
  };
}; 