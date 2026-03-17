import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Lightbulb,
  PenTool,
  Layout,
  Users,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Github,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  FlaskConical,
  Monitor,
  Layers,
  ExternalLink,
} from 'lucide-react';
import logoSrc from './assets/Write_Right_Logo.png';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProcessStep {
  title: string;
  icon: React.ReactNode;
  description: string;
  thumbnail: string;
  detailedDescription: string;
  images: { src: string; caption: string }[];
  highlights?: string[];
  figmaLink?: string;
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

const Navbar = ({ theme, toggleTheme, logoSrc }: { theme: string; toggleTheme: () => void; logoSrc: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Problem & Solution', href: '#problem-solution' },
    { name: 'Concept', href: '#concept' },
    { name: 'Process', href: '#process' },
    { name: 'Prototype', href: '#demo' },
    { name: 'Team', href: '#team' },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? (theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-white/80 backdrop-blur-md border-b border-black/10') : 'bg-transparent'} py-4`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={scrollToTop}>
          <img src={logoSrc} alt="Write Right" className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
          <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Write Right</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-teal-primary' : 'text-gray-600 hover:text-teal-primary'}`}>
              {link.name}
            </a>
          ))}
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-white/10 text-yellow-400 hover:bg-white/20' : 'bg-black/5 text-indigo-600 hover:bg-black/10'}`} aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-white/10 text-yellow-400' : 'bg-black/5 text-indigo-600'}`}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={theme === 'dark' ? 'text-white' : 'text-black'} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className={`md:hidden overflow-hidden ${theme === 'dark' ? 'bg-black border-b border-white/10' : 'bg-white border-b border-black/10'}`}>
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} onClick={() => setIsMobileMenuOpen(false)}>
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

// ─── Section Heading ─────────────────────────────────────────────────────────

const SectionHeading = ({ title, subtitle, theme }: { title: string; subtitle?: string; theme: string }) => (
  <div className="mb-12">
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{title}</h2>
    {subtitle && <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl`}>{subtitle}</p>}
    <div className="w-20 h-1 bg-teal-primary mt-6"></div>
  </div>
);

function normalizeExternalLink(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) return trimmed; // http://, https://, etc.
  if (/^(mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

// ─── Process Modal ───────────────────────────────────────────────────────────

const ProcessModal = ({ step, isOpen, onClose, theme }: { step: ProcessStep | null; isOpen: boolean; onClose: () => void; theme: string }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImage(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen || !step) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') setCurrentImage(prev => Math.min(prev + 1, step.images.length - 1));
    if (e.key === 'ArrowLeft') setCurrentImage(prev => Math.max(prev - 1, 0));
  }, [isOpen, step, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!step) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/90' : 'bg-black/70'} backdrop-blur-sm`} />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border ${theme === 'dark' ? 'bg-[#111] border-white/10' : 'bg-white border-black/10'}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-primary/10 rounded-xl flex items-center justify-center text-teal-primary">
                  {step.icon}
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{step.title}</h3>
              </div>

              {/* Description */}
              <p className={`text-lg leading-relaxed mb-8 max-w-3xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {step.detailedDescription}
              </p>

              {/* Highlights */}
              {step.highlights && step.highlights.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {step.highlights.map((h, i) => (
                    <span key={i} className={`px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-teal-primary/10 text-teal-primary' : 'bg-teal-50 text-teal-700'}`}>
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Figma Link */}
              {step.figmaLink && (
                <div className="mb-8">
                  <a
                    href={step.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-primary text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
                  >
                    Try the Interactive Figma Prototype
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}

              {/* Image Gallery */}
              {step.images.length > 0 && (
                <div>
                  {/* Main Image */}
                  <div className={`relative rounded-2xl overflow-hidden border mb-4 ${theme === 'dark' ? 'bg-black border-white/5' : 'bg-gray-50 border-black/5'}`}>
                    <div className="flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                      <img
                        src={step.images[currentImage].src}
                        alt={step.images[currentImage].caption}
                        className="max-w-full max-h-[500px] object-contain"
                      />
                    </div>

                    {/* Navigation Arrows */}
                    {step.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImage(prev => Math.max(prev - 1, 0))}
                          disabled={currentImage === 0}
                          className={`absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentImage === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'} ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentImage(prev => Math.min(prev + 1, step.images.length - 1))}
                          disabled={currentImage === step.images.length - 1}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentImage === step.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'} ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Caption */}
                  <p className={`text-center text-sm mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                    {step.images[currentImage].caption}
                    {step.images.length > 1 && <span className="ml-2">({currentImage + 1} / {step.images.length})</span>}
                  </p>

                  {/* Thumbnail Strip */}
                  {step.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                      {step.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${i === currentImage ? 'border-teal-primary opacity-100' : `${theme === 'dark' ? 'border-white/10' : 'border-black/10'} opacity-50 hover:opacity-80`}`}
                        >
                          <img src={img.src} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};



// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeProcess, setActiveProcess] = useState<number | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const processSteps: ProcessStep[] = [
    {
      title: 'User Research',
      icon: <Search className="w-6 h-6" />,
      description: 'We conducted 4 contextual inquiries and surveyed 28 students to understand research pain points.',
      thumbnail: '/images/2c_survey_year_distribution.webp',
      detailedDescription:
        'We interviewed students across disciplines — physics, law, journalism, and English — observing them research in real time at campus libraries and their homes. We also surveyed 28 undergraduate students about their research habits. The results were striking: 81.5% take notes, 77.8% keep all source tabs open when writing, most rated their overwhelm at 4 out of 5, and 54% reported spending too much or way too much time researching.',
      highlights: ['4 contextual inquiries', '28 survey responses', '77.8% keep all sources open', '54% spend too much time'],
      images: [
        { src: '/images/1b_google_search_results.webp', caption: 'A single search returns 605 million results — the information overload problem' },
        { src: '/images/2c_survey_year_distribution.webp', caption: 'Survey respondents: 34.6% first years, 26.9% second and third years each (26 responses)' },
        { src: '/images/2c_theme2_source_organization.webp', caption: 'How students manage source info: 81.5% take notes, 77.8% keep all sources open while writing' },
        { src: '/images/2c_theme2_details.webp', caption: 'Students often research alone in quiet spaces like libraries, managing multiple sources at once' },
      ],
    },
    {
      title: 'Ideation',
      icon: <Lightbulb className="w-6 h-6" />,
      description: 'We generated 40 sketch concepts exploring solutions from phone apps to smart glasses.',
      thumbnail: '/images/2a_sketch_phone_fact_check.webp',
      detailedDescription:
        'Each team member independently brainstormed 8 concepts, resulting in 40 unique sketches. We explored a wide range of form factors and approaches: desktop apps, browser extensions, mobile apps, smartwatches, and even AR smart glasses. Ideas ranged from AI-powered source credibility ratings and collaborative search tools to reading editors that break complex texts into digestible paragraphs.',
      highlights: ['40 unique concepts', '5 form factors explored', 'AI-powered features', 'Collaborative tools'],
      images: [
        { src: '/images/2a_sketch_phone_fact_check.webp', caption: '1. Phone button that gives a quick fact check' },
        { src: '/images/2a_sketch_ai_agent_discussion.webp', caption: '2. Discussing with an AI agent' },
        { src: '/images/2a_sketch_upload_similar_articles_1.webp', caption: '3. Upload a file to find similar articles (view 1)' },
        { src: '/images/2a_sketch_upload_similar_articles_2.webp', caption: '3. Upload a file to find similar articles (view 2)' },
        { src: '/images/2a_sketch_source_credibility.webp', caption: '4. Credibility of sources shown as percentages' },
        { src: '/images/2a_sketch_source_relevancy_ratings.webp', caption: '5. Sources rated by relevancy to your research' },
        { src: '/images/2a_sketch_screen_interruptor.webp', caption: '6. Screen interruptor to force breaks' },
        { src: '/images/2a_sketch_summarize_info.webp', caption: '7. Summarize information from sources' },
        { src: '/images/2a_sketch_vacation_research.webp', caption: '8. Scenario: researching for a vacation' },
        { src: '/images/2a_sketch_yes_no_dialogue.webp', caption: '9. Yes/no dialogue to guide which sources are shown' },
        { src: '/images/2a_sketch_swipe_save_results.webp', caption: '10. Swipe to save results or ignore them' },
        { src: '/images/2a_sketch_smart_glasses_info.webp', caption: '11. Smart glasses with image recognition for info' },
        { src: '/images/2a_sketch_glasses_block_seeing.webp', caption: '12. Glasses that block distracting content' },
        { src: '/images/2a_sketch_source_redundancy.webp', caption: '13. Check source redundancy across your collection' },
        { src: '/images/2a_sketch_browsing_news.webp', caption: '14. Scenario: browsing news' },
        { src: '/images/2a_sketch_web_extension.webp', caption: '15. Web extension integration for in-browser research' },
        { src: '/images/2a_sketch_rate_article_accuracy.webp', caption: '16. User rates the accuracy of articles' },
        { src: '/images/2a_sketch_filter_results.webp', caption: '17. Filter out certain results from search' },
        { src: '/images/2a_sketch_productivity_tracker.webp', caption: '18. Productivity tracker' },
        { src: '/images/2a_sketch_generated_results_list.webp', caption: '19. Generated list of results ranked by quality' },
        { src: '/images/2a_sketch_smartwatch_summary.webp', caption: '20. Smartwatch summary for quick reading' },
        { src: '/images/2a_sketch_categorized_search.webp', caption: '21. Categorized search showing good/bad results' },
        { src: '/images/2a_sketch_dropdown_groupings.webp', caption: '22. Dropdown groupings for desktop results' },
        { src: '/images/2a_sketch_mic_audio_input.webp', caption: '23. Microphone input to rate results by voice' },
        { src: '/images/2a_sketch_block_social_media.webp', caption: '24. Block excessive social media usage' },
        { src: '/images/2a_sketch_recall_game.webp', caption: '25. Game to help recall what you just read' },
        { src: '/images/2a_sketch_top5_relevant_articles.webp', caption: '26. Show only 5 most relevant articles' },
        { src: '/images/2a_sketch_top3_search_suggestions.webp', caption: '27. Top 3 results with search improvement tips' },
        { src: '/images/2a_sketch_smartwatch_vibrate.webp', caption: '28. Smartwatch that vibrates to stop passive intake' },
        { src: '/images/2a_sketch_phone_quiz_app.webp', caption: '29. Phone app that quizzes you on consumed info' },
        { src: '/images/2a_sketch_dumb_phone.webp', caption: '30. Dumb phone that prevents doomscrolling' },
        { src: '/images/2a_sketch_headphones_block_info.webp', caption: '31. Headphones that block irrelevant real-life info' },
        { src: '/images/2a_sketch_idea_tree.webp', caption: '32. Idea tree for mapping research connections' },
        { src: '/images/2a_sketch_reading_editor.webp', caption: '33. Reading editor with digestible paragraphs' },
        { src: '/images/2a_sketch_search_results_layout.webp', caption: '34. Alternative search results layout' },
        { src: '/images/2a_sketch_ai_review.webp', caption: '35. AI-powered article review system' },
        { src: '/images/2a_sketch_emphasize_words.webp', caption: '36. Emphasize key words to improve focus' },
        { src: '/images/2a_sketch_owl_stop_brain_rot.webp', caption: '37. Owl that stops you from brain rotting' },
        { src: '/images/2a_sketch_collaborative_search.webp', caption: '38. Collaborative searching for group projects' },
        { src: '/images/2a_sketch_desktop_app.webp', caption: '39. Desktop application form factor' },
        { src: '/images/2a_sketch_customize_source_types.webp', caption: '40. Customize preferred source types' },
      ],
    },
    {
      title: 'Design Concepts',
      icon: <Layers className="w-6 h-6" />,
      description: 'We developed 3 distinct design directions and chose the one that best reduced cognitive load.',
      thumbnail: '/images/2e_design_research_base.webp',
      detailedDescription:
        'We narrowed our ideation into three distinct design concepts: The Sourcinator (a split-view desktop app), Research Base (a dedicated web app), and Glasses (an AR hardware concept). We selected Research Base because it provides a dedicated research space without splitting attention like The Sourcinator, avoids hardware barriers unlike the Glasses concept, and offers a low cognitive load interface that directly addresses our users\' pain points.',
      highlights: ['3 design alternatives', 'Selected: Research Base', 'Low cognitive load priority'],
      images: [
        { src: '/images/2e_design_sourcinator.webp', caption: 'The Sourcinator — split-view desktop app with source management and text editor' },
        { src: '/images/2e_design_research_base.webp', caption: 'Research Base (selected) — dedicated web app for holistic research management' },
        { src: '/images/2e_design_glasses.webp', caption: 'Glasses — AR concept for scanning physical sources and auto-transcription' },
      ],
    },
    {
      title: 'Storyboarding',
      icon: <Layout className="w-6 h-6" />,
      description: 'We mapped out two key user journeys: topic evaluation and source tracking.',
      thumbnail: '/images/2f_storyboard_task6.webp',
      detailedDescription:
        'We created storyboards for our two highest-priority tasks: preliminary topic difficulty rating and remembering unused sources. These are high-stakes decision points — a bad topic selection cascades through an entire quarter, and 90% of students report spending more time than desired on research. The storyboards helped us visualize how students would interact with Write Right in realistic scenarios.',
      highlights: ['2 key user journeys', 'Topic evaluation flow', 'Source tracking flow'],
      images: [
        { src: '/images/2f_storyboard_task6.webp', caption: 'Storyboard: Preliminary topic difficulty rating — helping students pick the right topic before committing' },
        { src: '/images/2f_storyboard_task4_1.webp', caption: 'Storyboard: Remembering unused sources (1/4) — student realizes sources were forgotten' },
        { src: '/images/2f_storyboard_task4_2.webp', caption: 'Storyboard: Remembering unused sources (2/4) — tracking which sources have been referenced' },
        { src: '/images/2f_storyboard_task4_3.webp', caption: 'Storyboard: Remembering unused sources (3/4) — system highlights unused sources' },
        { src: '/images/2f_storyboard_task4_4.webp', caption: 'Storyboard: Remembering unused sources (4/4) — student incorporates missed sources' },
        { src: '/images/2g_concept_video_thumbnail.webp', caption: 'Storyboard for the concept video' },
      ],
    },
    {
      title: 'Paper Prototype',
      icon: <PenTool className="w-6 h-6" />,
      description: 'We built a 25-page hand-drawn prototype and tested it with real users.',
      thumbnail: '/images/3a_prototype_overview.webp',
      detailedDescription:
        'We created a detailed 25-page paper prototype covering two core task flows: topic evaluation (where users enter ideas, view scorecards with complexity/nicheness/topic-fit metrics, and compare options) and source-assisted writing (where sources are auto-organized, and an AI writing assistant provides suggestions the user can accept or reject). This low-fidelity approach let us rapidly iterate on the interaction design before committing to digital implementation.',
      highlights: ['25 hand-drawn pages', '2 task flows', 'Topic evaluation', 'AI writing assistant'],
      images: [
        { src: '/images/3a_prototype_overview.webp', caption: 'Full overview of our 25-page paper prototype' },
        { src: '/images/3a_task1_topic_ideas_1.webp', caption: 'Task 1: User enters multiple topic ideas to evaluate' },
        { src: '/images/3a_task1_topic_cards.webp', caption: 'Task 1: Topic scorecards with complexity and fit metrics' },
        { src: '/images/3a_task1_topic_scores.webp', caption: 'Task 1: Detailed scoring breakdown for each topic' },
        { src: '/images/3a_task1_compare_topics_1.webp', caption: 'Task 1: Side-by-side topic comparison' },
        { src: '/images/3a_task2_sources_populated.webp', caption: 'Task 2: Sources auto-populated and organized by category' },
        { src: '/images/3a_task2_robot_suggestion_1.webp', caption: 'Task 2: AI assistant provides a writing suggestion' },
        { src: '/images/3a_task2_confirm_fix_1.webp', caption: 'Task 2: User decides whether to accept the suggestion' },
      ],
    },
    {
      title: 'Usability Testing',
      icon: <FlaskConical className="w-6 h-6" />,
      description: 'We tested with 3 participants, found 8 usability issues, and revised our design.',
      thumbnail: '/images/3c_revised_accept_reject_iterate.webp',
      detailedDescription:
        'We conducted usability tests with three UW students (physics, general studies, and journalism majors) in different settings. We identified 8 usability issues across severity levels, including: unclear navigation on the first page, the sidebar being mistaken for search history, no way to distinguish AI-suggested vs. user-uploaded sources, and lack of user control over AI suggestions. Each issue was addressed with targeted design revisions.',
      highlights: ['3 usability tests', '8 issues identified', 'AI vs. user source labels', 'Accept/reject controls'],
      images: [
        { src: '/images/3c_revised_start_writing.webp', caption: 'Revised: Clear entry point with labeled navigation' },
        { src: '/images/3c_revised_source_details.webp', caption: 'Revised: Sources now labeled as AI-Suggested or User-Uploaded' },
        { src: '/images/3c_revised_expand_source.webp', caption: 'Revised: Expandable source details view' },
        { src: '/images/3c_revised_suggestion_popup.webp', caption: 'Revised: AI suggestion popup with clear context' },
        { src: '/images/3c_revised_accept_reject_iterate.webp', caption: 'Revised: Accept, reject, or iterate on any suggestion' },
        { src: '/images/3c_revised_accepted_change.webp', caption: 'Revised: Visual confirmation when a suggestion is accepted' },
        { src: '/images/3c_revised_essay_finished.webp', caption: 'Revised: Completed essay with tracked source usage' },
      ],
    },
    {
      title: 'Digital Mockup',
      icon: <Monitor className="w-6 h-6" />,
      description: 'We translated our revised prototype into a polished, interactive Figma mockup.',
      thumbnail: '/images/3d_mockup_landing_page.webp',
      detailedDescription:
        'Our final high-fidelity digital mockup in Figma incorporates every lesson from our research, prototyping, and usability testing. It features a clean, low-cognitive-load interface with two primary flows: topic evaluation (with AI-powered scoring on complexity, nicheness, and rubric fit) and source-assisted writing (with organized sources, expandable details, and an AI writing assistant that users can accept, reject, or refine).',
      figmaLink: 'https://www.figma.com/proto/Ivp7jg9FGY3nHJIgIwieoa/Write-Right?node-id=0-1&t=aRW3gpdp29MjF2j9-1',
      highlights: ['High-fidelity Figma prototype', 'Interactive flows', 'All usability fixes applied'],
      images: [
        { src: '/images/3d_mockup_landing_page.webp', caption: 'Landing page — start a new research project' },
        { src: '/images/3d_mockup_project_setup.webp', caption: 'Project setup — enter assignment details' },
        { src: '/images/3d_mockup_enter_topics.webp', caption: 'Enter topic ideas for evaluation' },
        { src: '/images/3d_mockup_topic_scorecards.webp', caption: 'Topic scorecards with AI-powered metrics' },
        { src: '/images/3d_mockup_complexity_info.webp', caption: 'Metric details — tap any metric for a detailed explanation' },
        { src: '/images/3d_mockup_select_nara_park.webp', caption: 'Select your best-fit topic' },
        { src: '/images/3d_mockup_sources_panel.webp', caption: 'Organized sources with category groupings' },
        { src: '/images/3d_mockup_source_detail_view.webp', caption: 'Expanded source detail view' },
        { src: '/images/3d_mockup_writing_suggestion.webp', caption: 'AI writing suggestion in context' },
        { src: '/images/3d_mockup_robot_review.webp', caption: 'Robot review with accept/reject/iterate controls' },
      ],
    },
  ];

  const teamMembers = [
    { name: 'Brian Koh', role: '3rd Year', image: '/images/team_brian.webp', link: '' },
    { name: 'David Lym', role: '4th Year', image: '/images/team_david.webp', link: '' },
    { name: 'Keanu Thakalath', role: 'Senior Software Expert', image: '/images/team_keanu.webp', link: '' },
    { name: 'Kemin Li', role: '3rd Year', image: '/images/team_kemin.webp', link: '' },
    { name: 'Thomas Chen', role: 'Designer/Developer', image: '/images/team_thomas.webp', link: 'https://www.linkedin.com/in/thomaschen04/' },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-teal-primary/30 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} logoSrc={logoSrc} />

      {/* Process Modal */}
      <ProcessModal
        step={activeProcess !== null ? processSteps[activeProcess] : null}
        isOpen={activeProcess !== null}
        onClose={() => setActiveProcess(null)}
        theme={theme}
      />

      {/* Hero Section */}
      <header className={`relative h-screen flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="absolute inset-0 z-0 opacity-30">
          <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_50%_50%,#0d948844,transparent_70%)]' : 'bg-[radial-gradient(circle_at_50%_50%,#0d948822,transparent_70%)]'}`}></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              WRITE <span className="text-teal-primary italic">RIGHT</span>
            </h1>
            <p className={`text-xl md:text-2xl font-light tracking-wide mb-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              The guide for your research journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#problem-solution" className="px-8 py-4 bg-teal-primary text-white font-bold rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-lg shadow-teal-primary/20">
                Explore the Journey
              </a>
              <a href="#demo" className={`px-8 py-4 font-bold rounded-full transition-all backdrop-blur-sm ${theme === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'}`}>
                Watch Prototype Demo
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
                Students struggle with information overload when researching papers. A single search can return
                over <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>600 million results</strong>,
                creating an overwhelming decision-making burden. Our research found that <strong className={theme === 'dark' ? 'text-white' : 'text-black'}>79% of students</strong> keep
                all source tabs open while taking notes, and over half spend far more time researching than they expect.
                Choosing topics, finding credible sources, and ensuring writing meets rubric requirements are consistently stressful.
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
              <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Write Right is a web-based research assistant that guides students through the entire research-to-writing process:
              </p>
              <ul className="space-y-3 flex-grow">
                {[
                  { label: 'Topic Evaluation', desc: 'AI-powered scoring on complexity, nicheness, and rubric fit to help pick the right topic before committing' },
                  { label: 'Source Organization', desc: 'Automatically categorize and track sources, with clear labels for AI-suggested vs. user-uploaded materials' },
                  { label: 'Writing Assistance', desc: 'Contextual suggestions tied to your sources and rubric, with full control to accept, reject, or iterate' },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal-primary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.label}:</span>{' '}
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
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
              <SectionHeading title="Our Concept" subtitle="See how we envisioned Write Right" theme={theme} />
              <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Research shouldn't be a solitary struggle. Write Right provides a dedicated space where students can evaluate topics before committing, organize sources without drowning in tabs, and get AI-powered writing feedback — all while staying in control of their own work.
              </p>
              <ul className="space-y-4">
                {[
                  'Evaluate topic feasibility before you commit',
                  'Organize sources with AI-powered categorization',
                  'Get rubric-aligned writing feedback you control',
                ].map((item) => (
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

      {/* Section 3: Process */}
      <section id="process" className={`py-24 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <SectionHeading
            title="Our Process"
            subtitle="Click any step to dive deeper into our design journey"
            theme={theme}
          />
        </div>
        <div className="flex overflow-x-auto pb-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] hide-scrollbar gap-6 snap-x">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              whileHover={{ y: -10 }}
              onClick={() => setActiveProcess(index)}
              className={`min-w-[300px] md:min-w-[350px] rounded-3xl p-8 border snap-start cursor-pointer transition-colors duration-300 ${theme === 'dark' ? 'bg-[#141414] border-white/5 hover:border-teal-primary/30' : 'bg-gray-50 border-black/5 hover:border-teal-primary/30'}`}
            >
              <div className="w-14 h-14 bg-teal-primary/10 rounded-2xl flex items-center justify-center mb-6 text-teal-primary">
                {step.icon}
              </div>
              <div className={`aspect-video rounded-2xl mb-6 overflow-hidden border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-white border-black/5'}`}>
                <img src={step.thumbnail} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <h4 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{step.title}</h4>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mb-4`}>{step.description}</p>
              <span className="text-teal-primary text-sm font-medium flex items-center gap-1">
                Dive deeper <ChevronRight size={14} />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 4: Working Prototype */}
      <section id="demo" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Working Prototype" subtitle="See Write Right in action" theme={theme} />
          <div className="max-w-4xl mx-auto">
            {/* Demo Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl overflow-hidden border shadow-2xl ${theme === 'dark' ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}
            >
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full"
                poster="/images/3d_mockup_landing_page.webp"
              >
                <source src="/write-right-demo.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </motion.div>

            {/* Prototype Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                We built a working code prototype using AI coding tools as a stretch goal. Try it out below!
              </p>
              <a
                href="https://write-right-zeta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-teal-primary text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
              >
                Try the Working Prototype
                <ExternalLink size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Meet the Team */}
      <section id="team" className={`py-24 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Meet the Team" subtitle="The creative minds behind Write Right" theme={theme} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, index) => {
              const imageContent = (
                <div className="relative mb-6 mx-auto w-48 h-48 md:w-full md:h-auto aspect-square overflow-hidden rounded-2xl transition-all duration-500 grayscale-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                </div>
              );

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  {member.link
                    ? (
                      <a
                        href={normalizeExternalLink(member.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        {imageContent}
                      </a>
                    )
                    : imageContent}
                  <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{member.name}</h4>
                  <p className="text-teal-primary text-sm font-medium uppercase tracking-wider">{member.role}</p>
                </motion.div>
              );
            })}
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
                <li><a href="#demo" className="hover:text-teal-primary transition-colors">Working Prototype</a></li>
                <li><a href="https://write-right-zeta.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-primary transition-colors">Try Write Right</a></li>
              </ul>
            </div>
            <div>
              <h5 className={`font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Connect</h5>
              <div className="flex gap-4">
                <a href="https://github.com/Brian-K42/Write-Right" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-teal-primary hover:text-white' : 'bg-black/5 text-gray-600 hover:bg-teal-primary hover:text-white'}`}>
                  <Github size={20} />
                </a>
                <a href="https://www.youtube.com/watch?v=K-L4QmaOp1o" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-teal-primary hover:text-white' : 'bg-black/5 text-gray-600 hover:bg-teal-primary hover:text-white'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
            <p className="text-gray-600 text-sm">&copy; 2026 Write Right. All rights reserved.</p>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="https://github.com/Brian-K42/Write-Right" target="_blank" rel="noopener noreferrer" className="hover:text-teal-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
