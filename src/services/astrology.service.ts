import { Horoscope } from '../types/horoscope';
import { fetcher } from '../lib/api';

const mockHoroscopes: Horoscope[] = [
  {
    sign: "मेष",
    englishSign: "Aries",
    prediction: "आज आपका स्वास्थ्य उत्तम रहेगा। कार्यक्षेत्र में नए अवसर मिलेंगे। आर्थिक लाभ के योग हैं, लेकिन फिजूलखर्ची से बचें। पारिवारिक जीवन में मधुरता बनी रहेगी। निवेश के लिए दिन अनुकूल है।",
    element: "अग्नि",
    luckyNumber: 9,
    luckyColor: "लाल",
    icon: "♈"
  },
  {
    sign: "वृषभ",
    englishSign: "Taurus",
    prediction: "व्यवसाय में प्रगति होगी। रुके हुए काम पूरे हो सकते हैं। आज आपको वाणी पर नियंत्रण रखना होगा। जीवनसाथी का भरपूर सहयोग मिलेगा। यात्रा सुखद रहेगी।",
    element: "पृथ्वी",
    luckyNumber: 6,
    luckyColor: "सफेद",
    icon: "♉"
  },
  {
    sign: "मिथुन",
    englishSign: "Gemini",
    prediction: "मानसिक तनाव कम होगा। रचनात्मक कार्यों में रुचि बढ़ेगी। छात्रों के लिए आज का दिन विशेष रूप से सफलता दायक रहेगा। धन लाभ के नए मार्ग प्रशस्त होंगे।",
    element: "वायु",
    luckyNumber: 5,
    luckyColor: "हरा",
    icon: "♊"
  },
  {
    sign: "कर्क",
    englishSign: "Cancer",
    prediction: "पारिवारिक मामलों में संवेदनशीलता दिखाएं। प्रॉपर्टी से जुड़े मामलों में सावधानी बरतें। स्वास्थ्य का विशेष ध्यान रखें। नौकरीपेशा लोगों के लिए दिन सामान्य रहेगा।",
    element: "जल",
    luckyNumber: 2,
    luckyColor: "चमकदार सफेद",
    icon: "♋"
  },
  {
    sign: "सिंह",
    englishSign: "Leo",
    prediction: "आत्मविश्वास में वृद्धि होगी। समाज में मान-सम्मान बढ़ेगा। उच्च अधिकारियों का सहयोग प्राप्त होगा। नया काम शुरू करने के लिए दिन अच्छा है। स्वास्थ्य उत्तम रहेगा।",
    element: "अग्नि",
    luckyNumber: 1,
    luckyColor: "नारंगी",
    icon: "♌"
  },
  {
    sign: "कन्या",
    englishSign: "Virgo",
    prediction: "आर्थिक स्थिति मजबूत होगी। पुराने मित्रों से मुलाकात होगी। नौकरी में पदोन्नति के योग हैं। अपनी योजनाओं को गुप्त रखें, सफलता मिलेगी। सेहत अच्छी रहेगी।",
    element: "पृथ्वी",
    luckyNumber: 5,
    luckyColor: "पीला",
    icon: "♍"
  },
  {
    sign: "तुला",
    englishSign: "Libra",
    prediction: "कारोबार में नए अनुबंध हो सकते हैं। दांपत्य जीवन सुखमय रहेगा। आज आलस्य से बचें और समय पर काम पूरा करें। संतान पक्ष से शुभ समाचार मिलेगा।",
    element: "वायु",
    luckyNumber: 7,
    luckyColor: "नीला",
    icon: "♎"
  },
  {
    sign: "वृश्चिक",
    englishSign: "Scorpio",
    prediction: "आज के दिन थोड़ा उतार-चढ़ाव रह सकता है। क्रोध पर नियंत्रण रखें और वाद-विवाद से बचें। अचानक कोई बड़ा खर्च सामने आ सकता है। शाम के समय शांति मिलेगी।",
    element: "जल",
    luckyNumber: 8,
    luckyColor: "गहरा लाल",
    icon: "♏"
  },
  {
    sign: "धनु",
    englishSign: "Sagittarius",
    prediction: "अध्यात्म की ओर झुकाव बढ़ेगा। धन प्राप्ति के सरल मार्ग खुलेंगे। परिवार के साथ धार्मिक यात्रा पर जा सकते हैं। आपका स्वास्थ्य अच्छा रहेगा और कार्य सफल होंगे।",
    element: "अग्नि",
    luckyNumber: 3,
    luckyColor: "पीला",
    icon: "♐"
  },
  {
    sign: "मकर",
    englishSign: "Capricorn",
    prediction: "करियर में महत्वपूर्ण निर्णय लेने पड़ सकते हैं। मेहनत का पूरा फल मिलेगा। पारिवारिक समस्याओं का समाधान होगा। वाहन चलाते समय सावधानी बरतें।",
    element: "पृथ्वी",
    luckyNumber: 4,
    luckyColor: "काला/नीला",
    icon: "♑"
  },
  {
    sign: "कुंभ",
    englishSign: "Aquarius",
    prediction: "सामाजिक कार्यों में बढ़-चढ़कर हिस्सा लेंगे। आय के नए स्रोत बनेंगे। पुराने कर्जों से मुक्ति मिल सकती है। दांपत्य जीवन में खुशहाली रहेगी।",
    element: "वायु",
    luckyNumber: 11,
    luckyColor: "बैंगनी",
    icon: "♒"
  },
  {
    sign: "मीन",
    englishSign: "Pisces",
    prediction: "आज का दिन बहुत फलदायी रहने वाला है। कला और साहित्य से जुड़े लोगों को मान-सम्मान मिलेगा। स्वास्थ्य में सुधार होगा। किसी बड़े निवेश से लाभ होने के योग हैं।",
    element: "जल",
    luckyNumber: 12,
    luckyColor: "सुनहरा",
    icon: "♓"
  }
];

export const astrologyService = {
  async getZodiacHoroscope(signName: string): Promise<Horoscope | undefined> {
    const horoscope = mockHoroscopes.find(
      h => h.sign === signName || h.englishSign.toLowerCase() === signName.toLowerCase()
    );
    return fetcher(horoscope);
  },
  async getAllHoroscopes(): Promise<Horoscope[]> {
    return fetcher(mockHoroscopes);
  }
};
export type AstrologyService = typeof astrologyService;
