import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve legacy URLs from the prior static site (vercel.json replacement).
  // /book kept as the verbatim external cal.com redirect; .html variants 301'd
  // to their App Router routes so anything indexed/bookmarked still resolves
  // (Meta data-deletion compliance depends on /data-deletion staying live).
  async redirects() {
    return [
      {
        source: "/book",
        destination: "https://cal.com/tony-starks-dzd0mf/jonex-discovery",
        permanent: false,
      },
      { source: "/book.html", destination: "/book", permanent: false },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms", permanent: true },
      {
        source: "/data-deletion.html",
        destination: "/data-deletion",
        permanent: true,
      },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
