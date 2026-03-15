import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Lightbulb, 
  PenTool, 
  Layout, 
  Users, 
  ChevronRight, 
  Menu, 
  X,
  Github,
  Twitter,
  Linkedin,
  Mail,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';
import logoSrc from './assets/Write_Right_Logo.png';

const Navbar = ({ theme, toggleTheme, logoSrc }: { theme: string, toggleTheme: () => void, logoSrc: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problem & Solution', href: '#problem-solution' },
    { name: 'Concept', href: '#concept' },
    { name: 'Process', href: '#process' },
    { name: 'Demo', href: '#demo' },
    { name: 'Team', href: '#team' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? (theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-white/80 backdrop-blur-md border-b border-black/10') : 'bg-transparent'} py-4`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={scrollToTop}
        >
          <img src={logoSrc} alt="Write Right" className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
          <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Write Right</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-teal-primary' : 'text-gray-600 hover:text-teal-primary'}`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-black/5 text-indigo-600 hover:bg-black/10'}`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-white/10 text-yellow-400' : 'bg-black/5 text-indigo-600'}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className={theme === 'dark' ? 'text-white' : 'text-black'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${theme === 'dark' ? 'bg-black border-b border-white/10' : 'bg-white border-b border-black/10'}`}
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, theme }: { title: string, subtitle?: string, theme: string }) => (
  <div className="mb-12">
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h2>
    {subtitle && <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl`}>{subtitle}</p>}
    <div className="w-20 h-1 bg-teal-primary mt-6"></div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Apply theme class to document element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const processCards = [
    { title: "User Research", description: "Understanding student pain points through interviews and surveys.", icon: <Search className="w-6 h-6" /> },
    { title: "Brainstorming", description: "Generating creative solutions to simplify the research workflow.", icon: <Lightbulb className="w-6 h-6" /> },
    { title: "Sketching", description: "Visualizing the interface and core features of Write Right.", icon: <PenTool className="w-6 h-6" /> },
    { title: "Storyboard", description: "Mapping out the user journey from topic selection to final draft.", icon: <Layout className="w-6 h-6" /> },
    { title: "Paper Prototype", description: "Testing early concepts with physical mockups for quick feedback.", icon: <Users className="w-6 h-6" /> },
  ];

  const teamMembers = [
    { name: "Alex Chen", role: "Product Lead", image: "https://picsum.photos/seed/alex/300/300" },
    { name: "Sarah Miller", role: "UX Designer", image: "https://picsum.photos/seed/sarah/300/300" },
    { name: "Jordan Lee", role: "Full Stack Developer", image: "https://picsum.photos/seed/jordan/300/300" },
    { name: "Taylor Reed", role: "Content Strategist", image: "https://picsum.photos/seed/taylor/300/300" },
    { name: "Morgan Smith", role: "Research Analyst", image: "https://picsum.photos/seed/morgan/300/300" },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-teal-primary/30 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} logoSrc={logoSrc} />

      {/* Hero Section */}
      <header className={`relative h-screen flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="absolute inset-0 z-0 opacity-30">
          <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_50%_50%,#0d948844,transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,#0d948822,transparent_70%)]'}`}></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              WRITE <span className="text-teal-primary italic">RIGHT</span>
            </h1>
            <p className={`text-xl md:text-2xl font-light tracking-wide mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              The guide for your research journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#problem-solution" 
                className="px-8 py-4 bg-teal-primary text-white font-bold rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg shadow-teal-primary/20"
              >
                Explore the Journey
              </a>
              <a 
                href="#demo" 
                className={`px-8 py-4 font-bold rounded-full transition-all backdrop-blur-sm ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}
              >
                Watch Demo
              </a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 ${theme === 'dark' ? 'border-white/20' : 'border-black/20'}`}>
            <div className="w-1 h-2 bg-teal-primary rounded-full"></div>
          </div>
        </div>
      </header>

      {/* Section 1: Problem & Solution */}
      <section id="problem-solution" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Problem */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-10 rounded-3xl border flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-[#111] border-white/5' : 'bg-gray-50 border-black/5'}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <AlertCircle className="text-red-500 w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>The Problem</h3>
              </div>
              <p className={`text-lg leading-relaxed flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Students often struggle with choosing topics and ensuring that their writing meets requirements. 
                The process of finding, organizing, and integrating sources can also be stressful.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-10 rounded-3xl border flex flex-col relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#111] border-teal-primary/20' : 'bg-teal-50/30 border-teal-primary/10'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-primary/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-teal-primary w-6 h-6" />
                </div>
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>The Solution</h3>
              </div>
              <p className={`text-lg leading-relaxed flex-grow ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Write Right helps students explore topics, track sources, and connect their writing to the rubric.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Concept */}
      <section id="concept" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className={`relative w-full max-w-[315px] aspect-[9/16] rounded-[3rem] border-[8px] shadow-2xl overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-black border-[#222]' : 'bg-white border-gray-200'}`}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/K-L4QmaOp1o"
                  title="Write Right Concept"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <SectionHeading 
                title="Our Concept" 
                subtitle="See how we envisioned Write Right" 
                theme={theme}
              />
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                We believe that research shouldn't be a solitary struggle. Our concept focuses on bridging the gap between raw information and structured academic excellence.
              </p>
              <ul className="space-y-4">
                {['Intuitive Topic Discovery', 'Seamless Source Integration', 'Rubric-Aligned Feedback'].map((item) => (
                  <li key={item} className={`flex items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="w-2 h-2 bg-teal-primary rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Process (Horizontal Scrolling) */}
      <section id="process" className={`py-24 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <SectionHeading 
            title="Our Process" 
            subtitle="The steps we took to bring Write Right to life" 
            theme={theme}
          />
        </div>
        
        <div className="flex overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] hide-scrollbar gap-6 snap-x">
          {processCards.map((card, index) => (
            <motion.div 
              key={card.title}
              whileHover={{ y: -10 }}
              className={`min-w-[300px] md:min-w-[400px] rounded-3xl p-8 border snap-start transition-colors duration-300 ${theme === 'dark' ? 'bg-[#141414] border-white/5' : 'bg-gray-50 border-black/5'}`}
            >
              <div className="w-14 h-14 bg-teal-primary/10 rounded-2xl flex items-center justify-center mb-6 text-teal-primary">
                {card.icon}
              </div>
              <div className={`aspect-video rounded-2xl mb-6 flex items-center justify-center text-gray-500 border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white border-black/5'}`}>
                <span className="text-sm uppercase tracking-widest font-bold">Image Placeholder</span>
              </div>
              <h4 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{card.title}</h4>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Product Demo */}
      <section id="demo" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionHeading 
              title="Product Demo" 
              subtitle="See our idea in action" 
              theme={theme}
            />
          </div>
          
          <div className={`relative aspect-video w-full max-w-5xl mx-auto rounded-3xl border shadow-2xl overflow-hidden group transition-colors duration-300 ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
            <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all ${theme === 'dark' ? 'bg-zinc-900/50 group-hover:bg-zinc-900/30' : 'bg-gray-100/50 group-hover:bg-gray-100/30'}`}>
              <div className="w-20 h-20 bg-teal-primary rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform cursor-pointer">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
              </div>
              <p className={`font-bold tracking-widest uppercase text-sm ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Landscape Video Placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Meet the Team */}
      <section id="team" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading 
            title="Meet the Team" 
            subtitle="The creative minds behind Write Right" 
            theme={theme}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className={`relative mb-6 mx-auto w-48 h-48 md:w-full md:h-auto aspect-square overflow-hidden rounded-2xl transition-all duration-500 ${theme === 'dark' ? 'grayscale group-hover:grayscale-0' : 'grayscale-0'}`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-teal-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{member.name}</h4>
                <p className="text-teal-primary text-sm font-medium uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-gray-50 border-black/10'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoSrc} alt="Write Right" className="h-10 w-auto object-contain" />
                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Write Right</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                Empowering students to navigate their research journey with confidence and precision.
              </p>
            </div>
            <div>
              <h5 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Quick Links</h5>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#problem-solution" className="hover:text-teal-primary transition-colors">Problem & Solution</a></li>
                <li><a href="#concept" className="hover:text-teal-primary transition-colors">Our Concept</a></li>
                <li><a href="#process" className="hover:text-teal-primary transition-colors">Our Process</a></li>
                <li><a href="#demo" className="hover:text-teal-primary transition-colors">Product Demo</a></li>
              </ul>
            </div>
            <div>
              <h5 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Connect</h5>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-teal-primary hover:text-white' : 'bg-black/5 text-gray-600 hover:bg-teal-primary hover:text-white'}`}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              &copy; 2026 Write Right. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-teal-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-teal-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
