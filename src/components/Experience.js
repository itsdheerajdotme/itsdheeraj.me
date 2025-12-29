export default function Experience({ experience }) {
    return (
        <section id="experience" className="py-5">
            <div className="container" data-aos="fade-up">
                <h2 className="text-center fw-bold mb-5 display-5">Professional <span className="text-accent">Experience</span></h2>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="timeline">
                            {
                                experience.map((job, index) => (
                                    <div key={index} className="timeline-item mb-4" data-aos="fade-left" data-aos-delay={index * 100}>
                                        <span className="badge bg-primary mb-2">{job.duration}</span>
                                        <h3 className="h5 fw-bold">{job.role}</h3>
                                        <h4 className="h6 text-muted mb-3">{job.company}</h4>
                                        <p className="text-muted">{job.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
