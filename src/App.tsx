import { useEffect, useState, type CSSProperties } from "react";
import {
  deliverableRows,
  mainHeroMetrics,
  phase3OpportunityCards,
  phaseCards,
  questions,
  quickWinCards,
  stakeholderCards,
  type ListCard,
  type MatrixCell,
  type MatrixRow,
  type MiniMetric,
  type Question,
  type SectionIntro,
} from "./data";

function App() {
  document.title = "Accelerate Lynxeye with AI — Value & Deliverables Map";

  return <MainPage />;
}

type ActiveModal = "orchestration" | "about" | null;

type OrchestrationStep = {
  number: string;
  title: string;
  shortValue: string;
  detail: string;
  variant: "start" | "current" | "future";
  x: number;
  y: number;
  labelSide: "above" | "below" | "left" | "right";
  connectorOffset: {
    x: number;
    y: number;
  };
};

function Header({ brand, onOrchestration, onAbout }: { brand: string; onOrchestration: () => void; onAbout: () => void }) {
  return (
    <header>
      <div className="nav">
        <a className="brand" href="/">
          {brand}
        </a>
        <nav className="navlinks" aria-label={`${brand} navigation`}>
          <button type="button" onClick={onOrchestration}>
            Why orchestration
          </button>
          <button type="button" onClick={onAbout}>
            About Henrik
          </button>
        </nav>
      </div>
    </header>
  );
}

function MiniMetrics({ metrics }: { metrics: MiniMetric[] }) {
  return (
    <div className="hero-bottom">
      {metrics.map((metric, index) => (
        <div className={`mini-metric${index === metrics.length - 1 ? " mini-metric-foundation" : ""}`} key={metric.label}>
          <strong>{metric.label}</strong>
          <span>{metric.text}</span>
        </div>
      ))}
    </div>
  );
}

function SectionIntroBlock({ intro }: { intro: SectionIntro }) {
  return (
    <div className="section-intro">
      {intro.kicker ? <div className="kicker">{intro.kicker}</div> : null}
      <h2>{intro.title}</h2>
      <p>{intro.text}</p>
    </div>
  );
}

function CardList({ items }: { items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ExpandableItems({ items, openLabel = "See details", closeLabel = "Hide details" }: { items?: string[]; openLabel?: string; closeLabel?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items?.length) {
    return null;
  }

  return (
    <div className={`expandable-items${isOpen ? " is-open" : ""}`}>
      <button className="detail-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
        {isOpen ? closeLabel : openLabel}
      </button>
      {isOpen ? <CardList items={items} /> : null}
    </div>
  );
}

function MainPage() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [showStakeholderDetails, setShowStakeholderDetails] = useState(false);

  return (
    <>
      <Header
        brand="Accelerate Lynxeye with AI"
        onOrchestration={() => setActiveModal("orchestration")}
        onAbout={() => setActiveModal("about")}
      />
      <main>
        <section className="hero hero-reset">
          <div className="hero-card">
            <div>
              <div className="kicker">"Dancing with AI"</div>
              <h1>From ping-pong with AI to orchestrating AI that creates accelerated value for Lynxeye, clients, and employees.</h1>
              <p className="hero-lede">
                A practical project model for helping individuals, teams, clients and Lynxeye capture more value from the intelligence already inside the company — faster work, better outputs, stronger capacity, reusable methods and safer adoption.
              </p>
            </div>
            <MiniMetrics metrics={mainHeroMetrics} />
          </div>
        </section>

        <QuestionsSection />

        <section id="value" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "",
              title: "Four stakeholder values, one practical project.",
              text: "The three-layer model stays intact: individuals, teams and Lynxeye. The client layer is added as the value test: the work only matters if it improves what clients experience and what the business captures.",
            }}
          />
          <div className="section-actions">
            <button className="detail-toggle" type="button" aria-expanded={showStakeholderDetails} onClick={() => setShowStakeholderDetails((current) => !current)}>
              {showStakeholderDetails ? "Hide details" : "Show all details"}
            </button>
          </div>
          <div className="value-grid">
            {stakeholderCards.map((card) => (
              <article className={`stakeholder-card ${showStakeholderDetails ? "is-expanded" : ""}`} key={card.title}>
                <span className="tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                {showStakeholderDetails ? <CardList items={card.items} /> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="quickwins" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Individual early wins",
              title: "What employees need to master first.",
              text: "For Lynxeye, the first value is not advanced automation. It is helping consultants, strategists and designers become comfortable using AI in the daily work where insight, judgment, synthesis, storytelling and client quality matter most.",
            }}
          />
          <div className="quickwin-grid">
            {quickWinCards.map((card) => (
              <ExpandableListCard card={card} className="quickwin-card" openLabel="See details" closeLabel="Hide details" key={card.title} />
            ))}
          </div>
        </section>

        <section id="phases" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Project path",
              title: "Scope first, prove value, then scale what works.",
              text: "The structure should make Christian comfortable: Phase 3 is visible, but it does not carry the pilot. We first understand the current reality, then work inside real Lynxeye workflows to prove what creates value.",
            }}
          />
          <div className="tabs">
            {phaseCards.map((card) => (
              <article className="phase-card" key={card.title}>
                <div className="phase-number">{card.number}</div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ExpandableItems items={card.items} openLabel="See more" closeLabel="Close" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="matrix" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "",
              title: "What Lynxeye gets — by stakeholder value and project phase.",
              text: "The visible table keeps the big picture simple. Each stakeholder row opens into concrete version-one deliverables that can be delivered through sessions, examples, captures and the living web delivery hub.",
            }}
          />
          <div className="matrix-wrap">
            <div className="matrix-header">
              <div>Stakeholder</div>
              <div>Value created</div>
              <div>Phase 1: Scope & Setup</div>
              <div>Phase 2: Show Value</div>
              <div>What success could look like</div>
            </div>
            {deliverableRows.map((row) => (
              <DeliverableRow row={row} key={row.recipient.title} />
            ))}
          </div>
        </section>

        <Phase3EmbeddedShowcase />
      </main>
      <WhyOrchestrationModal open={activeModal === "orchestration"} onClose={() => setActiveModal(null)} />
      <AboutHenrikModal open={activeModal === "about"} onClose={() => setActiveModal(null)} />
    </>
  );
}

function QuestionsSection() {
  return (
    <section id="questions" className="section section-after-hero">
      <SectionIntroBlock
        intro={{
          kicker: "",
          title: "The key questions I hear Christian asking from our conversation.",
          text: "The shared question is how Lynxeye can turn scattered day-to-day AI use into a better way of working: reducing low-leverage friction, protecting human attention, and freeing employees to spend more time on the work where judgment, creativity, client understanding and strategic thinking create the most value.",
        }}
      />

      <div className="question-editorial">
        <div className="question-list">
          {questions.map((item) => (
            <QuestionCard item={item} key={item.number} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestionCard({ item }: { item: Question }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article className={`question-card ${isOpen ? "is-open" : ""}`}>
      <div className="question-rail" aria-label={`Question ${item.number}`}>
        <strong>{item.number}</strong>
      </div>
      <div className="question-body">
        <div className="question-summary">
          <h3>“{item.question}”</h3>
          <button className="detail-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
            {isOpen ? "Close" : "More"}
          </button>
        </div>
        {isOpen ? (
          <div className="question-detail-grid">
            <div className="question-detail">
              <span>How I think about it</span>
              <p>{item.thinking}</p>
            </div>
            <div className="question-detail">
              <span>My recommended approach</span>
              <p>{item.recommendedApproach}</p>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ExpandableListCard({ card, className, openLabel, closeLabel }: { card: ListCard; className: string; openLabel: string; closeLabel: string }) {
  return (
    <article className={className}>
      {card.number ? <strong>{card.number}</strong> : null}
      {card.tag ? <span className="tag">{card.tag}</span> : null}
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <ExpandableItems items={card.items} openLabel={openLabel} closeLabel={closeLabel} />
    </article>
  );
}

function MatrixCellBlock({ cell, isOpen = false }: { cell: MatrixCell; isOpen?: boolean }) {
  return (
    <div>
      <h4>{cell.title}</h4>
      <p>{cell.text}</p>
      {isOpen ? <CardList items={cell.items} /> : null}
    </div>
  );
}

function DeliverableRow({ row }: { row: MatrixRow }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`matrix-row-group ${isOpen ? "is-open" : ""}`}>
      <div className="matrix-row">
        <div className="matrix-stakeholder-cell">
          <h4>{row.recipient.title}</h4>
          <p>{row.recipient.text}</p>
          <button className="detail-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
            {isOpen ? "Close" : "See more"}
          </button>
        </div>
        <MatrixCellBlock cell={row.valueLever} isOpen={isOpen} />
        <MatrixCellBlock cell={row.scope} isOpen={isOpen} />
        <MatrixCellBlock cell={row.pilot} isOpen={isOpen} />
        <MatrixCellBlock cell={row.payoff} isOpen={isOpen} />
      </div>
    </div>
  );
}

function Phase3EmbeddedShowcase() {
  return (
    <section id="phase3" className="section phase3-embedded">
      <SectionIntroBlock
        intro={{
          kicker: "",
          title: "A Phase 3 could look like this.",
          text: "The pilot should not carry the burden of building everything. It should prove which workflows are valuable enough to scale, automate or turn into future services.",
        }}
      />

      <div className="showcase-block">
        <div className="phase-label">Future opportunity areas</div>
        <div className="phase3-grid">
          {phase3OpportunityCards.map((card) => (
            <article className="phase3-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ExpandableItems items={card.items} openLabel="See examples" closeLabel="Hide examples" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyOrchestrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const valueMapSteps: OrchestrationStep[] = [
    {
      number: "1",
      title: "Ping-pong",
      shortValue: "Individual help",
      detail: "Ask, answer, retry. Useful for one person, but the context and learning disappear after each task.",
      variant: "start",
      x: 10,
      y: 86,
      labelSide: "right",
      connectorOffset: {
        x: 6,
        y: -7,
      },
    },
    {
      number: "2",
      title: "Structured use",
      shortValue: "Better output",
      detail: "People use clearer outcomes, better context, examples and review prompts so daily AI work becomes more reliable.",
      variant: "current",
      x: 25,
      y: 83,
      labelSide: "below",
      connectorOffset: {
        x: 0,
        y: 1,
      },
    },
    {
      number: "3",
      title: "Multimodal work",
      shortValue: "Real-work inputs",
      detail: "Voice, transcripts, images, documents, data and slides become part of the workflow instead of separate manual steps.",
      variant: "current",
      x: 42,
      y: 72,
      labelSide: "above",
      connectorOffset: {
        x: -7,
        y: -10,
      },
    },
    {
      number: "4",
      title: "Shared playbooks",
      shortValue: "Learning travels",
      detail: "Examples, context packs and quality checks turn good individual practice into something teams can repeat.",
      variant: "current",
      x: 56,
      y: 57,
      labelSide: "below",
      connectorOffset: {
        x: -4,
        y: 10,
      },
    },
    {
      number: "5",
      title: "Orchestrated workflows",
      shortValue: "Repeatable capability",
      detail: "Skills, approved tools, review points and handoffs turn AI use into a company method.",
      variant: "current",
      x: 70,
      y: 40,
      labelSide: "below",
      connectorOffset: {
        x: 7,
        y: 5,
      },
    },
    {
      number: "6",
      title: "Automations",
      shortValue: "Capacity freed",
      detail: "Recurring preparation, synthesis and follow-up can run with human supervision instead of manual restart.",
      variant: "future",
      x: 82,
      y: 21,
      labelSide: "left",
      connectorOffset: {
        x: -11,
        y: 1,
      },
    },
    {
      number: "7",
      title: "Micro-apps",
      shortValue: "New value",
      detail: "Internal tools, client prototypes and service components create new value.",
      variant: "future",
      x: 93,
      y: 10,
      labelSide: "left",
      connectorOffset: {
        x: -2,
        y: 22,
      },
    },
  ];
  const [activeStepNumber, setActiveStepNumber] = useState("5");
  const activeStepIndex = valueMapSteps.findIndex((step) => step.number === activeStepNumber);
  const activeStep = valueMapSteps[activeStepIndex] ?? valueMapSteps[4];
  const activeSegmentStart = valueMapSteps[Math.max(0, activeStepIndex - 1)] ?? valueMapSteps[0];
  const valueCurvePath = "M10 86 C20 86, 28 83, 38 76 C50 67, 61 56, 70 40 C78 26, 84 15, 93 10";

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel orchestration-panel" role="dialog" aria-modal="true" aria-labelledby="orchestration-title">
        <button className="modal-close" type="button" aria-label="Close why orchestration" onClick={onClose}>
          ×
        </button>
        <div className="kicker">Why orchestration</div>
        <h2 id="orchestration-title">Two paths: ping-pong with AI, or build reusable capability.</h2>
        <p className="orchestration-lede">
          Employees often start with AI in ping-pong mode: ask, answer, retry, move on. That can be useful, but the learning stays personal. The value creation unlock is designing how AI supports the work so context, quality, methods, workflows, automations and small solutions become reusable company capability.
        </p>
        <p className="infrastructure-note">
          Secure, approved infrastructure enables scaling, but value appears when people turn that foundation into daily practice and better ways of working.
        </p>

        <div className="value-map" aria-label="AI value creation map">
          <div className="value-plot">
            <div className="axis-label-y">Reusable company value</div>
            <div className="axis-label-x">AI maturity / orchestration level</div>
            <svg className="value-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path className="chart-grid-line" d="M8 70 H96" />
              <path className="chart-grid-line" d="M8 48 H96" />
              <path className="chart-grid-line" d="M8 26 H96" />
              <path className="chart-axis" d="M8 8 V90 H96" />
              <path className="value-trajectory" d={valueCurvePath} />
              {activeStepIndex > 0 ? (
                <line
                  className="value-active-segment"
                  x1={activeSegmentStart.x}
                  y1={activeSegmentStart.y}
                  x2={activeStep.x}
                  y2={activeStep.y}
                />
              ) : null}
              {valueMapSteps.map((step) => {
                const isActive = activeStepNumber === step.number;

                return (
                  <line
                    className={`value-connector${isActive ? " is-active" : ""}`}
                    key={`${step.title}-connector`}
                    x1={step.x}
                    y1={step.y}
                    x2={step.x + step.connectorOffset.x}
                    y2={step.y + step.connectorOffset.y}
                  />
                );
              })}
              {valueMapSteps.map((step) => {
                const isActive = activeStepNumber === step.number;

                return (
                  <circle
                    className={`value-point value-point--${step.variant}${isActive ? " is-active" : ""}`}
                    key={`${step.title}-point`}
                    cx={step.x}
                    cy={step.y}
                    r={isActive ? "1.9" : "1.35"}
                  />
                );
              })}
            </svg>
            {valueMapSteps.map((step) => {
              const isActive = activeStepNumber === step.number;
              const stepStyle: CSSProperties = {
                left: `${step.x + step.connectorOffset.x}%`,
                top: `${step.y + step.connectorOffset.y}%`,
              };

              return (
                <button
                  className={`value-step value-step--${step.variant} value-step--${step.labelSide}${isActive ? " is-active" : ""}`}
                  type="button"
                  key={step.title}
                  aria-pressed={isActive}
                  style={stepStyle}
                  onClick={() => setActiveStepNumber(step.number)}
                  onFocus={() => setActiveStepNumber(step.number)}
                >
                  <span className="step-number">{step.number}</span>
                  <span className="step-title">{step.title}</span>
                  <span className="step-value">{step.shortValue}</span>
                </button>
              );
            })}
          </div>
          <div className="value-active-summary" aria-live="polite">
            <span>Level {activeStep.number}</span>
            <strong>{activeStep.title}</strong>
            <p>{activeStep.detail}</p>
          </div>
        </div>

        <div className="value-unlock">
          <div>
            <strong>Internal value</strong>
            <p>Capacity, quality, daily use, project work, pitches and company-owned methods.</p>
          </div>
          <div>
            <strong>External value</strong>
            <p>Client delivery, AI-enabled offers, service models, prototypes, tools and solutions.</p>
          </div>
        </div>

        <div className="orchestration-closeout">
          The goal is an AI-enabled operating system that frees capacity, builds capability, unlocks new ideas, and creates more company value.
        </div>
      </section>
    </div>
  );
}

function AboutHenrikModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="about-henrik-title">
        <button className="modal-close" type="button" aria-label="Close about Henrik" onClick={onClose}>
          ×
        </button>
        <div className="kicker">About Henrik</div>
        <h2 id="about-henrik-title">People, technology, business, and AI, made practical.</h2>
        <div className="about-intro">
          <p>
            I have spent more than two decades helping people and organizations turn technology into better work, clearer decisions, and stronger business results. This is a focused one-person practice: I do the work myself, close to the people and the problem.
          </p>
        </div>

        <div className="about-experience">
          <div>
            <span>Experience signal</span>
            <strong>Microsoft, Atea, Circle K, Coca-Cola, and practical AI adoption.</strong>
          </div>
          <p>
            I joined Microsoft in 2012 and have followed AI closely since then. At Atea, I worked across a wide technology ecosystem including Microsoft, AWS, Apple, Google, Cisco, IBM, and others — connecting partner models, sales motions, customer needs, and enterprise transformation.
          </p>
        </div>

        <div className="modal-grid">
          <article className="modal-note">
            <strong>People</strong>
            <span>Help people master AI through coaching, teaching, challenge, and confidence built in real work.</span>
          </article>
          <article className="modal-note">
            <strong>Technology</strong>
            <span>Know what is possible across tools, models, platforms, constraints, and expert perspectives.</span>
          </article>
          <article className="modal-note">
            <strong>Business</strong>
            <span>Connect AI use to outcomes, customers, clients, quality, adoption, and scale.</span>
          </article>
        </div>

        <div className="about-learning">
          <div>
            <span>What I have learned the hard way</span>
            <h3>AI gets valuable when the work is designed around human judgment.</h3>
            <p>
              I know the difference between ad hoc chat that feels useful in the moment and a working system that others can actually use. The evolution now runs from individual chat to structured workflows, automations, small builds, and multimodal work with voice, documents, data, images, and tools.
            </p>
          </div>
          <ul>
            <li>Treat AI like an army of capable specialists that still need direction.</li>
            <li>Build in context, quality bars, better questions, and human challenge.</li>
            <li>Start with what perfect would look like, then reverse-engineer practical steps.</li>
          </ul>
        </div>

        <div className="proof-grid about-proof-grid">
          <article className="proof-card">
            <blockquote>“He has in-depth knowledge regarding AI combined with a strong business acumen and excellent human capital skills.”</blockquote>
            <span>Kristin Ruud, Chief People Officer, Telenor</span>
          </article>
          <article className="proof-card">
            <blockquote>“Henrik was our advisor, mentor, and facilitator in developing a pilot model.”</blockquote>
            <span>Leif Brandeggen, CEO, Studio Sigdal Lørenskog</span>
          </article>
          <article className="proof-card">
            <blockquote>“With his strong leadership experience and deep AI knowledge, Henrik has a unique ability to identify opportunities and challenges, and to create real enthusiasm by making complex topics engaging and accessible.”</blockquote>
            <span>Astrid Skaugseth, former CEO, SHE Conference</span>
          </article>
          <article className="proof-card">
            <blockquote>“In short, Henrik makes innovation feel accessible, and his ability to connect human experience with technology is truly ahead of its time.”</blockquote>
            <span>Karen Romer, Communications Executive</span>
          </article>
        </div>

        <div className="about-contact" aria-label="Henrik contact links">
          <strong>Henrik C. Høst</strong>
          <a href="mailto:henrik@threesixty1.com">henrik@threesixty1.com</a>
          <a href="https://threesixty1.com" target="_blank" rel="noreferrer">
            threesixty1.com
          </a>
          <a href="https://www.linkedin.com/in/henrikhost" target="_blank" rel="noreferrer">
            LinkedIn profile
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
