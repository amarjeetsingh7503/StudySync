export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">
              Study Group Coordinator
            </h3>
            <p className="text-gray-400">
              Connect, collaborate, and succeed together.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Resources</h4>
            <ul className="text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Open Educational Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Study Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Study Group Coordinator. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
