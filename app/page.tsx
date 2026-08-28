'use client';

import { FormEvent, useState } from 'react';

const interests = ['Dryer vent cleaning', 'HVAC tune-up', 'Gutter cleaning', 'Pressure washing', 'Window cleaning', 'Pest control', 'Lawn & tree care', 'Home products'];
const communities = ['Pine Mill Ranch', 'Anserra', 'Churchill Farms', 'Tamarron', 'Cinco Ranch', 'Silver Ranch', 'Jordan Ranch', 'Cane Island', 'Grand Lakes', 'Cross Creek Ranch', 'Firethorne', 'Elyson'];

type FormStatus = { kind: 'idle' | 'loading' | 'success' | 'error'; message?: string };

export default function Home() {
  const [joinStatus, setJoinStatus] = useState<FormStatus>({ kind: 'idle' });
  const [campaignStatus, setCampaignStatus] = useState<FormStatus>({ kind: 'idle' });

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJoinStatus({ kind: 'loading' });
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, string | string[]>;
    payload.interests = data.getAll('interests').map(String);
    try {
      const response = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      setJoinStatus({ kind: 'success', message: 'You’re on the neighborhood list. We’ll match your interests to new campaigns.' });
      form.reset();
    } catch (error) {
      setJoinStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  }

  async function submitCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCampaignStatus({ kind: 'loading' });
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/campaigns', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'Please try again.');
      setCampaignStatus({ kind: 'success', message: 'Campaign idea received. We’ll review local demand and follow up by email.' });
      form.reset();
    } catch (error) {
      setCampaignStatus({ kind: 'error', message: error instanceof Error ? error.message : 'Please try again.' });
    }
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Let’s Buy It Together home"><span className="brand-mark">L</span><span>Let’s Buy It <strong>Together</strong></span></a>
        <nav aria-label="Main navigation"><a href="#campaigns">Campaigns</a><a href="#how">How it works</a><a href="#start">Start one</a><a href="#trust">Trust</a></nav>
        <a className="nav-cta" href="#join">Join the beta</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><i /> Now gathering Katy-area communities</span>
          <h1>Local services cost less when neighbors book <em>together.</em></h1>
          <p>Join a neighborhood campaign, help unlock a lower group price, and hear first when the products and services you care about reach your area.</p>
          <div className="hero-actions"><a className="button primary" href="#campaigns">Explore campaigns <span>→</span></a><a className="button secondary" href="#start">Start a campaign</a></div>
          <div className="proof-row"><span>✓ Free to express interest</span><span>✓ Neighborhood-level matching</span><span>✓ Addresses stay private</span></div>
        </div>

        <article className="hero-card" aria-label="Featured Dryer Vent Cleaning campaign">
          <div className="campaign-art" aria-hidden="true"><div className="vent"><b /><b /><b /><b /><b /></div><div className="air air-one">· · ·</div><div className="air air-two">· ·</div><span className="campaign-pill">FOUNDING CAMPAIGN</span></div>
          <div className="campaign-content">
            <div className="campaign-meta"><span>DRYER VENT CLEANING</span><span>● Katy area</span></div>
            <h2>A cleaner vent. A safer home. A better group price.</h2>
            <div className="price-line"><strong>$79</strong><span>proposed best group price<br /><s>$129 proposed starting price</s></span></div>
            <div className="progress-label"><span><b>14 neighbors</b> interested</span><span>20 targets the $99 tier</span></div>
            <div className="progress"><i /></div>
            <a className="button primary full" href="#join">Count me in <span>→</span></a>
            <small>Interest only—no payment. Final vendor, scope, and pricing will be shown before any commitment.</small>
          </div>
        </article>
      </section>

      <section className="communities-section" aria-labelledby="communities-title">
        <div className="communities-copy"><span className="eyebrow">COMMUNITIES WE’RE GATHERING</span><h2 id="communities-title">Your neighborhood belongs in the group.</h2><p>We’re building campaign interest across Katy and nearby West Houston communities. Select your neighborhood when you join—or type another community and help us add it.</p></div>
        <div className="community-list">{communities.map((community, index) => <span className={index < 7 ? 'featured' : ''} key={community}>⌂ {community}</span>)}</div>
      </section>

      <section className="campaign-section" id="campaigns">
        <div className="section-heading"><div><span className="eyebrow">FEATURED CAMPAIGN</span><h2>Dryer Vent Cleaning</h2></div><span className="status-badge">● Building interest</span></div>
        <div className="deal-grid">
          <div className="deal-main">
            <p className="lead">Routine dryer vent cleaning can help airflow and reduce lint buildup. By grouping nearby homes into one efficient route, a local professional may be able to offer every participating neighbor a better price.</p>
            <div className="included-grid">
              <div><span>01</span><h3>Vent inspection</h3><p>Airflow and visible connection check before cleaning.</p></div>
              <div><span>02</span><h3>Full vent cleaning</h3><p>Cleaning from the dryer connection through the exterior exit.</p></div>
              <div><span>03</span><h3>Before-and-after check</h3><p>Airflow confirmation and a concise service summary.</p></div>
            </div>
          </div>
          <aside className="tier-card">
            <h3>Proposed price ladder</h3>
            <p>Everyone receives the lowest tier reached.</p>
            <div className="tier"><span>10 homes</span><strong>$129</strong></div>
            <div className="tier active"><span>20 homes</span><strong>$99</strong></div>
            <div className="tier"><span>35 homes</span><strong>$79</strong></div>
            <small>Illustrative beta pricing, subject to vendor confirmation and property eligibility.</small>
          </aside>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="intro"><span className="eyebrow centered">HOW IT WORKS</span><h2>Neighborhood buying power, made simple.</h2><p>We organize local interest so qualified vendors can spend less time driving and offer more value to each household.</p></div>
        <div className="steps">
          <article><b>1</b><h3>Tell us what matters</h3><p>Share your area and the services or products you want to hear about.</p></article>
          <article><b>2</b><h3>Join a local campaign</h3><p>Express interest and invite neighbors—without exposing your address publicly.</p></article>
          <article><b>3</b><h3>Unlock the group price</h3><p>More eligible homes unlock better published tiers for the whole group.</p></article>
          <article><b>4</b><h3>Review before you commit</h3><p>See the provider, scope, dates, final price, and terms before paying.</p></article>
        </div>
      </section>

      <section className="signup-section" id="join">
        <div className="signup-copy"><span className="eyebrow light">JOIN THE BETA</span><h2>Be first to know when a deal fits your home.</h2><p>Your profile helps us notify you only when a relevant campaign is gathering neighbors near you.</p><ul><li>Location-based campaign alerts</li><li>Topics chosen by you</li><li>Email or text—your choice</li><li>Update preferences anytime</li></ul></div>
        <form className="form-card" onSubmit={submitSignup}>
          <div className="form-title"><span>1 minute</span><h3>Create your interest profile</h3></div>
          <div className="field-row"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div>
          <div className="field-row"><label>Email<input type="email" name="email" autoComplete="email" required /></label><label>Mobile <em>for text alerts</em><input type="tel" name="mobile" autoComplete="tel" /></label></div>
          <div className="field-row"><label>ZIP code<input name="zipCode" inputMode="numeric" pattern="[0-9]{5}" defaultValue="77494" required /></label><label>Neighborhood<input name="neighborhood" list="katy-communities" placeholder="Select or type your community" required /></label></div>
          <div className="field-row"><label>I am a<select name="residentType" required defaultValue=""><option value="" disabled>Select one</option><option>Homeowner</option><option>Renter</option><option>Property manager</option></select></label><label>Notify me by<select name="preferredChannel" required defaultValue="email"><option value="email">Email</option><option value="sms">Text message</option></select></label></div>
          <fieldset><legend>What should we notify you about? <span>Choose all that apply</span></legend><div className="interest-grid">{interests.map((interest, index) => <label className="check" key={interest}><input type="checkbox" name="interests" value={interest} defaultChecked={index === 0} /><span>{interest}</span></label>)}</div></fieldset>
          <label className="consent"><input type="checkbox" required /> <span>I agree to receive campaign notifications based on my preferences. Message frequency varies; text/data rates may apply. I can unsubscribe anytime.</span></label>
          <button className="button primary full" disabled={joinStatus.kind === 'loading'}>{joinStatus.kind === 'loading' ? 'Saving…' : 'Create my interest profile'} <span>→</span></button>
          {joinStatus.message && <p className={`form-message ${joinStatus.kind}`} role="status">{joinStatus.message}</p>}
          <small>We use your details to match you with nearby campaigns—not to publish your address or sell a neighborhood list.</small>
        </form>
      </section>

      <section className="start-section" id="start">
        <div className="intro"><span className="eyebrow centered">HAVE A BETTER IDEA?</span><h2>Start the next neighborhood campaign.</h2><p>Request a product or service. We’ll check nearby interest, clarify the scope, and look for qualified suppliers before anything goes live.</p></div>
        <form className="campaign-form" onSubmit={submitCampaign}>
          <div className="field-row three"><label>Campaign name<input name="title" placeholder="e.g. Fall gutter cleaning" required /></label><label>Type<select name="campaignType" required><option>Home service</option><option>Product group buy</option><option>Neighborhood topic</option></select></label><label>Category<input name="category" placeholder="e.g. Exterior care" required /></label></div>
          <div className="field-row three"><label>Neighborhood<input name="neighborhood" list="katy-communities" placeholder="Select or type your community" required /></label><label>ZIP code<input name="zipCode" inputMode="numeric" pattern="[0-9]{5}" defaultValue="77494" required /></label><label>Ideal timing<select name="desiredTimeframe" required><option>Within 30 days</option><option>1–3 months</option><option>This season</option><option>Just exploring</option></select></label></div>
          <div className="field-row three"><label>Neighbors to gather<input type="number" name="targetGroupSize" defaultValue="10" min="5" max="100" required /></label><label>Your name<input name="contactName" autoComplete="name" required /></label><label>Your email<input type="email" name="contactEmail" autoComplete="email" required /></label></div>
          <label>What should the campaign include?<textarea name="description" rows={4} placeholder="Describe the product or service, what a fair package should cover, and why neighbors may want it." required /></label>
          <div className="form-submit-row"><p>Submitting an idea does not obligate you or your neighbors to buy.</p><button className="button primary" disabled={campaignStatus.kind === 'loading'}>{campaignStatus.kind === 'loading' ? 'Submitting…' : 'Submit campaign idea'} <span>→</span></button></div>
          {campaignStatus.message && <p className={`form-message ${campaignStatus.kind}`} role="status">{campaignStatus.message}</p>}
        </form>
      </section>

      <section className="trust-section" id="trust">
        <div><span className="eyebrow light">BUILT FOR TRUST</span><h2>Clear offers. Private homes. No mystery pricing.</h2></div>
        <div className="trust-list"><article><span>⌂</span><div><h3>Your address stays private</h3><p>Campaign pages show only the neighborhood or service zone.</p></div></article><article><span>✓</span><div><h3>Terms before commitment</h3><p>Provider, scope, dates, price, and cancellation rules come first.</p></div></article><article><span>↘</span><div><h3>One price for the group</h3><p>Everyone receives the lowest published tier the campaign reaches.</p></div></article></div>
      </section>

      <section className="faq-section"><div className="intro"><span className="eyebrow centered">QUESTIONS, ANSWERED</span><h2>Good neighbors ask good questions.</h2></div><div className="faq-list"><details><summary>Does joining the beta cost anything?</summary><p>No. Creating an interest profile or proposing a campaign is free and does not create a purchase obligation.</p></details><details><summary>Am I committing to the Dryer Vent campaign?</summary><p>Not yet. This founding campaign is gathering demand. You will see the selected provider, exact scope, eligibility, final price tiers, and terms before any commitment.</p></details><details><summary>How will you use my information?</summary><p>We use your location and interests to match relevant campaigns, and your chosen channel to notify you. Exact addresses are never displayed publicly.</p></details><details><summary>Can products be proposed too?</summary><p>Yes. The beta accepts local service, product group-buy, and neighborhood-topic ideas for review.</p></details></div></section>

      <datalist id="katy-communities">{communities.map((community) => <option value={community} key={community} />)}</datalist>
      <footer><div className="brand footer-brand"><span className="brand-mark">L</span><span>Let’s Buy It <strong>Together</strong></span></div><p>Serving Pine Mill Ranch, Anserra, Churchill Farms, Tamarron, Cinco Ranch, Silver Ranch, Jordan Ranch, and surrounding Katy communities.</p><div className="footer-links"><a href="#campaigns">Campaigns</a><a href="#join">Notifications</a><a href="#start">Start a campaign</a></div><div className="legal"><span>© 2026 Idea 2 Project Consulting LLC. All rights reserved.</span><span>Owner and operator: Idea 2 Project Consulting LLC</span></div></footer>
    </main>
  );
}
