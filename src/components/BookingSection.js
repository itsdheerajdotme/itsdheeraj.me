'use client';
import Link from 'next/link';

export default function BookingSection() {
    return (
        <section id="booking" className="py-5 bg-light-alt text-center">
            <div className="container" data-aos="fade-up">
                <h2 className="fw-bold mb-4 display-5">Let&apos;s talk <span className="text-accent">Ideas</span></h2>
                <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    I enjoy conversations about systems, engineering, and how we build things that last.
                    Book a casual 1-on-1 chat to explore ideas and learn from each other. No pitches — just ideas.
                </p>

                <Link
                    href="https://calendar.app.google/kN7bJBh8bhyCZu4K8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg"
                >
                    <i className="fas fa-calendar-alt me-2"></i> Book a Chat
                </Link>

                <p className="mt-3 text-muted"><small>Conversations are informal and do not represent my employer.</small></p>
            </div>
        </section>
    );
}
