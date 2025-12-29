'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogListing() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the blog index manifest
        fetch('/content/blog/index.json')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load blog posts', err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="pt-24 pb-16 min-h-screen">
            <div className="container">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="fw-bold display-4 mb-4">Blog</h1>
                    <p className="lead text-muted">Thoughts, stories and ideas.</p>
                </div>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className="row g-4">
                        {posts.map((post, index) => (
                            <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card h-100 shadow-sm overflow-hidden">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <small className="text-muted mb-2">{post.date}</small>
                                        <h3 className="h5 fw-bold mb-3">
                                            <Link href={`/blog/post/${post.slug}`} className="text-decoration-none text-reset">
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="card-text text-muted mb-4 flex-grow-1">{post.description}</p>
                                        <div className="mt-auto">
                                            {post.tags && post.tags.map(tag => (
                                                <span key={tag} className="badge bg-light text-dark me-2 border">{tag}</span>
                                            ))}
                                            <Link href={`/blog/post/${post.slug}`} className="btn btn-link text-accent p-0 float-end text-decoration-none">
                                                Read More <i className="fas fa-arrow-right ms-1"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
