import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export default function Home() {
    return (
        <main>
            <Navbar profile={portfolioData.profile} />
            <Hero profile={portfolioData.profile} />
            <Skills skills={portfolioData.skills} />
            <Experience experience={portfolioData.experience} />
            <Projects projects={portfolioData.projects} />
            <Contact profile={portfolioData.profile} />
            <Footer profile={portfolioData.profile} />
        </main>
    );
}
