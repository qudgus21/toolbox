import Script from "next/script";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

export function GoogleAdSense() {
  if (!ADSENSE_ID) return null;

  return (
    <Script
      id="adsense-loader"
      dangerouslySetInnerHTML={{
        __html: `window.addEventListener("load",function(){var s=document.createElement("script");s.async=true;s.crossOrigin="anonymous";s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}";document.head.appendChild(s)})`,
      }}
    />
  );
}
