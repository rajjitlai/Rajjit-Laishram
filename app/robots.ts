import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/setup/', '/debug', '/login'],
            },
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'OAI-SearchBot',
                    'Anthropic-ai',
                    'ClaudeBot',
                    'Claude-Web',
                    'PerplexityBot',
                    'Google-Extended',
                    'Applebot-Extended',
                    'Amazonbot',
                    'ByteSpider',
                    'CCBot',
                    'cohere-ai',
                    'Meta-ExternalAgent',
                    'Diffbot',
                ],
                allow: ['/', '/data.json', '/llms.txt'],
                disallow: ['/setup/', '/debug', '/login'],
            },
        ],
        sitemap: 'https://rajjitlaishram.netlify.app/sitemap.xml',
    }
}

