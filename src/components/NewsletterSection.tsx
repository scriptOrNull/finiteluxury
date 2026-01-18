import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Thank you for subscribing!');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="bg-foreground text-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-background/60 mb-3">
            Stay Updated
          </p>
          <h2 className="text-2xl md:text-4xl font-extralight tracking-[0.1em] uppercase mb-4">
            Join Our Community
          </h2>
          <p className="text-sm md:text-base text-background/70 mb-8">
            Be the first to know about new arrivals, exclusive offers, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-background/40"
              required
            />
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-background text-foreground hover:bg-background/90 tracking-wider uppercase"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          
          <p className="text-xs text-background/50 mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;