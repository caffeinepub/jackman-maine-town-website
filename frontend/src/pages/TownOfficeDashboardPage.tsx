import {
  Building2,
  ClipboardList,
  MapPin,
  User,
  Phone,
  FileText,
  Tag,
  Calendar,
  Trash2,
  Loader2,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';
import { ProblemType } from '../backend';
import {
  useGetProblemReports,
  useDeleteProblemReport,
  useIsCallerAdmin,
} from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

const PROBLEM_TYPE_LABELS: Record<ProblemType, string> = {
  [ProblemType.pothole]: 'Pothole',
  [ProblemType.streetlight]: 'Broken Streetlight',
  [ProblemType.roadDamage]: 'Road Damage',
  [ProblemType.waterSewer]: 'Water / Sewer Issue',
  [ProblemType.other]: 'Other',
};

const PROBLEM_TYPE_COLORS: Record<ProblemType, string> = {
  [ProblemType.pothole]: 'bg-amber-100 text-amber-800 border-amber-300',
  [ProblemType.streetlight]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [ProblemType.roadDamage]: 'bg-red-100 text-red-800 border-red-300',
  [ProblemType.waterSewer]: 'bg-blue-100 text-blue-800 border-blue-300',
  [ProblemType.other]: 'bg-slate-100 text-slate-700 border-slate-300',
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TownOfficeDashboardPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: isAdmin = false, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: reports = [], isLoading: reportsLoading, isError } = useGetProblemReports(isAdmin);
  const deleteReport = useDeleteProblemReport();

  const handleDelete = async (id: bigint) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    await deleteReport.mutateAsync(id);
  };

  // Loading state while checking auth
  if (adminLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 size={36} className="animate-spin text-forest-500" />
          <p className="font-sans text-sm">Checking access…</p>
        </div>
      </div>
    );
  }

  // Not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return (
      <div>
        <section className="bg-forest-700 py-14 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Building2 size={36} className="text-amber-300" />
              <h1 className="font-serif text-4xl md:text-5xl font-bold">Town Office Dashboard</h1>
            </div>
            <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
            <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
              Staff portal for reviewing resident-submitted problem reports.
            </p>
          </div>
        </section>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-md text-center">
            <div className="bg-card rounded-xl border border-border shadow-card p-10 flex flex-col items-center gap-4">
              <ShieldAlert size={52} className="text-amber-400" />
              <h2 className="font-serif text-2xl font-bold text-forest-700">Access Restricted</h2>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                This page is only accessible to authorized Town Office staff. Please log in with your admin credentials to view submitted reports.
              </p>
              <p className="text-xs text-muted-foreground font-sans mt-1">
                Use the <span className="font-semibold text-forest-600">Admin Login</span> button in the navigation bar to authenticate.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Building2 size={36} className="text-amber-300" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Town Office Dashboard</h1>
          </div>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Review and manage all resident-submitted problem reports for the Town of Jackman.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-800 py-4 border-b border-forest-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-6 justify-center sm:justify-start">
            <div className="flex items-center gap-2 text-amber-200 font-sans text-sm">
              <ClipboardList size={16} className="text-amber-300" />
              <span>
                <span className="font-bold text-white text-base">{reports.length}</span>{' '}
                {reports.length === 1 ? 'Report' : 'Reports'} Submitted
              </span>
            </div>
            <div className="text-slate-400 text-xs font-sans hidden sm:block">|</div>
            <div className="text-slate-300 font-sans text-xs">
              Staff-only view &mdash; all data is confidential
            </div>
          </div>
        </div>
      </section>

      {/* Reports List */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {reportsLoading ? (
            <div className="flex flex-col items-center gap-3 py-20 text-muted-foreground">
              <Loader2 size={36} className="animate-spin text-forest-500" />
              <p className="font-sans text-sm">Loading reports…</p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <AlertCircle size={40} className="text-red-400" />
              <p className="font-sans text-sm text-muted-foreground">
                Failed to load reports. Please try refreshing the page.
              </p>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <ClipboardList size={52} className="text-forest-300" />
              <h3 className="font-serif text-xl font-semibold text-forest-700">No Reports Yet</h3>
              <p className="text-muted-foreground font-sans text-sm max-w-xs">
                No problem reports have been submitted by residents yet. They will appear here once submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {[...reports]
                .sort((a, b) => Number(b.timestamp - a.timestamp))
                .map((report) => (
                  <article
                    key={String(report.id)}
                    className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
                  >
                    {/* Reporter Banner */}
                    <div className="bg-forest-800 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-white">
                          <User size={14} className="text-amber-300 shrink-0" />
                          <span className="font-sans text-sm font-semibold">{report.reporterName}</span>
                        </div>
                        {report.reporterContact && (
                          <div className="flex items-center gap-2 text-amber-200">
                            <Phone size={13} className="text-amber-300 shrink-0" />
                            <span className="font-sans text-sm">{report.reporterContact}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-sans">
                        <Calendar size={12} className="text-slate-500 shrink-0" />
                        <span>{formatTimestamp(report.timestamp)}</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="px-5 py-4">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        {/* Problem Type Badge */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-semibold border ${
                            PROBLEM_TYPE_COLORS[report.problemType]
                          }`}
                        >
                          <Tag size={11} />
                          {PROBLEM_TYPE_LABELS[report.problemType]}
                        </span>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(report.id)}
                          disabled={deleteReport.isPending}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-sans font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                          title="Delete this report"
                        >
                          {deleteReport.isPending ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Trash2 size={12} />
                          )}
                          Delete
                        </button>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin size={14} className="text-forest-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-sans font-medium text-muted-foreground uppercase tracking-wide">
                            Location
                          </span>
                          <p className="text-sm font-sans text-foreground mt-0.5">{report.locationDescription}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex items-start gap-2">
                        <FileText size={14} className="text-forest-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-sans font-medium text-muted-foreground uppercase tracking-wide">
                            Description
                          </span>
                          <p className="text-sm font-sans text-foreground mt-0.5 leading-relaxed">
                            {report.detailedDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
