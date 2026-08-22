'use client';
import Link from 'next/link';

export default function DevtoolsSection() {
    return (
        <section id="devtools" className="py-5 bg-dark-alt text-center">
            <div className="container" data-aos="fade-up">
                <br></br>
            <br></br>
                <h2 className="fw-bold mb-4 display-5"><i className="fas fa-laptop-code me-2"></i> Introducing <span className="text-accent">Day2DayDev</span></h2>
                <p className="lead text-muted mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                    A growing collection of practical DevOps and developer utilities built to simplify everyday tasks. Generate configurations, validate files, and speed up your workflow with free tools.
                </p>

                <Link
                    href="https://day2daydev.com?from=itsdheeraj.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg px-5 rounded-pill shadow-lg"
                >
                    <i className="fas fa-arrow-right me-2"></i> Explore Day2DayDev.com
                </Link>

                <p className="text-muted mt-4 mx-auto"><i className="fas fa-heart me-2 text-danger"></i>I&apos;d love to hear your feedback about the Day2DayDev!</p>
                <p className="text-muted mt-3 small">All tools are completely free to use.</p>
            </div>
            <br></br>
            <br></br>
        </section>
    );
}
