export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavItem[] = [
  { title: "होम", href: "/" },
  { title: "मध्यप्रदेश न्यूज़", href: "/category/madhya-pradesh" },
  { title: "देश", href: "/category/india" },
  { title: "शहर", href: "/category/cities" },
  { title: "विदेश", href: "/category/world" },
  { title: "क्रिकेट", href: "/category/cricket" },
  { title: "मनोरंजन", href: "/category/entertainment" },
  { title: "वीडियो", href: "/videos" },
  { title: "आस्था", href: "/astrology" },
];

export const footerNav = {
  categories: [
    { title: "मध्यप्रदेश न्यूज़", href: "/category/madhya-pradesh" },
    { title: "देश", href: "/category/india" },
    { title: "शहर", href: "/category/cities" },
    { title: "विदेश", href: "/category/world" },
    { title: "क्रिकेट", href: "/category/cricket" },
    { title: "मनोरंजन", href: "/category/entertainment" },
    { title: "लाइफस्टाइल", href: "/category/lifestyle" },
    { title: "आस्था", href: "/astrology" },
  ],
  features: [
    { title: "शॉर्ट्स", href: "/shorts" },
    { title: "वीडियो बुलेटिन", href: "/videos" },
    { title: "पॉडकास्ट", href: "/podcast" },
    { title: "राशिफल", href: "/astrology" },
  ],
  company: [
    { title: "हमारे बारे में", href: "/about" },
    { title: "संपर्क करें", href: "/contact" },
    { title: "गोपनीयता नीति", href: "/privacy" },
    { title: "नियम और शर्तें", href: "/terms" },
  ],
};

export const trendingTopics = [
  "नेशनल फैमिली हेल्थ सर्वे",
  "SIR",
  "डी के शिवकुमार",
  "वैभव सूर्यवंशी",
  "सिद्धारमैया",
  "RCB",
  "राज्यसभा चुनाव",
  "IPL 2026",
  "PM मोदी",
  "फ्राईडे रिलीज",
];
