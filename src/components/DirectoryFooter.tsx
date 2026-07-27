import { GraduationCap, MapPin, Mail, Phone, Heart, Sparkles } from 'lucide-react';

export default function DirectoryFooter() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Coimbatore Colleges</h3>
                <p className="text-xs text-slate-400">Arts & Science Directory</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A comprehensive directory of 32 arts and science colleges in Coimbatore, Tamil Nadu.
              Explore courses, fees, placements, and accreditations with our AI-powered assistant.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#home" className="text-sm text-slate-400 transition hover:text-cyan-300">Home</a></li>
              <li><a href="#colleges" className="text-sm text-slate-400 transition hover:text-cyan-300">Browse Colleges</a></li>
              <li><a href="#about" className="text-sm text-slate-400 transition hover:text-cyan-300">About</a></li>
              <li><a href="#contact" className="text-sm text-slate-400 transition hover:text-cyan-300">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">College Types</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Government Colleges</li>
              <li>Private Autonomous</li>
              <li>Deemed Universities</li>
              <li>Women's Colleges</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get in Touch</h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
                Coimbatore, Tamil Nadu, India
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                info@coimbatorecolleges.edu.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-cyan-400" />
                +91 422 000 0000
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              Try our AI chatbot for instant answers!
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p className="flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} Coimbatore Colleges Directory. Made with <Heart className="h-4 w-4 text-rose-500" /> in Coimbatore.
          </p>
        </div>
      </div>
    </footer>
  );
}
