import { useEffect, useState } from "react";
import {
  deliverableRows,
  mainHeroMetrics,
  phase3LoopCards,
  phase3OpportunityCards,
  phase3SignalCards,
  phaseCards,
  questions,
  quickWinCards,
  stakeholderCards,
  type MatrixCell,
  type MiniMetric,
  type Question,
  type SectionIntro,
} from "./data";

function App() {
  document.title = "Accelerate Lynxeye with AI — Value & Deliverables Map";

  return <MainPage />;
}

type ActiveModal = "orchestration" | "about" | null;

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
      {metrics.map((metric) => (
        <div className="mini-metric" key={metric.label}>
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
      <div className="kicker">{intro.kicker}</div>
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

function MainPage() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <>
      <Header
        brand="Accelerate Lynxeye with AI"
        onOrchestration={() => setActiveModal("orchestration")}
        onAbout={() => setActiveModal("about")}
      />
      <main>
        <section className="hero">
          <div className="hero-card">
            <div>
              <div className="kicker">Dancing, creating value with AI</div>
              <h1>From scattered AI use to measurable Lynxeye value.</h1>
              <p className="hero-lede">
                A practical project model for helping individuals, teams, clients and Lynxeye capture more value from the intelligence already inside the company — faster work, better outputs, stronger capacity, reusable methods and safer adoption.
              </p>
            </div>
            <MiniMetrics metrics={mainHeroMetrics} />
          </div>

          <aside className="side-card">
            <div>
              <div className="kicker">Executive value logic</div>
              <h2>The investment should pay back in captured value.</h2>
              <p>
                Not only lower cost. The stronger case is higher capability, better client value, faster projects, stronger pitches, reduced bottlenecks and a company rhythm that compounds learning over time.
              </p>
            </div>
            <div className="curve-box" aria-label="Value compounding curve">
              <MainCurve />
              <div className="quote">
                The goal is not to use AI more. The goal is to create more value with the people, methods and judgment Lynxeye already has.
              </div>
            </div>
          </aside>
        </section>

        <QuestionsSection />

        <section id="value" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "The value picture",
              title: "Four stakeholder values, one practical project.",
              text: "The three-layer model stays intact: individuals, teams and Lynxeye. The client layer is added as the value test: the work only matters if it improves what clients experience and what the business captures.",
            }}
          />
          <div className="value-grid">
            {stakeholderCards.map((card) => (
              <article className={`stakeholder-card ${card.className ?? ""}`} key={card.title}>
                <span className="tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <CardList items={card.items} />
              </article>
            ))}
          </div>
        </section>

        <section id="quickwins" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Individual easy wins",
              title: "What employees need to master first.",
              text: "For Lynxeye, the first value is not advanced automation. It is helping consultants, strategists and designers become comfortable using AI in the daily work where insight, judgment, synthesis, storytelling and client quality matter most.",
            }}
          />
          <div className="quickwin-grid">
            {quickWinCards.map((card) => (
              <article className="quickwin-card" key={card.title}>
                <strong>{card.number}</strong>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <CardList items={card.items} />
              </article>
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
                  <CardList items={card.items} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="matrix" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Expandable deliverables map",
              title: "What Lynxeye gets — by value recipient and project phase.",
              text: "The visible table keeps the big picture simple. Each cell opens into concrete version-one deliverables that can be delivered through sessions, examples, captures and the living web delivery hub.",
            }}
          />
          <div className="matrix-wrap">
            <div className="matrix-header">
              <div>Recipient</div>
              <div>Value lever</div>
              <div>Scope & Setup deliverables</div>
              <div>Value Pilot deliverables</div>
              <div>Evidence / payoff signals</div>
            </div>
            {deliverableRows.map((row) => (
              <div className="matrix-row" key={row.recipient.title}>
                <MatrixCellBlock cell={row.recipient} />
                <MatrixCellBlock cell={row.valueLever} />
                <MatrixCellBlock cell={row.scope} />
                <MatrixCellBlock cell={row.pilot} />
                <MatrixCellBlock cell={row.payoff} />
              </div>
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
  const coreQuestions = questions.slice(0, 8);
  const additionalQuestions = questions.slice(8);

  return (
    <section id="questions" className="section section-after-hero">
      <SectionIntroBlock
        intro={{
          kicker: "Lynxeye AI pilot",
          title: "The questions shaping the work",
          text: "These are the questions I hear sitting underneath the conversations so far.",
        }}
      />

      <div className="question-editorial">
        <div className="question-preface">
          <p>
            Some of them are the questions Christian shared directly. Some have become clearer through the discussions around Eraneos, the June 3 session, central AI infrastructure, and what it would mean for Lynxeye to move fast without turning this into hype.
          </p>
          <p>
            I do not think these questions should be answered as separate points. They belong together. They help us understand what the project needs to validate, what the pilot should prove, and what Lynxeye should have in its hands when the work is done.
          </p>
        </div>

        <div className="question-thesis">
          <span>The question underneath the questions</span>
          <p>How does Lynxeye turn AI from scattered experimentation into a better way of working?</p>
        </div>

        <div className="question-group-label">
          <div>
            <span>The eight core questions</span>
            <p>The first six are the original questions. The last two became clearer from the later conversations about Eraneos/HQ and Lynxeye's possible role inside the wider organization.</p>
          </div>
        </div>

        <div className="question-list">
          {coreQuestions.map((item) => (
            <QuestionCard item={item} key={item.number} />
          ))}
        </div>

        <div className="question-group-label question-group-label-additional">
          <div>
            <span>Additional questions we should not ignore</span>
            <p>These are not necessarily the questions to lead with, but they are important if the work is going to scale in a smart way.</p>
          </div>
        </div>

        <div className="question-list">
          {additionalQuestions.map((item) => (
            <QuestionCard item={item} key={item.number} />
          ))}
        </div>

        <div className="question-closeout">
          <div>
            <span>The distinction that matters</span>
            <h3>Eraneos provides the infrastructure. Lynxeye builds the operating practice.</h3>
            <p>
              The work is not about creating a parallel AI setup. It is about translating the group's AI direction into the daily work of a strategy consultancy.
            </p>
          </div>
          <div className="question-practice-list" aria-label="Operating practice areas">
            <span>Pitches</span>
            <span>Research</span>
            <span>Synthesis</span>
            <span>Delivery</span>
            <span>Judgment</span>
            <span>Learning</span>
            <span>Reusable intelligence</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionCard({ item }: { item: Question }) {
  return (
    <article className="question-card">
      <div className="question-rail" aria-label={`Question ${item.number}`}>
        <span>Question</span>
        <strong>{item.number}</strong>
      </div>
      <div className="question-body">
        <h3>{item.question}</h3>
        <div className="question-detail-grid">
          <div className="question-detail">
            <span>How I think about it</span>
            <p>{item.thinking}</p>
          </div>
          <div className="question-detail">
            <span>My recommended approach</span>
            <p>{item.recommendedApproach}</p>
          </div>
          <div className="question-detail question-validate">
            <span>What the project needs to validate</span>
            <ul>
              {item.validate.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function MatrixCellBlock({ cell }: { cell: MatrixCell }) {
  return (
    <div>
      <h4>{cell.title}</h4>
      <p>{cell.text}</p>
      {cell.summary && cell.items?.length ? (
        <details>
          <summary>{cell.summary}</summary>
          <div className="details-body">
            <CardList items={cell.items} />
          </div>
        </details>
      ) : null}
    </div>
  );
}

function Phase3EmbeddedShowcase() {
  return (
    <section id="phase3" className="section phase3-embedded">
      <SectionIntroBlock
        intro={{
          kicker: "What comes later",
          title: "Phase 3 is where deeper build-out belongs.",
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
              <CardList items={card.items} />
            </article>
          ))}
        </div>
      </div>

      <div className="showcase-block">
        <div className="phase-label">The learning loop</div>
        <div className="loop-grid">
          {phase3LoopCards.map((card) => (
            <article className="loop-step" key={card.title}>
              <strong>{card.number}</strong>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="showcase-block">
        <div className="phase-label">Signals that decide the next move</div>
        <div className="signal-grid">
          {phase3SignalCards.map((card) => (
            <article className="signal-card" key={card.title}>
              <span className="tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <CardList items={card.items} />
            </article>
          ))}
        </div>
      </div>

      <div className="footer-note">
        The commercial case is not only that Lynxeye can save time. The stronger case is that Lynxeye can turn saved time into better client work, higher delivery capacity, stronger pitches, reusable IP and less dependency on linear hiring every time demand increases.
      </div>
    </section>
  );
}

function WhyOrchestrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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

  const valueMapSteps = [
    ["1", "Ping-pong chat", "Ask, answer, retry.", "Individual help.", "Most employees do this"],
    ["2", "Structured use", "Better prompts, files, context and role setup.", "Better personal output.", "Value creation unlock"],
    ["3", "Multimodal work", "Voice, transcripts, images, documents, data and slides.", "Less friction across real work.", "Value creation unlock"],
    ["4", "Shared playbooks", "Examples, context packs and quality checks.", "Learning travels across the team.", "Value creation unlock"],
    ["5", "Orchestrated workflows", "Skills, approved tools, review points and handoffs.", "Repeatable capability.", "Value creation unlock"],
    ["6", "Automations and agents", "Recurring work runs with human supervision.", "Capacity is freed.", "Value creation unlock"],
    ["7", "Micro-apps and solutions", "Internal tools, prototypes and service components.", "New ideas, offers and scalable methods.", "Value creation unlock"],
  ];

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
          <div className="axis-label axis-label-y">New value, offers and solutions</div>
          <div className="axis-label axis-label-x">Individual moments → reusable company capability</div>
          <div className="value-map-grid">
            {valueMapSteps.map(([number, stage, change, value, label]) => (
              <article className={`value-step value-step-${number}`} key={stage}>
                <div className="step-meta">
                  <span>{label}</span>
                  <strong>{number}</strong>
                </div>
                <h3>{stage}</h3>
                <p>{change}</p>
                <em>{value}</em>
              </article>
            ))}
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

function MainCurve() {
  return (
    <svg viewBox="0 0 560 180" role="img">
      <path d="M25 145 C120 135, 170 112, 230 92 C300 68, 340 82, 390 47 C430 19, 480 13, 535 24" fill="none" stroke="#28745a" strokeWidth="6" strokeLinecap="round" />
      <path d="M25 154 C160 152, 260 139, 535 118" fill="none" stroke="#ded5c7" strokeWidth="4" strokeLinecap="round" />
      <circle cx="125" cy="132" r="8" fill="#28745a" />
      <circle cx="260" cy="82" r="8" fill="#c69a45" />
      <circle cx="405" cy="38" r="8" fill="#c69a45" />
      <text x="22" y="171" fontSize="15" fill="#706b60">
        Ad hoc use
      </text>
      <text x="208" y="116" fontSize="15" fill="#706b60">
        Repeatable methods
      </text>
      <text x="382" y="70" fontSize="15" fill="#706b60">
        Compounding capability
      </text>
    </svg>
  );
}

export default App;
