import React from 'react';
import { articleService } from '@/services/article.service';
import { shortsService } from '@/services/shorts.service';
import { videoService } from '@/services/video.service';
import { podcastService } from '@/services/podcast.service';
import { HeroSection } from '@/components/home/HeroSection';
import { MPNewsSection } from '@/components/home/MPNewsSection';
import { ShortsSection } from '@/components/home/ShortsSection';
import { VideosSection } from '@/components/home/VideosSection';
import { PodcastSection } from '@/components/home/PodcastSection';
import { ExplainerSection } from '@/components/home/ExplainerSection';
import { AayudhKhaasSection } from '@/components/home/AayudhKhaasSection';
import { PoliticsSection } from '@/components/home/PoliticsSection';
import { TopNewsTicker } from '@/components/home/TopNewsTicker';
import { EntertainmentSection } from '@/components/home/EntertainmentSection';
import { LifestyleSection } from '@/components/home/LifestyleSection';
import { AasthaSection } from '@/components/home/AasthaSection';

export default async function HomePage() {
  // Fetch everything in parallel on the server
  const [articles, shorts, videos, podcasts] = await Promise.all([
    articleService.getArticles(),
    shortsService.getShorts(),
    videoService.getVideos(),
    podcastService.getPodcasts(),
  ]);

  // Filter articles for specific sections
  const featuredArticle = articles?.find(a => a.isFeatured);
  const latestArticles = articles || [];
  let mpArticles = articles?.filter(a => a.category.slug === 'madhya-pradesh') || [];
  if (mpArticles.length > 0 && mpArticles.length < 9) {
    mpArticles = [...mpArticles, ...mpArticles.slice(0, 9 - mpArticles.length)];
  }
  mpArticles = mpArticles.slice(0, 9);
  let politicsArticles = articles?.filter(a => a.category.slug === 'india') || [];
  if (politicsArticles.length > 0 && politicsArticles.length < 4) {
    politicsArticles = [...politicsArticles, ...politicsArticles.slice(0, 4 - politicsArticles.length)];
  }
  const entertainmentArticles = articles?.filter(a => a.category.slug === 'entertainment') || [];
  const lifestyleArticles = articles?.filter(a => a.category.slug === 'lifestyle') || [];
  const khaasArticles = articles?.filter(a => a.category.slug === 'aayudh-khaas' || a.id === 'art-6' || a.id === 'art-7') || [];

  // Filter videos for explainers and normal ones
  const explainerVideos = videos?.filter(v => v.type === 'explainer') || [];
  const otherVideos = videos?.filter(v => v.type !== 'explainer') || [];

  return (
    <div className="space-y-3 pb-8">
      {/* 0. Top Breaking News Ticker */}
      <TopNewsTicker news={latestArticles.slice(0, 5)} />

      {/* 1. Hero Featured Section */}
      <HeroSection featuredArticle={featuredArticle} latestArticles={latestArticles} />

      {/* 2. Madhya Pradesh news Grid & Live Cricket score Sidebar */}
      <MPNewsSection articles={mpArticles} />

      {/* 3. Shorts Carousel */}
      {shorts && shorts.length > 0 && <ShortsSection shorts={shorts} />}

      {/* 4. Video, Podcast, and Explainer Grid Row */}
      <section className="py-8 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-[35fr_40fr_25fr] gap-8 items-stretch">
          <VideosSection videos={otherVideos} />
          <PodcastSection podcasts={podcasts || []} />
          <ExplainerSection videos={explainerVideos} />
        </div>
      </section>

      {/* 5. Aayudh Khaas Section */}
      <AayudhKhaasSection articles={khaasArticles} />

      {/* 6. Politics Section */}
      <PoliticsSection articles={politicsArticles} />

      {/* 7. Entertainment Section */}
      <EntertainmentSection articles={entertainmentArticles} />

      {/* 8. Aastha Section */}
      <AasthaSection />

      {/* 9. Lifestyle Section */}
      <LifestyleSection articles={lifestyleArticles} />
    </div>
  );
}
