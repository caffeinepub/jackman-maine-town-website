import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  AlertCircle,
  Trash2,
  ClipboardList,
  MapPin,
  User,
  Phone,
  FileText,
  Tag,
  Mail,
} from 'lucide-react';
import { ProblemType } from '../backend';
import {
  useSubmitProblemReport,
  useGetProblemReports,
  useDeleteProblemReport,
  useIsCallerAdmin,
} from '../hooks/useQueries';

const PROBLEM_TYPE_OPTIONS: { label: string; value: ProblemType }[] = [
  { label: 'Pothole', value: ProblemType.pothole },
  { label: 'Broken Streetlight', value: ProblemType.streetlight },
  { label: 'Road Damage', value: ProblemType.roadDamage },
  { label: 'Water / Sewer Issue', value: ProblemType.waterSewer },
  { label: 'Other', value: ProblemType.other },
];

function problemTypeLabel(type: ProblemType): string {
  return PROBLEM_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? String(type);
}

function formatTimestamp(ts: bigint): string {
  // Backend timestamps are in nanoseconds
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleString();
}

export default function ReportProblemPage() {
  const [problemType, setProblemType] = useState<ProblemType | ''>('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { data: isAdmin = false } = useIsCallerAdmin();
  const submitReport = useSubmitProblemReport();
  const { data: reports = [], isLoading: reportsLoading } = useGetProblemReports(isAdmin);
  const deleteReport = useDeleteProblemReport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!problemType) {
      setValidationError('Please select a problem type.');
      return;
    }
    if (!location.trim()) {
      setValidationError('Please enter a location description.');
      return;
    }
    if (!description.trim()) {
      setValidationError('Please provide a detailed description.');
      return;
    }
    if (!reporterName.trim()) {
      setValidationError('Please enter your name.');
      return;
    }

    await submitReport.mutateAsync({
      problemType: problemType as ProblemType,
      locationDescription: location.trim(),
      detailedDescription: description.trim(),
      reporterName: reporterName.trim(),
      reporterContact: contactInfo.trim(),
    });

    setSubmitted(true);
    setProblemType('');
    setLocation('');
    setDescription('');
    setReporterName('');
    setContactInfo('');
  };

  const handleDelete = async (id: bigint) => {
    await deleteReport.mutateAsync(id);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <AlertTriangle size={36} className="text-amber-300" />
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Report a Problem</h1>
          </div>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Help us keep Jackman safe and well-maintained. Submit issues so the town can address them promptly.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-forest-700 mb-2">Submit a Report</h2>
            <div className="w-10 h-1 bg-amber-400 mb-5 rounded-full" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={52} className="text-forest-500 mb-4" />
                <h3 className="font-serif text-xl font-semibold text-forest-700 mb-2">Report Submitted!</h3>
                <p className="text-muted-foreground font-sans text-sm max-w-xs">
                  Thank you for helping improve Jackman. The town will review your report and take action as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-5 py-2 rounded border border-forest-300 text-forest-600 hover:bg-forest-50 font-sans text-sm transition-colors"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Problem Type */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                    Problem Type *
                  </label>
                  <div className="relative">
                    <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <select
                      value={problemType}
                      onChange={(e) => setProblemType(e.target.value as ProblemType | '')}
                      className="w-full pl-9 pr-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400 appearance-none"
                    >
                      <option value="">Select a problem type…</option>
                      {PROBLEM_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                    Location Description *
                  </label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Main St near the post office"
                      className="w-full pl-9 pr-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
                    />
                  </div>
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                    Detailed Description *
                  </label>
                  <div className="relative">
                    <FileText size={15} className="absolute left-3 top-3 text-muted-foreground pointer-events-none" />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the problem in detail…"
                      rows={4}
                      className="w-full pl-9 pr-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                    />
                  </div>
                </div>

                {/* Reporter Name */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full pl-9 pr-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                    Contact Info <span className="normal-case text-muted-foreground/70">(email or phone, optional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="jane@example.com or (207) 555-0100"
                      className="w-full pl-9 pr-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
                    />
                  </div>
                </div>

                {/* Validation / API error */}
                {(validationError || submitReport.isError) && (
                  <div className="flex items-center gap-2 text-destructive text-sm font-sans">
                    <AlertCircle size={14} />
                    <span>{validationError || 'Failed to submit report. Please try again.'}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitReport.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-sans font-semibold py-3 rounded transition-colors disabled:opacity-50"
                >
                  {submitReport.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={16} /> Submit Report
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info note */}
          <div className="mt-6 bg-forest-50 border border-forest-200 rounded-xl p-5">
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              <strong className="text-forest-700">Emergency?</strong> For life-threatening emergencies, call{' '}
              <strong>911</strong>. This form is for non-emergency infrastructure and maintenance issues only.
            </p>
          </div>
        </div>
      </section>

      {/* Admin: Submitted Reports */}
      {isAdmin && (
        <section className="py-10 bg-slate-50 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <ClipboardList size={24} className="text-forest-600" />
              <h2 className="font-serif text-2xl font-bold text-forest-700">Submitted Reports</h2>
            </div>
            <div className="w-10 h-1 bg-amber-400 mb-6 rounded-full" />

            {reportsLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground font-sans text-sm py-8 justify-center">
                <Loader2 size={18} className="animate-spin" />
                <span>Loading reports…</span>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground font-sans text-sm">
                No reports have been submitted yet.
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl">
                {reports.map((report) => (
                  <div
                    key={String(report.id)}
                    className="bg-card rounded-xl border border-border shadow-card overflow-hidden"
                  >
                    {/* Reporter banner */}
                    <div className="bg-forest-700 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User size={14} className="text-forest-200 shrink-0" />
                          <div>
                            <span className="text-forest-300 text-xs font-sans uppercase tracking-wide">Reported by</span>
                            <p className="text-white font-sans font-semibold text-sm leading-tight">
                              {report.reporterName || <span className="italic text-forest-300">Anonymous</span>}
                            </p>
                          </div>
                        </div>
                        {report.reporterContact && (
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-forest-200 shrink-0" />
                            <div>
                              <span className="text-forest-300 text-xs font-sans uppercase tracking-wide">Contact</span>
                              <p className="text-amber-300 font-sans text-sm leading-tight font-medium">
                                {report.reporterContact}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-forest-300 text-xs font-sans">
                        {formatTimestamp(report.timestamp)}
                      </span>
                    </div>

                    {/* Report body */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full font-sans">
                              <Tag size={11} />
                              {problemTypeLabel(report.problemType)}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm font-sans">
                            <div className="flex items-start gap-2">
                              <MapPin size={14} className="text-forest-500 mt-0.5 shrink-0" />
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium block">Location</span>
                                <p className="text-foreground">{report.locationDescription}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2 sm:col-span-2">
                              <FileText size={14} className="text-forest-500 mt-0.5 shrink-0" />
                              <div>
                                <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium block">Description</span>
                                <p className="text-foreground">{report.detailedDescription}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelete(report.id)}
                          disabled={deleteReport.isPending}
                          className="shrink-0 p-2 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
                          title="Delete report"
                        >
                          {deleteReport.isPending ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
