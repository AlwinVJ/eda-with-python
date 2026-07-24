import { getAllProjects, getAllHandbooks } from '@/lib/content';

// Static RSS feed of repository updates (projects + handbooks), built at export time.
export async function GET() {
  const items = [...getAllProjects(), ...getAllHandbooks()]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 20);

  const xmlItems = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.lastUpdated).toUTCString()}</pubDate>
      <guid>${item.slug}</guid>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>EDA with Python — Updates</title>
  <description>Recent updates to projects and handbooks</description>
  ${xmlItems}
</channel></rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

function escapeXml(str: string) {
  return str.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c] as string));
}
