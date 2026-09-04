// Curriculum data: phases and tasks. Digital Marketing Mastery Line.
// Each task = one 60 minute session. Order matters: the scheduler assigns
// pending tasks sequentially to upcoming active days.
// Every resource is free. Paid tiers get added after the free ride completes.

const PHASES = [
  {
    id: "p1",
    name: "Foundations Lock In",
    term: "short",
    goal: "How search and digital marketing actually work, the core channels, and the vocabulary to sell with confidence. Pick the practice business used in every capstone."
  },
  {
    id: "p2",
    name: "SEO Core and Technical",
    term: "short",
    goal: "Keyword research, on-page, technical SEO, Search Console, schema. The full organic stack, certified free by Semrush and Ahrefs."
  },
  {
    id: "p3",
    name: "Local SEO and Google Business Profile",
    term: "short",
    goal: "GBP, reviews, citations, service area pages, local audits. The discipline that wins Australian SMB clients."
  },
  {
    id: "p4",
    name: "AI Search and GEO",
    term: "short",
    goal: "Generative engine optimization: how AI answers pick sources, and how a business shows up inside ChatGPT, Gemini and AI Overviews."
  },
  {
    id: "p5",
    name: "Capstone: Real SMB Campaign",
    term: "short",
    goal: "Full cycle on a real practice business: audit, local fixes, page optimization, submission, before and after report. Short term goal complete."
  },
  {
    id: "p6",
    name: "Analytics and Measurement",
    term: "long",
    goal: "GA4 certification, UTMs, Looker Studio dashboards, client reporting. Prove value in numbers, not adjectives."
  },
  {
    id: "p7",
    name: "Paid Media",
    term: "long",
    goal: "Google Ads Search and Measurement certifications, Performance Max, Meta Blueprint, Microsoft Ads. The free training behind every paid channel."
  },
  {
    id: "p8",
    name: "Content, Email and CRO",
    term: "long",
    goal: "HubSpot content and email certifications, copywriting that converts, landing pages, conversion optimization."
  },
  {
    id: "p9",
    name: "AI Marketing Ops and Final Capstone",
    term: "long",
    goal: "OpenAI Academy, Anthropic prompting, automation workflows, AI content guardrails, then a full funnel client campaign. Long term goal complete."
  }
];

const TASKS = [
  // ---------- PHASE 1: Foundations Lock In ----------
  { id: "t01", phase: "p1", type: "docs", cost: "free",
    title: "How Google Search actually works",
    sub: "Official walkthrough: crawling, indexing, ranking. Deliverable: explain the three stages in your own words in the notes, and why a site can be crawled but never ranked.",
    links: [{ label: "How Search Works", url: "https://www.google.com/search/howsearchworks/" }] },

  { id: "t02", phase: "p1", type: "course", cost: "free",
    title: "HubSpot Digital Marketing cert, part 1",
    sub: "Start the certification. First third: digital strategy, buyer personas, funnels. Take the lessons at 1x, no skipping. Note the persona framework once.",
    links: [{ label: "Start the course", url: "https://academy.hubspot.com/courses/digital-marketing" }] },

  { id: "t03", phase: "p1", type: "course", cost: "free",
    title: "HubSpot Digital Marketing cert, part 2",
    sub: "Middle third: the channel tour, SEO, paid, social, email essentials. Goal: for each channel write one line in notes: when an SMB should use it.",
    links: [{ label: "Continue the course", url: "https://academy.hubspot.com/courses/digital-marketing" }] },

  { id: "t04", phase: "p1", type: "course", cost: "free",
    title: "HubSpot Digital Marketing cert, part 3 + exam",
    sub: "Finish remaining lessons and pass the exam. Free certificate. Log the completion date in notes: this is sellable proof item number 1.",
    links: [{ label: "Finish and certify", url: "https://academy.hubspot.com/courses/digital-marketing" }] },

  { id: "t05", phase: "p1", type: "article", cost: "free",
    title: "Think with Google: read the room",
    sub: "Browse consumer insights and future of search pieces. Find two trends relevant to Australian small business buyers. Note them with the source links.",
    links: [{ label: "Think with Google", url: "https://www.thinkwithgoogle.com/consumer-insights/" }] },

  { id: "t06", phase: "p1", type: "course", cost: "free",
    title: "Digital Garage: Fundamentals skim",
    sub: "Google's classic fundamentals course, now on Skillshop. Do NOT do all 40 hours: complete only the web presence and strategy modules, bookmark the rest as reference.",
    links: [{ label: "Digital Garage catalog", url: "https://skillshop.exceedlms.com/student/catalog/list?category_ids=7879-google-digital-garage" }] },

  { id: "t07", phase: "p1", type: "project", cost: "free",
    title: "Checkpoint: pick your practice business",
    sub: "Choose one real business to ride the whole line: your own site, a friend's, or a volunteer client. Capture the baseline now: screenshots, current rankings feel, GBP state. This is capstone fuel.",
    links: [
      { label: "Google Search Console", url: "https://search.google.com/search-console" },
      { label: "Google Business Profile", url: "https://business.google.com/" }
    ] },

  // ---------- PHASE 2: SEO Core and Technical ----------
  { id: "t08", phase: "p2", type: "course", cost: "free",
    title: "Ahrefs SEO course, session 1",
    sub: "First half of the free beginner course: how SEO works, keyword research basics, the idea of search intent. Code nothing, absorb everything.",
    links: [{ label: "Ahrefs SEO course", url: "https://ahrefs.com/academy/seo-training-course" }] },

  { id: "t09", phase: "p2", type: "course", cost: "free",
    title: "Ahrefs SEO course, session 2",
    sub: "Finish the course: on-page SEO, link building fundamentals. Deliverable: write a 5 step on-page checklist in notes in your own words.",
    links: [
      { label: "Ahrefs SEO course", url: "https://ahrefs.com/academy/seo-training-course" },
      { label: "Full SEO text guide", url: "https://ahrefs.com/seo" }
    ] },

  { id: "t10", phase: "p2", type: "course", cost: "free",
    title: "Semrush cert: SEO Principles",
    sub: "From the Semrush Academy SEO catalog, take SEO Principles: An Essential Guide for Beginners. Pass the exam, grab the free certificate. Proof item 2.",
    links: [{ label: "Semrush SEO catalog", url: "https://www.semrush.com/academy/courses/seo/" }] },

  { id: "t11", phase: "p2", type: "course", cost: "free",
    title: "Semrush cert: Keyword Research",
    sub: "Complete the keyword research course. Then list 10 real keywords for your practice business: mix of service, suburb, and question intent.",
    links: [{ label: "Semrush SEO catalog", url: "https://www.semrush.com/academy/courses/seo/" }] },

  { id: "t12", phase: "p2", type: "docs", cost: "free",
    title: "Google SEO Starter Guide",
    sub: "The canonical doc from Google itself. Read fully, then audit the practice site against it. List every violation you find in notes.",
    links: [{ label: "SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }] },

  { id: "t13", phase: "p2", type: "course", cost: "free",
    title: "Ahrefs technical SEO course, part 1",
    sub: "First half: crawling, indexing, sitemaps, robots.txt. The stuff that silently kills SMB sites. Check the practice site for each issue as you learn it.",
    links: [{ label: "Ahrefs technical SEO course", url: "https://ahrefs.com/academy/technical-seo-course" }] },

  { id: "t14", phase: "p2", type: "course", cost: "free",
    title: "Ahrefs technical SEO course, part 2",
    sub: "Finish: site structure, internal linking, HTTPS, status codes. Deliverable: a crawl-issue punch list for the practice site, ranked by impact.",
    links: [{ label: "Ahrefs technical SEO course", url: "https://ahrefs.com/academy/technical-seo-course" }] },

  { id: "t15", phase: "p2", type: "course", cost: "free",
    title: "Semrush cert: Site Audit",
    sub: "Complete the site audit course. You already audited by hand in t12 and t14: now learn the tool-driven method agencies actually sell.",
    links: [{ label: "Semrush SEO catalog", url: "https://www.semrush.com/academy/courses/seo/" }] },

  { id: "t16", phase: "p2", type: "course", cost: "free",
    title: "Semrush cert: Backlink Management",
    sub: "Complete the backlink management course. Then check the practice site's backlinks with Ahrefs Webmaster Tools (free for site owners).",
    links: [
      { label: "Semrush SEO catalog", url: "https://www.semrush.com/academy/courses/seo/" },
      { label: "Ahrefs Webmaster Tools", url: "https://ahrefs.com/webmaster-tools" }
    ] },

  { id: "t17", phase: "p2", type: "docs", cost: "free",
    title: "Search Console: the operator manual",
    sub: "Google's own Search Console docs: performance, pages, sitemaps, URL inspection. This tool becomes your client reporting backbone. Learn it cold.",
    links: [
      { label: "Search Central docs", url: "https://developers.google.com/search/docs" },
      { label: "Open Search Console", url: "https://search.google.com/search-console" }
    ] },

  { id: "t18", phase: "p2", type: "project", cost: "free",
    title: "GSC hands-on: verify, submit, inspect",
    sub: "Verify the practice site in Search Console (domain property via DNS if possible), submit the sitemap, inspect the homepage and 3 key pages. Log every warning found.",
    links: [{ label: "Open Search Console", url: "https://search.google.com/search-console" }] },

  { id: "t19", phase: "p2", type: "docs", cost: "free",
    title: "Schema markup: LocalBusiness JSON-LD",
    sub: "Read the LocalBusiness schema type, then generate valid JSON-LD for the practice business with the Merkle generator. Paste it in notes for deployment in the capstone.",
    links: [
      { label: "schema.org LocalBusiness", url: "https://schema.org/LocalBusiness" },
      { label: "Schema markup generator", url: "https://technicalseo.com/tools/schema-markup-generator/" }
    ] },

  { id: "t20", phase: "p2", type: "article", cost: "free",
    title: "Core Web Vitals: run the numbers",
    sub: "Read the vitals explainer, then run PageSpeed Insights on the practice site mobile. Record LCP, INP, CLS and the top 3 failing audits in notes.",
    links: [
      { label: "Web vitals explained", url: "https://web.dev/articles/vitals" },
      { label: "PageSpeed Insights", url: "https://pagespeed.web.dev" }
    ] },

  // ---------- PHASE 3: Local SEO and GBP ----------
  { id: "t21", phase: "p3", type: "docs", cost: "free",
    title: "Google: local ranking factors",
    sub: "Straight from Google: relevance, distance, prominence. Deliverable: one sentence each in notes on how you will move all three for the practice business.",
    links: [{ label: "Improve local ranking", url: "https://support.google.com/business/answer/7091" }] },

  { id: "t22", phase: "p3", type: "article", cost: "free",
    title: "Whitespark GBP guide, part 1",
    sub: "First half of the canonical GBP optimization guide: claiming, verification, core fields, categories. The single best free resource on this topic.",
    links: [{ label: "Ultimate GBP guide", url: "https://whitespark.ca/google-business-profile-guide/" }] },

  { id: "t23", phase: "p3", type: "article", cost: "free",
    title: "Whitespark GBP guide, part 2",
    sub: "Finish: services, products, photos, posts, Q&A, messaging. Deliverable: a GBP completeness checklist you reuse on every client.",
    links: [{ label: "Ultimate GBP guide", url: "https://whitespark.ca/google-business-profile-guide/" }] },

  { id: "t24", phase: "p3", type: "project", cost: "free",
    title: "GBP hands-on: full optimization",
    sub: "Apply it all to the practice business: every field filled, primary category chosen deliberately, 10+ photos, description with services and area. Before and after screenshots in notes.",
    links: [{ label: "Manage your profile", url: "https://business.google.com/" }] },

  { id: "t25", phase: "p3", type: "article", cost: "free",
    title: "Reviews: the growth engine",
    sub: "Whitespark guides on review acquisition and responses. Design a review system for the practice business: ask, remind, respond to all, negative included.",
    links: [{ label: "Whitespark guides library", url: "https://whitespark.ca/guides/" }] },

  { id: "t26", phase: "p3", type: "article", cost: "free",
    title: "Citations and NAP consistency",
    sub: "Citation building basics from the Whitespark library. List the practice business on the top free Australian directories. NAP identical everywhere: note each listing URL.",
    links: [{ label: "Whitespark guides library", url: "https://whitespark.ca/guides/" }] },

  { id: "t27", phase: "p3", type: "article", cost: "free",
    title: "Service area pages that rank",
    sub: "Sterling Sky's guide to unique, helpful service area pages: what separates a ranking page from doorway spam. Sketch one page outline for the practice business.",
    links: [{ label: "Service area pages guide", url: "https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/" }] },

  { id: "t28", phase: "p3", type: "project", cost: "free",
    title: "Local rank reality check",
    sub: "Search the practice business's money query, service plus suburb, from an incognito window. Log where it appears: map pack, organic, nowhere. That gap is your capstone scope.",
    links: [
      { label: "Sterling Sky local audit checklist", url: "https://www.sterlingsky.ca/blog/" },
      { label: "r/localseo strategy thread", url: "https://www.reddit.com/r/localseo/comments/1rlp570/heres_my_local_seo_strategy_i_currently_use_to/" }
    ] },

  { id: "t29", phase: "p3", type: "project", cost: "free",
    title: "Full local audit, written",
    sub: "Run Sterling Sky's 10 step local audit checklist end to end on the practice business. Output: a written fix list, ranked by client-visible impact. This document is a template you will reuse for money.",
    links: [{ label: "Sterling Sky blog", url: "https://www.sterlingsky.ca/blog/" }] },

  // ---------- PHASE 4: AI Search and GEO ----------
  { id: "t30", phase: "p4", type: "course", cost: "free",
    title: "Coursera GEO course, session 1",
    sub: "Audit track is free: no payment needed, just no certificate. First half: how generative engines retrieve and cite sources, GEO vs SEO.",
    links: [{ label: "GEO course (audit free)", url: "https://www.coursera.org/learn/seo-mastering-generative-engine-optimization-geo" }] },

  { id: "t31", phase: "p4", type: "course", cost: "free",
    title: "Coursera GEO course, session 2",
    sub: "Finish: content optimization for AI answers, measurement. Deliverable: 5 GEO tactics you can apply to an SMB site this month.",
    links: [{ label: "GEO course (audit free)", url: "https://www.coursera.org/learn/seo-mastering-generative-engine-optimization-geo" }] },

  { id: "t32", phase: "p4", type: "article", cost: "free",
    title: "Growth Memo: the state of AI search",
    sub: "Kevin Indig's research is the most cited in this space. Read his latest AI search report on Growth Memo. Note 3 stats you can quote to clients.",
    links: [{ label: "Growth Memo", url: "https://www.growth-memo.com/" }] },

  { id: "t33", phase: "p4", type: "article", cost: "free",
    title: "AI Overviews and local search",
    sub: "Study the numbers: 40 percent of local queries now trigger AI Overviews, most local businesses have zero AI strategy. Read both sources, then position your offer in one sentence.",
    links: [
      { label: "Local SEO statistics 2026", url: "https://seoprofy.com/blog/local-seo-statistics/" },
      { label: "Detailed: goliath research", url: "https://detailed.com/" }
    ] },

  { id: "t34", phase: "p4", type: "project", cost: "free",
    title: "LLM visibility test",
    sub: "Ask ChatGPT, Gemini and Perplexity: best [practice service] in [suburb]. Log which businesses get named and infer why: reviews, GBP, content, mentions. Your GEO baseline is this note.",
    links: [
      { label: "ChatGPT", url: "https://chatgpt.com/" },
      { label: "Gemini", url: "https://gemini.google.com/" },
      { label: "Perplexity", url: "https://www.perplexity.ai/" }
    ] },

  { id: "t35", phase: "p4", type: "docs", cost: "free",
    title: "Subscribe and stay current",
    sub: "Subscribe to SEOFOMO (Aleyda Solis) and Growth Memo. Weekly, spend 20 minutes scanning. The propagation layer beats any course: this ritual is how you stay ahead.",
    links: [
      { label: "SEOFOMO newsletter", url: "https://seofomo.co/" },
      { label: "Growth Memo", url: "https://www.growth-memo.com/" }
    ] },

  // ---------- PHASE 5: Capstone: Real SMB Campaign ----------
  { id: "t36", phase: "p5", type: "project", cost: "free",
    title: "Capstone: technical and content audit",
    sub: "Combine the phase 2 skills: GSC, PageSpeed, manual starter-guide audit, schema check. One consolidated audit document for the practice business, issues ranked by impact.",
    links: [
      { label: "Search Console", url: "https://search.google.com/search-console" },
      { label: "PageSpeed Insights", url: "https://pagespeed.web.dev" }
    ] },

  { id: "t37", phase: "p5", type: "project", cost: "free",
    title: "Capstone: local presence fixes",
    sub: "Execute the phase 3 fix list: GBP completeness, categories, citations, NAP. Check off every item from the t29 audit. Log what changed with dates.",
    links: [{ label: "Google Business Profile", url: "https://business.google.com/" }] },

  { id: "t38", phase: "p5", type: "project", cost: "free",
    title: "Capstone: keyword map and 3 pages",
    sub: "Map 10 keywords to pages. Then optimize 3 pages properly: title, meta, H1, intent-matched content, internal links. Deploy the LocalBusiness schema from t19.",
    links: [{ label: "SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide" }] },

  { id: "t39", phase: "p5", type: "project", cost: "free",
    title: "Capstone: submit and baseline",
    sub: "Sitemap submitted, URL inspection clean, GBP linked. Record the baseline in notes: GSC impressions and clicks, GBP views, map pack position for the money query. Numbers only, no adjectives.",
    links: [{ label: "Search Console", url: "https://search.google.com/search-console" }] },

  { id: "t40", phase: "p5", type: "project", cost: "free",
    title: "Capstone: the before and after report",
    sub: "After 30 days of live changes, write the report: baseline vs now, what you did, what moved. SHORT TERM GOAL COMPLETE: you can deliver digital marketing for any SMB.",
    links: [{ label: "Looker Studio (next line)", url: "https://lookerstudio.google.com/" }] },

  // ---------- PHASE 6: Analytics and Measurement ----------
  { id: "t41", phase: "p6", type: "course", cost: "free",
    title: "GA4 certification path, session 1",
    sub: "On Skillshop, start the Google Analytics Certification learning path. Session 1: GA4 data model, events, parameters. Free cert at the end of the path.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t42", phase: "p6", type: "course", cost: "free",
    title: "GA4 certification path, session 2",
    sub: "Continue the path: reports, explorations, segments. Learn where the answers live before you need them for a client.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t43", phase: "p6", type: "course", cost: "free",
    title: "GA4 certification path, session 3 + exam",
    sub: "Finish the path and pass the certification exam. Proof item 3. Log the date.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t44", phase: "p6", type: "project", cost: "free",
    title: "GA4 hands-on on a real site",
    sub: "Set up GA4 on the practice site: data stream, key events (call click, form submit), consent basics. Verify events fire in DebugView. Screenshot in notes.",
    links: [{ label: "Google Analytics", url: "https://analytics.google.com/" }] },

  { id: "t45", phase: "p6", type: "docs", cost: "free",
    title: "UTM discipline",
    sub: "Campaign URL Builder and naming conventions. Build a 4 row UTM sheet for the practice business: source, medium, campaign, content. Ugly links, clean data.",
    links: [{ label: "Campaign URL Builder", url: "https://ga-dev-tools.google/ga4/campaign-url-builder/" }] },

  { id: "t46", phase: "p6", type: "project", cost: "free",
    title: "Looker Studio: client dashboard",
    sub: "Connect GA4 and Search Console connectors in Looker Studio. Build a one page scorecard: users, conversions, top queries, top pages. This becomes a retainer deliverable.",
    links: [{ label: "Looker Studio", url: "https://lookerstudio.google.com/" }] },

  { id: "t47", phase: "p6", type: "docs", cost: "free",
    title: "Attribution: enough to be dangerous",
    sub: "GA4 attribution docs: direct, paid, organic, last click and data-driven models. Deliverable: explain in notes why last click undervalues local SEO.",
    links: [{ label: "GA4 attribution docs", url: "https://support.google.com/analytics/answer/10596866" }] },

  { id: "t48", phase: "p6", type: "project", cost: "free",
    title: "The monthly client report template",
    sub: "Assemble the reusable monthly report: GSC trends, GBP calls and views, GA4 conversions, next month plan. One page. Fill it with practice business data, save the template.",
    links: [{ label: "Looker Studio", url: "https://lookerstudio.google.com/" }] },

  // ---------- PHASE 7: Paid Media ----------
  { id: "t49", phase: "p7", type: "course", cost: "free",
    title: "Google Ads Search cert, session 1",
    sub: "On Skillshop, start the Google Ads Search Certification study path. Session 1: campaign types, ad rank, auctions. The free certification is recognized worldwide.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t50", phase: "p7", type: "course", cost: "free",
    title: "Google Ads Search cert, session 2",
    sub: "Continue: keyword match types, bidding strategies, ad assets. Match types are where budgets live or die: learn them cold.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t51", phase: "p7", type: "course", cost: "free",
    title: "Google Ads Search cert, session 3 + exam",
    sub: "Finish the path, pass the Search certification exam. Proof item 4. Log the date.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t52", phase: "p7", type: "course", cost: "free",
    title: "Ads Measurement certification",
    sub: "Skillshop Ads Measurement path: conversions, attribution, reporting. Pairs with the GA4 line. Pass the exam while the material is warm.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t53", phase: "p7", type: "course", cost: "free",
    title: "Performance Max: what it wants",
    sub: "Skillshop Performance Max content: how PMax uses assets and signals, when it works for local SMBs, when it burns budget. Note 3 guardrails you would set for a small client.",
    links: [{ label: "Google Skillshop", url: "https://skillshop.withgoogle.com/" }] },

  { id: "t54", phase: "p7", type: "project", cost: "free",
    title: "Build a Search campaign, paused",
    sub: "In a real Ads account, build a complete small Search campaign for the practice business: structure, keywords, negatives, ads, assets. PAUSE it before anything bills. Screenshot in notes.",
    links: [{ label: "Google Ads", url: "https://ads.google.com/" }] },

  { id: "t55", phase: "p7", type: "docs", cost: "free",
    title: "Quality Score and ad relevance",
    sub: "Google Ads Help on Quality Score components. Then grade 3 ads you see in the wild: relevance, expected CTR, landing page experience. Cheap clicks are earned here.",
    links: [{ label: "Google Ads Help", url: "https://support.google.com/google-ads" }] },

  { id: "t56", phase: "p7", type: "course", cost: "free",
    title: "Meta Blueprint, session 1",
    sub: "Free e-learning (certification badges are paid and NOT needed). Take the campaign objectives and structure modules. Note which objectives suit lead gen for local services.",
    links: [{ label: "Meta Blueprint learning", url: "https://www.facebook.com/business/learn" }] },

  { id: "t57", phase: "p7", type: "course", cost: "free",
    title: "Meta Blueprint, session 2",
    sub: "Continue free modules: audiences, placements, Advantage+. Deliverable: a one page plan for a 300 dollar local lead gen test.",
    links: [{ label: "Meta Blueprint learning", url: "https://www.facebook.com/business/learn" }] },

  { id: "t58", phase: "p7", type: "docs", cost: "free",
    title: "Microsoft Ads: the cheap click sidecar",
    sub: "Microsoft Advertising Learning Lab. Often 30 to 50 percent cheaper clicks than Google for the same local intent. Learn what ports over from Ads (almost everything).",
    links: [{ label: "Microsoft Ads Learning Lab", url: "https://about.ads.microsoft.com/en/resources/training-certification/learning-lab" }] },

  // ---------- PHASE 8: Content, Email and CRO ----------
  { id: "t59", phase: "p8", type: "course", cost: "free",
    title: "HubSpot Content Marketing cert, session 1",
    sub: "Start the free certification: content strategy, storytelling, audience research. Roughly 8 hours total, split across 3 stations.",
    links: [{ label: "Content Marketing cert", url: "https://academy.hubspot.com/courses/content-marketing" }] },

  { id: "t60", phase: "p8", type: "course", cost: "free",
    title: "HubSpot Content Marketing cert, session 2",
    sub: "Continue: content creation frameworks, repurposing. Deliverable: one content idea for the practice business per framework learned.",
    links: [{ label: "Content Marketing cert", url: "https://academy.hubspot.com/courses/content-marketing" }] },

  { id: "t61", phase: "p8", type: "course", cost: "free",
    title: "HubSpot Content Marketing cert, exam",
    sub: "Finish and pass. Proof item 5. Then map a 3 month content calendar for the practice business: 1 pillar per month, 2 offshoots each.",
    links: [{ label: "Content Marketing cert", url: "https://academy.hubspot.com/courses/content-marketing" }] },

  { id: "t62", phase: "p8", type: "course", cost: "free",
    title: "Email Marketing cert, session 1",
    sub: "Start the certification: lifecycle, segmentation, deliverability basics. Email is the highest ROI channel nobody sells to SMBs properly.",
    links: [{ label: "Email Marketing cert", url: "https://academy.hubspot.com/courses/email-marketing-certification-en" }] },

  { id: "t63", phase: "p8", type: "course", cost: "free",
    title: "Email Marketing cert, session 2 + exam",
    sub: "Finish and pass. Then draft a 3 email welcome sequence for the practice business: value, proof, offer. Subject lines under 45 characters.",
    links: [{ label: "Email Marketing cert", url: "https://academy.hubspot.com/courses/email-marketing-certification-en" }] },

  { id: "t64", phase: "p8", type: "article", cost: "free",
    title: "Copyhackers: copy that converts",
    sub: "Read 3 Copyhackers pieces: headlines, features vs benefits, voice of customer. Then rewrite the practice site homepage headline using their formula. Before and after in notes.",
    links: [{ label: "Copyhackers blog", url: "https://copyhackers.com/blog/" }] },

  { id: "t65", phase: "p8", type: "project", cost: "free",
    title: "Landing page: one offer, one action",
    sub: "Draft a conversion focused landing page for one practice business offer: promise, proof, objection handling, single CTA. Use the copy frameworks from t64.",
    links: [{ label: "Copyhackers blog", url: "https://copyhackers.com/blog/" }] },

  { id: "t66", phase: "p8", type: "article", cost: "free",
    title: "CRO fundamentals",
    sub: "Read CXL's beginner CRO guides: hypothesis writing, research prioritization. Deliverable: 3 test hypotheses for the practice site, each in if, then, because form.",
    links: [{ label: "CXL blog", url: "https://cxl.com/blog/" }] },

  { id: "t67", phase: "p8", type: "project", cost: "free",
    title: "Proof content: case study page",
    sub: "Write and publish one proof asset for the practice business: a case study, testimonial page, or before and after project page. Local buyers convert on proof, not adjectives.",
    links: [{ label: "Google Business Profile", url: "https://business.google.com/" }] },

  // ---------- PHASE 9: AI Marketing Ops and Final Capstone ----------
  { id: "t68", phase: "p9", type: "course", cost: "free",
    title: "OpenAI Academy: AI Foundations",
    sub: "Free with any account. LLM basics, clear instructions, context, iterating on outputs. The vendor's own training beats any third party AI course.",
    links: [{ label: "OpenAI Academy", url: "https://academy.openai.com/" }] },

  { id: "t69", phase: "p9", type: "course", cost: "free",
    title: "OpenAI Academy: Applied AI",
    sub: "Applied AI Foundations: real workflows for real work. Map each module to one marketing task you already do for clients.",
    links: [{ label: "OpenAI Academy", url: "https://academy.openai.com/" }] },

  { id: "t70", phase: "p9", type: "course", cost: "free",
    title: "OpenAI Academy: Agents and Workflows",
    sub: "Agents and Workflows course. This is your unfair advantage: agencies near you do not have this. Note one agentic workflow you could productize.",
    links: [{ label: "OpenAI Academy", url: "https://academy.openai.com/" }] },

  { id: "t71", phase: "p9", type: "course", cost: "free",
    title: "Anthropic: prompt engineering properly",
    sub: "Anthropic's free courses: prompt engineering and evaluation modules. Deliverable: 3 reusable prompt templates: local audit, content brief, report narrative.",
    links: [{ label: "Anthropic courses", url: "https://anthropic.skilljar.com/" }] },

  { id: "t72", phase: "p9", type: "course", cost: "free",
    title: "HubSpot: AI for Marketers",
    sub: "Free HubSpot course on AI in marketing operations. Note where AI fits the funnel they teach vs where you already apply it.",
    links: [{ label: "AI for Marketers", url: "https://academy.hubspot.com/courses/ai-for-marketers" }] },

  { id: "t73", phase: "p9", type: "project", cost: "free",
    title: "Automation: one workflow live",
    sub: "Pick n8n or Zapier and build one real automation: new GBP review triggers a notification and appends to a sheet. Small, live, reusable for every client.",
    links: [
      { label: "n8n docs", url: "https://docs.n8n.io/" },
      { label: "Zapier learn", url: "https://zapier.com/learn" }
    ] },

  { id: "t74", phase: "p9", type: "docs", cost: "free",
    title: "AI content guardrails",
    sub: "Google's stance on AI generated content: helpful is ranked, scaled abuse is not. Write your QA checklist for LLM output: accuracy, E-E-A-T, originality, client voice. This is your verifier layer.",
    links: [{ label: "Google on AI content", url: "https://developers.google.com/search/blog/2023/02/google-search-and-ai-content" }] },

  { id: "t75", phase: "p9", type: "project", cost: "free",
    title: "Final capstone: the full funnel plan",
    sub: "One real client or the practice business at full scope: organic, local, email, paid, AI workflows, measurement. Write the 90 day plan in notes. Sell it if you can.",
    links: [{ label: "Looker Studio", url: "https://lookerstudio.google.com/" }] },

  { id: "t76", phase: "p9", type: "project", cost: "free",
    title: "Terminus: ship, measure, write it up",
    sub: "Execute the plan, measure at 30 day marks, write the case study. LONG TERM GOAL COMPLETE: the full digital marketing umbrella, learned free. Paid tier upgrades start here.",
    links: [{ label: "Your GitHub (publish the case study)", url: "https://github.com/new" }] }
];
