import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Home,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X
} from 'lucide-react';
import { FiberionMark } from '../../components/Brand';
import { Tabs } from '../../components/ui/Tabs';
import { QuoteForm } from '../../forms/QuoteForm';
import { AnimatedLetter, MotionFade, WordsPullUp, WordsPullUpMultiStyle } from '../../animations/Words';

const heroImage =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2400&q=80';
const residentialImage =
  'https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1400&q=80';
const commercialImage =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80';

function SeoSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FIBERION Surface Care',
    description:
      'Premium residential and commercial carpet cleaning serving Downtown Orlando and surrounding areas.',
    areaServed: 'Downtown Orlando within 50 miles',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Orlando',
      addressRegion: 'FL',
      addressCountry: 'US'
    },
    serviceType: ['Orlando carpet cleaning', 'Commercial carpet cleaning Orlando']
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
}

function SectionHeading({
  eyebrow,
  segments,
  supporting
}: {
  eyebrow: string;
  segments: Array<{ text: string; className?: string }>;
  supporting?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-lime sm:text-xs">{eyebrow}</p>
      <WordsPullUpMultiStyle
        segments={segments}
        className="text-3xl font-normal leading-[0.95] text-[#EAF4FF] sm:text-4xl md:text-5xl lg:text-6xl"
      />
      {supporting ? (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          {supporting}
        </p>
      ) : null}
    </div>
  );
}

function Hero() {
  const [open, setOpen] = useState(false);
  const navItems = [
    ['Services', '#services'],
    ['Pricing', '#pricing'],
    ['Why Fiberion', '#why'],
    ['Reviews', '#testimonials'],
    ['Get a Quote', '#quote']
  ];

  return (
    <header className="h-screen bg-black p-3 sm:p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="" loading="eager" />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.65] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-black/25 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(0,119,200,0.34),transparent_34%),radial-gradient(circle_at_12%_72%,rgba(102,179,46,0.22),transparent_28%)]" />
        <span className="fiberion-float absolute right-[12%] top-[18%] h-24 w-24 rounded-full border border-sky/25 bg-sky/10" />
        <nav className="absolute left-1/2 top-0 z-20 w-[calc(100%-1.5rem)] -translate-x-1/2 rounded-b-2xl bg-black/90 px-4 py-3 backdrop-blur md:w-auto md:rounded-b-3xl md:px-8">
          <div className="flex items-center justify-between gap-4 md:justify-center">
            <FiberionMark compact />
            <div className="hidden items-center gap-6 md:flex lg:gap-10">
              {navItems.map(([item, href]) => (
                <a key={item} href={href} className="text-xs text-white/75 transition-colors hover:text-sky lg:text-sm">
                  {item}
                </a>
              ))}
            </div>
            <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {open ? (
            <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 md:hidden">
              {navItems.map(([item, href]) => (
                <a key={item} href={href} className="min-h-11 rounded-full px-3 py-3 text-sm text-white/80 hover:bg-white/10" onClick={() => setOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          ) : null}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-7 md:px-8 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-y-6 md:gap-x-8">
            <div className="col-span-12 min-w-0 lg:col-span-8">
              <motion.div
                className="mb-4 w-fit rounded-[1.35rem] bg-black/25 p-2 backdrop-blur-sm sm:mb-5"
                initial={{ y: 18, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.85 }}
              >
                <FiberionMark hero />
              </motion.div>
              <h1>
                <WordsPullUp text="FIBERION" className="text-[18vw] font-extrabold leading-[0.85] tracking-[-0.06em] text-white sm:text-[17vw] md:text-[15vw] lg:text-[11vw] xl:text-[10vw]" />
              </h1>
            </div>
            <div className="col-span-12 flex max-w-xl flex-col items-start gap-5 justify-self-start pb-1 lg:col-span-4 lg:justify-self-end lg:pb-4">
              <motion.p className="text-xs leading-[1.35] text-[#DCEEFF] sm:text-sm md:text-base" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.9 }}>
                Professional carpet cleaning for homes, offices, and commercial spaces across Downtown Orlando and surrounding areas within a 50-mile radius.
              </motion.p>
              <motion.p className="text-xs font-bold uppercase tracking-[0.18em] text-lime sm:text-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.9 }}>
                Fiberion: We compete on price, never on quality or time.
              </motion.p>
              <motion.div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.9 }}>
                <a className="fiberion-button justify-center" href="#quote">Residential Quote <ArrowRight className="h-4 w-4" /></a>
                <a className="fiberion-button-secondary justify-center" href="#quote">Commercial Quote <BriefcaseBusiness className="h-4 w-4" /></a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function About() {
  const paragraph =
    'Fiberion Surface Care combines professional equipment, precise scheduling, and competitive pricing to deliver cleaner carpets, fresher spaces, and a service experience that feels reliable from quote to completion.';
  const targetRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.8', 'end 0.2'] });

  return (
    <section id="about" className="bg-[linear-gradient(180deg,#000000_0%,#071323_48%,#000000_100%)] px-4 py-20 sm:px-6 md:py-32">
      <div className="fiberion-panel fiberion-glow-card mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 md:px-12 md:py-24">
        <p className="mb-8 text-[10px] uppercase tracking-[0.32em] text-lime sm:text-xs">Surface Care</p>
        <WordsPullUpMultiStyle
          segments={[
            { text: 'Premium carpet cleaning built for homes, offices, and businesses that care about first impressions' },
            { text: 'without cutting corners.', className: 'font-serif italic text-sky' }
          ]}
          className="mx-auto max-w-4xl text-3xl leading-[0.95] text-white sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
        />
        <p ref={targetRef} className="mx-auto mt-12 max-w-2xl text-sm leading-relaxed text-[#DCEEFF] sm:text-base md:mt-16">
          {paragraph.split('').map((character, index) => (
            <AnimatedLetter key={`${character}-${index}`} character={character} index={index} totalChars={paragraph.length} scrollYProgress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}

function Services() {
  const cards = [
    {
      title: 'Residential Carpet Cleaning',
      description: 'Deep carpet care for homes, apartments, condos, and private residences.',
      image: residentialImage,
      icon: <Home className="h-6 w-6" />,
      features: ['Room-based pricing', 'Pet odor treatment', 'Stain removal', 'Flexible scheduling', 'Payment plan option available']
    },
    {
      title: 'Commercial Carpet Cleaning',
      description: 'Professional carpet maintenance for offices, hotels, retail spaces, and commercial properties.',
      image: commercialImage,
      icon: <Building2 className="h-6 w-6" />,
      features: ['Square footage pricing', 'Recurring maintenance', 'Fast turnaround', 'After-hours scheduling', 'Net-14 invoice support']
    }
  ];

  return (
    <section id="services" className="bg-[linear-gradient(180deg,#000000_0%,#020509_100%)] px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Services" segments={[{ text: 'Residential precision.' }, { text: 'Commercial consistency.', className: 'text-gray-500' }]} supporting="Two service paths, one standard: clean carpets, clear scheduling, and premium results across Greater Orlando." />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {cards.map((card, index) => (
            <MotionFade key={card.title} delay={index * 0.12}>
              <article className="fiberion-panel fiberion-glow-card group relative min-h-[520px] p-5 sm:p-7">
                <img src={card.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-navy/70 to-electric/20" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white text-electric">{card.icon}</div>
                    <h3 className="max-w-sm text-3xl font-bold leading-none text-white sm:text-4xl">{card.title}</h3>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-[#DCEEFF] sm:text-base">{card.description}</p>
                    <ul className="mt-8 grid gap-3">
                      {card.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-white/80"><Check className="h-4 w-4 shrink-0 text-lime" />{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <a href="#quote" className="fiberion-button-secondary mt-10 w-fit">Get Quote <ArrowRight className="h-4 w-4" /></a>
                </div>
              </article>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingWhyArea() {
  return (
    <>
      <section id="pricing" className="relative overflow-hidden bg-[linear-gradient(180deg,#020509_0%,#0B1D34_52%,#000000_100%)] px-4 py-20 sm:px-6 md:py-28">
        <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading eyebrow="Pricing" segments={[{ text: 'Competitive placeholders,' }, { text: 'premium standard.', className: 'text-gray-500' }]} />
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {[
              ['Residential', ['Single room: Starting at $___', 'Multi-room: Starting at $___', 'Full-home cleaning: Starting at $___']],
              ['Commercial', ['Small office: Starting at $___', 'Medium facility: Starting at $___', 'Large commercial property: Custom quote']]
            ].map(([title, prices]) => (
              <div key={title as string} className="fiberion-panel fiberion-glow-card p-6 sm:p-8">
                <h3 className="text-3xl font-bold text-white">{title as string}</h3>
                <div className="mt-8 grid gap-3">
                  {(prices as string[]).map((price) => <div key={price} className="rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-4 text-sm text-white/80">{price}</div>)}
                </div>
              </div>
            ))}
          </div>
          <div className="fiberion-panel mt-6 flex flex-col items-start justify-between gap-5 p-6 md:flex-row md:items-center">
            <p className="max-w-3xl text-sm leading-relaxed text-gray-400">Final pricing depends on square footage, carpet condition, stains, odor treatment, and service requirements.</p>
            <a href="#quote" className="fiberion-button shrink-0">Request Custom Quote <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
      <section id="why" className="bg-[linear-gradient(180deg,#020509_0%,#0B1D34_100%)] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Why Fiberion" segments={[{ text: 'Clean spaces are the first impression.' }, { text: 'We treat them that way.', className: 'text-sky' }]} />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {['Prices that compete.', 'Quality that leads.', 'Service that delivers.'].map((title, index) => (
              <MotionFade key={title} delay={index * 0.1}>
                <article className="fiberion-panel fiberion-glow-card p-6">
                  <Sparkles className="mb-8 h-8 w-8 text-lime" />
                  <h3 className="text-2xl font-bold text-white">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">Premium Quality. On Time Every Time. Cleaner Spaces. Better Business.</p>
                </article>
              </MotionFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TestimonialsAreaQuoteFooter() {
  const [tab, setTab] = useState('residential');

  return (
    <>
      <section id="testimonials" className="bg-black px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Reviews" segments={[{ text: 'Proof in the pile,' }, { text: 'shine in the room.', className: 'text-sky' }]} supporting="Google Reviews integration, before/after transformations, and commercial testimonials are ready to connect." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {['Downtown office carpets looked new by Monday morning.', 'Fast quote, fair price, and our home felt fresh again.', 'Reliable recurring maintenance for our lobby and suites.'].map((quote) => (
              <article key={quote} className="fiberion-panel fiberion-glow-card p-6">
                <div className="mb-5 flex gap-1 text-lime">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <p className="text-sm leading-relaxed text-gray-300">{quote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="service-area" className="bg-[linear-gradient(180deg,#000000_0%,#071323_48%,#000000_100%)] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="fiberion-panel fiberion-glow-card p-6 sm:p-10">
            <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-lime sm:text-xs">Service Area</p>
            <WordsPullUpMultiStyle align="left" segments={[{ text: 'Based in Downtown Orlando.' }, { text: 'Serving homes and businesses within a 50-mile radius.', className: 'text-sky' }]} className="text-3xl font-bold leading-none text-white sm:text-5xl lg:text-6xl" />
          </div>
          <div className="fiberion-panel fiberion-glow-card p-6 sm:p-8">
            <label className="text-sm font-medium text-white" htmlFor="service-area-input">Check your city or ZIP</label>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input id="service-area-input" className="fiberion-input" placeholder="Enter your ZIP code or city" />
              <button className="fiberion-button min-h-12 justify-center" type="button">Check Service Area</button>
            </div>
          </div>
        </div>
      </section>
      <section id="quote" className="bg-[linear-gradient(180deg,#000000_0%,#020509_100%)] px-4 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Get a Quote" segments={[{ text: 'Tell us what needs cleaning.' }, { text: 'We will build the right quote.', className: 'text-gray-500' }]} />
          <div className="fiberion-panel mt-14 p-4 sm:p-6 md:p-8">
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
                { value: 'residential', label: 'Residential Quote Form', content: <QuoteForm type="residential" /> },
                { value: 'commercial', label: 'Commercial Quote Form', content: <QuoteForm type="commercial" /> }
              ]}
            />
          </div>
        </div>
      </section>
      <footer id="contact" className="border-t border-white/10 bg-black px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <FiberionMark />
          <p className="max-w-xl text-sm text-gray-400">Orlando carpet cleaning, Downtown Orlando carpet cleaning, residential carpet cleaners Orlando, commercial carpet cleaning Orlando, and carpet cleaning near me.</p>
          <div className="flex items-center gap-2 text-sm text-sky"><ShieldCheck className="h-4 w-4" />50-mile service radius</div>
        </div>
      </footer>
    </>
  );
}

export default function PublicWebsite() {
  return (
    <main className="overflow-x-hidden bg-black">
      <SeoSchema />
      <Hero />
      <About />
      <Services />
      <PricingWhyArea />
      <TestimonialsAreaQuoteFooter />
    </main>
  );
}
