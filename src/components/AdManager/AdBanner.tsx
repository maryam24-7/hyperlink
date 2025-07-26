import { useEffect } from "react";

// تعريف adsbygoogle لحل مشكلة TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner({ slot, format = "auto" }) {
  const adId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // يمكن تجاهل الخطأ إذا لم يتم تحميل adsbygoogle فعلياً
    }
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
