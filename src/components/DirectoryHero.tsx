import { Sparkles, ArrowRight, Search, Bot, Award, Building2, TrendingUp } from 'lucide-react';
import { collegeStats } from '@/data/collegesData';

const features = [
  { icon: Building2, title: '32 Colleges', desc: 'Complete directory of all arts & science colleges' },
  { icon: Bot, title: 'AI Assistant', desc: 'Ask questions and get instant answers about any college' },
  { icon: Award, title: 'Accreditations', desc: 'NAAC grades, NIRF rankings & detailed comparisons' },
  { icon: TrendingUp, title: 'Placement Data', desc: 'Salary packages, recruiters & career insights' },
];

export default function DirectoryHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-white/5 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered College Directory
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Explore Coimbatore's
            <span className="block bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Arts & Science Colleges
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-200/90 sm:text-lg">
            Your complete guide to {collegeStats.total} arts and science colleges in Coimbatore.
            Compare courses, fees, placements, and accreditations — then chat with our AI assistant
            for instant answers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#colleges"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 hover:shadow-cyan-500/50"
            >
              <Search className="h-5 w-5" /> Browse Colleges
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Total Colleges', value: collegeStats.total },
            { label: 'NAAC A+/A++', value: collegeStats.naacAPlus },
            { label: 'Autonomous', value: collegeStats.autonomous },
            { label: "Women's Colleges", value: collegeStats.womenColleges },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10"
            >
              <p className="text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/10"
            >
              <feature.icon className="h-8 w-8 text-cyan-300" />
              <h3 className="mt-4 text-base font-bold text-white">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-blue-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
