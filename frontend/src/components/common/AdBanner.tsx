import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
}

export const AdBanner = ({ adSlot, adFormat = 'auto', fullWidthResponsive = true }: AdBannerProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  return (
    <Box textAlign="center" my={4}>
      {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive}
        />
      ) : (
        <Box bg="gray.100" p={4}>
          Ad Placeholder
        </Box>
      )}
    </Box>
  );
};
