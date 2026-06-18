export const BRAND_NAME = "AAYUDH";
export const BRAND_TAGLINE = "मध्य प्रदेश का विश्वसनीय हिंदी समाचार";

export const REGIONS = [
  { name: "भोपाल", value: "bhopal" },
  { name: "इंदौर", value: "indore" },
  { name: "जबलपुर", value: "jabalpur" },
  { name: "ग्वालियर", value: "gwalior" },
];

export const SHARE_LINKS = {
  twitter: (url: string, text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  facebook: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  whatsapp: (url: string, text: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
};
