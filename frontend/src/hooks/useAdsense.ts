import { useEffect } from 'react';

export const useAdsense = () => {
  useEffect(() => {
    const loadAdsense = () => {
      if (typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = () => {
          console.log('AdSense script loaded');
        };
        document.head.appendChild(script);
      }
    };

    loadAdsense();
  }, []);

  const refreshAds = () => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Failed to refresh ads:', error);
    }
  };

  return { refreshAds };
};
