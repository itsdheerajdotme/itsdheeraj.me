'use client';
import Link from 'next/link';

export default function Hero({ profile }) {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="hero" className="d-flex align-items-center min-vh-100 text-center">
            <div className="container" data-aos="fade-up">
                <h1 className="display-3 fw-bold mb-3">Hello, I&apos;m <span className="text-accent">{profile.name}</span></h1>
                <h2 className="h4 fw-light mb-4">{profile.title}</h2>
                <p className="lead mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    {profile.bio}
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link href="#booking" onClick={(e) => handleScroll(e, 'booking')} className="btn btn-primary btn-lg px-4 rounded-pill">
                        Book Free Call
                    </Link>
                    <Link href={profile.resumeLink} className="btn btn-outline-light btn-lg px-4 rounded-pill">
                        Resume
                    </Link>
                </div>
            </div>
        </section>
    );
}
