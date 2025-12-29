import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
            <h2 className="display-4 fw-bold mb-4">404 - Page Not Found</h2>
            <p className="lead mb-5">Could not find requested resource</p>
            <Link href="/" className="btn btn-primary rounded-pill px-4">
                Return Home
            </Link>
        </div>
    );
}
