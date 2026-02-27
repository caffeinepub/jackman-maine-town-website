import { useState } from 'react';
import { MapPin, Phone, Clock, Mail, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useGetTownAddress, useGetTownPhoneNumber, useSubmitMessage } from '../hooks/useQueries';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { data: address } = useGetTownAddress();
  const { data: phone } = useGetTownPhoneNumber();
  const submitMessage = useSubmitMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    await submitMessage.mutateAsync({ name: name.trim(), email: email.trim(), message: message.trim() });
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-forest-700 py-14 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <div className="w-16 h-1 bg-amber-400 mx-auto mb-4 rounded-full" />
          <p className="text-slate-200 font-sans text-lg max-w-xl mx-auto">
            Get in touch with the Town of Jackman, Maine
          </p>
        </div>
      </section>

      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-bold text-forest-700 mb-2">Town Office</h2>
                <div className="w-10 h-1 bg-amber-400 mb-5 rounded-full" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="bg-forest-100 rounded-lg p-2.5 shrink-0">
                    <MapPin size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">Address</div>
                    <div className="text-sm text-foreground font-sans">
                      {address || '123 Main Street, Jackman, ME 04945'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="bg-forest-100 rounded-lg p-2.5 shrink-0">
                    <Phone size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">Phone</div>
                    <div className="text-sm text-foreground font-sans">
                      {phone || '(123) 456-7890'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="bg-forest-100 rounded-lg p-2.5 shrink-0">
                    <Clock size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">Office Hours</div>
                    <div className="text-sm text-foreground font-sans">
                      Monday – Friday: 8:00 AM – 4:00 PM<br />
                      Saturday & Sunday: Closed
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-card rounded-xl border border-border p-4 shadow-card">
                  <div className="bg-forest-100 rounded-lg p-2.5 shrink-0">
                    <Mail size={18} className="text-forest-600" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">Email</div>
                    <div className="text-sm text-foreground font-sans">townoffice@jackmanmaine.gov</div>
                  </div>
                </div>
              </div>

              <div className="bg-forest-50 border border-forest-200 rounded-xl p-5">
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  <strong className="text-forest-700">Emergency?</strong> For life-threatening emergencies,
                  call <strong>911</strong>. For non-emergency police matters, contact the Somerset County
                  Sheriff's Office.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-forest-700 mb-2">Send a Message</h2>
              <div className="w-10 h-1 bg-amber-400 mb-5 rounded-full" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle size={52} className="text-forest-500 mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-forest-700 mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground font-sans text-sm max-w-xs">
                    Thank you for reaching out. The Town Office will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-5 py-2 rounded border border-forest-300 text-forest-600 hover:bg-forest-50 font-sans text-sm transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Smith"
                      required
                      className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      required
                      className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground font-sans uppercase tracking-wide mb-1">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      className="w-full px-3 py-2.5 rounded border border-input bg-background text-foreground text-sm font-sans focus:outline-none focus:ring-2 focus:ring-forest-400 resize-none"
                    />
                  </div>

                  {submitMessage.isError && (
                    <div className="flex items-center gap-2 text-destructive text-sm font-sans">
                      <AlertCircle size={14} />
                      <span>Failed to send message. Please try again.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitMessage.isPending}
                    className="w-full inline-flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-sans font-semibold py-3 rounded transition-colors disabled:opacity-50"
                  >
                    {submitMessage.isPending ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
