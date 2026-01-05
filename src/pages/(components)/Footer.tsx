"use client";

import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer className="bg-slate-900 border-t border-purple-600 border-opacity-30 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <Image
              src="/logo.png"
              alt="TradeMark"
              width={50}
              height={50}
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
            <p className="text-purple-300 text-sm">
              Smart investing for everyone.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="hover:text-white cursor-pointer transition"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("pricing")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="hover:text-white cursor-pointer transition"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    document.getElementById("security")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="hover:text-white cursor-pointer transition"
                >
                  Security
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li>
                <a href="/home" className="hover:text-white cursor-pointer transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white cursor-pointer transition">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white cursor-pointer transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-600 border-opacity-30 pt-8 text-center text-purple-300 text-sm">
          <p>&copy; {currentYear} Trademark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
