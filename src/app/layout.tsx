import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dulaj Mendis — Systems Architect & Full-Stack Engineer',
  description:
    'Official portfolio of Dulaj Mendis. Manager of Sustainability and System Administration at Connaissance De Ceylan (CDC). Creator of Travex (DMC Operating System), PulseGuard, and Sri Lanka Railway transit GIS.',
  metadataBase: new URL('https://dulajmendis.com'),
  alternates: {
    canonical: 'https://dulajmendis.com',
  },
  authors: [{ name: 'Dulaj Mendis', url: 'https://dulajmendis.com' }],
  creator: 'Dulaj Mendis',
  keywords: [
    'Dulaj Mendis',
    'Systems Architect',
    'Full Stack Engineer',
    'Connaissance De Ceylan',
    'Travex',
    'PulseGuard',
    'Sri Lanka Railway Network',
    'Next.js',
    'React 19',
    'NestJS',
    'Prisma',
    'PostgreSQL',
    'GIS',
    'Interaction Engineering',
    'DMC Operations',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dulajmendis.com',
    siteName: 'Dulaj Mendis',
    title: 'Dulaj Mendis — Systems Architect & Full-Stack Engineer',
    description:
      'Manager of Sustainability & System Administration at Connaissance De Ceylan. Architect of Travex, PulseGuard, and Sri Lanka Railway Network.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dulaj Mendis — Systems Architecture & Engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dulaj Mendis — Systems Architect & Full-Stack Engineer',
    description:
      'Enterprise systems, developer observability, and interaction engineering.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://dulajmendis.com/#person',
        name: 'Dulaj Mendis',
        jobTitle: 'Manager of Sustainability and System Administration',
        worksFor: {
          '@type': 'Organization',
          name: 'Connaissance De Ceylan',
          url: 'https://www.connaissancedeceylan.com',
        },
        url: 'https://dulajmendis.com',
        sameAs: ['https://github.com/DulajMendis', 'https://railway.dulajmendis.com'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Colombo',
          addressCountry: 'LK',
        },
        knowsAbout: [
          'Enterprise Systems Architecture',
          'Full-Stack Engineering',
          'Destination Management Systems',
          'Developer Observability',
          'Geographic Information Systems (GIS)',
          'Interaction Design & UI Systems',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://dulajmendis.com/#website',
        url: 'https://dulajmendis.com',
        name: 'Dulaj Mendis — Official Portfolio',
        publisher: {
          '@id': 'https://dulajmendis.com/#person',
        },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        {/* Anti-FOUC theme initializer */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-emerald-500/20 selection:text-emerald-400">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
