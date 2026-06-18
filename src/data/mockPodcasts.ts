import { Podcast } from '../types/podcast';

export const mockPodcasts: Podcast[] = [
  {
    id: 'pod-1',
    title: 'Ground Report: MP के गांवों की असली समस्या क्या है? जल संकट और शिक्षा',
    slug: 'ground-report-mp-villages-real-issues-podcast',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800',
    duration: '22:15',
    publishedAt: '2 दिन पहले',
    host: 'प्रिया शर्मा',
    description: 'इस पॉडकास्ट में सुनिए मध्य प्रदेश के झाबुआ और खरगोन जिले के गांवों की ग्राउंड रियलिटी, जहां पानी, शिक्षा और स्वास्थ्य जैसी बुनियादी सुविधाएं आज भी एक चुनौती बनी हुई हैं।'
  },
  {
    id: 'pod-2',
    title: 'मप्र की राजनीति का नया चेहरा: कैबिनेट विस्तार के मायने और भविष्य',
    slug: 'mp-politics-new-cabinet-analysis-podcast',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=800',
    duration: '18:40',
    publishedAt: '4 दिन पहले',
    host: 'आकाश कुमार',
    description: 'कैबिनेट विस्तार के बाद मध्य प्रदेश की राजनीति में क्या नए समीकरण बन रहे हैं? क्या युवा चेहरों को शामिल करने से जमीनी स्तर पर बदलाव आएगा? सुनिए विस्तृत विश्लेषण।'
  },
  {
    id: 'pod-3',
    title: 'स्वच्छता का सरताज इंदौर: लगातार आठवीं बार नंबर 1 बनने की कहानी',
    slug: 'cleanest-city-indore-swachhta-story-podcast',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=800',
    duration: '14:55',
    publishedAt: '1 सप्ताह पहले',
    host: 'आकाश कुमार',
    description: 'इंदौर ने स्वच्छता में फिर से नंबर 1 का खिताब कैसे बरकरार रखा? क्या है इंदौर का वेस्ट मैनेजमेंट मॉडल और जनता की भागीदारी? जानिए इस विशेष पॉडकास्ट में।'
  }
];
