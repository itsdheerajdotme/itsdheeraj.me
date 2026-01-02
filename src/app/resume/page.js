export const metadata = {
    title: 'Resume | Dheeraj Jha',
}

export default function Resume() {
    return (
        <main className="container-fluid p-0" style={{ height: 'calc(100vh - 63px)', marginTop: '63px', overflow: 'hidden' }}>
            <iframe
                src="https://flowcv.com/resume/59mocil6sk"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Resume"
            />
        </main>
    );
}
