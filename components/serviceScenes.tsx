"use client";
// The five services as the real surfaces an owner already knows: Google's results page, a sponsored Instagram post,
// a browser window, an Instagram profile, and the ad formats themselves. Drawn to look like the platforms, sample content, labelled.
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./DashboardScene";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const up = (reduce: boolean | null, delay = 0) => (reduce ? {} : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.5, delay, ease } });
const GLogo = () => <span className="g-logo" aria-hidden="true"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span>;
const Ring = ({ size = 30 }: { size?: number }) => <span className="ig-ring" style={{ width: size, height: size }}><i /></span>;

export function SerpScene() {
  const reduce = useReducedMotion();
  return (
    <div className="sc g-serp">
      <div className="mono lbl">what your customer sees on Google · sample</div>
      <div className="g-top"><GLogo /><div className="g-bar"><span>best dermatologist in gurugram</span><span className="g-bar-ic"><Icon name="mic" /><Icon name="lens" /><Icon name="search" /></span></div></div>
      <div className="g-tabs"><span className="on">All</span><span>Images</span><span>Maps</span><span>News</span><span>Videos</span></div>
      <motion.div className="g-ai" {...up(reduce, 0.2)}>
        <div className="g-ai-h"><i className="g-spark" />AI Overview</div>
        <p>Three clinics near you are well reviewed for acne and pigmentation:</p>
        <ol><li className="you">Dr Mehra Skin Clinic, Sector 29</li><li>Lumen Dermatology, Golf Course Road</li><li>Glow Skin Studio, DLF Phase 4</li></ol>
        <div className="g-ai-more">Show more<Icon name="chevron" /></div>
      </motion.div>
      <motion.div className="g-res you" {...up(reduce, 0.5)}>
        <div className="g-site"><i className="g-fav">D</i><div><b>Dr Mehra Skin Clinic</b><span>https://yourclinic.in › sector-29</span></div><Icon name="dots" /></div>
        <div className="g-title">Dr Mehra Skin Clinic, Sector 29 · Acne, pigmentation, laser</div>
        <div className="g-snip">Consultations Monday to Saturday, 10 to 7. First visit includes a skin analysis. Book on WhatsApp or online.</div>
        <div className="g-meta"><span className="g-stars">★★★★★</span> Rating: 4.8 · 212 reviews · <span className="you">you</span></div>
      </motion.div>
      <div className="g-res dim"><i className="w40" /><i className="w80" /><i className="w60" /></div>
    </div>
  );
}

export function AdScene() {
  const reduce = useReducedMotion();
  return (
    <div className="sc g-ads">
      <div className="mono lbl">your ads, on Google and Instagram · sample</div>
      <motion.div className="g-res gad" {...up(reduce, 0.1)}>
        <div className="g-site"><b className="g-spons">Sponsored</b></div>
        <div className="g-site"><i className="g-fav">D</i><div><b>Dr Mehra Skin Clinic</b><span>https://yourclinic.in</span></div></div>
        <div className="g-title">Acne Treatment in Gurugram | Book a Consultation Today</div>
        <div className="g-snip">Saturday slots open this month. Dermatologist-led, Sector 29. First visit includes a skin analysis.</div>
        <div className="g-links"><span>Book online</span><span>Treatments</span><span>Reviews</span></div>
      </motion.div>
      <motion.div className="ig-post" {...up(reduce, 0.35)}>
        <div className="ig-head"><Ring /><div><b>drmehraskin</b><span>Sponsored</span></div><Icon name="dots" /></div>
        <div className="ig-img"><span>first consultation on us, this month</span></div>
        <div className="ig-cta">Book now<Icon name="chevron" /></div>
        <div className="ig-actions"><Icon name="heart" /><Icon name="chat" /><Icon name="send" /><Icon name="bookmark" className="right" /></div>
        <div className="ig-likes">48 likes</div>
        <div className="ig-cap"><b>drmehraskin</b> Clear-skin plans for acne and pigmentation. Sector 29, Gurugram. <span className="ig-tag">#gurugram #dermatologist</span></div>
      </motion.div>
      <div className="sc-foot mono">₹412 per enquiry · 9 enquiries this week</div>
    </div>
  );
}

export function SiteScene() {
  const reduce = useReducedMotion();
  return (
    <div className="sc g-site-sc">
      <div className="mono lbl">your website, designed and built by us · sample</div>
      <motion.div className="browser" {...up(reduce, 0.15)}>
        <div className="b-chrome">
          <div className="b-lights"><i /><i /><i /></div>
          <div className="b-tab"><i className="g-fav sm">D</i>Dr Mehra Skin Clinic</div>
        </div>
        <div className="b-url"><Icon name="lock" /><span>yourclinic.in</span><Icon name="reload" /><span className="mono spd">1.2 s on a phone</span></div>
        <div className="b-body">
          <div className="b-nav"><b><i className="b-mark" />Dr Mehra Skin Clinic</b><span>Treatments</span><span>Doctors</span><span>Reviews</span><span className="b-pill">Book</span></div>
          <div className="b-hero"><p className="b-h">Acne, pigmentation and laser, in Sector 29.</p><p>Consultations Monday to Saturday, 10 to 7. First visit includes a skin analysis.</p><span className="b-btn wa"><Icon name="phone" />Enquire on WhatsApp</span></div>
          <div className="b-cards"><i /><i /><i /></div>
        </div>
      </motion.div>
    </div>
  );
}

export function SocialGrid() {
  const reduce = useReducedMotion();
  const tiles = ["", "reel", "", "new", "", "reel", "", "", ""];
  return (
    <div className="sc ig-prof-sc">
      <div className="mono lbl">your Instagram, run by us · sample</div>
      <div className="ig-prof"><Ring size={56} /><div className="ig-stats"><div><b>46</b><span>posts</span></div><div><b>1,240</b><span>followers</span></div><div><b>312</b><span>following</span></div></div></div>
      <div className="ig-bio"><b>Dr Mehra Skin Clinic</b><span>Dermatologist · Sector 29, Gurugram</span><span>Acne, pigmentation, laser. Book on WhatsApp.</span></div>
      <div className="ig-btns"><span className="ig-follow">Follow</span><span>Message</span></div>
      <div className="ig-tabs"><span className="on"><Icon name="grid" /></span><span><Icon name="play" /></span><span><Icon name="user" /></span></div>
      <div className="ig-grid">{tiles.map((t, k) => <motion.div key={k} className={`ig-tile ${t}`} {...up(reduce, 0.06 * k)}>{t === "reel" && <Icon name="play" />}{t === "new" && <span>the new laser room, Monday</span>}</motion.div>)}</div>
      <div className="sc-foot mono">this week: 2 reels, 3 posts, 5 enquiries in DMs</div>
    </div>
  );
}

export function CreativePack() {
  const reduce = useReducedMotion();
  return (
    <div className="sc pack">
      <div className="mono lbl">ads, videos and creatives, made in-house · sample</div>
      <div className="pack-row">
        <motion.div className="cr feed" {...up(reduce, 0.1)}>
          <div className="cr-head"><Ring size={18} /><span>drmehraskin</span><em className="cr-tag">A</em></div>
          <div className="cr-art"><b>Diwali skin glow</b><span>3 sessions · this month</span></div>
          <div className="cr-cta">Book now<Icon name="chevron" /></div>
        </motion.div>
        <motion.div className="cr story" {...up(reduce, 0.25)}>
          <div className="cr-bars"><i className="on" /><i /><i /></div>
          <div className="cr-head light"><Ring size={18} /><span>drmehraskin</span><em className="cr-tag win">B · won</em></div>
          <div className="cr-art story"><b>inside the laser room</b><span>15 s reel</span></div>
          <div className="cr-swipe"><Icon name="chevron" />Book now</div>
        </motion.div>
        <motion.div className="cr ban" {...up(reduce, 0.4)}>
          <span className="g-adbadge">Ad</span>
          <div><b>Dr Mehra Skin Clinic</b><span>Book a consult, Sector 29</span></div>
          <span className="cr-btn">Open</span>
        </motion.div>
      </div>
      <div className="sc-foot mono">B beat A: ₹200 less per enquiry</div>
    </div>
  );
}
