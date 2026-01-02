'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer({ profile }) {
    const pathname = usePathname();

    // Hide footer on resume page to ensure full-screen embed
    if (pathname === '/resume') {
        return null;
    }

    return (
        <footer className="footer py-4">
            <div className="container text-center">
                <div className="mb-3">
                    {Object.entries(profile.social).map(([platform, link], index) => (
                        <a
                            key={index}
                            href={link}
                            className="social-icon mx-2"
                            title={platform}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className={`fab fa-${platform} fa-2x`}></i>
                        </a>
                    ))}
                </div>
                <p className="mb-0 text-muted">
                    © {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
                <small className="text-muted d-block mt-2">
                    Looking for a DevOps Engineer? <a href={`mailto:${profile.email}`} className="text-accent">Let&apos;s Connect!</a>
                </small>
            </div>
        </footer>
    );
}
