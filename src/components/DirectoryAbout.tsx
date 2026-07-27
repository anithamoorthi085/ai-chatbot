import { Bot, Search, Award, TrendingUp, Users, Building2, Sparkles, MessageCircle } from 'lucide-react';
import { collegeStats } from '@/data/collegesData';

const steps = [
  { icon: Search, title: 'Search & Browse', desc: 'Filter 32 colleges by type, area, course, or NAAC grade. Sort by name, age, or placement.' },
  { icon: Building2, title: 'View Details', desc: 'Click any college to see courses, fees, placements, facilities, recruiters, and achievements.' },
  { icon: MessageCircle, title: 'Ask the AI', desc: 'Chat with our AI assistant for instant answers about any college — courses, admissions, fees, and more.' },
  { icon: TrendingUp, title: 'Compare & Decide', desc: 'Compare placement packages, NIRF rankings, and accreditations to make the right choice.' },
];

export default function DirectoryAbout() {
  return (
    <section id="about" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">How It Works</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">Your College Search, Simplified</h2>
          <p className="mt-4 text-slate-600">
            Finding the right college in Coimbatore has never been easier. Here's how our platform helps you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:border-blue-200 hover:bg-white hover:shadow-lg"
            >
              <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg">
                {i + 1}
              </div>
              <step.icon className="mt-4 h-8 w-8 text-cyan-600" />
              <h3 className="mt-4 text-lg font-bold text-slate-800">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* AI highlight */}
        <div className="mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-cyan-700 p-8 text-white sm:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-yellow-300" /> AI-Powered
              </div>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">Chat with our AI Assistant</h3>
              <p className="mt-4 text-blue-100">
                Our AI chatbot knows about all {collegeStats.total} colleges. Ask it anything —
                "Which colleges offer B.Sc Computer Science?", "What are the fees at PSG CAS?",
                or "Best placement colleges" — and get instant, detailed answers.
              </p>
              <a
                href="#colleges"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Bot className="h-5 w-5" /> Try the AI Assistant
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Building2, label: 'Colleges', value: collegeStats.total },
                { icon: Award, label: 'NAAC A+/A++', value: collegeStats.naacAPlus },
                { icon: Users, label: "Women's", value: collegeStats.womenColleges },
                { icon: TrendingUp, label: 'Deemed Univ.', value: collegeStats.deemed },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm">
                  <stat.icon className="mx-auto mb-2 h-7 w-7 text-cyan-300" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-blue-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
