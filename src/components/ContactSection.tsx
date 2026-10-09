import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Copy, Check, Send, Clock, MapPin, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './SocialIcons';
import HHPLogo from './HHPLogo';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  // Form fields
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Internship Opportunity');
  const [message, setMessage] = useState('');

  // Live Dhaka Time (UTC+6)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`[${inquiryType}] From ${senderName || 'Inquirer'}`);
    const body = encodeURIComponent(
      `Hello Hamdil,\n\n${message || 'I would like to connect regarding an engineering or research opportunity.'}\n\nFrom: ${senderName || 'Anonymous'} (${senderEmail || 'No email provided'})\n`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const draftText = `To: ${PERSONAL_INFO.email}\nSubject: [${inquiryType}] From ${senderName || 'Inquirer'}\n\nHello Hamdil,\n\n${message || 'I would like to connect regarding an engineering opportunity.'}\n\nBest regards,\n${senderName || 'Inquirer'}\n${senderEmail}`;
    navigator.clipboard.writeText(draftText);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-600/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-600 dark:text-blue-400 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>COMMUNICATION // OPEN INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let’s Build Something Meaningful Together.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Open to software engineering internships, robotics hardware research collaborations, and creative technology inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contacts & Status */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct Email Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/30">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                // Direct Electronic Mail
              </span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-teal-400 transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-teal-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copiedEmail && (
                <span className="text-xs text-teal-500 font-mono mt-2 block animate-fade-in">
                  ✓ Email copied to clipboard!
                </span>
              )}
            </div>

            {/* Profiles */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <GitHubIcon className="w-6 h-6 text-slate-900 dark:text-white" />
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">GitHub</h4>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">@ENiGMA-101</p>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500 transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <LinkedInIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</h4>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">/in/hamdil-hasan-p101</p>
              </a>
            </div>

            {/* Location & Timezone info */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span>DHAKA, BANGLADESH</span>
                </span>
                <span className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentTime || 'UTC+06:00'}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  {PERSONAL_INFO.availability}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Functional Message Dispatcher */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <HHPLogo size={32} showGlow={false} />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Compose Direct Message
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Dispatches straight to your email client with zero middleman
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-teal-400">
                  Verified mailto:
                </span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = generateMailto();
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Morgan / Sarah"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@university.edu"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Subject / Inquiry Category
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="Internship Opportunity">Software Engineering Internship</option>
                    <option value="Robotics Research Collaboration">Robotics / Embedded Systems Project</option>
                    <option value="Academic Research Discussion">Visible Light Communication / AI Research</option>
                    <option value="Full-Stack Web Project">Web Application Development</option>
                    <option value="General Technical Inquiry">General Discussion & Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, team opportunity, or research inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Launch in Mail Client</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-500" />
                        <span className="text-teal-600 dark:text-teal-400">Copied Formatted Draft!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Draft for Webmail</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 font-mono text-center sm:text-left pt-1">
                  * Opens your native mail application with recipient, subject, and text already pre-populated.
                </p>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
