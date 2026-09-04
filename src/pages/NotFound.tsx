import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="text-6xl font-bold font-display text-[var(--border)] mb-3">404</div>
      <h2 className="text-2xl font-bold font-display text-[var(--foreground)] mb-2">Page not found</h2>
      <p className="text-[var(--muted-foreground)] mb-5">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-[#0077B6] hover:underline font-medium">← Go home</Link>
    </div>
  );
}
export default NotFound;