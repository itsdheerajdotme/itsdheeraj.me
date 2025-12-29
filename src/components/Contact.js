export default function Contact({ profile }) {
    return (
        <section id="contact" className="py-5">
            < div className="container text-center" data-aos="fade-up">
                <h2 className="fw-bold mb-5 display-5">Get In <span className="text-accent">Touch</span></h2>
                < p className="lead mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                    I&apos;m currently available for freelance projects and open to new opportunities.
                    If you have a project in mind or just want to say hi, feel free to reach out!
                </p >
                <a href={`mailto:${profile.email}`} className="btn btn-primary btn-lg px-5 rounded-pill">
                    < i className="fas fa-envelope me-2"></i> Say Hello
                </a >
            </div >
        </section >
    );
}
