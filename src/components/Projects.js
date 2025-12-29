import Link from 'next/link';

export default function Projects({ projects }) {
    if (!projects || projects.length === 0) return null;

    return (
        <section id="work" className="py-5 bg-light-alt">
            <div className="container" data-aos="fade-up">
                <h2 className="text-center fw-bold mb-5">Featured Work</h2>
                <div className="row g-4">
                    {projects.map((project, index) => (
                        <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                            <div className="card h-100 shadow-sm overflow-hidden">
                                <div className="card-body p-4">
                                    <h3 className="h5 fw-bold mb-3">{project.title}</h3>
                                    <p className="card-text text-muted mb-4">{project.description}</p>
                                    <div className="mb-4">
                                        {project.techStack.map((tech, i) => (
                                            <span key={i} className="badge bg-secondary me-2 mb-2">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <Link href={project.link} className="btn btn-outline-light btn-sm stretched-link">
                                        View Project <i className="fas fa-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
