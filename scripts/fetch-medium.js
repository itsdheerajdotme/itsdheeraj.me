const fs = require('fs');
const path = require('path');
const https = require('https');

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@thedijje';
const OUTPUT_FILE = path.join(__dirname, '../src/data/medium.json');

https.get(RSS_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.status === 'ok') {
                const posts = json.items.map(item => {
                    // Extract image from description if thumbnail is missing
                    let image = item.thumbnail;
                    if (!image) {
                        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                        if (imgMatch) {
                            image = imgMatch[1];
                        }
                    }

                    return {
                        title: item.title,
                        date: item.pubDate.split(' ')[0], // YYYY-MM-DD
                        link: item.link,
                        thumbnail: image,
                        description: item.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...', // Strip HTML and truncate
                        tags: item.categories
                    };
                });

                const outputDir = path.dirname(OUTPUT_FILE);
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }

                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 4));
                console.log(`Successfully fetched ${posts.length} Medium posts.`);
            } else {
                console.error('Failed to fetch Medium posts:', json.message);
                process.exit(1);
            }
        } catch (error) {
            console.error('Error parsing Medium Feed:', error);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('Error fetching Medium Feed:', err);
    process.exit(1);
});
