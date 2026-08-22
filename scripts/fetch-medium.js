const fs = require('fs');
const path = require('path');
const https = require('https');

const RSS_URL = 'https://medium.com/feed/@thedijje';
const OUTPUT_FILE = path.join(__dirname, '../src/data/medium.json');

https.get(RSS_URL, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
}, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const posts = [];
            const itemRegex = /<item>([\s\S]*?)<\/item>/g;
            let match;

            while ((match = itemRegex.exec(data)) !== null) {
                const itemContent = match[1];

                // Extract Title
                let title = '';
                const titleMatch = itemContent.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) || 
                                   itemContent.match(/<title>([\s\S]*?)<\/title>/);
                if (titleMatch) {
                    title = titleMatch[1].trim();
                }

                // Extract Link
                let link = '';
                const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
                if (linkMatch) {
                    link = linkMatch[1].trim();
                }

                // Extract PubDate
                let pubDate = '';
                const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
                if (pubDateMatch) {
                    pubDate = pubDateMatch[1].trim();
                }

                // Format Date (YYYY-MM-DD)
                let dateStr = '';
                if (pubDate) {
                    const parsedDate = new Date(pubDate);
                    if (!isNaN(parsedDate.getTime())) {
                        const year = parsedDate.getFullYear();
                        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                        const day = String(parsedDate.getDate()).padStart(2, '0');
                        dateStr = `${year}-${month}-${day}`;
                    }
                }

                // Extract Content / Description
                let descriptionHtml = '';
                const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/) ||
                                     itemContent.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
                if (contentMatch) {
                    descriptionHtml = contentMatch[1];
                } else {
                    const descMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
                                      itemContent.match(/<description>([\s\S]*?)<\/description>/);
                    if (descMatch) {
                        descriptionHtml = descMatch[1];
                    }
                }

                // Extract image from descriptionHtml
                let image = '';
                const imgMatch = descriptionHtml.match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch) {
                    image = imgMatch[1];
                }

                // Extract Description (Strip HTML tags, get snippet)
                let description = descriptionHtml
                    .replace(/<[^>]+>/g, '') // strip html
                    .replace(/Continue reading on Medium\s*»?/gi, '') // clean up Medium's read more text
                    .replace(/\s+/g, ' ')   // normalize whitespace
                    .trim();
                if (description.length > 150) {
                    description = description.substring(0, 150) + '...';
                }

                // Extract categories / tags
                const tags = [];
                const categoryRegex = /<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g;
                let catMatch;
                while ((catMatch = categoryRegex.exec(itemContent)) !== null) {
                    tags.push(catMatch[1].trim());
                }
                const categoryRegexNormal = /<category>([^<]+)<\/category>/g;
                let catMatchNormal;
                while ((catMatchNormal = categoryRegexNormal.exec(itemContent)) !== null) {
                    tags.push(catMatchNormal[1].trim());
                }

                // De-duplicate tags
                const uniqueTags = [...new Set(tags)];

                posts.push({
                    title,
                    date: dateStr,
                    link,
                    thumbnail: image,
                    description,
                    tags: uniqueTags
                });
            }

            const outputDir = path.dirname(OUTPUT_FILE);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 4));
            console.log(`Successfully fetched ${posts.length} Medium posts.`);
        } catch (error) {
            console.error('Error parsing Medium Feed:', error);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching Medium Feed:', err);
    process.exit(1);
});
