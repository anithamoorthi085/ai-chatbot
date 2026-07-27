import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, GraduationCap, Award, MapPin, TrendingUp, Users, Building2, X } from 'lucide-react';
import { colleges, collegeStats, College } from '@/data/collegesData';

interface CollegeDirectoryProps {
  onSelectCollege: (college: College) => void;
}

type StatusFilter = 'All' | 'Government' | 'Private Autonomous' | 'Private' | 'Deemed University' | 'Women';
type SortBy = 'name' | 'founded' | 'placement';

export default function CollegeDirectory({ onSelectCollege }: CollegeDirectoryProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = colleges.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.shortName.toLowerCase().includes(search.toLowerCase()) ||
        c.area.toLowerCase().includes(search.toLowerCase()) ||
        c.courses.some((course) => course.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Government' && (c.status === 'Government' || c.status === 'Government-Aided')) ||
        (statusFilter === 'Women' && c.forWomen) ||
        (statusFilter !== 'All' && statusFilter !== 'Government' && statusFilter !== 'Women' && c.status === statusFilter);
      return matchesSearch && matchesStatus;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'name') return a.shortName.localeCompare(b.shortName);
      if (sortBy === 'founded') return parseInt(a.founded) - parseInt(b.founded);
      if (sortBy === 'placement') {
        const aAvg = parseInt(a.placementAvg.replace(/[^0-9]/g, '').slice(0, 5)) || 0;
        const bAvg = parseInt(b.placementAvg.replace(/[^0-9]/g, '').slice(0, 5)) || 0;
        return bAvg - aAvg;
      }
      return 0;
    });

    return result;
  }, [search, statusFilter, sortBy]);

  const filterButtons: { label: string; value: StatusFilter }[] = [
    { label: 'All Colleges', value: 'All' },
    { label: 'Government', value: 'Government' },
    { label: 'Private Autonomous', value: 'Private Autonomous' },
    { label: 'Private', value: 'Private' },
    { label: 'Deemed University', value: 'Deemed University' },
    { label: "Women's", value: 'Women' },
  ];

  return (
    <section id="colleges" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Explore</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-800 sm:text-4xl">College Directory</h2>
          <p className="mt-4 text-slate-600">
            Browse all {colleges.length} arts and science colleges in Coimbatore. Search by name, course, or area.
          </p>
        </div>

        {/* Stats bar */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { icon: Building2, label: 'Total Colleges', value: collegeStats.total },
            { icon: Award, label: 'NAAC A+/A++', value: collegeStats.naacAPlus },
            { icon: GraduationCap, label: 'Autonomous', value: collegeStats.autonomous },
            { icon: TrendingUp, label: 'Deemed Univ.', value: collegeStats.deemed },
            { icon: Users, label: "Women's", value: collegeStats.womenColleges },
            { icon: Building2, label: 'Govt/Aided', value: collegeStats.government },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center">
              <stat.icon className="mx-auto mb-2 h-6 w-6 text-blue-600" />
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by college name, course, or area..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 outline-none focus:border-blue-400"
              >
                <option value="name">Sort: Name (A-Z)</option>
                <option value="founded">Sort: Oldest First</option>
                <option value="placement">Sort: Best Placement</option>
              </select>
            </div>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setStatusFilter(btn.value)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    statusFilter === btn.value
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="mt-6 text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {colleges.length} colleges
        </p>

        {/* College grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((college) => (
            <button
              key={college.id}
              onClick={() => onSelectCollege(college)}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md transition-transform group-hover:scale-110">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-end gap-1">
                  {college.naacGrade !== '—' && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      NAAC {college.naacGrade}
                    </span>
                  )}
                  {college.nirfRank && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                      NIRF {college.nirfRank}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="mt-4 text-base font-bold leading-snug text-slate-800 group-hover:text-blue-700">
                {college.shortName}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{college.name}</p>

              <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                {college.area}
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                  {college.status}
                </span>
                {college.forWomen && (
                  <span className="rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-700">
                    Women's
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <div>
                  <p className="text-xs text-slate-400">Placement</p>
                  <p className="font-semibold text-slate-700">{college.placementAvg}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Founded</p>
                  <p className="font-semibold text-slate-700">{college.founded}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-lg font-semibold text-slate-700">No colleges found</p>
            <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filters.</p>
            <button
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
              }}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
