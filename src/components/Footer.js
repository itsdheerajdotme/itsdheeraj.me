import Link from 'next/link';

export default function Footer({ profile }) {
    return (
        <footer className="py-4 bg-light-alt border-top border-secondary">
            <div className="container text-center">
                <div className="mb-3">
                    {Object.entries(profile.social).map(([platform, link], index) => (
                        <Link key={index} href={link} className="text-muted mx-3 fs-5 text-decoration-none" target="_blank" rel="noopener noreferrer">
                            <i className={`fab fa-${platform}`}></i>
                        </Link>
                    ))}
                </div>
                <p className="mb-0 text-muted small">
                    &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
