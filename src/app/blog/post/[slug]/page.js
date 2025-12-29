import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import grayMatter from 'gray-matter';
import remarkGfm from 'remark-gfm';

// Generate static params for export
export async function generateStaticParams() {
    try {
        const filePath = path.join(process.cwd(), 'public/content/blog/index.json');

        // Check if file exists to avoid build error if no blog posts yet
        if (!fs.existsSync(filePath)) {
            return [];
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const posts = JSON.parse(fileContent);

        return posts.map((post) => ({
            slug: post.slug,
        }));
    } catch (e) {
        console.warn('Could not generate static params for blog:', e);
        return [];
    }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
    const slug = params.slug;

    try {
        // In a real generic fetch scenario we might fetch here too, 
        // but for static export we can read file system or fetch via URL if server running. 
        // Since this runs at build time, fs is safer for public files.
        const filePath = path.join(process.cwd(), 'public/content/blog/posts', `${slug}.md`);
        if (!fs.existsSync(filePath)) {
            return { title: 'Post Not Found' };
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = grayMatter(fileContent);

        return {
            title: `${data.title} | ItsDheeraj.me`,
            description: data.description || 'Blog post by Dheeraj Jha',
            openGraph: {
                title: data.title,
                description: data.description,
                type: 'article',
                authors: [data.author],
            }
        };
    } catch (e) {
        return { title: 'Blog Post' };
    }
}

async function getPostContent(slug) {
    // For client-side navigation (SPA style) we fetch. 
    // BUT for Server Components (which this is now, unless we use 'use client'), 
    // we can read directly if we want to pre-render content.
    // The user requested "fetch file", but effectively "Server Component + fs read" IS 
    // fetching the file content for the static build.
    // If the user TRULY wants client-side fetch (to update content without rebuild),
    // then this needs to be a Client Component.

    // HOWEVER, to support strict "Clean URL /blog/post/slug" with "output: export",
    // Next.js MUST pre-render these pages.
    // If we pre-render, the content is baked in.
    // Making it a Server Component is the standard way.

    const filePath = path.join(process.cwd(), 'public/content/blog/posts', `${slug}.md`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data } = grayMatter(fileContent);
    return { content, data };
}


export default async function BlogPost({ params }) {
    const { slug } = params;
    const post = await getPostContent(slug);

    if (!post) {
        return (
            <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
                <h1>Post not found</h1>
                <Link href="/blog" className="btn btn-primary mt-4">Back to Blog</Link>
            </div>
        );
    }

    const { content, data } = post;

    return (
        <main className="pt-5 pb-5 min-vh-100">
            <div className="container" style={{ marginTop: '80px', maxWidth: '800px' }}>
                <Link href="/blog" className="text-muted text-decoration-none mb-4 d-inline-block hover-accent">
                    <i className="fas fa-arrow-left me-2"></i> Back to Blog
                </Link>

                <article className="blog-container">
                    <header className="mb-5 border-bottom pb-4">
                        {data.title && <h1 className="display-4 fw-bold mb-3">{data.title}</h1>}
                        <div className="d-flex flex-wrap gap-4 text-muted small">
                            {data.date && <span><i className="far fa-calendar me-2"></i>{data.date}</span>}
                            {data.author && <span><i className="far fa-user me-2"></i>{data.author}</span>}
                            {data.tags && (
                                <span className="ms-auto">
                                    {data.tags.map(tag => <span key={tag} className="badge bg-light text-dark border me-1">{tag}</span>)}
                                </span>
                            )}
                        </div>
                    </header>

                    <div className="blog-content">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                img: ({ node, ...props }) => <img {...props} className="img-fluid rounded shadow-sm my-4 d-block mx-auto" />,
                                p: ({ node, ...props }) => <p {...props} className="mb-4 lead-sm" style={{ lineHeight: '1.8', fontSize: '1.1rem' }} />,
                                h2: ({ node, ...props }) => <h2 {...props} className="fw-bold mt-5 mb-3" />,
                                h3: ({ node, ...props }) => <h3 {...props} className="fw-bold mt-4 mb-3" />,
                                code: ({ node, inline, className, children, ...props }) => {
                                    return !inline ? (
                                        <div className="bg-dark text-light p-3 rounded mb-4 overflow-auto">
                                            <code {...props} className={className}>{children}</code>
                                        </div>
                                    ) : (
                                        <code {...props} className="bg-light text-danger px-1 rounded">{children}</code>
                                    )
                                },
                                ul: ({ node, ...props }) => <ul {...props} className="mb-4 ps-4" />,
                                ol: ({ node, ...props }) => <ol {...props} className="mb-4 ps-4" />,
                                blockquote: ({ node, ...props }) => <blockquote {...props} className="blockquote ps-3 border-start border-4 border-primary text-muted fst-italic my-4" />
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                    </div>
                </article>
            </div>
        </main>
    );
}
