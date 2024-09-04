import React from "react";
import Script from "next/script";

// import ukrainianTranslations from "@/uk.json";

const SnipcartScript = () => {
  return (
    <>
      <Script
        src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"
        strategy="lazyOnload"
      />
      <div
        hidden
        id="snipcart"
        data-api-key={`${process.env.NEXT_PUBLIC_SNIPCART_API_KEY}`}
        data-config-modal-style="side"
      >
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              <snipcart-settings>
                <script type="application/json">
                  ${JSON.stringify({
                    currency: "uah",
                  })}
                </script>
              </snipcart-settings>
            `,
          }}
        />
      </div>
      {/* <Script id="snipcart-localization" strategy="afterInteractive">
        {`
            document.addEventListener('snipcart.ready', function() {
              Snipcart.api.session.setLanguage('uk', ${JSON.stringify(
                ukrainianTranslations
              )});
            });
          `}
      </Script> */}
    </>
  );
};

export default SnipcartScript;
