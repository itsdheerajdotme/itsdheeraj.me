'use client';

import Script from 'next/script';

export default function Scripts() {
    const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || 'G-3585L0W2P8';

    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');
        `}
            </Script>

            {/* Other scripts can be added here */}
        </>
    );
}
