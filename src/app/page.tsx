import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Metadata } from 'next';
import { ArrowRight, BarChart3, Globe, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'StudyTracker | Master Your Curriculum',
  description: 'The ultimate tool for students and professionals to build custom curriculums, track daily progress, and visualize graduation estimates.',
  keywords: ['study tracker', 'learning', 'curriculum', 'education', 'SaaS'],
  openGraph: {
    title: 'StudyTracker',
    description: 'Transform how you learn with interactive study plans and analytics.',
    type: 'website',
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30 selection:text-indigo-200 transition-colors duration-300">
      
      {/* Navbar Area */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center">
               <Globe className="text-white w-5 h-5"/>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Study<span className="text-indigo-500 dark:text-indigo-400">Tracker</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block">Sign In</Link>
            <Link href="/register">
              <Button className="bg-indigo-600 dark:bg-white text-white dark:text-slate-950 hover:bg-indigo-700 dark:hover:bg-slate-200 shadow-md transition-all font-semibold rounded-full px-6 py-2">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 overflow-hidden px-4">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-200/40 dark:bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse opacity-50"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
            Version 2.0 is now globally available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900 dark:text-white">
            Structure your learning. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 dark:from-indigo-400 dark:via-purple-400 dark:to-emerald-400">
              Accelerate your career.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The intelligent study tracker built for global learners. Build personalized curriculums, organize your subjects dynamically, and forecast your completion date with powerful analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.3)] dark:shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.5)] dark:hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all group flex gap-2 items-center">
                Start Tracking Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-700 dark:text-white">
                View Live Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-4 relative z-10 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to succeed</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">A full suite of tools designed to keep you focused and motivated.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-indigo-400 dark:hover:border-indigo-500/30 transition-colors group shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 border border-indigo-200 dark:border-indigo-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Advanced Analytics</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Visualize your progress with stunning charts. Automatically estimate completion dates based on your actual study velocity and track your daily streaks.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="col-span-1 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/50 border border-slate-200 dark:border-white/10 p-8 rounded-3xl hover:border-emerald-400 dark:hover:border-emerald-500/30 transition-colors group shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 border border-emerald-200 dark:border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Zap className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-slate-500 dark:text-slate-400">
                Optimized with globally distributed edge networks ensuring instantaneous updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="col-span-1 md:col-span-3 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 border border-slate-200 dark:border-white/10 p-8 rounded-3xl group relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-sm">
               <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-tl from-indigo-100/30 dark:from-indigo-500/10 to-transparent pointer-events-none"></div>
               <div className="flex-1">
                 <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-200 dark:border-purple-500/20 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="text-purple-600 dark:text-purple-400 w-6 h-6" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3">Enterprise Grade Data Integrity</h3>
                 <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                   Your personalized curriculum structure is protected by strict Mongoose schemas, Zod validation, and secure JWT authentication. Safe, isolated, and scalable.
                 </p>
               </div>
               <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-lg dark:shadow-2xl relative">
                  <div className="absolute top-3 left-4 flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="mt-6 flex flex-col gap-3">
                     <div className="w-full h-8 bg-slate-200/70 dark:bg-slate-800/50 rounded animate-pulse"></div>
                     <div className="w-3/4 h-8 bg-slate-200/70 dark:bg-slate-800/50 rounded animate-pulse delay-75"></div>
                     <div className="w-5/6 h-8 bg-slate-200/70 dark:bg-slate-800/50 rounded animate-pulse delay-150"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-20 text-center border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-indigo-200/30 dark:bg-indigo-500/10 blur-[120px] pointer-events-none"></div>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Ready to take control of your time?</h2>
        <Link href="/register" className="relative z-10">
           <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-indigo-600 dark:bg-white text-white dark:text-slate-950 hover:bg-indigo-700 dark:hover:bg-slate-200">
             Create Your Free Account
           </Button>
        </Link>
        <p className="mt-10 text-slate-500 text-sm">© 2026 StudyTracker by Aritra AI. Built for global scale.</p>
      </footer>
    </div>
  );
}
