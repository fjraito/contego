export type Row = { label: string; a: string | boolean; b: string | boolean };
export type DeepSection = { title: string; a: string; b: string };
export type QA = { q: string; a: string };

/* One schema for every comparison. Pages only differ by this content. */
export type CompareEntry = {
  slug: string;
  kind: "alternative" | "tool";
  eyebrow: string; // breadcrumb tail, e.g. "ADMIRAL MEDIA"
  aName: string; // Contego (alternatives) or first tool
  bName: string; // competitor / second tool
  title: string;
  intro: string;
  quickTake: { summary: string; bestA: string; bestB: string };
  table: Row[];
  deepDive: DeepSection[];
  aPros: string[];
  aCons: string[];
  bPros: string[];
  bCons: string[];
  whenBetter: string[]; // when the competitor / B is the better fit
  faqs: QA[];
};

/* ------------------------------------------------------------------ */
/* ALTERNATIVES — Contego vs other AI UGC agencies                    */
/* ------------------------------------------------------------------ */
export const ALTERNATIVES: Record<string, CompareEntry> = {
  "admiral-media": {
    slug: "admiral-media",
    kind: "alternative",
    eyebrow: "ADMIRAL MEDIA",
    aName: "Contego",
    bName: "Admiral Media",
    title: "Contego vs Admiral Media",
    intro:
      "Both Contego and Admiral Media are AI UGC agencies. You brief them, they produce the video. The difference is focus and how you buy. Admiral Media is a broad performance shop with AI UGC as one service and a premium retainer. Contego does one thing, hyper-realistic UGC for paid social, month to month, starting with a free sample.",
    quickTake: {
      summary:
        "If you want a specialist team obsessed with UGC realism and flexible month-to-month terms, Contego fits. If you want a large performance agency to run AI UGC alongside broader media buying under one roof, Admiral Media fits.",
      bestA: "Brands that want specialist UGC creative, flexible terms, and a free sample first.",
      bestB: "Larger advertisers wanting AI UGC bundled with full-service performance marketing.",
    },
    table: [
      { label: "Type", a: "AI UGC agency", b: "Performance agency (AI UGC service)" },
      { label: "Focus", a: "Hyper-realistic UGC for paid social", b: "Broad performance creative" },
      { label: "Free sample before you commit", a: true, b: false },
      { label: "Billing", a: "Month to month", b: "Premium retainer" },
      { label: "Conversion scripting included", a: true, b: true },
      { label: "Realism reviewed frame by frame", a: true, b: "Not stated" },
      { label: "Weekly hook testing", a: true, b: "Varies" },
      { label: "Entry commitment", a: "Low", b: "High" },
    ],
    deepDive: [
      {
        title: "Focus and specialisation",
        a: "Contego does one thing: hyper-realistic UGC video for paid social. Every process, from casting the look to reviewing realism, is built around that single outcome.",
        b: "Admiral Media is a full-service performance agency. AI UGC is one offering alongside media buying and broader creative, which suits brands consolidating vendors.",
      },
      {
        title: "How you buy",
        a: "Month to month, cancel anytime, with a free sample before you commit. Entry commitment is low so you can judge the work first.",
        b: "A premium retainer model with higher entry commitment, typical of a full-service agency running larger accounts.",
      },
      {
        title: "Creative and scripting",
        a: "Conversion copywriters lead every script before a frame is made. Hooks and angles are the priority, not an afterthought.",
        b: "Includes concept, production, and post-production as a managed service. Strong for brands that want end-to-end handling.",
      },
      {
        title: "Testing and iteration",
        a: "We ship more hook variants every week so you find winners faster, with realism reviewed on every clip.",
        b: "Testing cadence varies by plan and account. Best confirmed directly for your engagement.",
      },
    ],
    aPros: [
      "Specialist focus on UGC realism",
      "Free sample, no card required",
      "Month-to-month, low commitment",
      "Weekly hook testing built in",
    ],
    aCons: [
      "Not a full-service media buying agency",
      "Newer, smaller team than large shops",
    ],
    bPros: [
      "Full-service performance under one roof",
      "Established managed-service track record",
      "Good for large, multi-market accounts",
    ],
    bCons: [
      "Higher entry commitment",
      "AI UGC is one service, not the whole focus",
    ],
    whenBetter: [
      "You want AI UGC bundled with media buying and broader creative",
      "You are a larger advertiser comfortable with a premium retainer",
      "You want one agency to consolidate multiple marketing functions",
    ],
    faqs: [
      {
        q: "Are Contego and Admiral Media the same kind of company?",
        a: "Both are agencies that produce AI UGC for you. Contego is a specialist focused only on UGC for paid social. Admiral Media is a broader performance agency where AI UGC is one of several services.",
      },
      {
        q: "Which is cheaper?",
        a: "It depends on scope. Contego is month to month with a low entry point and a free sample. Admiral Media uses a premium retainer. Compare on total scope, not just headline price.",
      },
      {
        q: "Can I try before committing?",
        a: "With Contego, yes. Send your product and get one hyper-realistic UGC video free before choosing a plan.",
      },
    ],
  },

  unrealugc: {
    slug: "unrealugc",
    kind: "alternative",
    eyebrow: "UNREALUGC",
    aName: "Contego",
    bName: "UnrealUGC",
    title: "Contego vs UnrealUGC",
    intro:
      "Contego and UnrealUGC are both done-for-you AI UGC agencies covering strategy, scripting, production, and delivery. They occupy the same lane, so the decision comes down to focus, terms, and how each proves the work before you commit.",
    quickTake: {
      summary:
        "Two close alternatives. Contego leans on realism review, weekly testing, and a free sample. Evaluate both on the quality of the sample they send and how they handle iteration.",
      bestA: "Brands that want a free sample, weekly testing, and month-to-month terms.",
      bestB: "Brands already aligned with UnrealUGC's process and pricing.",
    },
    table: [
      { label: "Type", a: "AI UGC agency", b: "AI UGC agency" },
      { label: "Done for you", a: true, b: true },
      { label: "Free sample before you commit", a: true, b: "Check" },
      { label: "Conversion scripting", a: true, b: true },
      { label: "Realism reviewed frame by frame", a: true, b: "Not stated" },
      { label: "Weekly hook testing", a: true, b: "Varies" },
      { label: "Billing", a: "Month to month", b: "Check" },
    ],
    deepDive: [
      {
        title: "Positioning",
        a: "Contego is built around one promise: UGC that does not look like AI. Realism is the standard every clip is held to.",
        b: "UnrealUGC offers full done-for-you UGC ad production, strategy through delivery, in the same category.",
      },
      {
        title: "Proof before you buy",
        a: "You get one hyper-realistic sample free, so you judge realism and writing before paying anything.",
        b: "Confirm what a trial or sample looks like directly, as offers change.",
      },
      {
        title: "Testing and iteration",
        a: "Weekly hook variants and continuous iteration are part of how we work, not an upsell.",
        b: "Testing cadence and iteration depend on the engagement; confirm for your account.",
      },
    ],
    aPros: [
      "Free sample before you commit",
      "Realism reviewed on every clip",
      "Weekly hook testing",
      "Month-to-month terms",
    ],
    aCons: ["Newer, specialist team", "Focused on paid social, not every format"],
    bPros: ["Established done-for-you offering", "Full strategy-to-delivery service"],
    bCons: ["Terms and sample policy vary", "Compare realism on the actual output"],
    whenBetter: [
      "You already have a relationship or quote you like from UnrealUGC",
      "Their process fits your workflow better after seeing both samples",
    ],
    faqs: [
      {
        q: "How do I choose between two similar agencies?",
        a: "Get a sample from each and compare on the same brief. Realism, hook quality, and turnaround tell you more than any pitch.",
      },
      {
        q: "Does Contego offer a free sample?",
        a: "Yes. One hyper-realistic UGC video, free, no card required, before you pick a plan.",
      },
    ],
  },

  "traditional-ugc": {
    slug: "traditional-ugc",
    kind: "alternative",
    eyebrow: "TRADITIONAL UGC",
    aName: "Contego",
    bName: "Traditional UGC agencies",
    title: "Contego vs traditional UGC agencies",
    intro:
      "Traditional UGC agencies hire real creators for every ad. It works, but it is slow and expensive: casting, scheduling, shipping product, and reshoots. Contego produces hyper-realistic AI UGC that keeps the creator-style trust while removing the logistics.",
    quickTake: {
      summary:
        "Traditional UGC gives you real people but at real-world speed and cost. Contego gives you the same creator-style trust with faster turnaround, more testing, and lower cost, as long as the realism holds up, which is exactly what we obsess over.",
      bestA: "Brands that want volume, speed, and testing without creator logistics.",
      bestB: "Brands that specifically need a named real creator or influencer's face and following.",
    },
    table: [
      { label: "Talent", a: "Hyper-realistic AI", b: "Real creators" },
      { label: "Scheduling and shipping", a: "None", b: "Required" },
      { label: "Reshoots", a: "Regenerate, no reshoot", b: "Re-book and reshoot" },
      { label: "Turnaround", a: "Days", b: "Weeks" },
      { label: "Variants per week", a: "Many", b: "Few" },
      { label: "Relative cost", a: "Lower", b: "Higher" },
      { label: "Named creator following", a: false, b: true },
    ],
    deepDive: [
      {
        title: "Speed and logistics",
        a: "No casting, scheduling, shipping, or reshoots. You brief once and get finished video back in days.",
        b: "Every ad means finding a creator, shipping product, and waiting on delivery, then reshooting if it misses.",
      },
      {
        title: "Volume and testing",
        a: "Because there are no shoots, we test far more hook variants every week and iterate on what wins.",
        b: "Volume is capped by how many creators you can book and how fast they deliver.",
      },
      {
        title: "Trust and realism",
        a: "The whole point is that it does not read as AI. If a viewer can tell, we cut it. You keep creator-style trust.",
        b: "Real creators carry built-in authenticity, and a named creator brings their own audience.",
      },
      {
        title: "Cost",
        a: "Lower cost per video and per variant, which frees budget for testing.",
        b: "Higher per-video cost, plus product and shipping, especially for polished creators.",
      },
    ],
    aPros: [
      "No creator logistics",
      "Days, not weeks",
      "More variants, more testing",
      "Lower cost per video",
    ],
    aCons: [
      "No named creator's personal following",
      "Realism must be held to a high bar (our core focus)",
    ],
    bPros: [
      "Real people and genuine authenticity",
      "Access to a named creator's audience",
      "No questions about AI disclosure",
    ],
    bCons: [
      "Slow: scheduling, shipping, reshoots",
      "Expensive per video",
      "Hard to test at volume",
    ],
    whenBetter: [
      "You need a specific named creator or influencer's face and following",
      "Your campaign depends on a real person's personal endorsement",
      "Disclosure rules in your market require human-made content",
    ],
    faqs: [
      {
        q: "Is AI UGC as effective as real creator UGC?",
        a: "When the realism holds up, it carries the same creator-style trust that makes UGC convert, with far more speed and testing. That realism is exactly what we obsess over.",
      },
      {
        q: "Do I lose the authenticity of a real creator?",
        a: "You lose a named creator's personal following, which matters for influencer plays. For most direct-response UGC, what matters is that the content feels real, and that is the standard we hold.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* TOOLS — model vs model (editorial)                                 */
/* ------------------------------------------------------------------ */
export const TOOLS: Record<string, CompareEntry> = {
  "seedance-vs-kling": {
    slug: "seedance-vs-kling",
    kind: "tool",
    eyebrow: "SEEDANCE VS KLING",
    aName: "Seedance",
    bName: "Kling",
    title: "Seedance vs Kling",
    intro:
      "Two of the strongest AI video models in 2026. Seedance (ByteDance) is known for long-form image-to-video, while Kling (Kuaishou) leans into cinematic motion and multi-shot sequences. Here is how they line up at a high level.",
    quickTake: {
      summary:
        "Pick Seedance for long, image-driven shots. Pick Kling for cinematic, multi-shot storytelling with dialogue. Both move fast, so treat any spec as a snapshot.",
      bestA: "Long-form, image-to-video shots.",
      bestB: "Cinematic, multi-shot sequences with dialogue.",
    },
    table: [
      { label: "Maker", a: "ByteDance", b: "Kuaishou" },
      { label: "Best at", a: "Long-form image-to-video", b: "Cinematic motion, multi-shot" },
      { label: "Native audio", a: true, b: true },
      { label: "Lip-sync / dialogue", a: "Limited", b: "Multi-language (Omni)" },
      { label: "Access", a: "API / platforms", b: "Kling app + API" },
      { label: "Pricing", a: "Check vendor", b: "Check vendor" },
    ],
    deepDive: [
      {
        title: "Motion and realism",
        a: "Seedance is strong on longer, image-driven shots that stay coherent over time.",
        b: "Kling is known for cinematic lighting and complex motion across multi-shot sequences.",
      },
      {
        title: "Audio and dialogue",
        a: "Generates native audio, with more limited lip-sync.",
        b: "Kling's Omni line leads on dialogue with multi-language lip-sync across cuts.",
      },
    ],
    aPros: ["Strong long-form image-to-video", "Native audio"],
    aCons: ["More limited dialogue / lip-sync"],
    bPros: ["Cinematic multi-shot", "Strong dialogue and lip-sync"],
    bCons: ["Access via Kling's own stack"],
    whenBetter: [
      "You need multi-shot, dialogue-heavy sequences",
      "Cinematic motion matters more than long single shots",
    ],
    faqs: [
      {
        q: "Which is better for ads?",
        a: "Either can produce ad-quality clips. The harder part is direction, scripting, and realism review, which is where an agency like Contego comes in.",
      },
    ],
  },

  "veo-vs-sora": {
    slug: "veo-vs-sora",
    kind: "tool",
    eyebrow: "VEO VS SORA",
    aName: "Veo",
    bName: "Sora",
    title: "Veo vs Sora",
    intro:
      "Google Veo and OpenAI Sora are the two most talked-about video models. Veo is known for prompt adherence and native audio; Sora for photoreal clips from rich prompts. Availability and pricing shift often, so this is high-level.",
    quickTake: {
      summary:
        "Veo is the safer long-running choice for reliability and audio. Sora can produce standout clips, but confirm current availability before building on it.",
      bestA: "Reliability, prompt adherence, and native audio.",
      bestB: "Peak photorealism from rich prompts.",
    },
    table: [
      { label: "Maker", a: "Google", b: "OpenAI" },
      { label: "Best at", a: "Prompt adherence, native audio", b: "Photoreal clips" },
      { label: "Native audio", a: true, b: "Varies" },
      { label: "Output", a: "Up to 4K, portrait + landscape", b: "High fidelity" },
      { label: "Access", a: "Google platforms + API", b: "Changing in 2026" },
      { label: "Pricing", a: "Check vendor", b: "Check vendor" },
    ],
    deepDive: [
      {
        title: "Reliability",
        a: "Veo runs on Google's infrastructure with stable access and strong prompt adherence.",
        b: "Sora's availability is changing through 2026, so confirm before relying on it.",
      },
      {
        title: "Output quality",
        a: "Excellent adherence and native audio, up to 4K.",
        b: "Can hit peak photorealism with rich prompts.",
      },
    ],
    aPros: ["Reliable access", "Native audio", "Strong prompt adherence"],
    aCons: ["Not always the single most photoreal"],
    bPros: ["Can produce standout photoreal clips"],
    bCons: ["Availability changing in 2026"],
    whenBetter: [
      "You want the highest-fidelity single clips and can work around availability",
    ],
    faqs: [
      {
        q: "Do I need to pick one?",
        a: "For a one-off, no. For ongoing ads, the model matters less than direction and realism review, which is what Contego handles for you.",
      },
    ],
  },
};

export const alternativesList = () => Object.values(ALTERNATIVES);
export const toolsList = () => Object.values(TOOLS);
