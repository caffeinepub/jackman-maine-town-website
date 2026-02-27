import { useState } from 'react';
import { CalendarDays, Plus, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useGetEvents, useAddEvent, useDeleteEvent, useIsCallerAdmin } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import type { Event } from '../backend';

function formatDate(timestamp: bigint): string {
  // Backend stores nanoseconds
  const ms = Number(timestamp / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function EventCard({ event, isAdmin, onDelete }: { event: Event; isAdmin: boolean; onDelete: (id: bigint) => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    onDelete(event.id);
  };

  return (
    <article className="bg-card rounded-xl border border-border shadow-card overflow-hidden hover:border-forest-300 transition-colors">
      <div className="bg-forest-600 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-amber-300" />
          <span className="text-amber-200 text-sm font-sans">{formatDate(event.date)}</span>
        </div>
        {isAdmin && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-slate-300 hover:text-red-300 transition-colors disabled:opacity-50"
            aria-label="Delete event"
          >
            {deleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-serif font-semibold text-forest-700 text-lg mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground font-sans leading-relaxed">{event.description}</p>
      </div>
    </article>
  );
}

function AddEventForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const addEvent = useAddEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !description.trim()) return;

    const dateMs = new Date(date).getTime();
    const dateNs = BigInt(dateMs) * BigInt(1_000_000);

    await addEvent.mutateAsync({ title: title.trim(), date: dateNs, description: description.trim() });
    onClose();
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-card p-6 mb-8">
      <h3 className="font-serif font-semibold text-forest-700 text-lg mb-4">Add New Event</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
            Event Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Town Hall Meeting"
            required
            className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
            Date *
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the event..."
            required
            rows={3}
            className="w-full px-3 py-2 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={addEvent.isPending}
            className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-sans font-medium px-5 py-2 rounded transition-colors disabled:opacity-50 text-sm"
          >
            {addEvent.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {addEvent.isPending ? 'Adding…' : 'Add Event'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded border border-border text-muted-foreground hover:bg-muted font-sans text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
        {addEvent.isError && (
          <p className="text-sm text-destructive font-sans flex items-center gap-1">
            <AlertCircle size={14} /> Failed to add event. Admin access required.
          </p>
        )}
      </form>
    </div>
  );
}

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const { data: events, isLoading, isError } = useGetEvents();
  const { data: isAdmin } = useIsCallerAdmin();
  const deleteEvent = useDeleteEvent();
  const { identity } = useInternetIdentity();

  const sortedEvents = events
    ? [...events].sort((a, b) => (a.date > b.date ? -1 : 1))
    : [];

  const handleDelete = (id: bigint) => {
    deleteEvent.mutate(id);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Events & News</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Stay informed about what's happening in Jackman, Maine
          </p>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Admin Controls */}
          {identity && isAdmin && !showForm && (
            <div className="mb-6 flex justify-end">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-forest-900 font-sans font-semibold px-5 py-2.5 rounded transition-colors text-sm"
              >
                <Plus size={16} /> Add Event
              </button>
            </div>
          )}

          {showForm && <AddEventForm onClose={() => setShowForm(false)} />}

          {/* Events List */}
          {isLoading && (
            <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
              <Loader2 size={22} className="animate-spin text-forest-500" />
              <span className="font-sans">Loading events…</span>
            </div>
          )}

          {isError && (
            <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-5 text-destructive">
              <AlertCircle size={18} />
              <span className="font-sans text-sm">Failed to load events. Please try again later.</span>
            </div>
          )}

          {!isLoading && !isError && sortedEvents.length === 0 && (
            <div className="text-center py-16">
              <CalendarDays size={48} className="text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-muted-foreground mb-2">No Events Yet</h3>
              <p className="text-sm text-muted-foreground font-sans">
                Check back soon for upcoming events and announcements.
              </p>
            </div>
          )}

          {!isLoading && !isError && sortedEvents.length > 0 && (
            <div className="space-y-5">
              {sortedEvents.map((event) => (
                <EventCard
                  key={event.id.toString()}
                  event={event}
                  isAdmin={!!isAdmin && !!identity}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
