import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import BookingSection from '@/components/BookingSection';
import BlogSection from '@/components/BlogSection';
import Contact from '@/components/Contact';
import portfolioData from '@/data/portfolio.json';

export default function Home() {
    return (
        <main>
            <Hero profile={portfolioData.profile} />
            <Skills skills={portfolioData.skills} />
            <Experience experience={portfolioData.experience} />
            <Projects projects={portfolioData.projects} />
            <BookingSection />
            <BlogSection />
            <Contact profile={portfolioData.profile} />
        </main>
    );
}
