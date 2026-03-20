function AppFooter() {
  return (
    <footer className="bg-black text-white py-12 px-4 md:px-24">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Cột 1: Customer Services */}
        <div>
          <h3 className="text-lg font-bold italic mb-4 uppercase tracking-wider">
            Customer Services
          </h3>
          <ul className="space-y-2 text-gray-400 italic text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help & Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Online Stores</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Cột 2: Company */}
        <div>
          <h3 className="text-lg font-bold italic mb-4 uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-2 text-gray-400 italic text-sm">
            <li><a href="#" className="hover:text-white transition-colors">What We Do</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Available Services</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Latest Posts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
          </ul>
        </div>

        {/* Cột 3: Social Media */}
        <div>
          <h3 className="text-lg font-bold italic mb-4 uppercase tracking-wider">
            Social Media
          </h3>
          <ul className="space-y-2 text-gray-400 italic text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default AppFooter;