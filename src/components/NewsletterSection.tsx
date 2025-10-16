export default function NewsletterSection() {
  return (
    <section className="py-20 px-8 bg-gc-bg-secondary" id="newsletter">
      <div className="max-w-3xl mx-auto text-center">
        {/* Icon/Logo */}
        <div className="mb-6">
          <span className="text-4xl">🧭</span>
        </div>
        
        {/* Heading */}
        <h2 className="font-heading text-3xl text-gc-text-heading mb-4">
          Stay Oriented
        </h2>
        
        {/* Description */}
        <p className="font-body text-base text-gc-text-body leading-relaxed mb-8 max-w-xl mx-auto">
          Receive The Grey Compass Weekly Signal — a calm, factual digest of global change.
        </p>
        
        {/* Substack Embed Placeholder */}
        <div className="max-w-md mx-auto">
          {/* TODO: Replace with actual Substack embed */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-gc-bg-primary border border-gc-border text-gc-text-body font-mono text-sm focus:outline-none focus:border-gc-accent-blue transition-colors"
            />
            <button className="px-6 py-3 bg-gc-accent-blue text-gc-bg-primary font-heading text-sm hover:bg-gc-text-heading transition-colors">
              Subscribe
            </button>
          </div>
          
          <p className="font-mono text-xs text-gc-text-subtitle mt-4 italic">
            No spam. Unsubscribe anytime.
          </p>
        </div>
        
        {/* Optional: Sample Issue Link */}
        {/* <a 
          href="#" 
          className="inline-block mt-6 font-mono text-xs text-gc-accent-blue hover:text-gc-text-heading transition-colors"
        >
          See sample issue →
        </a> */}
      </div>
    </section>
  );
}