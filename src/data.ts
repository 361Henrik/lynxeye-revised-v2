export type MiniMetric = {
  label: string;
  text: string;
};

export type ListCard = {
  tag?: string;
  className?: string;
  number?: string;
  phaseLabel?: string;
  title: string;
  text: string;
  items?: string[];
};

export type SectionIntro = {
  kicker: string;
  title: string;
  text: string;
};

export type MatrixCell = {
  title: string;
  text: string;
  summary?: string;
  items?: string[];
};

export type MatrixRow = {
  recipient: MatrixCell;
  valueLever: MatrixCell;
  scope: MatrixCell;
  pilot: MatrixCell;
  payoff: MatrixCell;
};

export type Question = {
  number: string;
  question: string;
  thinking: string;
  recommendedApproach: string;
  validate: string[];
};

export type TimelineRow = {
  horizon: string;
  focus: string;
  question: string;
};

export const mainHeroMetrics: MiniMetric[] = [
  { label: "More value", text: "per person, project and client interaction." },
  { label: "More capacity", text: "without only scaling through linear hiring." },
  { label: "More proof", text: "through sharper pitches and visible prototypes." },
  { label: "More reuse", text: "through playbooks, examples and captured IP." },
];

export const stakeholderCards: ListCard[] = [
  {
    tag: "Individuals",
    className: "employee",
    title: "Better work with less AI stress.",
    text: "Employees learn how to use AI with control: setup, prompting, context, voice, transcripts, browser workflows, review habits and quality judgment.",
    items: [
      "Less blank-page work and tool friction.",
      "More confidence in what AI is good and bad at.",
      "More time for judgment, creativity and client thinking.",
    ],
  },
  {
    tag: "Teams",
    className: "team",
    title: "More capacity and stronger rhythm.",
    text: "Teams learn how to use AI together in meetings, whiteboards, pitches, research, synthesis, project delivery and review.",
    items: [
      "Faster research, synthesis and documentation.",
      "Shared methods instead of isolated experiments.",
      "Less bottleneck pressure on senior people.",
    ],
  },
  {
    tag: "Clients",
    className: "client",
    title: "Sharper output, faster proof.",
    text: "Clients should experience clearer options, better synthesis, faster feedback loops and more tangible proof of thinking.",
    items: [
      "Better client projects and sharper recommendations.",
      "Faster movement from insight to visible output.",
      "More compelling pitch and project experiences.",
    ],
  },
  {
    tag: "Lynxeye",
    className: "company",
    title: "Commercial leverage that compounds.",
    text: "Lynxeye captures reusable intelligence: playbooks, examples, evidence, stronger pitches, protected margin and future scale options.",
    items: [
      "More value per person and per project.",
      "Less dependency on linear headcount growth.",
      "Reusable company IP and future service potential.",
    ],
  },
];

export const quickWinCards: ListCard[] = [
  {
    number: "1",
    title: "Prompt from the desired outcome",
    text: "Move from “can you help me?” to “this is what perfect looks like.”",
    items: [
      "Define audience, purpose, format and quality bar before asking.",
      "Ask for options, trade-offs and critique, not only answers.",
      "Use AI to improve thinking, not just produce text.",
    ],
  },
  {
    number: "2",
    title: "Build reusable context",
    text: "Stop restarting every conversation from zero.",
    items: [
      "Create reusable context blocks for role, client, project and tone.",
      "Use memory and personalization carefully where available.",
      "Keep strong examples that can be reused across similar work.",
    ],
  },
  {
    number: "3",
    title: "Use voice to capture thinking",
    text: "Consultants often think faster than they type. Voice turns raw thinking into material.",
    items: [
      "Use speech-to-text for idea capture, meeting reflections and first drafts.",
      "Convert messy spoken notes into structured options and next actions.",
      "Reduce the friction between thought and output.",
    ],
  },
  {
    number: "4",
    title: "Turn transcripts into outputs",
    text: "Meetings should create reusable intelligence, not only notes.",
    items: [
      "Extract decisions, open questions, risks and next actions.",
      "Turn client conversations into briefs, hypotheses and workstreams.",
      "Capture learning that can improve the next project or pitch.",
    ],
  },
  {
    number: "5",
    title: "Use AI as reviewer, not only writer",
    text: "The quickest quality gain is often review, critique and sharpening.",
    items: [
      "Ask AI to check clarity, logic, missing evidence and weak claims.",
      "Use review lenses for tone, originality, client relevance and risk.",
      "Keep human judgment visible before client-facing work leaves the team.",
    ],
  },
  {
    number: "6",
    title: "Use browser/context workflows",
    text: "AI becomes more useful when it can work with the context people are already seeing.",
    items: [
      "Use Atlas/browser context for page review, research and synthesis.",
      "Connect source material before asking for conclusions.",
      "Separate source-backed insight from AI-generated speculation.",
    ],
  },
  {
    number: "7",
    title: "Visualize earlier",
    text: "Lynxeye’s work depends on making strategy tangible. AI can help move from words to proof faster.",
    items: [
      "Turn ideas into simple maps, tables, HTML sketches and story flows.",
      "Use prototypes to accelerate feedback loops.",
      "Show options earlier instead of waiting for polished presentation work.",
    ],
  },
  {
    number: "8",
    title: "Know when to stop the AI loop",
    text: "Comfort comes from control. People need habits for avoiding endless iteration.",
    items: [
      "Set review criteria before generating more versions.",
      "Keep a human decision point after two or three useful options.",
      "Escalate uncertainty instead of polishing weak output.",
    ],
  },
  {
    number: "9",
    title: "Work safely with client material",
    text: "Confidence depends on knowing what is approved, sensitive, reusable or off-limits.",
    items: [
      "Clarify data boundaries and client confidentiality rules.",
      "Use approved tools and agreed review points.",
      "Build habits that protect Lynxeye’s premium standard.",
    ],
  },
];

export const phaseCards: ListCard[] = [
  {
    number: "1",
    title: "Scope & Setup",
    text: "Clarify current AI practice, internal learnings, Eraneos/HQ infrastructure, client movement, pain points, capacity pressure, and priority use cases.",
    items: [
      "What works and fails today?",
      "Where are the strongest value opportunities?",
      "What is safe, available, approved or unclear?",
      "Which people and workflows should the pilot focus on?",
    ],
  },
  {
    number: "2",
    title: "Value Pilot",
    text: "Coach individuals and teams through real work, capture reusable methods, demonstrate before/after value, and document evidence and recommendations.",
    items: [
      "Personal AI fluency and setup support.",
      "Team workflows for client work and pitches.",
      "Version-one playbooks, examples and prototypes.",
      "Value evidence and Phase 3 recommendations.",
    ],
  },
  {
    number: "3",
    title: "Phase 3",
    text: "Use the evidence to decide what should be scaled, automated, integrated with HQ infrastructure or turned into new client offerings.",
    items: [
      "Scale what works across people and teams.",
      "Automate repeatable workflows after value is proven.",
      "Explore new AI-enabled services and capability.",
    ],
  },
];

export const deliverableRows: MatrixRow[] = [
  {
    recipient: {
      title: "Individuals",
      text: "People become stronger, calmer and more effective AI users.",
    },
    valueLever: {
      title: "Personal AI fluency",
      text: "Less friction, better prompting, better context, safer use, more confidence.",
      summary: "View value logic",
      items: [
        "Move from ping-pong prompting to directed orchestration.",
        "Use ChatGPT, Claude, Atlas, voice and transcripts as working tools, not side experiments.",
        "Reduce stress from unclear AI quality and endless answer loops.",
      ],
    },
    scope: {
      title: "Current practice map",
      text: "Understand how people work now, what they trust, where they get stuck.",
      summary: "View concrete deliverables",
      items: [
        "Short individual AI practice check-ins.",
        "Inventory of current tools, habits, prompts and pain points.",
        "Confidence and skepticism notes.",
        "Personal setup needs: accounts, browser, voice, files, context, memory.",
      ],
    },
    pilot: {
      title: "1:1 coaching + setup",
      text: "Help selected people work better with the tools already available.",
      summary: "View concrete deliverables",
      items: [
        "Personal AI workbench setup notes.",
        "ChatGPT and Claude personalization guidance.",
        "Memory, skills and reusable context examples.",
        "Atlas/browser workflow examples.",
        "Wispr Flow / speech-to-text working routines.",
        "Prompting patterns for research, drafting, review and synthesis.",
        "Examples of how to avoid AI loops and weak generic output.",
      ],
    },
    payoff: {
      title: "Better use, less drag",
      text: "Signals that people can use AI repeatedly in daily work.",
      summary: "View payoff signals",
      items: [
        "Faster first drafts and structured outputs.",
        "Less time searching, switching tools or restarting context.",
        "Higher confidence in when to use AI and when not to.",
        "More senior time spent on judgment rather than manual production.",
      ],
    },
  },
  {
    recipient: {
      title: "Teams",
      text: "Teams build shared AI-supported ways of working.",
    },
    valueLever: {
      title: "Capacity and collaboration",
      text: "Better meetings, stronger synthesis, faster shared production, less reinvention.",
      summary: "View value logic",
      items: [
        "Use AI around whiteboards, meetings, transcripts and shared synthesis.",
        "Turn team discussions into outputs, not only notes.",
        "Create repeatable team rituals for learning and quality review.",
      ],
    },
    scope: {
      title: "Team opportunity map",
      text: "Clarify where AI can help teams most.",
      summary: "View concrete deliverables",
      items: [
        "Map of team workflows: meetings, project work, research, synthesis, pitch work.",
        "Identification of capacity gaps and repeated bottlenecks.",
        "Review of existing internal AI practices and early adopter learnings.",
        "Priority list of team workflows for the pilot.",
      ],
    },
    pilot: {
      title: "Team workflow coaching",
      text: "Work directly inside real team situations.",
      summary: "View concrete deliverables",
      items: [
        "Live sessions using actual client/project/pitch material.",
        "Transcript-to-output methods for meetings and discussions.",
        "Whiteboard-to-structure capture routines.",
        "Team review rhythm for AI-assisted work.",
        "Shared examples of strong outputs and failed outputs.",
        "First team playbook entries from live work.",
      ],
    },
    payoff: {
      title: "More output capacity",
      text: "Signals that the team can move faster without lowering quality.",
      summary: "View payoff signals",
      items: [
        "Faster research and synthesis cycles.",
        "Less dependency on one senior person for repeatable tasks.",
        "Reusable patterns adopted by more than one person.",
        "Better conversion from meetings into decisions, drafts and next actions.",
      ],
    },
  },
  {
    recipient: {
      title: "Clients",
      text: "The client experience becomes sharper, faster and more tangible.",
    },
    valueLever: {
      title: "Client value and proof",
      text: "Better recommendations, clearer options, faster iteration and more visible strategic thinking.",
      summary: "View value logic",
      items: [
        "Move from static material toward proof-of-thinking and early prototypes.",
        "Increase quality and speed in both projects and pitches.",
        "Use AI to turn client context into sharper synthesis and options.",
      ],
    },
    scope: {
      title: "Client movement scan",
      text: "Understand what clients are asking for, doing and expecting around AI.",
      summary: "View concrete deliverables",
      items: [
        "Input capture from Lynxeye client-facing teams.",
        "Patterns in client questions, expectations and sensitivities.",
        "Examples of where clients may expect faster or more tangible outputs.",
        "Priority client-facing workflows for testing in the pilot.",
      ],
    },
    pilot: {
      title: "Pitch and client-work prototypes",
      text: "Use AI-supported workflows to improve real client-facing output.",
      summary: "View concrete deliverables",
      items: [
        "Pitch acceleration workflow: qualification, research, synthesis, structure, review.",
        "Client project workflow: setup, research, interview synthesis, documentation, review.",
        "HTML or visual prototypes to make thinking more tangible.",
        "Before/after examples showing what changed.",
        "Quality checks for tone, originality, client sensitivity and human review.",
      ],
    },
    payoff: {
      title: "Higher client impact",
      text: "Signals that clients see better thinking faster.",
      summary: "View payoff signals",
      items: [
        "Time from opportunity to first strong proposal draft.",
        "Pitch hours per proposal and win-rate indicators.",
        "Time from client feedback to revised version.",
        "Client engagement with visual or interactive proof.",
      ],
    },
  },
  {
    recipient: {
      title: "Lynxeye",
      text: "The company captures reusable capability and commercial upside.",
    },
    valueLever: {
      title: "Company leverage",
      text: "More value per person, protected margin, better pitches and less linear capacity pressure.",
      summary: "View value logic",
      items: [
        "Turn tacit knowledge into company infrastructure.",
        "Bridge Eraneos/HQ infrastructure into local consulting practice.",
        "Identify what could become future services, automations or business models.",
      ],
    },
    scope: {
      title: "Strategic alignment map",
      text: "Connect local needs with HQ direction and commercial priorities.",
      summary: "View concrete deliverables",
      items: [
        "Eraneos/HQ infrastructure and June 3 input review.",
        "Tool, data, security and platform constraint map.",
        "Success frame: speed, quality, capacity, adoption, reuse, margin, client value.",
        "Phase 2 scope and investment logic.",
      ],
    },
    pilot: {
      title: "Living delivery hub",
      text: "Capture methods, examples, insights and recommendations in one place.",
      summary: "View concrete deliverables",
      items: [
        "Web-based project delivery hub.",
        "Version-one Lynxeye playbooks.",
        "Reusable prompt patterns, quality checks and workflow examples.",
        "Value evidence summary.",
        "Training and adoption implications.",
        "Roadmap and Phase 3 recommendation.",
      ],
    },
    payoff: {
      title: "Investment case",
      text: "Signals that AI enablement is creating business value.",
      summary: "View payoff signals",
      items: [
        "Active projects handled per senior consultant.",
        "Reduced pitch and delivery drag.",
        "Reusable playbook adoption and reuse rate.",
        "Reduced key-person dependency for repeatable tasks.",
        "Options for future automation or new AI-enabled services.",
      ],
    },
  },
];

export const questions: Question[] = [
  {
    number: "01",
    question: "What does the first session look like?",
    thinking: "The first session should not be a presentation. It should be a working session where we use real Lynxeye work: a live pitch, a client question, a proposal, a piece of research, or something else that already matters.",
    recommendedApproach: "We create a before-and-after experience. First, we look at how the work would normally happen today. Then we run the same task through a more structured AI-supported way of working. Then we compare the difference: what became faster, what became better, what became uncomfortable, and what could be reused.",
    validate: [
      "Can real Lynxeye work improve visibly in one session?",
      "Can the method be understood without too much theory?",
      "Can the learning become the first playbook entry?",
    ],
  },
  {
    number: "02",
    question: "How do we define changes in ways of working?",
    thinking: "This cannot start with theory. It has to start with how Lynxeye actually works today: where time disappears, where people recreate work, and where senior judgment is used on production instead of direction.",
    recommendedApproach: "We define a small number of concrete shifts: from blank-page pitches to structured context, from first-draft senior production to senior review and judgment, and from project learning disappearing to reusable lenses, workflows, examples, and prompts.",
    validate: [
      "Which workflows are most important to change first?",
      "Where is the biggest friction today?",
      "What visible signals show that behavior has actually changed?",
    ],
  },
  {
    number: "03",
    question: "How do we integrate theory with practice?",
    thinking: "Theory matters, but it should not float above the work. If we talk about context, we show it inside a real pitch. If we talk about playbooks, we create one from the session.",
    recommendedApproach: "The theory should never be more than ten minutes ahead of the practice. A good rhythm is: short frame, live work, review, capture. The capture is important. If nothing gets captured, the learning stays in the room.",
    validate: [
      "Which concepts actually help people work better?",
      "What theory is useful, and what becomes noise?",
      "Can each session leave behind reusable material?",
    ],
  },
  {
    number: "04",
    question: "What tools and workflows will we actually use?",
    thinking: "This is where it is easy to get distracted. The point is not to use as many tools as possible. The point is to define the workflows that matter, and then use the right tools inside them.",
    recommendedApproach: "I would separate this into two layers. Eraneos/HQ provides the infrastructure layer: platforms, tools, data access, knowledge infrastructure, security, and guardrails. Lynxeye defines the operating layer: how consultants use these tools in pitches, research, synthesis, delivery, client work, and knowledge capture.",
    validate: [
      "Which tools are approved or coming from HQ?",
      "Which workflows should Lynxeye build first?",
      "Where does human review need to happen?",
    ],
  },
  {
    number: "05",
    question: "What do we do with freed-up time?",
    thinking: "This is not an efficiency question only. It is a leadership question. Freed-up time does not stay freed up unless the company decides what it is for.",
    recommendedApproach: "There are three healthy uses of freed-up time: better work, more capacity, and more reusable IP. The wrong answer is same people, same stress, more output. That will kill adoption.",
    validate: [
      "Where does time actually get freed up?",
      "Should the gain go into quality, capacity, IP, or relief?",
      "How does leadership make that choice visible?",
    ],
  },
  {
    number: "06",
    question: "How do we use this as a meaningful incentive for the people experiencing the increased effectiveness?",
    thinking: "People will notice very quickly whether this is for them or just from them. If AI becomes a way to extract more production from the same people, adoption will slow down quietly.",
    recommendedApproach: "The incentive should show up in the work itself: less repetitive production, more meaningful thinking, more recognition for creating reusable methods, and more visible contribution to Lynxeye's collective intelligence.",
    validate: [
      "What would make this feel useful to consultants?",
      "How should playbook contribution be recognized?",
      "How do we avoid making AI feel like a productivity tax?",
    ],
  },
  {
    number: "07",
    question: "How do we leverage and combine the infrastructure and tool initiatives that Eraneos/HQ is providing?",
    thinking: "This question has become more important after hearing more about the Eraneos direction. Lynxeye should not duplicate HQ. But it should also not wait passively.",
    recommendedApproach: "HQ provides the foundation. Lynxeye builds the practice. After the June 3 session, we should map what Eraneos provides against what Lynxeye needs to define locally. The practical question is not only what tools are available. It is how those tools change the way Lynxeye pitches, researches, delivers, and learns.",
    validate: [
      "What exactly comes from Eraneos/HQ?",
      "What remains local to Lynxeye?",
      "How do we bridge group infrastructure and local behavior?",
    ],
  },
  {
    number: "08",
    question: "How does Lynxeye become a proof case?",
    thinking: "This needs a precise ambition. Lynxeye probably does not need to position itself as the group's leading technical AI implementation unit. The stronger position is different.",
    recommendedApproach: "Lynxeye can become the clearest proof case for AI-orchestrated strategic consulting: sharper pitches, faster synthesis, better client understanding, more reusable methods, stronger use of senior judgment, less repeated work, and more consistent quality.",
    validate: [
      "What type of AI leadership is credible for Lynxeye?",
      "What proof would matter inside the wider organization?",
      "What can Lynxeye export back to the group?",
    ],
  },
  {
    number: "09",
    question: "How do we scope and price this without scaring people away before they understand the potential?",
    thinking: "The commitment should grow with the evidence. People do not yet know what they do not know.",
    recommendedApproach: "Phase 1 creates alignment. Phase 2 proves value through a focused pilot. Phase 3 scales what works.",
    validate: ["What is the smallest serious version that creates enough proof to justify the next step?"],
  },
  {
    number: "10",
    question: "How do we protect the pilot while still creating momentum in the wider team?",
    thinking: "If the pilot is too closed, it can feel secretive. If it is too open, it can become slow and noisy.",
    recommendedApproach: "Small core team. Visible learning. Later waves. Playbook capture.",
    validate: ["Who is inside the pilot, who gets visibility, and when do others join?"],
  },
  {
    number: "11",
    question: "How do we deal with skepticism, fear, and uneven confidence?",
    thinking: "Adoption is not only a knowledge problem. It is also a confidence, trust, and identity problem.",
    recommendedApproach: "Do not argue people into adoption. Show them better work using their own tasks.",
    validate: ["What do people trust, what do they resist, and what changes when they see their own work improved?"],
  },
  {
    number: "12",
    question: "What should become reusable company intelligence?",
    thinking: "If the pilot only helps one project move faster, it is useful. If it creates reusable Lynxeye intelligence, the value becomes much bigger.",
    recommendedApproach: "Every workflow should leave something behind: a prompt, a lens, a pitch pattern, a review checklist, a client question bank, or a reusable example.",
    validate: ["What did we learn that someone else at Lynxeye should not have to rediscover?"],
  },
  {
    number: "13",
    question: "Who owns the operating model after the pilot?",
    thinking: "If the pilot works, Lynxeye needs internal ownership. Otherwise the method depends too much on the external project.",
    recommendedApproach: "Identify owners for the playbook, workflows, HQ connection, quality standards, rollout rhythm, and next wave.",
    validate: ["Who keeps improving this after the first pilot is done?"],
  },
];

export const roadmapCards: ListCard[] = [
  {
    phaseLabel: "Phase 1",
    title: "Scope & Setup",
    text: "Understand current practice, internal learning, HQ infrastructure, client movement, pain points and priority use cases.",
  },
  {
    phaseLabel: "Phase 2",
    title: "Value Pilot",
    text: "Coach people, improve workflows, capture examples, document playbooks, prove value and recommend next moves.",
  },
  {
    phaseLabel: "Phase 3",
    title: "Scale, Automate, Build",
    text: "Advanced automations, agentic workflows, coded tools, deeper integrations, broader rollout and new AI-enabled services.",
  },
];

export const phase3HeroMetrics: MiniMetric[] = [
  { label: "Scale", text: "proven methods across individuals, teams and projects." },
  { label: "Automate", text: "repeatable workflows only after value is proven." },
  { label: "Integrate", text: "with HQ infrastructure, tools and guardrails." },
  { label: "Commercialize", text: "new AI-enabled client offerings and services." },
];

export const phase3PathCards: ListCard[] = [
  {
    phaseLabel: "Phase 1",
    title: "Scope & Setup",
    text: "Understand current practice, internal learning, HQ infrastructure, client movement, pain points and priority use cases.",
    items: ["Current AI use.", "Bridge to Eraneos/HQ.", "Value hypotheses."],
  },
  {
    phaseLabel: "Phase 2",
    title: "Value Pilot",
    text: "Coach people, improve real workflows, implement what works quickly, capture examples, document playbooks and prove value.",
    items: ["Individual and team fluency.", "Client and pitch workflows.", "Evidence and recommendations."],
  },
  {
    phaseLabel: "Phase 3",
    title: "Scale, Automate, Build",
    text: "Use the evidence to decide what should be scaled, automated, integrated with HQ infrastructure or turned into new client offerings.",
    items: ["Scaled adoption.", "Agentic workflows.", "New service models."],
  },
];

export const phase3OpportunityCards: ListCard[] = [
  {
    title: "1. Scale the proven methods",
    text: "Take the strongest Phase 2 practices beyond the first bridge team.",
    items: ["More individuals and teams.", "More client projects and pitches.", "Internal champions and onboarding paths."],
  },
  {
    title: "2. Connect deeper with Eraneos/HQ infrastructure",
    text: "Turn central tools, platforms and guardrails into local consulting practice.",
    items: ["Map proven workflows to approved tools.", "Connect playbooks to knowledge infrastructure.", "Feed Lynxeye learning back to HQ."],
  },
  {
    title: "3. Automate repeatable workflows",
    text: "Automate the workflows that Phase 2 proves are valuable and repeatable.",
    items: ["Meeting-to-output.", "Pitch research and qualification.", "Interview synthesis and insight clustering."],
  },
  {
    title: "4. Build agentic and multi-step flows",
    text: "Move from supported prompting to managed AI work sequences.",
    items: ["Agent-assisted research.", "Multi-step synthesis and review.", "Human approval gates for quality and risk."],
  },
  {
    title: "5. Expand multimodal creation and demos",
    text: "Use new AI capabilities to make strategic thinking more tangible.",
    items: [
      "Interactive prototypes and journey maps.",
      "Visual concepts, mockups, voice, image and video.",
      "Faster movement from analysis to client reaction.",
    ],
  },
  {
    title: "6. Create new AI-enabled client offerings",
    text: "Turn internal capability into potential commercial services.",
    items: ["AI-supported diagnostics and workshops.", "Sector intelligence products.", "New strategy, prototyping and learning-loop services."],
  },
];

export const phase3LoopCards: ListCard[] = [
  {
    number: "1",
    title: "Learn",
    text: "Use real work to discover where AI improves speed, quality, capacity or client value.",
  },
  {
    number: "2",
    title: "Implement",
    text: "Apply the improved method immediately inside the pilot team or live workflow.",
  },
  {
    number: "3",
    title: "Validate",
    text: "Track whether the hypothesis holds: time, quality, reuse, confidence, margin or client response.",
  },
  {
    number: "4",
    title: "Scale",
    text: "Decide what should be rolled out, automated, connected to HQ tools or developed into a service.",
  },
];

export const phase3SignalCards: ListCard[] = [
  {
    tag: "Individuals",
    title: "What scales personally?",
    text: "Which personal workflows, setup habits and AI fluency patterns should become standard?",
    items: ["Confidence.", "Reduced friction.", "Better judgment leverage."],
  },
  {
    tag: "Teams",
    title: "What scales across teams?",
    text: "Which shared workflows improve meetings, pitches, project delivery, synthesis and review?",
    items: ["Higher throughput.", "Reusable rituals.", "Less bottleneck pressure."],
  },
  {
    tag: "Clients",
    title: "What improves client value?",
    text: "Which AI-supported methods create sharper outputs, faster proof and better client experience?",
    items: ["Faster feedback loops.", "Better pitch quality.", "More tangible recommendations."],
  },
  {
    tag: "Lynxeye",
    title: "What becomes company capability?",
    text: "Which methods should become playbooks, automations, HQ-connected workflows or new services?",
    items: ["Reusable IP.", "Margin protection.", "Less linear headcount pressure."],
  },
];

export const phase3TimelineRows: TimelineRow[] = [
  {
    horizon: "3 months",
    focus: "Scale the strongest personal and team methods from Phase 2.",
    question: "What can be repeated safely now?",
  },
  {
    horizon: "6 months",
    focus: "Connect selected workflows to HQ tools, playbooks and shared infrastructure.",
    question: "What should become standard Lynxeye practice?",
  },
  {
    horizon: "12 months",
    focus: "Automate repeatable workflows and develop internal champions.",
    question: "What should be systematized or productized?",
  },
  {
    horizon: "18 months",
    focus: "Explore new client-facing AI-enabled services, demos and operating models.",
    question: "How does Lynxeye turn capability into new commercial value?",
  },
];
