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
  roadmapCards,
  stakeholderCards,
  type ListCard,
  type MatrixCell,
  type MiniMetric,
  type SectionIntro,
} from "./data";

const mainNav = [
  { label: "Value picture", href: "#value" },
  { label: "Individual easy wins", href: "#quickwins" },
  { label: "Scope vs Pilot", href: "#phases" },
  { label: "Deliverables", href: "#matrix" },
  { label: "Questions", href: "#questions" },
  { label: "Phase 3", href: "/phase-3" },
];

const phase3Nav = [
  { label: "Back to value map", href: "/" },
  { label: "Logic", href: "#logic" },
  { label: "Opportunity areas", href: "#areas" },
  { label: "Learning loop", href: "#loop" },
  { label: "Scale signals", href: "#signals" },
  { label: "Time horizon", href: "#timeline" },
];

function App() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const isPhase3 = pathname === "/phase-3";

  document.title = isPhase3
    ? "Accelerate Lynxeye with AI — Phase 3 Opportunity Map"
    : "Accelerate Lynxeye with AI — Value & Deliverables Map";

  return isPhase3 ? <Phase3Page /> : <MainPage />;
}

function Header({ brand, nav }: { brand: string; nav: { label: string; href: string }[] }) {
  return (
    <header>
      <div className="nav">
        <a className="brand" href="/">
          {brand}
        </a>
        <nav className="navlinks">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
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
  return (
    <>
      <Header brand="Accelerate Lynxeye with AI" nav={mainNav} />
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
              kicker: "Two phases before deeper automation",
              title: "Scope the work first. Then prove value in practice.",
              text: "The structure should make Christian comfortable: we do not over-promise automation or transformation in the pilot. We first understand the current reality, then work inside real Lynxeye workflows to prove what creates value.",
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

        <section id="questions" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Questions this structure answers",
              title: "The proposal links back to Christian’s real concerns.",
              text: "These questions should not sit as a separate appendix. They can be used as the logic behind the scope, the pilot and the final recommendations.",
            }}
          />
          <div className="section-card">
            <div className="question-list">
              {questions.map((item) => (
                <div className="question" key={item.question}>
                  <strong>{item.question}</strong>
                  <span>{item.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="phase3" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "What comes later",
              title: "Phase 3 is where deeper build-out belongs.",
              text: "The pilot should not carry the burden of building everything. It should prove which workflows are valuable enough to scale, automate or turn into future services.",
            }}
          />
          <Roadmap />
          <div className="footer-note">
            The commercial case is not only that Lynxeye can save time. The stronger case is that Lynxeye can turn saved time into better client work, higher delivery capacity, stronger pitches, reusable IP and less dependency on linear hiring every time demand increases.
          </div>
          <div className="phase-link-row">
            <a className="phase-link" href="/phase-3">
              Open the Phase 3 opportunity map
            </a>
          </div>
        </section>
      </main>
    </>
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

function Roadmap() {
  return (
    <div className="roadmap">
      {roadmapCards.map((card) => (
        <article className="roadmap-card" key={card.title}>
          <div className="phase-label">{card.phaseLabel}</div>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  );
}

function Phase3Page() {
  return (
    <>
      <Header brand="Accelerate Lynxeye with AI — Phase 3" nav={phase3Nav} />
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
            <a className="phase-link" href="/">
              Back to the value and deliverables map
            </a>
          </div>
        </section>
      </main>
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
      <defs>
        <linearGradient id="goldLineMain" x1="0" x2="1">
          <stop offset="0" stopColor="#28745a" />
          <stop offset="1" stopColor="#c69a45" />
        </linearGradient>
      </defs>
      <path d="M25 145 C120 135, 170 112, 230 92 C300 68, 340 82, 390 47 C430 19, 480 13, 535 24" fill="none" stroke="url(#goldLineMain)" strokeWidth="6" strokeLinecap="round" />
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
      <defs>
        <linearGradient id="goldLinePhase3" x1="0" x2="1">
          <stop offset="0" stopColor="#28745a" />
          <stop offset="1" stopColor="#c69a45" />
        </linearGradient>
      </defs>
      <path d="M24 145 C110 135, 170 120, 235 92 C300 64, 350 75, 402 43 C450 14, 500 11, 535 22" fill="none" stroke="url(#goldLinePhase3)" strokeWidth="6" strokeLinecap="round" />
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
