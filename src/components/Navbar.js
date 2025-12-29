'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Navbar({ profile }) {
    const [theme, setTheme] = useState('dark');
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleWindowScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleWindowScroll);
        return () => window.removeEventListener('scroll', handleWindowScroll);
    }, []);

    useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });

        // Import Bootstrap JS
        import('bootstrap/dist/js/bootstrap.bundle.min.js');

        // Initialize Theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();

        // If not on homepage, navigate to homepage section
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
            window.location.href = `/#${targetId}`;
            return;
        }

        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80; // Navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'} ${isScrolled ? 'scrolled shadow-sm' : ''}`} style={{ backgroundColor: 'var(--nav-bg)', backdropFilter: 'blur(12px)', transition: 'all 0.3s ease-in-out', zIndex: 1050 }}>
            <div className="container">
                <Link href="/" className="navbar-brand fw-bold" onClick={(e) => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    ItsDheeraj<span className="text-accent">.</span>me
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <a href="#about" className="nav-link" onClick={(e) => handleScroll(e, 'about')}>About</a>
                        </li>
                        <li className="nav-item">
                            <a href="#skills" className="nav-link" onClick={(e) => handleScroll(e, 'skills')}>Skills</a>
                        </li>
                        <li className="nav-item">
                            <a href="#experience" className="nav-link" onClick={(e) => handleScroll(e, 'experience')}>Experience</a>
                        </li>
                        <li className="nav-item">
                            <a href="#work" className="nav-link" onClick={(e) => handleScroll(e, 'work')}>Work</a>
                        </li>
                        <li className="nav-item">
                            <Link href="/blog" className="nav-link" onClick={(e) => window.scrollTo({ top: 0, behavior: 'smooth' })}>Blog</Link>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link" onClick={(e) => handleScroll(e, 'contact')}>Contact</a>
                        </li>
                        <li className="nav-item ms-lg-3 d-none d-lg-block">
                            <Link href="#booking" onClick={(e) => handleScroll(e, 'booking')} className="btn btn-primary btn-sm rounded-pill px-3">
                                Book Call
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <button
                                id="theme-toggle"
                                className="btn btn-sm btn-outline-light rounded-circle"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
