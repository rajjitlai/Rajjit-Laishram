import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Rajjit Laishram | Drone & Autonomous Systems Developer',
        short_name: 'Rajjit Laishram',
        description: 'Project Assistant at NIELIT Imphal (Drone Electronics Lab) & Autonomous Systems Developer based in Manipur.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#38ff42',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/logo.svg',
                sizes: 'any',
                type: 'image/svg+xml',
            },
        ],
        categories: ['development', 'technology', 'portfolio', 'utilities'],
        lang: 'en-US',
    };
}
