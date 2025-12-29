document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    initTheme();
    document.getElementById('year').textContent = new Date().getFullYear();

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});

// Theme Handling
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Content Loading
function loadContent() {
    // Using the global portfolioData variable from assets/js/data.js
    // This avoids CORS issues when opening the file locally (file:// protocol)
    if (typeof portfolioData !== 'undefined') {
        renderProfile(portfolioData.profile);
        renderSkills(portfolioData.skills);
        renderExperience(portfolioData.experience);
        renderProjects(portfolioData.projects);
        renderBlogs(portfolioData.blogs);

        // Refresh AOS after dynamic content load
        setTimeout(() => AOS.refresh(), 500);
    } else {
        console.error('Portfolio data not found. Make sure assets/js/data.js is loaded.');
        document.getElementById('hero-name').textContent = "Error loading data";
    }
}

function renderProfile(profile) {
    document.getElementById('hero-name').textContent = profile.name;
    document.getElementById('hero-title').textContent = profile.title;
    document.getElementById('hero-bio').textContent = profile.bio;
    document.getElementById('about-content').innerHTML = `<p class="lead">${profile.bio}</p>`;
    document.getElementById('resume-link').href = profile.resumeLink;

    // Contact Info
    const contactHtml = `
        <p><i class="fas fa-envelope me-2 text-accent"></i> <a href="mailto:${profile.email}">${profile.email}</a></p>
        <p><i class="fas fa-map-marker-alt me-2 text-accent"></i> ${profile.location}</p>
    `;
    document.getElementById('contact-info').innerHTML = contactHtml;

    // Social Links
    let socialHtml = '';
    for (const [platform, link] of Object.entries(profile.social)) {
        let icon = `fa-${platform}`;
        if (platform === 'email') icon = 'fa-envelope';

        socialHtml += `<a href="${link}" target="_blank" class="fs-3"><i class="fab ${icon}"></i></a>`;
    }
    document.getElementById('social-links').innerHTML = socialHtml;
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    let html = '';

    skills.forEach((category, index) => {
        const itemsHtml = category.items.map(item => `<span class="skill-tag">${item}</span>`).join('');
        const delay = index * 100;
        html += `
            <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card h-100 p-4 border-0 shadow-sm">
                    <div class="d-flex align-items-center mb-3">
                        <i class="fas ${category.icon} fa-2x text-accent me-3"></i>
                        <h3 class="h5 mb-0">${category.category}</h3>
                    </div>
                    <div>${itemsHtml}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderExperience(experience) {
    const container = document.getElementById('experience-container');
    let html = '';

    experience.forEach((job, index) => {
        const delay = index * 100;
        html += `
            <div class="timeline-item" data-aos="fade-left" data-aos-delay="${delay}">
                <h3 class="h5 mb-1">${job.role}</h3>
                <p class="text-muted mb-2 fw-bold">${job.company} | ${job.duration}</p>
                <p>${job.description}</p>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    let html = '';

    projects.forEach((project, index) => {
        const techStack = project.techStack.map(tech => `<small class="text-muted me-2">#${tech}</small>`).join('');
        const delay = index * 100;
        html += `
            <div class="col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card h-100 p-4">
                    <h3 class="h5 mb-2">${project.title}</h3>
                    <p class="mb-3">${project.description}</p>
                    <div class="mb-3">${techStack}</div>
                    <a href="${project.link}" target="_blank" class="btn btn-sm btn-outline-light">View Project</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function renderBlogs(blogs) {
    const container = document.getElementById('blogs-container');
    let html = '';

    blogs.forEach((blog, index) => {
        const delay = index * 100;
        html += `
            <div class="col-md-4" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card h-100 p-4">
                    <h3 class="h5 mb-2">${blog.title}</h3>
                    <p class="small mb-3">${blog.summary}</p>
                    <a href="${blog.link}" target="_blank" class="text-accent">Read More <i class="fas fa-arrow-right small"></i></a>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}
