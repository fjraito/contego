export type Author = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  tint: string;
  verified?: boolean;
  bio: string;
  links?: { label: string; href: string }[];
  org?: string;
  location?: string;
  tags?: string[];
  background?: string;
  expertise?: string[];
  experience?: { role: string; org: string; period: string }[];
  education?: { degree: string; school: string }[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  read: string;
  tint: string;
  author: string; // author slug
};

export const AUTHORS: Record<string, Author> = {
  "maya-chen": {
    slug: "maya-chen",
    name: "Maya Chen",
    role: "Creative Lead",
    org: "Contego",
    location: "Remote",
    initials: "MC",
    tint: "150,80%",
    verified: true,
    bio: "Maya is Creative Lead at Contego. She turns offers into hyper-realistic UGC that does not read as AI, and writes about hooks, angles, and what converts on paid social.",
    background:
      "Maya has spent years making short-form video for DTC and fintech brands. Her priority is substance over polish: creative that earns trust in the first second and holds up frame by frame, not ads that look clever and get scrolled.",
    tags: ["UGC creative", "Hook writing", "Paid social"],
    expertise: [
      "AI UGC creative direction",
      "Hook writing and scripting",
      "Short-form video for paid social",
      "Creative testing and iteration",
    ],
    experience: [
      { role: "Creative Lead", org: "Contego", period: "2026 – Present" },
      { role: "Senior Creative", org: "DTC & fintech brands", period: "2021 – 2026" },
    ],
    education: [{ degree: "BA, Film & Media", school: "Placeholder University" }],
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "X / Twitter", href: "#" },
    ],
  },
  "daniel-roth": {
    slug: "daniel-roth",
    name: "Daniel Roth",
    role: "Head of Content",
    org: "Contego",
    location: "Remote",
    initials: "DR",
    tint: "168,70%",
    verified: true,
    bio: "Daniel is Head of Content at Contego. He edits the blog and writes on creative strategy and messaging for growth teams.",
    background:
      "Daniel has led content and messaging for performance-driven brands. He keeps the blog honest and specific, favouring verifiable detail over vague superlatives.",
    tags: ["Editing", "Creative strategy", "Messaging"],
    expertise: [
      "Editorial and content strategy",
      "Messaging and positioning",
      "Creative strategy for paid social",
    ],
    experience: [
      { role: "Head of Content", org: "Contego", period: "2026 – Present" },
    ],
    education: [{ degree: "BA, Communications", school: "Placeholder University" }],
    links: [{ label: "LinkedIn", href: "#" }],
  },
  "priya-nair": {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Strategy",
    org: "Contego",
    location: "Remote",
    initials: "PN",
    tint: "140,75%",
    verified: true,
    bio: "Priya leads strategy at Contego. She focuses on testing, iteration, and full-funnel creative for paid social.",
    background:
      "Priya builds the testing loops behind winning creative: which angles to try, what to measure, and how fast to learn from what runs.",
    tags: ["Testing", "Iteration", "Full-funnel"],
    expertise: [
      "Creative testing frameworks",
      "Full-funnel strategy",
      "Performance analysis",
    ],
    experience: [
      { role: "Strategy", org: "Contego", period: "2026 – Present" },
    ],
    education: [{ degree: "BSc, Marketing Analytics", school: "Placeholder University" }],
    links: [{ label: "LinkedIn", href: "#" }],
  },
};

export const POSTS: Post[] = [
  {
    slug: "why-ai-ugc-stopped-looking-like-ai",
    title: "Why AI UGC stopped looking like AI",
    excerpt:
      "The tells that used to give AI video away, and how the best creative avoids every one of them.",
    category: "Creative",
    date: "Jul 2026",
    read: "6 min read",
    tint: "150,80%",
    author: "maya-chen",
  },
  {
    slug: "first-three-seconds-hooks",
    title: "The first three seconds: hooks that hold",
    excerpt:
      "Most paid social spend is lost in the opening second. Here is how we write for it.",
    category: "Strategy",
    date: "Jun 2026",
    read: "5 min read",
    tint: "168,70%",
    author: "maya-chen",
  },
  {
    slug: "test-more-creative",
    title: "Test more creative without more budget",
    excerpt:
      "Volume and iteration beat one polished hero ad. A workflow for shipping variants weekly.",
    category: "Testing",
    date: "Jun 2026",
    read: "7 min read",
    tint: "140,75%",
    author: "priya-nair",
  },
  {
    slug: "static-vs-ugc",
    title: "Static vs UGC: what converts on paid social",
    excerpt:
      "Where each format wins, and why creator-style video carries most of the funnel.",
    category: "Strategy",
    date: "May 2026",
    read: "5 min read",
    tint: "158,72%",
    author: "daniel-roth",
  },
  {
    slug: "creative-iteration-framework",
    title: "A simple framework for creative iteration",
    excerpt:
      "Read the data, keep the winners, kill the rest. The loop we run every week.",
    category: "Playbooks",
    date: "May 2026",
    read: "4 min read",
    tint: "146,78%",
    author: "priya-nair",
  },
  {
    slug: "one-video-every-placement",
    title: "One video, cut for every placement",
    excerpt:
      "9:16, 1:1, and 16:9 from a single concept, and why delivery to spec matters.",
    category: "Delivery",
    date: "Apr 2026",
    read: "4 min read",
    tint: "162,68%",
    author: "maya-chen",
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const postsByAuthor = (authorSlug: string) =>
  POSTS.filter((p) => p.author === authorSlug);
