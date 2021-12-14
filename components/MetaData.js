import React from "react";
import Head from 'next/head'


function MetaData({ title, noTracking }) {
  return (
    <Head>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="https://ntrace.io" />
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies."
      />
      <meta name="keywords" content="analytics, open-source" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ntrace.io" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies. "
      />
      <meta
        property="og:image"
        content="https://ntrace.io/cool-bio-analytics-demo-dark.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ntrace.io" />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Open Source Analytics service for web analytics without the need of tracking cookies. "
      />
      <meta
        property="twitter:image"
        content="https://ntrace.io/cool-bio-analytics-demo-dark.png"
      />
      {!noTracking && (
        <script
          async="true"
          defer="true"
          src="https://ntrace.io/tracking.js"
          data-project-id="9581b0a0-e5aa-48d0-8f79-98480f3e45ee"
        ></script>
      )}
      <script>
        {`if(typeof require === 'undefined') var require = {};
        if (typeof exports === 'undefined') var exports = {};`}
      </script>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' />
    </Head>
  );
}

export default MetaData;
