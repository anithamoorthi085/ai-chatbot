import { useEffect } from 'react';
import {
  X, MapPin, Phone, Mail, Globe, Calendar, Award, Briefcase, BookOpen,
  Building2, Trophy, IndianRupee, User, CheckCircle2,
} from 'lucide-react';
import { College } from '@/data/collegesData';

interface CollegeModalProps {
  college: College | null;
  onClose: () => void;
}

export default function CollegeModal({ college, onClose }: CollegeModalProps) {
  useEffect(() => {
    if (college) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [college]);

  if (!college) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-800 p-6 text-white">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold leading-tight sm:text-2xl">{college.name}</h2>
              <p className="mt-1 text-sm text-blue-100">{college.description}</p>
            </div>
          </div>
          <div className="relative mt-4 flex flex-wrap gap-2">
            {college.naacGrade !== '—' && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">
                <Award className="h-3.5 w-3.5" /> NAAC {college.naacGrade}
              </span>
            )}
            {college.nirfRank && (
              <span className="flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-200">
                <Trophy className="h-3.5 w-3.5" /> NIRF {college.nirfRank}
              </span>
            )}
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
              {college.status}
            </span>
            {college.forWomen && (
              <span className="rounded-full bg-pink-400/20 px-3 py-1 text-xs font-bold text-pink-200">
                Women's College
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {/* Quick info grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard icon={Calendar} label="Founded" value={college.founded} />
            <InfoCard icon={MapPin} label="Location" value={college.location} />
            <InfoCard icon={User} label="Principal" value={college.principal} />
            <InfoCard icon={Building2} label="Affiliation" value={college.affiliation} />
          </div>

          {/* Fees & Placement */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <IndianRupee className="h-5 w-5" />
                <h3 className="text-sm font-bold">Fees Structure</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">{college.feesRange}</p>
              <p className="mt-1 text-xs text-slate-500">Per year: {college.feesPerYear}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Briefcase className="h-5 w-5" />
                <h3 className="text-sm font-bold">Placement</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">Average: {college.placementAvg}</p>
              {college.placementHighest && (
                <p className="mt-1 text-xs text-slate-500">Highest: {college.placementHighest}</p>
              )}
            </div>
          </div>

          {/* Courses */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-blue-600">
              <BookOpen className="h-5 w-5" />
              <h3 className="text-sm font-bold">Courses Offered</h3>
            </div>
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Undergraduate (UG)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {college.ugCourses.map((course, i) => (
                  <span key={i} className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    {course}
                  </span>
                ))}
              </div>
            </div>
            {college.pgCourses.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Postgraduate (PG)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {college.pgCourses.map((course, i) => (
                    <span key={i} className="rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-700">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admission */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-sm font-bold text-slate-800">Admission Process</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{college.admissionProcess}</p>
          </div>

          {/* Top Recruiters */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-800">Top Recruiters</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {college.topRecruiters.map((recruiter, i) => (
                <span key={i} className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {recruiter}
                </span>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-800">Campus Facilities</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {college.facilities.map((facility, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-blue-500" /> {facility}
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-800">Achievements</h3>
            <div className="mt-3 space-y-2">
              {college.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" /> {achievement}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <h3 className="text-sm font-bold text-blue-800">Contact Details</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <a href={`tel:${college.phone}`} className="flex items-center gap-2 transition hover:text-blue-700">
                <Phone className="h-4 w-4 text-blue-500" /> {college.phone}
              </a>
              <a href={`mailto:${college.email}`} className="flex items-center gap-2 transition hover:text-blue-700">
                <Mail className="h-4 w-4 text-blue-500" /> {college.email}
              </a>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" /> {college.website}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-500" /> {college.location}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon className="h-4 w-4" />
        <p className="text-xs font-semibold uppercase tracking-wider">{label}</p>
      </div>
      <p className="mt-1.5 text-sm font-medium text-slate-700">{value}</p>
    </div>
  );
}
