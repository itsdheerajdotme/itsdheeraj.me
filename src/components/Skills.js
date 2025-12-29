export default function Skills({ skills }) {
    return (
        <section id="skills" className="py-5 bg-light-alt">
            <div className="container" data-aos="fade-up">
                <h2 className="text-center fw-bold mb-5 display-5">Skills & <span className="text-accent">Expertise</span></h2>
                <div className="row g-4">
                    {
                        skills.map((skillGroup, index) => (
                            <div key={index} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card h-100 p-4 shadow-sm">
                                    <div className="d-flex align-items-center mb-3">
                                        <i className={`fas ${skillGroup.icon} fa-2x text-accent me-3`}></i>
                                        <h3 className="h5 mb-0">{skillGroup.category}</h3>
                                    </div>
                                    <div>
                                        {skillGroup.items.map((skill, i) => (
                                            <span key={i} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}
