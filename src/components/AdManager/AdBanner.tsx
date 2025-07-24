import { useEffect } from "react";

export default function AdBanner({ slot, format = "auto" }) {
  const adId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  useEffect(() => {
    if (window && window.adsbygoogle) window.adsbygoogle.push({});
  }, []);
  return (
    <div style={{ margin: "12px 0", textAlign: "center" }}>
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
