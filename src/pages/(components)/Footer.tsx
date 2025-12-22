"use client"

import Image from "next/image";
import { useRouter } from "next/router";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const router = useRouter()

  // const footerSections = [
  //   {
  //     title: "Product",
  //     links: ["Investment Plans", "How It Works", "Pricing", "Features"],
  //   },
  //   {
  //     title: "Company",
  //     links: ["About Us", "Blog", "Careers", "Contact"],
  //   },
  //   {
  //     title: "Legal",
  //     links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Compliance"],
  //   },
  // ];

  // const socialLinks = [
  //   { name: "LinkedIn", icon: "in" },
  //   { name: "Twitter", icon: "tw" },
  //   { name: "Facebook", icon: "fb" },
  // ];

  // return (
  //   <motion.footer
  //     className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-16 mt-20 border-t border-white/10"
  //     initial={{ opacity: 0 }}
  //     whileInView={{ opacity: 1 }}
  //     viewport={{ once: true }}
  //     transition={{ duration: 0.6 }}
  //   >
  //     <div className="max-w-6xl mx-auto px-4">
  //       {/* Main Footer Content */}
  //       <div className="grid md:grid-cols-4 gap-12 mb-12">
  //         {/* Brand Section */}
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           viewport={{ once: true }}
  //           transition={{ delay: 0 }}
  //         >
  //           <h3 className="text-2xl font-bold mb-4">TradeMark</h3>
  //           <p className="text-gray-400 text-sm leading-relaxed">
  //             Your trusted partner in building wealth through strategic investments. Secure, transparent, and profitable.
  //           </p>
  //           <div className="flex gap-4 mt-6">
  //             {socialLinks.map((social, i) => (
  //               <motion.a
  //                 key={i}
  //                 href="#"
  //                 className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all"
  //                 whileHover={{ scale: 1.1 }}
  //                 whileTap={{ scale: 0.95 }}
  //               >
  //                 {social.icon}
  //               </motion.a>
  //             ))}
  //           </div>
  //         </motion.div>

  //         {/* Footer Links */}
  //         {footerSections.map((section, sectionIndex) => (
  //           <motion.div
  //             key={sectionIndex}
  //             initial={{ opacity: 0, y: 20 }}
  //             whileInView={{ opacity: 1, y: 0 }}
  //             viewport={{ once: true }}
  //             transition={{ delay: (sectionIndex + 1) * 0.1 }}
  //           >
  //             <h4 className="font-semibold mb-6">{section.title}</h4>
  //             <ul className="space-y-3">
  //               {section.links.map((link, linkIndex) => (
  //                 <motion.li
  //                   key={linkIndex}
  //                   whileHover={{ x: 5 }}
  //                 >
  //                   <a
  //                     href="#"
  //                     className="text-gray-400 hover:text-white transition-colors text-sm"
  //                   >
  //                     {link}
  //                   </a>
  //                 </motion.li>
  //               ))}
  //             </ul>
  //           </motion.div>
  //         ))}
  //       </div>

  //       {/* Divider */}
  //       <motion.div
  //         className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
  //         initial={{ scaleX: 0 }}
  //         whileInView={{ scaleX: 1 }}
  //         viewport={{ once: true }}
  //         transition={{ delay: 0.5 }}
  //       />

  //       {/* Bottom Footer */}
  //       <motion.div
  //         className="flex flex-col md:flex-row justify-between items-center gap-6"
  //         initial={{ opacity: 0, y: 20 }}
  //         whileInView={{ opacity: 1, y: 0 }}
  //         viewport={{ once: true }}
  //         transition={{ delay: 0.6 }}
  //       >
  //         <p className="text-gray-400 text-sm">
  //           © {currentYear} TradeMark. All rights reserved.
  //         </p>
  //         <div className="flex gap-6">
  //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
  //             Privacy
  //           </a>
  //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
  //             Terms
  //           </a>
  //           <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
  //             Sitemap
  //           </a>
  //         </div>
  //       </motion.div>
  //     </div>
  //   </motion.footer>
  // );
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
              onClick={() => router.push('/')}
              className="cursor-pointer"
            />
            <p className="text-purple-300 text-sm">Smart investing for everyone.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-purple-300 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Disclosure</a></li>
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