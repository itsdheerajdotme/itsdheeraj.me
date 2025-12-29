'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import mediumPosts from '@/data/medium.json';

export default function BlogListing() {
    // Data is static now (from build time fetch), so we can use it directly.
    let displayPosts = mediumPosts || [];

    // Ensure multiple of 3
    const count = Math.floor(displayPosts.length / 3) * 3;
    if (count > 0 && displayPosts.length !== count) {
        displayPosts = displayPosts.slice(0, count);
    }

    const [posts, setPosts] = useState(displayPosts);

    return (
        <main className="min-vh-100" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
            <div className="container">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h1 className="fw-bold display-4 mb-4">Blog</h1>
                    <p className="lead text-muted">Latest writings from Medium.</p>
                </div>

                <div className="row g-4">
                    {posts.map((post, index) => (
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

                {posts.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">No posts found. Check back later!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
