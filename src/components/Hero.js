import Link from 'next/link';

export default function Hero({ profile }) {
    return (
        <section id="hero" className="d-flex align-items-center min-vh-100 text-center">
            <div className="container" data-aos="fade-up">
                <h1 className="display-3 fw-bold mb-3">Hello, I&apos;m <span className="text-accent">{profile.name}</span></h1>
                <h2 className="h4 fw-light mb-4">{profile.title}</h2>
                <p className="lead mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    {profile.bio}
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link href="#contact" className="btn btn-primary btn-lg px-4 rounded-pill">
                        Get in Touch
                    </Link>
                    <Link href={profile.resumeLink} className="btn btn-outline-light btn-lg px-4 rounded-pill">
                        Resume
                    </Link>
                </div>
            </div>
        </section>
    );
}
