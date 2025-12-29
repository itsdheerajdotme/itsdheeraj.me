import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Dheeraj Jha | ☁️ AWS + DevOps | 🌿 Explorer & Learner',
    description: 'Portfolio of Dheeraj Jha, a DevOps Engineer focused on cloud infrastructure, automation, and scalable systems—driven by curiosity, clarity, and real-world problem solving.',
    keywords: 'Dheeraj Jha, DevOps Engineer, Software Architect, AWS, CI/CD, Docker, Kubernetes, PHP, Python, Full Stack Developer, Faridabad',
    authors: [{ name: 'Dheeraj Jha' }],
    openGraph: {
        type: 'website',
        url: 'https://itsdheeraj.me/',
        title: 'Dheeraj Jha | ☁️ AWS + DevOps | 🌿 Explorer & Learner',
        description: 'DevOps Engineer focused on cloud infrastructure, automation, and scalable systems—driven by curiosity, clarity, and real-world problem solving.',
        images: ['https://itsdheeraj.me/assets/hero-meta.jpg'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dheeraj Jha | ☁️ AWS + DevOps | 🌿 Explorer & Learner',
        description: 'DevOps Engineer focused on cloud infrastructure, automation, and scalable systems—driven by curiosity, clarity, and real-world problem solving.',
        images: ['https://itsdheeraj.me/assets/hero-meta.jpg'],
    },
}

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import portfolioData from '@/data/portfolio.json';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar profile={portfolioData.profile} />
                {children}
                <Footer profile={portfolioData.profile} />
            </body>
        </html>
    )
}
