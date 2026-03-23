const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function GoogleAdSense() {
  if (!ADSENSE_ID) return null;

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-scripts-outside-document
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
      crossOrigin="anonymous"
    />
  );
}
