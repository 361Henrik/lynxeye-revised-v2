import { useEffect, useState } from "react";
import {
  deliverableRows,
  mainHeroMetrics,
  phase3HeroMetrics,
  phase3LoopCards,
  phase3OpportunityCards,
  phase3PathCards,
  phase3SignalCards,
  phase3TimelineRows,
  phaseCards,
  questions,
  quickWinCards,
  stakeholderCards,
  type ListCard,
  type MatrixCell,
  type MiniMetric,
  type Question,
  type SectionIntro,
} from "./data";

const phase3Nav = [
  { label: "Back to value map", href: "/" },
  { label: "Logic", href: "#logic" },
  { label: "Opportunity areas", href: "#areas" },
  { label: "Learning loop", href: "#loop" },
  { label: "Scale signals", href: "#signals" },
  { label: "Time horizon", href: "#timeline" },
];

const mainNav = [
  { label: "Questions", href: "#questions" },
  { label: "Value", href: "#value" },
  { label: "Phases", href: "#phases" },
  { label: "Deliverables", href: "#matrix" },
  { label: "Phase 3", href: "/phase-3" },
];

type NavItem = {
  label: string;
  href: string;
};

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const isPhase3 = pathname === "/phase-3";

  document.title = isPhase3
    ? "Accelerate Lynxeye with AI — Phase 3 Opportunity Map"
    : "Accelerate Lynxeye with AI — Value & Deliverables Map";

  return isPhase3 ? <Phase3Page /> : <MainPage />;
}

function Header({ brand, nav = [], onAbout }: { brand: string; nav?: NavItem[]; onAbout?: () => void }) {
  return (
    <header>
      <div className="nav">
        <a className="brand" href="/">
          {brand}
        </a>
        <nav className="navlinks" aria-label={`${brand} navigation`}>
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          {onAbout ? (
            <button type="button" onClick={onAbout}>
              About Henrik
            </button>
          ) : null}
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <Header brand="Accelerate Lynxeye with AI" nav={mainNav} onAbout={() => setIsAboutOpen(true)} />
      <main>
        <section className="hero">
          <div className="hero-card">
            <div>
              <div className="kicker">Dancing, creating value with AI</div>
              <h1>From scattered AI use to measurable Lynxeye value.</h1>
              <p className="hero-lede">
                A practical project model for helping individuals, teams, clients and Lynxeye capture more value from the intelligence already inside the company — faster work, better outputs, stronger capacity, reusable methods and safer adoption.
              </p>
              <div className="hero-actions" aria-label="Primary buyer actions">
                <a className="action-link" href="#matrix">
                  Review deliverables
                </a>
                <a className="action-link action-link-secondary" href="/phase-3">
                  Open Phase 3 map
                </a>
              </div>
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
      <AboutHenrikModal open={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
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
      <div className="buyer-closeout">
        <div>
          <div className="phase-label">Buyer next step</div>
          <h3>Use the pilot to prove value, then decide what should scale.</h3>
          <p>
            The main map shows the concrete pilot deliverables. The full Phase 3 map keeps the later scale, automation and service opportunities visible without overloading the first decision.
          </p>
        </div>
        <div className="closeout-actions">
          <a className="phase-link" href="/phase-3">
            Open full Phase 3 map
          </a>
          <a className="phase-link phase-link-secondary" href="mailto:henrik@threesixty1.com">
            Email Henrik
          </a>
        </div>
      </div>
    </section>
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

function Phase3Page() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <Header brand="Accelerate Lynxeye with AI — Phase 3" nav={phase3Nav} onAbout={() => setIsAboutOpen(true)} />
      <main className="phase3-main">
        <section className="hero">
          <div className="hero-card">
            <div>
              <div className="kicker">Phase 3: scale, automate, build</div>
              <h1>What becomes possible after the value pilot proves what works.</h1>
              <p className="hero-lede">
                Phase 3 should be shaped by the learning from Phase 2: what scales to more people, what works for more teams, what improves client projects, what connects to Eraneos/HQ infrastructure, and what new AI capabilities make possible next.
              </p>
            </div>
            <MiniMetrics metrics={phase3HeroMetrics} />
          </div>

          <aside className="side-card">
            <div>
              <div className="kicker">The strategic shift</div>
              <h2>From pilot evidence to compounding capability.</h2>
              <p>
                Phase 2 creates the proof. Phase 3 turns the proof into a repeatable company capability: wider adoption, deeper systems, smarter automations and new ways to create client value.
              </p>
            </div>
            <div className="curve-box" aria-label="Phase 3 compounding curve">
              <Phase3Curve />
              <div className="quote">
                Do not automate the theory. Automate what Phase 2 proves is valuable, repeatable and safe enough to scale.
              </div>
            </div>
          </aside>
        </section>

        <section id="logic" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Phase logic",
              title: "Phase 3 should be evidence-led, not imagination-led.",
              text: "The pilot will generate practical learning: where people get value, where teams move faster, where clients respond, where HQ tools help, and where AI capabilities have changed enough to unlock new use cases.",
            }}
          />
          <div className="path-grid">
            {phase3PathCards.map((card) => (
              <PhasePathCard card={card} key={card.title} />
            ))}
          </div>
        </section>

        <section id="areas" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Opportunity areas",
              title: "Six Phase 3 elements to keep visible.",
              text: "These are not detailed commitments. They are the next-value territories the pilot can point toward.",
            }}
          />
          <div className="phase3-grid">
            {phase3OpportunityCards.map((card) => (
              <article className="phase3-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <CardList items={card.items} />
              </article>
            ))}
          </div>
        </section>

        <section id="loop" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "The Phase 2 to Phase 3 learning loop",
              title: "Implement, measure, validate, scale.",
              text: "Phase 2 should not only observe. When something clearly works, it should be implemented quickly enough to capture value, document proof and decide whether the hypothesis is valid.",
            }}
          />
          <div className="loop-grid">
            {phase3LoopCards.map((card) => (
              <article className="loop-step" key={card.title}>
                <strong>{card.number}</strong>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="signals" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "What Phase 3 should respond to",
              title: "Four signals from the pilot decide the next move.",
              text: "The Phase 3 decision should be based on what the pilot shows across individuals, teams, clients and Lynxeye as a company.",
            }}
          />
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
        </section>

        <section id="timeline" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Future horizon",
              title: "Phase 3 should stay adaptive as AI capability changes.",
              text: "The current tool landscape is not the destination. New multimodal, analytical, agentic and creation capabilities will keep opening use cases that are difficult to specify fully today.",
            }}
          />
          <div className="compact-table">
            <div className="compact-head">
              <div>Horizon</div>
              <div>Likely focus</div>
              <div>Strategic question</div>
            </div>
            {phase3TimelineRows.map((row) => (
              <div className="compact-row" key={row.horizon}>
                <div>{row.horizon}</div>
                <div>
                  <p>{row.focus}</p>
                </div>
                <div>
                  <p>{row.question}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="footer-note">
            Phase 3 should be presented as a value pathway, not a fixed technical roadmap. The point is to let Phase 2 generate the evidence, then scale what works, automate what repeats, integrate what fits HQ infrastructure, and explore new client value as AI capabilities expand.
          </div>
          <div className="phase-link-row">
            <a className="phase-link phase-link-secondary" href="/">
              Back to the value and deliverables map
            </a>
            <a className="phase-link" href="mailto:henrik@threesixty1.com">
              Email Henrik
            </a>
          </div>
        </section>
      </main>
      <AboutHenrikModal open={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}

function PhasePathCard({ card }: { card: ListCard }) {
  return (
    <article className="path-card">
      <div className="phase-label">{card.phaseLabel}</div>
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <CardList items={card.items} />
    </article>
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

function Phase3Curve() {
  return (
    <svg viewBox="0 0 560 180" role="img">
      <path d="M24 145 C110 135, 170 120, 235 92 C300 64, 350 75, 402 43 C450 14, 500 11, 535 22" fill="none" stroke="#28745a" strokeWidth="6" strokeLinecap="round" />
      <path d="M24 154 C170 150, 290 137, 535 116" fill="none" stroke="#ded5c7" strokeWidth="4" strokeLinecap="round" />
      <circle cx="120" cy="134" r="8" fill="#28745a" />
      <circle cx="260" cy="82" r="8" fill="#c69a45" />
      <circle cx="410" cy="38" r="8" fill="#c69a45" />
      <text x="20" y="172" fontSize="15" fill="#706b60">
        Pilot proof
      </text>
      <text x="205" y="116" fontSize="15" fill="#706b60">
        Scaled methods
      </text>
      <text x="382" y="70" fontSize="15" fill="#706b60">
        New value models
      </text>
    </svg>
  );
}

export default App;
