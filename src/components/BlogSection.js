'use client';
import Link from 'next/link';
import mediumPosts from '@/data/medium.json';

export default function BlogSection() {
    // Get latest 3 posts
    const displayPosts = mediumPosts ? mediumPosts.slice(0, 3) : [];

    if (displayPosts.length === 0) return null;

    return (
        <section id="blogs" className="py-5">
            <div className="container">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h2 className="fw-bold display-5 mb-3">Latest <span className="text-accent">Writings</span></h2>
                    <p className="lead text-muted">Thoughts and tutorials from Medium.</p>
                </div>

                <div className="row g-4">
                    {displayPosts.map((post, index) => (
                        <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="card h-100 shadow-sm overflow-hidden hover-card">
                                {post.thumbnail && (
                                    <img src={post.thumbnail} alt={post.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                                )}
                                <div className="card-body p-4 d-flex flex-column">
                                    <small className="text-muted mb-2">{post.date}</small>
                                    <h3 className="h5 fw-bold mb-3">
                                        <Link href={post.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-reset stretched-link">
                                            {post.title}
                                        </Link>
                                    </h3>
                                    <p className="card-text text-muted mb-4 flex-grow-1 small">{post.description}</p>

                                    <div className="mt-auto">
                                        {post.tags && post.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="badge bg-light text-dark me-2 border">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="300">
                    <Link href="/blog" className="btn btn-outline-light px-4 py-2">
                        View All Posts <i className="fas fa-arrow-right ms-2"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
