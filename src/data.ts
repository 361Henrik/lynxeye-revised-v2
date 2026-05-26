export type MiniMetric = {
  label: string;
  text: string;
  details?: {
    intro: string[];
    sections: {
      title: string;
      body?: string[];
      items?: string[];
    }[];
  };
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
  { label: "More value", text: "in the work employees do, the output clients see, and the capability Lynxeye keeps." },
  { label: "5x-10x capacity", text: "potential in selected workflows when AI reduces routine work and consultants stay responsible for direction, review and final decisions." },
  { label: "More capability", text: "shared methodology that helps teams use AI while keeping quality and judgment with people." },
  { label: "More proof", text: "sharper pitches, clearer prototypes, and faster evidence of what works." },
  { label: "More reuse", text: "playbooks, examples, quality checks, and captured IP that compound after each project." },
  {
    label: "Company infrastructure",
    text: "Approved headquarters AI infrastructure is the foundation the five value outcomes depend on: tools, access, governance, security and shared guardrails.",
    details: {
      intro: [
        "The approved headquarters AI infrastructure is an important foundation. Without it, AI adoption risks becoming fragmented, unsafe and difficult to scale.",
        "My initial reflection, based on my background and without yet knowing the full Lynxeye context, is that centrally provided tools often solve the first layer: faster production, easier access and more consistent outputs.",
        "That matters. A PowerPoint tool that creates a deck from two prompts can reduce friction and help people move faster. But the real value of a strong deck is not only the deck itself. It is the thinking behind it: the problem, audience, tension, story, context, visualization choices, challenge points and what should become reusable for the next project.",
      ],
      sections: [
        {
          title: "Why the foundation matters",
          body: [
            "The question is not whether headquarters infrastructure is useful. It clearly is. The question is how Lynxeye connects that infrastructure with local working practice.",
          ],
        },
        {
          title: "Where infrastructure helps",
          items: [
            "Approved tools and safer access.",
            "Stronger governance around client material.",
            "Shared standards across the company.",
            "Faster baseline production.",
            "Easier scaling across teams.",
            "More consistency in how AI is introduced.",
          ],
        },
        {
          title: "What to watch",
          items: [
            "Outputs can become generic if the context is weak.",
            "One-size-fits-most tools may reduce creative flexibility.",
            "Black-box workflows can make it harder to challenge or reshape the result.",
            "Generated outputs may miss deeper narrative, positioning or client nuance.",
            "Research, translation, interactive demos, alternative formats or custom design logic may require more flexible workflows.",
            "People still need playbooks for how to think with the tool, not only how to use the tool.",
          ],
        },
        {
          title: "The Lynxeye layer",
          body: [
            "This means building the layer around the tools: playbooks, reusable context, example workflows, review habits, design principles, prompt structures and ways of working that help people turn approved AI access into stronger thinking, better client work and reusable company capability.",
          ],
        },
      ],
    },
  },
];

export const stakeholderCards: ListCard[] = [
  {
    tag: "Employees",
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
    title: "Use source and browser-context workflows",
    text: "AI becomes more useful when it can work with the context people are already seeing.",
    items: [
      "Use approved browser and source-context workflows for page review, research and synthesis.",
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
    title: "Phase 1 - Setup & Early Value",
    text: "A standalone first engagement to clarify current AI practice, headquarters infrastructure, client movement, proposed client cases, first workflow tests and the evidence needed for the Phase 1 checkpoint.",
    items: [
      "What works and fails today?",
      "Where are the strongest value opportunities?",
      "What is safe, available, approved or unclear?",
      "Should Lynxeye stop after Phase 1, continue into Phase 2 or adjust the expansion scope?",
    ],
  },
  {
    number: "2",
    title: "Phase 2 - Expand & Create More Value",
    text: "Optional continuation after Phase 1: deepen coaching through real work, expand client-case workflows, mature reusable methods, demonstrate before/after value, and document evidence and recommendations.",
    items: [
      "Expanded personal AI fluency and team support.",
      "Client-case workflows for real work and pitches.",
      "Mature playbooks, examples and prototypes.",
      "Value evidence and Phase 3 recommendations.",
    ],
  },
  {
    number: "3",
    title: "Phase 3 - Scale Across Lynxeye / Not Included",
    text: "Phase 3 is shown only as the future direction. It is not included in this offer and should only be considered after Phase 2 proves what is worth scaling, automating, integrating or turning into new client offerings.",
    items: [
      "Not part of the current Setup & Early Value or Expand & Create More Value offer.",
      "Used to show where the work can head later.",
      "Decided from evidence, not promised upfront.",
    ],
  },
];

export const deliverableRows: MatrixRow[] = [
  {
    recipient: {
      title: "Employees",
      text: "Employees become stronger, calmer and more effective AI users.",
    },
    valueLever: {
      title: "Personal AI fluency",
      text: "Less friction, better prompting, better context, safer use, more confidence.",
      summary: "View value logic",
      items: [
        "Move from ping-pong prompting to directed methodology.",
        "Use ChatGPT, Claude, approved browser workflows, voice and transcripts as working tools, not side experiments.",
        "Reduce stress from unclear AI quality and endless answer loops.",
      ],
    },
    scope: {
      title: "Current practice map",
      text: "Understand how people work now, what they trust, where they get stuck.",
      summary: "View concrete deliverables",
      items: [
        "Short employee AI practice check-ins.",
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
        "Approved browser and source-context workflow examples.",
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
        "Bridge headquarters AI infrastructure into local consulting practice.",
        "Identify what could become future services, automations or business models.",
      ],
    },
    scope: {
      title: "Strategic alignment map",
      text: "Connect local needs with headquarters direction and commercial priorities.",
      summary: "View concrete deliverables",
      items: [
        "Headquarters AI infrastructure and June 3 input review.",
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
    question: "Where is friction consuming attention today?",
    thinking: "Intelligent people are not short on capability. Too much of their attention is consumed by low-leverage work: digging through presentations, summarizing meetings, searching for information, formatting outputs, preparing internal material, analyzing repetitive data, switching between fragmented systems, and rebuilding context. The hidden problem is not talent. It is where human attention gets spent.",
    recommendedApproach: "Start with pain, not technology. Map the repetitive work that drains energy across pitches, research, synthesis, meetings, delivery, and internal preparation. Use that map to choose a few real workflows where AI can reduce friction and give attention back to higher-value work.",
    validate: [
      "Where does time disappear today?",
      "Which work creates cognitive overload without creating equivalent value?",
      "Which friction points are common enough to matter?",
    ],
  },
  {
    number: "02",
    question: "What repetitive work should AI absorb first?",
    thinking: "AI should provide relief before automation. Its first role is to absorb repetitive cognitive work: meeting synthesis, information processing, research compression, first-draft preparation, context rebuilding, and operational heavy lifting that does not require Lynxeye's highest level of judgment.",
    recommendedApproach: "Pick work that is common, painful, and safe to improve. Build focused AI-supported workflows around transcripts, research packs, proposal drafts, knowledge retrieval, and presentation preparation. Keep the pilot practical: fewer workflows, clearer proof.",
    validate: [
      "Which repeated tasks are most visible to employees?",
      "Which tasks can be improved without creating quality or confidentiality risk?",
      "Where can AI create relief quickly?",
    ],
  },
  {
    number: "03",
    question: "How do we protect human judgment instead of replacing it?",
    thinking: "The point is not humans versus AI. The employee remains the strategist, thinker, decision-maker, relationship builder, and creative force. AI should become the support layer that clears space for better judgment, not a replacement for it.",
    recommendedApproach: "Design each workflow with explicit human decision points: briefing, direction, review, critique, client relevance, and final judgment. Use AI for preparation and synthesis, then make Lynxeye's human quality standards more visible, repeatable, and teachable.",
    validate: [
      "Where must human judgment remain visible?",
      "Which outputs need review before reuse or client exposure?",
      "How do we make quality standards easier to repeat?",
    ],
  },
  {
    number: "04",
    question: "What should freed-up time be used for?",
    thinking: "This is not only an efficiency question. If friction decreases, people regain attention. That attention can go into deeper client understanding, stronger strategic thinking, better ideas, faster experimentation, sharper facilitation, learning, and reusable IP. If freed-up time is only converted into more pressure, adoption will suffer.",
    recommendedApproach: "Make the value choice explicit. Decide where the time should go: better quality, more capacity, more client thinking, more reusable methods, or relief from overload. The pilot should show not only what became faster, but what became better because people had more room to think.",
    validate: [
      "Where does AI give time back?",
      "What higher-value work should that time move toward?",
      "How do we prevent AI from becoming only a productivity tax?",
    ],
  },
  {
    number: "05",
    question: "How do we deal with skepticism, fear, and uneven confidence?",
    thinking: "Adoption is not only a knowledge problem. It is also a confidence, trust, and identity problem. People need to experience AI as relief from frustrating work, not as a signal that their judgment matters less or that more output will simply be extracted from them.",
    recommendedApproach: "Do not argue people into adoption. Show them better work using their own tasks. Start with visible pain points: meeting follow-up, research compression, proposal preparation, synthesis, and context rebuilding. When people see AI remove friction while keeping them central, confidence grows naturally.",
    validate: [
      "What do people trust, and what do they resist?",
      "Which tasks would make AI feel useful quickly?",
      "What changes when people see their own work improved?",
    ],
  },
  {
    number: "06",
    question: "What should become reusable company capability?",
    thinking: "If the pilot only helps one person or one project move faster, it is useful but fragile. The larger value appears when learning travels: examples, context packs, review lenses, prompt patterns, workflow routines, and playbooks that others do not have to rediscover.",
    recommendedApproach: "Every workflow should leave something behind. Capture reusable examples from real work, document what changed, and turn the strongest patterns into shared methods. This is how Lynxeye moves from individual AI help to company capability.",
    validate: [
      "Which examples should become shared practice?",
      "What should no one at Lynxeye have to rediscover?",
      "How does the pilot create capability that compounds?",
    ],
  },
];

export const roadmapCards: ListCard[] = [
  {
    phaseLabel: "Phase 1",
    title: "Setup & Early Value",
    text: "Understand current practice, internal learning, headquarters infrastructure, client movement, proposed client cases, first workflow tests and the Phase 1 checkpoint decision.",
  },
  {
    phaseLabel: "Phase 2",
    title: "Expand & Create More Value",
    text: "Optional after Phase 1: deepen coaching, improve workflows, capture examples, mature playbooks, prove value and recommend next moves.",
  },
  {
    phaseLabel: "Phase 3",
    title: "Scale Across Lynxeye",
    text: "Advanced automations, agentic workflows, coded tools, deeper integrations, broader rollout and new AI-enabled services.",
  },
];

export const phase3HeroMetrics: MiniMetric[] = [
  { label: "Scale", text: "proven methods across employees, teams and projects." },
  { label: "Automate", text: "repeatable workflows only after value is proven." },
  { label: "Integrate", text: "with headquarters infrastructure, tools and guardrails." },
  { label: "Commercialize", text: "new AI-enabled client offerings and services." },
];

export const phase3PathCards: ListCard[] = [
  {
    phaseLabel: "Phase 1",
    title: "Setup & Early Value",
    text: "Understand current practice, internal learning, headquarters infrastructure, client movement, proposed cases, first workflow tests and whether Phase 2 should continue or change.",
    items: ["Current AI use.", "Bridge to headquarters infrastructure.", "Early use-case proof.", "Phase 1 checkpoint."],
  },
  {
    phaseLabel: "Phase 2",
    title: "Expand & Create More Value",
    text: "Optional after the Phase 1 checkpoint: deepen coaching, improve real workflows, expand what works, capture examples, document playbooks and prove value.",
    items: ["Individual and team fluency.", "Client and pitch workflows.", "Evidence and recommendations."],
  },
  {
    phaseLabel: "Phase 3",
    title: "Scale Across Lynxeye",
    text: "Use the evidence to decide what should be scaled, automated, integrated with headquarters infrastructure or turned into new client offerings.",
    items: ["Scaled adoption.", "Agentic workflows.", "New service models."],
  },
];

export const phase3OpportunityCards: ListCard[] = [
  {
    title: "1. Scale the proven methods",
    text: "Take the strongest Phase 2 practices beyond the first bridge team.",
    items: ["More employees and teams.", "More client projects and pitches.", "Internal champions and onboarding paths."],
  },
  {
    title: "2. Connect deeper with headquarters infrastructure",
    text: "Turn central tools, platforms and guardrails into local consulting practice.",
    items: ["Map proven workflows to approved tools.", "Connect playbooks to knowledge infrastructure.", "Feed Lynxeye learning back to the group."],
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
    text: "Decide what should be rolled out, automated, connected to headquarters tools or developed into a service.",
  },
];

export const phase3SignalCards: ListCard[] = [
  {
    tag: "Employees",
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
    text: "Which methods should become playbooks, automations, headquarters-connected workflows or new services?",
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
    focus: "Connect selected workflows to headquarters tools, playbooks and shared infrastructure.",
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
