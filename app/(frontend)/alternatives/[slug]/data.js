export const FEATURE_SCHEMA = [
  {
    section: 'Service scope',
    rows: [
      { id: 'seo',        label: 'SEO (programmatic + content)' },
      { id: 'smm',        label: 'Social media management' },
      { id: 'ugc',        label: 'AI UGC video at scale' },
      { id: 'paid',       label: 'Paid social creative ops' },
      { id: 'compliance', label: 'Built-in compliance review' },
    ],
  },
  {
    section: 'Output cadence',
    rows: [
      { id: 'articles', label: 'Articles per month' },
      { id: 'videos',   label: 'UGC videos per month' },
      { id: 'channels', label: 'Social channels managed' },
      { id: 'reports',  label: 'Reporting cadence' },
    ],
  },
  {
    section: 'Engagement model',
    rows: [
      { id: 'lockin',    label: 'Contract length' },
      { id: 'pricing',   label: 'Starting price' },
      { id: 'focus',     label: 'Prop firm specialization' },
      { id: 'ownership', label: 'You own the content' },
      { id: 'strategy',  label: 'Founder-led strategy' },
    ],
  },
]

export const CONTEGO = {
  name: 'Contego',
  initials: 'C',
  values: {
    seo:        { v: 'yes',  text: 'Programmatic + editorial', flag: 'Best' },
    smm:        { v: 'yes',  text: 'Daily ops, all channels' },
    ugc:        { v: 'yes',  text: '120–500 videos / mo', flag: 'Only us' },
    paid:       { v: 'yes',  text: 'Included on Scale+' },
    compliance: { v: 'yes',  text: 'Per-firm policy review' },
    articles:   { v: 'val',  text: '8–unlimited' },
    videos:     { v: 'val',  text: '30–500+', flag: '10×' },
    channels:   { v: 'val',  text: '1–all major' },
    reports:    { v: 'val',  text: 'Weekly + monthly' },
    lockin:     { v: 'yes',  text: 'Month-to-month', flag: 'Flexible' },
    pricing:    { v: 'val',  text: '$3.5k / mo' },
    focus:      { v: 'yes',  text: 'Prop firms only' },
    ownership:  { v: 'yes',  text: 'You own everything' },
    strategy:   { v: 'yes',  text: 'Founder-led' },
  },
}

export const COMPETITORS = {
  'generic-agency': {
    slug: 'generic-agency',
    name: 'Generic Agency',
    short: 'Generic Agency',
    initials: 'GA',
    values: {
      seo:        { v: 'partial', text: 'Content only' },
      smm:        { v: 'yes',     text: 'Standard posting' },
      ugc:        { v: 'no',      text: 'Not offered' },
      paid:       { v: 'partial', text: 'Costs extra' },
      compliance: { v: 'no',      text: 'Client-side' },
      articles:   { v: 'val', text: '4 / mo' },
      videos:     { v: 'val', text: '0' },
      channels:   { v: 'val', text: '1–2' },
      reports:    { v: 'val', text: 'Monthly' },
      lockin:     { v: 'no',  text: '12-month minimum' },
      pricing:    { v: 'val', text: '$4–6k / mo' },
      focus:      { v: 'no',  text: 'Anything that pays' },
      ownership:  { v: 'partial', text: 'Depends on contract' },
      strategy:   { v: 'no',  text: 'Account manager only' },
    },
    differentiators: [
      {
        major: true,
        badge: 'Major differentiator',
        title: 'AI UGC at 10× the volume',
        desc: "Generic agencies don't run a UGC pipeline. We ship 120–500 native videos a month — they ship zero.",
        us: { label: 'Contego', value: '120–500 videos/mo' },
        them: { label: 'Generic Agency', value: 'Not offered' },
      },
      {
        major: true,
        badge: 'Major differentiator',
        title: 'Prop firm specialization',
        desc: 'We only work with prop firms. They work with anything that pays — meaning month one is your education tax.',
        us: { label: 'Contego', value: 'Prop firms only' },
        them: { label: 'Generic Agency', value: 'Industry-agnostic' },
      },
      {
        major: false,
        badge: 'Differentiator',
        title: 'Month-to-month, no lock-in',
        desc: 'You stay because the engine works. Not because legal says you have to. Most agencies require 12-month commitments.',
        us: { label: 'Contego', value: 'Month-to-month' },
        them: { label: 'Generic Agency', value: '12-month minimum' },
      },
    ],
    testimonial: {
      quote: "We tried two generic agencies before Contego. Neither understood our funnel, and we paid an education tax for nine months. Contego had us ranking inside 60 days.",
      who: 'Lukas R., Marketing Lead at a $3M/mo prop firm',
      initials: 'LR',
    },
    deepDive: {
      seo: {
        paras: [
          "SEO is where the long-term moat for prop firms gets built. Every commercial keyword you rank for is a competitor not getting that lead.",
          "Contego ships <strong>programmatic landing pages</strong> for every prop firm comparison, every payout proof query, and every 'best of' buyer-intent search — paired with editorial deep-dives that earn backlinks from finance media.",
          "Generic agencies ship content. That's enough to get a foot in the door, but not enough to outrank the affiliates already squatting on your category keywords.",
        ],
        inShort: "Contego compounds SEO with both programmatic and editorial. Generic agencies run editorial only — which is fine until an affiliate site with 1,000 pages eats your traffic.",
      },
      social: {
        paras: [
          "Daily posting alone doesn't move acquisition cost. Social only works when it's connected to a content engine and a community ops layer that actually responds to leads in DMs.",
          "We run <strong>30+ posts per channel per month</strong> across Twitter, IG, TikTok, and YouTube — with replies, DMs, and community moderation handled by the same team that ships the content.",
          "Generic agencies handle 1–2 channels, report monthly, and typically separate content creation from community management — meaning the team posting isn't the team replying.",
        ],
        inShort: "Contego treats social as a connected loop: content, community, and conversion. Generic agencies treat it as a posting calendar.",
      },
      ugc: {
        paras: [
          "AI UGC is where Contego pulls furthest ahead. We built around it from day one — and the volume difference shows up in your CAC inside 30 days.",
          "We ship <strong>120–500 native-feeling videos per month</strong> through a layered pipeline: AI avatars, voice cloning (with consent), human editorial review, and compliance check before publish.",
          "Generic agencies don't offer this. Which means you're stuck testing five hooks a month while we're testing fifty.",
        ],
        inShort: "Contego ships 5–10× the UGC volume of any non-AI-native competitor. That volume is what makes paid social actually cheap.",
      },
      reporting: {
        paras: [
          "If your agency reports monthly, you're learning about a problem 4 weeks after it started. That's 4 weeks of burned challenge fees and miscompounded paid social.",
          "Contego ships a <strong>weekly snapshot every Friday at 9 AM</strong>: keyword movement, UGC performance, paid CAC, content shipped, what we're testing next. Plus a monthly retro and a quarterly strategy review.",
          "Generic agencies report monthly — which is fine for steady-state, but blind to the week-to-week iteration that compounding actually requires.",
        ],
        inShort: "A weekly report is the difference between 'we're testing' and 'we're still arguing about what to test.' Contego ships weekly. Generic Agency doesn't.",
      },
    },
  },

  'in-house-team': {
    slug: 'in-house-team',
    name: 'In-house team',
    short: 'In-house',
    initials: 'IH',
    values: {
      seo:        { v: 'partial', text: 'If you hire SEO lead' },
      smm:        { v: 'yes',     text: 'Hire social manager' },
      ugc:        { v: 'no',      text: 'Need creator pipeline' },
      paid:       { v: 'partial', text: 'Hire media buyer' },
      compliance: { v: 'partial', text: 'Build process yourself' },
      articles:   { v: 'val', text: '2–6 / mo' },
      videos:     { v: 'val', text: '8–20 / mo' },
      channels:   { v: 'val', text: 'Whatever you staff' },
      reports:    { v: 'val', text: 'Inconsistent' },
      lockin:     { v: 'no',  text: 'Salary commitments' },
      pricing:    { v: 'val', text: '$25k+ / mo loaded' },
      focus:      { v: 'partial', text: 'Yours, 100%' },
      ownership:  { v: 'yes', text: 'Everything yours' },
      strategy:   { v: 'partial', text: 'Depends on hire' },
    },
    differentiators: [
      {
        major: true,
        badge: 'Major differentiator',
        title: '90% lower fully-loaded cost',
        desc: 'Three senior hires + tools + management overhead vs one team that ships day one. The math is not close.',
        us: { label: 'Contego', value: '$3.5–8.5k / mo' },
        them: { label: 'In-house team', value: '$25k+ / mo loaded' },
      },
      {
        major: true,
        badge: 'Major differentiator',
        title: 'AI UGC pipeline on day one',
        desc: 'Building a UGC operation in-house takes 6–12 months. We hand you the running pipeline at signing.',
        us: { label: 'Contego', value: 'Live in week 1' },
        them: { label: 'In-house team', value: '6–12 mo build' },
      },
      {
        major: false,
        badge: 'Differentiator',
        title: 'No hiring risk',
        desc: 'A wrong hire costs 12 months and a six-figure mistake. A wrong agency costs 30 days.',
        us: { label: 'Contego', value: '30-day risk' },
        them: { label: 'In-house team', value: '12 mo risk' },
      },
    ],
    testimonial: {
      quote: "We almost hired three full-time roles. Contego ships more output than that team would have in their first year — at a fifth of the cost.",
      who: 'Asha M., Co-founder of a Tier 2 prop firm',
      initials: 'AM',
    },
    deepDive: {
      seo: {
        paras: [
          "Building in-house SEO means hiring a specialist, onboarding them for 60–90 days, and hoping they know the prop firm funnel. Most don't on day one.",
          "Contego ships <strong>programmatic + editorial SEO</strong> from week one, informed by what's already worked across 14+ prop firms. We know the commercial keywords, the affiliate landscape, and the compliance edge cases.",
          "An in-house hire might match our editorial volume after 6 months. They won't match programmatic scale without a dedicated eng resource on top of them.",
        ],
        inShort: "Contego starts compounding in week one. An in-house SEO hire starts compounding in month three — if you hire well.",
      },
      social: {
        paras: [
          "Hiring a social manager gives you one channel, one voice, and one person's bandwidth. That's not a growth engine — it's a content calendar.",
          "We run <strong>full social ops across all major channels</strong>: daily posting, DM replies, community moderation, UGC amplification, and influencer coordination — all from one team.",
          "An in-house manager handles whatever you staff. Which in practice means 1–2 channels, inconsistent output, and no UGC layer unless you hire a creator manager on top.",
        ],
        inShort: "Contego is the whole social ops function. An in-house hire is one piece of it — and the rest of the pieces don't magically connect themselves.",
      },
      ugc: {
        paras: [
          "An in-house UGC pipeline requires a creator sourcing manager, a video editor, a compliance reviewer, and an AI tools operator — minimum. That's 3–4 hires just for this channel.",
          "Contego ships <strong>120–500 AI-assisted native videos per month</strong> from a pipeline we've already built and iterated over 14+ prop firm cycles. You get the running system on day one.",
          "In-house teams cap at 8–20 videos per month without the AI layer — which is enough for basic social proof, but not enough to run volume hook tests or saturate paid creative.",
        ],
        inShort: "You can build an in-house UGC pipeline. It takes 6–12 months and $15–20k/mo in headcount before you hit Contego's week-one output.",
      },
      reporting: {
        paras: [
          "In-house reporting is usually whoever has time on Friday, compiling whatever they can pull from five different dashboards. It's inconsistent — and without a second set of eyes, nothing gets challenged.",
          "Contego delivers a <strong>single weekly snapshot every Friday at 9 AM</strong> across every workstream: SEO rankings, UGC performance, social reach, paid CAC, content shipped. The same format, every week.",
          "In-house teams self-report. That means attribution gaps, missed anomalies, and no external benchmark for what 'good' actually looks like for a prop firm your size.",
        ],
        inShort: "Contego reports on outputs against external benchmarks. In-house teams report on activity. Only one of those tells you if you're winning.",
      },
    },
  },

  'freelancers': {
    slug: 'freelancers',
    name: 'Freelance roster',
    short: 'Freelancers',
    initials: 'FR',
    values: {
      seo:        { v: 'partial', text: 'One specialist' },
      smm:        { v: 'partial', text: 'Disconnected' },
      ugc:        { v: 'partial', text: 'Per-video pricing' },
      paid:       { v: 'partial', text: 'Separate freelancer' },
      compliance: { v: 'no',      text: 'Not their concern' },
      articles:   { v: 'val', text: '4–8 / mo' },
      videos:     { v: 'val', text: '20–40 / mo' },
      channels:   { v: 'val', text: '1–3' },
      reports:    { v: 'val', text: 'You compile it' },
      lockin:     { v: 'yes', text: 'Per project' },
      pricing:    { v: 'val', text: '$6–10k / mo stack' },
      focus:      { v: 'partial', text: 'Mixed' },
      ownership:  { v: 'yes', text: 'Yours' },
      strategy:   { v: 'no',  text: 'You connect dots' },
    },
    differentiators: [
      {
        major: true,
        badge: 'Major differentiator',
        title: 'One owner, not five vendors',
        desc: "Freelancers don't coordinate. We compound SEO, social, and UGC together so each channel feeds the next.",
        us: { label: 'Contego', value: 'Integrated team' },
        them: { label: 'Freelancers', value: 'Disconnected silos' },
      },
      {
        major: true,
        badge: 'Major differentiator',
        title: 'Compliance baked in',
        desc: 'Every asset runs through your firm policy before publish. Freelancers will not catch this — and it shows.',
        us: { label: 'Contego', value: 'Compliance review' },
        them: { label: 'Freelancers', value: "Not their concern" },
      },
      {
        major: false,
        badge: 'Differentiator',
        title: 'Single weekly report',
        desc: "You don't need to be your own project manager. We compile a single weekly report across every workstream.",
        us: { label: 'Contego', value: 'Weekly report' },
        them: { label: 'Freelancers', value: 'You compile it' },
      },
    ],
    testimonial: {
      quote: "We had five freelancers and no growth. Contego absorbed all of it and we finally have one weekly review instead of five Slack channels.",
      who: 'Marco D., Head of Growth, funded-trader platform',
      initials: 'MD',
    },
    deepDive: {
      seo: {
        paras: [
          "An SEO freelancer gives you one person's capacity. You get their current client list minus whatever time they have left — and no programmatic scale.",
          "Contego ships <strong>programmatic + editorial SEO</strong> as a single integrated function. Every article brief, every landing page, every schema fix is coordinated by one team with full context on your prop firm's keyword landscape.",
          "Freelancers produce 4–8 articles a month on a good month. There's no programmatic layer, no interlinking strategy, and no connection to what the social and UGC teams are amplifying.",
        ],
        inShort: "A freelancer gives you hours. Contego gives you a compounding SEO system. One scales, one doesn't.",
      },
      social: {
        paras: [
          "Social freelancers are posting for three other clients simultaneously. You get their template, their schedule, and whatever bandwidth they have between briefs.",
          "We run <strong>full-channel social ops</strong> with dedicated ops ownership: daily posts, community replies, DM filtering, and organic amplification of every UGC clip we ship.",
          "A freelancer roster means three people who have never spoken to each other running your SEO, your social, and your paid creative. Nobody connects the dots. You end up doing it on weekends.",
        ],
        inShort: "Contego is a single integrated loop. A freelancer roster is a coordination problem with a monthly invoice.",
      },
      ugc: {
        paras: [
          "Freelance UGC is per-video pricing — which caps your volume before it caps your budget. At $150–400 per video, 500 videos a month isn't a freelancer solution.",
          "Contego's AI UGC pipeline ships <strong>120–500 videos per month</strong> on a flat retainer. The cost-per-video drops as the pipeline warms. We've already figured out the creator voice, the hook formats, and the compliance review flow.",
          "Freelance UGC at 20–40 videos per month is enough for basic social proof. It's not enough to run volume hook tests that actually reduce your paid social CAC.",
        ],
        inShort: "Freelance UGC is priced per video, so volume is capped by budget. Contego's pipeline is flat-rate — you get 5–10× the output.",
      },
      reporting: {
        paras: [
          "When you manage five freelancers, you are the project manager. You compile the reports, you spot the gaps, you decide what to prioritize next. That's a part-time job on top of running your firm.",
          "Contego sends a <strong>single weekly report every Friday</strong> that covers every workstream: SEO, social, UGC, paid creative. One review call. One set of priorities. One person accountable.",
          "Freelancers each report in their own format, on their own schedule, against their own KPIs. Compiling that into a coherent picture of your marketing performance is work nobody signed up to do.",
        ],
        inShort: "One weekly report vs five Slack channels. The difference is your time every single week.",
      },
    },
  },

  'propmarket': {
    slug: 'propmarket',
    name: 'PropMarket Co.',
    short: 'PropMarket',
    initials: 'PM',
    values: {
      seo:        { v: 'yes',     text: 'Content focus' },
      smm:        { v: 'yes',     text: '2 channels' },
      ugc:        { v: 'partial', text: 'Real creators only' },
      paid:       { v: 'yes',     text: 'Included' },
      compliance: { v: 'partial', text: 'Generic templates' },
      articles:   { v: 'val', text: '6 / mo' },
      videos:     { v: 'val', text: '12 / mo' },
      channels:   { v: 'val', text: '2' },
      reports:    { v: 'val', text: 'Bi-weekly' },
      lockin:     { v: 'no',  text: '6-month minimum' },
      pricing:    { v: 'val', text: '$5.5k / mo' },
      focus:      { v: 'partial', text: 'Prop + crypto' },
      ownership:  { v: 'yes', text: 'Yes' },
      strategy:   { v: 'no',  text: 'Account manager' },
    },
    differentiators: [
      {
        major: true,
        badge: 'Major differentiator',
        title: '10× the AI UGC volume',
        desc: 'They ship 12 traditional UGC videos a month. We ship 120–500 AI-generated, native-feeling videos. Volume is the moat.',
        us: { label: 'Contego', value: '120–500 / mo' },
        them: { label: 'PropMarket', value: '12 / mo' },
      },
      {
        major: true,
        badge: 'Major differentiator',
        title: 'Month-to-month, not 6 months',
        desc: "We're confident enough in compounding results that we don't need a 6-month commitment to start.",
        us: { label: 'Contego', value: 'Month-to-month' },
        them: { label: 'PropMarket', value: '6-month minimum' },
      },
      {
        major: false,
        badge: 'Differentiator',
        title: 'Founder-led strategy',
        desc: 'You work with the people who build the playbook. Not a junior account manager passing notes.',
        us: { label: 'Contego', value: 'Founder-led' },
        them: { label: 'PropMarket', value: 'Account manager' },
      },
    ],
    testimonial: {
      quote: "We compared head-to-head for a quarter. Contego outproduced them on UGC by 10× and out-ranked them on every commercial keyword by week 16.",
      who: 'Priya K., CMO at a regulated prop firm',
      initials: 'PK',
    },
    deepDive: {
      seo: {
        paras: [
          "PropMarket runs solid editorial content — well-written, properly structured, decent keyword targeting. At 6 articles per month you get a content program, not a compounding moat.",
          "Contego ships <strong>programmatic + editorial SEO</strong>: hundreds of buyer-intent landing pages combined with editorial that earns links. The two channels compound each other — programmatic pages rank fast, editorial pages earn authority.",
          "PropMarket's content focus means they produce good individual articles. They don't produce a page for every 'prop firm vs broker' search variation, every payout proof query, or every city-level challenge keyword.",
        ],
        inShort: "PropMarket publishes articles. Contego builds a programmatic moat. One is content marketing, the other is a category takeover.",
      },
      social: {
        paras: [
          "PropMarket manages 2 channels. Contego manages all major channels. That's not a small difference — TikTok and YouTube Shorts are where prop firm traders live, and neither is in PropMarket's standard scope.",
          "We run <strong>full social ops across Twitter, IG, TikTok, and YouTube</strong> with community ops baked in — DMs, replies, and moderation handled by the same team posting the content.",
          "Managing 2 channels and managing all major channels is a fundamentally different content pipeline. PropMarket is doing half the surface area with a bi-weekly report loop. We're doing daily iteration.",
        ],
        inShort: "PropMarket covers 2 channels. Contego covers all of them — including TikTok and YouTube where the actual trader acquisition happens.",
      },
      ugc: {
        paras: [
          "PropMarket ships 12 traditional UGC videos per month sourced from real creators. Quality is real, but volume is limited by how many creators they can find and brief in a given month.",
          "Contego ships <strong>120–500 AI-assisted native videos per month</strong> from a pipeline built specifically for the prop firm category. Hook formats, voice cloning, compliance review — all built in.",
          "Twelve videos per month is enough for basic social proof. It's not enough to saturate TikTok's algorithm, find the winning hooks across 50 variations, or drive the CAC reduction that volume UGC actually produces.",
        ],
        inShort: "PropMarket caps at 12 videos/mo by design. Contego ships up to 500 — the difference is the size of your paid social edge.",
      },
      reporting: {
        paras: [
          "PropMarket reports bi-weekly. That's better than monthly, but it still means you're two weeks behind on any emerging problem or testing signal.",
          "Contego sends a <strong>full weekly snapshot every Friday at 9 AM</strong> — keyword movement, UGC performance, channel reach, paid CAC, content shipped. One call to review everything.",
          "Bi-weekly reporting means your agency's week one data is already 14 days stale before you see it. When you're running hook tests and keyword experiments, 14 days is a lot of burned budget.",
        ],
        inShort: "Weekly vs bi-weekly sounds minor. In practice it's the difference between a 1-week and 3-week feedback loop on everything you're testing.",
      },
    },
  },
}
