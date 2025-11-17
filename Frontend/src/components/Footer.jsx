import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="w-full bg-gray-200 py-4 px-6 mt-auto">
      <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-700">
        <p className="text-sm sm:text-base text-center sm:text-left">
          © {new Date().getFullYear()} Event Management System. All rights
          reserved.
        </p>

        <a
          href="https://github.com/T3rex/Event-Management-System"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm sm:text-base font-medium hover:text-black transition-colors"
        >
          <FaGithub size={22} />
          View on GitHub
        </a>
      </div>
    </div>
  );
}
