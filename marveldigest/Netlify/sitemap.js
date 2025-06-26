const { SitemapStream, streamToPromise } = require('sitemap');
const { readFileSync } = require('fs');

exports.handler = async function() {
  // Example: read your posts list from a JSON file
  const posts = JSON.parse(readFileSync('./content/posts.json'));
  const sitemap = new SitemapStream({ hostname: 'https://marveldigest.com' });

  posts.forEach(post => {
    sitemap.write({ url: `/${post.slug}`, changefreq: 'daily', priority: 0.8 });
  });
  sitemap.end();

  const xml = (await streamToPromise(sitemap)).toString();
  return { statusCode: 200, headers: { 'Content-Type': 'application/xml' }, body: xml };
};



<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <!-- Homepage -->
  <url>
    <loc>https://marveldigest.com/</loc>
    <lastmod>2025-06-26</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Category pages -->
  <url>
    <loc>https://marveldigest.com/history/</loc>
    <lastmod>2025-06-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://marveldigest.com/sports/</loc>
    <lastmod>2025-06-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Blog posts -->
  <url>
    <loc>https://marveldigest.com/posts/10-conspiracy-theories/</loc>
    <lastmod>2025-06-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://marveldigest.com/posts/netlify-sitemap-setup/</loc>
    <lastmod>2025-06-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

</urlset>