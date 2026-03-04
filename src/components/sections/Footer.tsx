export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 border-t border-white/10 bg-black text-center text-sm text-gray-500">
            <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
                <p>© {currentYear} Gaurav Kaklotar. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">GitHub</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
