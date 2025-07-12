import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background-900/80 backdrop-blur-sm text-text-400 shadow-inner mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Counter Cheater.
          </p>
          <div className="flex gap-6">
            <Link href="/report" className="hover:text-text/80 text-sm transition-colors">
              report a Cheater
            </Link>
            <Link href="/dashboard" className="hover:text-text/80 text-sm transition-colors">
              view Video Proof
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}