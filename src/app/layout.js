import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Dheeraj Jha | Senior DevOps Engineer & Software Architect',
    description: 'Portfolio of Dheeraj Jha, a Senior DevOps Engineer and Software Architect specializing in AWS, CI/CD, Docker, and Scalable Backend Systems.',
    keywords: 'Dheeraj Jha, DevOps Engineer, Software Architect, AWS, CI/CD, Docker, Kubernetes, PHP, Python, Full Stack Developer, Faridabad',
    authors: [{ name: 'Dheeraj Jha' }],
    openGraph: {
        type: 'website',
        url: 'https://itsdheeraj.me/',
        title: 'Dheeraj Jha | Senior DevOps Engineer & Software Architect',
        description: 'Senior DevOps Engineer & Software Architect with 9+ years of experience building and scaling, high-performance systems.',
        images: ['./assets/hero-meta.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dheeraj Jha | Senior DevOps Engineer & Software Architect',
        description: 'Senior DevOps Engineer & Software Architect with 9+ years of experience building and scaling, high-performance systems.',
        images: ['./assets/hero-meta.png'],
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
