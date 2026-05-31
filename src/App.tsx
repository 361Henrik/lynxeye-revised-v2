import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
import { ValueSimulator } from "./ValueSimulator";

function App() {
  document.title = "Accelerate Lynxeye with AI — Value & Deliverables Map";

  return <MainPage />;
}

type ActiveModal = "journey" | "method" | "agreement" | "projectPlan" | "aiTeam" | "about" | null;

type ExpansionSignal = {
  action: "expand" | "collapse";
  version: number;
};

type TopBarIcon = "journey" | "method" | "agreement" | "plan" | "team" | "henrik";

const topBarItems: { label: string; icon: TopBarIcon; modal: NonNullable<ActiveModal> }[] = [
  { label: "Journey", icon: "journey", modal: "journey" },
  { label: "Methodology", icon: "method", modal: "method" },
  { label: "Agreement", icon: "agreement", modal: "agreement" },
  { label: "Project Plan", icon: "plan", modal: "projectPlan" },
  { label: "AI Team", icon: "team", modal: "aiTeam" },
  { label: "About Henrik", icon: "henrik", modal: "about" },
];

type MethodologyStep = {
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

function useModalFocus(open: boolean, onClose: () => void, initialFocusRef: { current: HTMLElement | null }) {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const storedScrollY = Number(document.body.dataset.modalScrollY);
    const scrollY = Number.isFinite(storedScrollY) ? storedScrollY : window.scrollY;
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const focusTimer = window.setTimeout(() => initialFocusRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = initialFocusRef.current?.closest<HTMLElement>("[role='dialog']");
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      ).filter((element) => element.offsetParent !== null || element === document.activeElement);

      if (!focusableElements.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      delete document.body.dataset.modalScrollY;
      window.scrollTo(0, scrollY);
      restoreFocusRef.current?.focus({ preventScroll: true });
    };
  }, [open, onClose, initialFocusRef]);
}

function useSyncedExpansion(expansionSignal: ExpansionSignal, defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    if (expansionSignal.version === 0) {
      return;
    }

    setIsOpen(expansionSignal.action === "expand");
  }, [expansionSignal]);

  return [isOpen, setIsOpen] as const;
}

function PremiumIcon({ icon }: { icon: TopBarIcon }) {
  switch (icon) {
    case "journey":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18.5c5.9-.4 9.6-4 13.5-12" />
          <path d="M6.5 7.5c4.5 1 7.6 3 10.3 6.7" />
          <circle cx="5" cy="18.5" r="2" />
          <circle cx="18.5" cy="6.5" r="2" />
          <circle cx="16.8" cy="14.2" r="1.75" />
        </svg>
      );
    case "team":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="5.6" r="2.3" />
          <circle cx="6.6" cy="17.4" r="2.3" />
          <circle cx="17.4" cy="17.4" r="2.3" />
          <path d="M12 8v3.2" />
          <path d="M12 11.2H6.6v3.6" />
          <path d="M12 11.2h5.4v3.6" />
        </svg>
      );
    case "method":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.5 7.2 12 4l6.5 3.2-6.5 3.2-6.5-3.2Z" />
          <path d="m5.5 12 6.5 3.2 6.5-3.2" />
          <path d="m5.5 16.7 6.5 3.2 6.5-3.2" />
          <circle cx="12" cy="10.4" r="1.15" />
        </svg>
      );
    case "henrik":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.2 18.6c.7-2.6 2-4 3.8-4s3.1 1.4 3.8 4" />
          <circle cx="12" cy="9.1" r="3.1" />
          <path d="M5.5 20.5h13" />
          <path d="M18.7 6.4 20 5.1" />
          <path d="M5.3 6.4 4 5.1" />
        </svg>
      );
    case "agreement":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 4.5h7.2L18 8.3v11.2H7V4.5Z" />
          <path d="M14.2 4.5v3.8H18" />
          <path d="M9.5 12h5" />
          <path d="M9.5 15h3.4" />
          <circle cx="15.8" cy="16.2" r="2" />
        </svg>
      );
    case "plan":
      return (
        <svg className="premium-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5.3 6.5h13.4" />
          <path d="M5.3 12h13.4" />
          <path d="M5.3 17.5h13.4" />
          <circle cx="7" cy="6.5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </svg>
      );
  }
}

function Header({
  brand,
  onOpenModal,
}: {
  brand: string;
  onOpenModal: (modal: NonNullable<ActiveModal>) => void;
}) {
  return (
    <header>
      <div className="nav">
        <a className="brand" href="#top">
          {brand}
        </a>
        <nav className="top-icon-nav" aria-label={`${brand} menu`}>
          {topBarItems.map((item) => (
            <button className="top-icon-button" type="button" aria-label={item.label} onClick={() => onOpenModal(item.modal)} key={item.modal}>
              <span className="top-icon-mark" aria-hidden="true">
                <PremiumIcon icon={item.icon} />
              </span>
              <span className="top-icon-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function MiniMetricDetail({ details }: { details: NonNullable<MiniMetric["details"]> }) {
  return (
    <div className="mini-metric-detail">
      {details.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="mini-metric-detail-grid">
        {details.sections.map((section) => (
          <section className="mini-metric-detail-section" key={section.title}>
            <h4>{section.title}</h4>
            {section.body?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items?.length ? <CardList items={section.items} /> : null}
          </section>
        ))}
      </div>
    </div>
  );
}

function MiniMetrics({ metrics, expansionSignal }: { metrics: MiniMetric[]; expansionSignal: ExpansionSignal }) {
  const [openMetrics, setOpenMetrics] = useState<string[]>([]);

  useEffect(() => {
    if (expansionSignal.version === 0) {
      return;
    }

    setOpenMetrics(expansionSignal.action === "expand" ? metrics.filter((metric) => metric.details).map((metric) => metric.label) : []);
  }, [expansionSignal, metrics]);

  return (
    <div className="hero-bottom">
      {metrics.map((metric, index) => {
        const isOpen = openMetrics.includes(metric.label);

        return (
          <div className={`mini-metric${index === metrics.length - 1 ? " mini-metric-foundation" : ""}${isOpen ? " is-open" : ""}`} key={metric.label}>
            <strong>{metric.label}</strong>
            <span>{metric.text}</span>
            {metric.details ? (
              <div className="mini-metric-action">
                <button
                  className="detail-toggle"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenMetrics((current) =>
                      current.includes(metric.label) ? current.filter((label) => label !== metric.label) : [...current, metric.label],
                    )
                  }
                >
                  {isOpen ? "Hide rationale" : "View rationale"}
                </button>
              </div>
            ) : null}
            {metric.details && isOpen ? <MiniMetricDetail details={metric.details} /> : null}
          </div>
        );
      })}
    </div>
  );
}

function SectionIntroBlock({ intro }: { intro: SectionIntro }) {
  return (
    <div className="section-intro">
      {intro.kicker ? <div className="kicker">{intro.kicker}</div> : null}
      <h2>{intro.title}</h2>
      {intro.text ? <p>{intro.text}</p> : null}
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

function ExpandableItems({
  items,
  expansionSignal,
  openLabel = "View details",
  closeLabel = "Hide details",
}: {
  items?: string[];
  expansionSignal: ExpansionSignal;
  openLabel?: string;
  closeLabel?: string;
}) {
  const [isOpen, setIsOpen] = useSyncedExpansion(expansionSignal);

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

type JourneyStep = {
  marker: string;
  horizon: string;
  title: string;
  text: string;
  items: string[];
};

const journeySteps: JourneyStep[] = [
  {
    marker: "Now",
    horizon: "Current reality",
    title: "AI is already changing the work around Lynxeye.",
    text:
      "Employees are experimenting, headquarters is building infrastructure, clients are learning fast, and competitors will not wait. The question is no longer whether Lynxeye should use AI. The question is how to turn it into a way of working that protects quality and creates advantage.",
    items: ["Map current friction and confidence.", "Connect local practice to headquarters guardrails.", "Pick live cases where value can be seen quickly."],
  },
  {
    marker: "5 weeks",
    horizon: "Phase 1",
    title: "Set up the people, cases and early proof.",
    text:
      "Phase 1 can stand alone: workbenches ready, selected people onboarded, live cases chosen, first workflows tested, and the opportunity made concrete before Lynxeye decides whether Phase 2 should continue, change or pause.",
    items: ["Participant setup and tool readiness.", "Case selection and first workflow tests.", "Early evidence around speed, quality and confidence."],
  },
  {
    marker: "8 weeks",
    horizon: "Phase 2",
    title: "Expand and create more value inside real Lynxeye work.",
    text:
      "Phase 2 is the optional expansion path after the Phase 1 checkpoint. It works inside live meetings, research, synthesis, pitches and client-facing material to create stronger proof, reusable methods and a clear recommendation on what should scale.",
    items: ["1:1 and team workflow coaching.", "Before/after examples and quality checks.", "Reusable prompts, playbooks and delivery hub material."],
  },
  {
    marker: "2026",
    horizon: "Scale year",
    title: "Turn the best methods into company capability.",
    text:
      "The first value proof should become the base for scaled practice through 2026: stronger champions, clearer workflows, reusable examples, selected AI teammates and better integration with approved infrastructure.",
    items: ["Scale proven methods beyond the first group.", "Decide which agents or workflows deserve structure.", "Feed Lynxeye learning back into the broader organization."],
  },
  {
    marker: "2027+",
    horizon: "Operating model",
    title: "Build toward an AI-supported consulting operating model.",
    text:
      "AI tools, AI thinking and AI-native workflows will keep improving. Lynxeye can use this project to prepare for compounding capability rather than repeated isolated experiments.",
    items: ["Agent-supported teams where people set direction and review the work.", "New service and demo possibilities.", "Reusable firm knowledge harvested from every engagement."],
  },
];

function JourneyContent({ titleId = "journey-title" }: { titleId?: string }) {
  return (
    <div className="journey-content">
      <div className="kicker">Basic journey</div>
      <h2 id={titleId}>From AI experimentation to a scalable Lynxeye advantage.</h2>
      <p className="journey-lede">
        This is the story to make clear at the start: the work begins with practical setup and live cases, but the real ambition is a
        step-change in capacity, quality and reuse that compounds through 2026 and into 2027.
      </p>

      <div className="journey-upside">
        <article>
          <span>Potential upside</span>
          <strong>5x to 10x</strong>
          <p>capacity improvement in selected workflows when AI reduces routine work and consultants stay responsible for direction, review and final decisions.</p>
        </article>
        <article>
          <span>Quality ambition</span>
          <strong>Up to 10x</strong>
          <p>better output quality where review, challenge, source grounding and Lynxeye standards are built into the workflow.</p>
        </article>
        <article>
          <span>Strategic point</span>
          <strong>Not a tool rollout</strong>
          <p>a practical journey from individual use to shared methods, reusable knowledge and AI-supported teams.</p>
        </article>
      </div>

      <div className="journey-map" aria-label="Basic journey map">
        {journeySteps.map((step, index) => (
          <details className="journey-step" key={step.title}>
            <summary>
              <span>{step.marker}</span>
              <div>
                <em>{step.horizon}</em>
                <strong>{step.title}</strong>
              </div>
            </summary>
            <p>{step.text}</p>
            <CardList items={step.items} />
          </details>
        ))}
      </div>
    </div>
  );
}

function JourneyModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel journey-panel" role="dialog" aria-modal="true" aria-labelledby="journey-modal-title">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close journey" onClick={onClose}>
          ×
        </button>
        <JourneyContent titleId="journey-modal-title" />
      </section>
    </div>
  );
}

function MainPage() {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [showStakeholderDetails, setShowStakeholderDetails] = useState(false);
  const [isPreparingPdf, setIsPreparingPdf] = useState(false);
  const [expansionSignal, setExpansionSignal] = useState<ExpansionSignal>({ action: "collapse", version: 0 });

  const sendExpansionSignal = useCallback((action: ExpansionSignal["action"]) => {
    setExpansionSignal((current) => ({ action, version: current.version + 1 }));
    setShowStakeholderDetails(action === "expand");
  }, []);

  const openModal = useCallback((modal: NonNullable<ActiveModal>) => {
    document.body.dataset.modalScrollY = String(window.scrollY);
    setActiveModal(modal);
  }, []);

  const prepareForPdf = useCallback(() => {
    setActiveModal(null);
    setIsPreparingPdf(true);
    sendExpansionSignal("expand");
  }, [sendExpansionSignal]);

  const handleDownloadPdf = useCallback(() => {
    prepareForPdf();
    window.setTimeout(() => window.print(), 180);
  }, [prepareForPdf]);

  useEffect(() => {
    document.body.classList.toggle("is-pdf-export", isPreparingPdf);

    return () => document.body.classList.remove("is-pdf-export");
  }, [isPreparingPdf]);

  useEffect(() => {
    const handleBeforePrint = () => prepareForPdf();
    const handleAfterPrint = () => setIsPreparingPdf(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [prepareForPdf]);

  return (
    <>
      <Header brand="Accelerate Lynxeye with AI" onOpenModal={openModal} />
      <main>
        <section className="hero hero-reset" id="top">
          <div className="hero-card">
            <div>
              <div className="kicker">"Dancing with AI"</div>
              <h1>Helping Lynxeye turn AI into a 2026 advantage, not just a faster way to make more output.</h1>
              <p className="hero-lede">
                A practical project model for creating 5x to 10x potential in selected workflows, stronger client-facing quality,
                reusable methods, and a foundation for AI-supported scale into 2027.
              </p>
            </div>
            <MiniMetrics metrics={mainHeroMetrics} expansionSignal={expansionSignal} />
          </div>
        </section>

        <QuestionsSection expansionSignal={expansionSignal} />

        <section id="value" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "",
              title: "Four stakeholder values, one practical project.",
              text: "The three-layer model stays intact: employees, teams and Lynxeye. The client layer is added as the value test: the work only matters if it improves what clients experience and what the business captures.",
            }}
          />
          <div className="section-actions">
            <button className="detail-toggle" type="button" aria-expanded={showStakeholderDetails} onClick={() => setShowStakeholderDetails((current) => !current)}>
              {showStakeholderDetails ? "Hide rationale" : "View rationale"}
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
              kicker: "Employee early wins",
              title: "What employees need to master first.",
              text: "For Lynxeye, the first value is not advanced automation. It is helping consultants, strategists and designers become comfortable using AI in the daily work where insight, judgment, synthesis, storytelling and client quality matter most.",
            }}
          />
          <div className="quickwin-grid">
            {quickWinCards.map((card) => (
              <ExpandableListCard
                card={card}
                className="quickwin-card"
                expansionSignal={expansionSignal}
                openLabel="View examples"
                closeLabel="Hide examples"
                key={card.title}
              />
            ))}
          </div>
        </section>

        <section id="phases" className="section">
          <SectionIntroBlock
            intro={{
              kicker: "Project path",
              title: "Set up, create early value, then decide what scales.",
              text: "The structure keeps this agreement focused: Phase 1 can stand alone, Phase 2 is an optional expansion after the checkpoint, and Phase 3 stays visible as a separate future decision.",
            }}
          />
          <div className="tabs">
            {phaseCards.map((card) => (
              <article className="phase-card" key={card.title}>
                <div className="phase-number">{card.number}</div>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ExpandableItems items={card.items} expansionSignal={expansionSignal} openLabel="View deliverables" closeLabel="Hide deliverables" />
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
              <div>Phase 1: Setup & Early Value</div>
              <div>Phase 2: Expand & Create More Value</div>
              <div>Success signals</div>
            </div>
            {deliverableRows.map((row) => (
              <DeliverableRow row={row} expansionSignal={expansionSignal} key={row.recipient.title} />
            ))}
          </div>
        </section>

        <ValueSimulator expansionSignal={expansionSignal} />
        <AiTeamSection />
        <Phase3EmbeddedShowcase expansionSignal={expansionSignal} />
        <AgreementPrintSection onDownloadPdf={handleDownloadPdf} />
        <ProjectPlanPrintSection />
      </main>
      <JourneyModal open={activeModal === "journey"} onClose={() => setActiveModal(null)} />
      <ProposedMethodModal open={activeModal === "method"} onClose={() => setActiveModal(null)} />
      <AgreementModal
        open={activeModal === "agreement"}
        onClose={() => setActiveModal(null)}
        onDownloadPdf={handleDownloadPdf}
        onNavigate={() => setActiveModal(null)}
      />
      <ProjectPlanModal open={activeModal === "projectPlan"} onClose={() => setActiveModal(null)} />
      <AiTeamModal open={activeModal === "aiTeam"} onClose={() => setActiveModal(null)} />
      <AboutHenrikModal open={activeModal === "about"} onClose={() => setActiveModal(null)} />
    </>
  );
}

function QuestionsSection({ expansionSignal }: { expansionSignal: ExpansionSignal }) {
  return (
    <section id="questions" className="section section-after-hero">
      <SectionIntroBlock
        intro={{
          kicker: "",
          title: "The key questions Lynxeye are asking...",
        }}
      />

      <div className="question-editorial">
        <div className="question-list">
          {questions.map((item) => (
            <QuestionCard item={item} expansionSignal={expansionSignal} key={item.number} />
          ))}
        </div>
      </div>
    </section>
  );
}

function QuestionCard({ item, expansionSignal }: { item: Question; expansionSignal: ExpansionSignal }) {
  const [isOpen, setIsOpen] = useSyncedExpansion(expansionSignal);

  return (
    <article className={`question-card ${isOpen ? "is-open" : ""}`}>
      <div className="question-rail" aria-label={`Question ${item.number}`}>
        <strong>{item.number}</strong>
      </div>
      <div className="question-body">
        <div className="question-summary">
          <h3>“{item.question}”</h3>
          <button className="detail-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
            {isOpen ? "Hide rationale" : "View rationale"}
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
            <div className="question-detail question-detail--validate">
              <span>Validate with</span>
              <ul>
                {item.validate.map((prompt) => (
                  <li key={prompt}>{prompt}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function ExpandableListCard({
  card,
  className,
  expansionSignal,
  openLabel,
  closeLabel,
}: {
  card: ListCard;
  className: string;
  expansionSignal: ExpansionSignal;
  openLabel: string;
  closeLabel: string;
}) {
  return (
    <article className={className}>
      {card.number ? <strong>{card.number}</strong> : null}
      {card.tag ? <span className="tag">{card.tag}</span> : null}
      <h3>{card.title}</h3>
      <p>{card.text}</p>
      <ExpandableItems items={card.items} expansionSignal={expansionSignal} openLabel={openLabel} closeLabel={closeLabel} />
    </article>
  );
}

function MatrixCellBlock({ cell, isOpen = false }: { cell: MatrixCell; isOpen?: boolean }) {
  return (
    <>
      <h4>{cell.title}</h4>
      <p>{cell.text}</p>
      {isOpen ? <CardList items={cell.items} /> : null}
    </>
  );
}

function DeliverableRow({ row, expansionSignal }: { row: MatrixRow; expansionSignal: ExpansionSignal }) {
  const [isOpen, setIsOpen] = useSyncedExpansion(expansionSignal);

  return (
    <div className={`matrix-row-group ${isOpen ? "is-open" : ""}`}>
      <div className="matrix-row">
        <div className="matrix-stakeholder-cell" data-label="Stakeholder">
          <span className="matrix-cell-label">Stakeholder</span>
          <h4>{row.recipient.title}</h4>
          <p>{row.recipient.text}</p>
          <button className="detail-toggle" type="button" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)}>
            {isOpen ? "Hide deliverables" : "View deliverables"}
          </button>
        </div>
        <div className="matrix-cell" data-label="Value created">
          <span className="matrix-cell-label">Value created</span>
          <MatrixCellBlock cell={row.valueLever} isOpen={isOpen} />
        </div>
        <div className="matrix-cell" data-label="Phase 1: Setup & Early Value">
          <span className="matrix-cell-label">Phase 1: Setup & Early Value</span>
          <MatrixCellBlock cell={row.scope} isOpen={isOpen} />
        </div>
        <div className="matrix-cell" data-label="Phase 2: Expand & Create More Value">
          <span className="matrix-cell-label">Phase 2: Expand & Create More Value</span>
          <MatrixCellBlock cell={row.pilot} isOpen={isOpen} />
        </div>
        <div className="matrix-cell" data-label="Success signals">
          <span className="matrix-cell-label">Success signals</span>
          <MatrixCellBlock cell={row.payoff} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}

type AiAgent = {
  name: string;
  text: string;
};

type AiAgentGroup = {
  title: string;
  text: string;
  agents: AiAgent[];
};

const aiTierOneGroups: AiAgentGroup[] = [
  {
    title: "Knowledge & Memory",
    text: "Find, structure and reuse the material Lynxeye already has.",
    agents: [
      { name: "Archivist", text: "Finds past slides, models, frameworks and project material." },
      { name: "Case Librarian", text: "Turns cases into a living, queryable database." },
      { name: "File Steward", text: "Names, tags, sorts and keeps files in order automatically." },
    ],
  },
  {
    title: "Research & Truth",
    text: "Gather external context and keep claims grounded.",
    agents: [
      { name: "Scout", text: "Runs industry, company and market research on demand." },
      { name: "Fact-Checker", text: "Verifies claims and keeps sources visible." },
      { name: "Client Analyst", text: "Reads client documents so the team walks in fluent." },
    ],
  },
  {
    title: "Thinking & Creation",
    text: "Turn raw thinking into sharper concepts, stories and visuals.",
    agents: [
      { name: "Sparring Partner", text: "Pushes concepts harder and helps pressure-test ideas." },
      { name: "Storyliner", text: "Turns insight piles into narrative arcs that land." },
      { name: "Visualizer", text: "Makes text-heavy thinking more designed and tangible." },
    ],
  },
  {
    title: "Production & Craft",
    text: "Improve the production layer without letting craft become generic.",
    agents: [
      { name: "Designer", text: "Finds layouts matched to the story and audience." },
      { name: "Data Hand", text: "Populates, checks and flags numbers in spreadsheets." },
    ],
  },
  {
    title: "Run & Operate",
    text: "Keep projects moving while people stay present in the room.",
    agents: [
      { name: "Scribe", text: "Captures notes, outcomes and actions from meetings." },
      { name: "Version Keeper", text: "Knows which deck is current and what changed." },
      { name: "Dashboard", text: "Reflects live project status and open loops." },
    ],
  },
];

const aiSignatureAgents: AiAgent[] = [
  { name: "The Client Twin", text: "Rehearse against a simulated customer before the room." },
  { name: "The Virtual Advisor", text: "A senior strategic mind on call around the clock." },
  { name: "The Live Interpreter", text: "Thai and English simultaneous support in the room." },
  { name: "The Red Team", text: "Attacks the logic before the client gets the chance." },
  { name: "The House Voice", text: "Keeps everything sounding unmistakably Lynxeye." },
  { name: "The Harvester", text: "Turns every engagement into reusable firm knowledge." },
];

function AgentCard({ agent }: { agent: AiAgent }) {
  return (
    <article className="ai-agent-card">
      <strong>{agent.name}</strong>
      <p>{agent.text}</p>
    </article>
  );
}

function AiTeamContent({ titleId = "ai-team-title" }: { titleId?: string }) {
  return (
    <div className="ai-team-content">
      <div className="kicker">AI Team concept</div>
      <h2 id={titleId}>Not a tool you reach for. A team you direct.</h2>
      <p className="ai-team-lede">
        Most firms use AI like a vending machine: ask, receive, repeat. The method-led firm runs a standing team of AI teammates, each
        with a job, all reporting to human judgment.
      </p>

      <div className="ai-orchestrator-card">
        <span>Orchestrator</span>
        <strong>The Lynxeye consultant</strong>
        <p>You. Human judgment leads. AI accelerates. Playbooks scale.</p>
      </div>

      <div className="ai-tier-label">
        <span>Tier 1</span>
        <strong>Core AI teammates - buildable workflow patterns now</strong>
      </div>
      <div className="ai-team-groups">
        {aiTierOneGroups.map((group, index) => (
          <details className="ai-team-group" key={group.title}>
            <summary>
              <span>{group.title}</span>
              <p>{group.text}</p>
            </summary>
            <div className="ai-agent-grid">
              {group.agents.map((agent) => (
                <AgentCard agent={agent} key={agent.name} />
              ))}
            </div>
          </details>
        ))}
      </div>

      <div className="ai-tier-label ai-tier-label-future">
        <span>Tier 2</span>
        <strong>Signature agents - ambition layer for 2026 and 2027+</strong>
      </div>
      <div className="ai-signature-grid">
        {aiSignatureAgents.map((agent) => (
          <AgentCard agent={agent} key={agent.name} />
        ))}
      </div>
      <p className="ai-team-note">
        This is not a promise to build every agent in the first engagement. It is a strategic picture of how Lynxeye can move from
        isolated AI use to a scalable team model with human loops and quality gates.
      </p>
    </div>
  );
}

function AiTeamSection() {
  return (
    <section id="ai-team" className="section ai-team-section">
      <AiTeamContent />
    </section>
  );
}

function AiTeamModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel ai-team-panel" role="dialog" aria-modal="true" aria-labelledby="ai-team-modal-title">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close AI Team" onClick={onClose}>
          ×
        </button>
        <AiTeamContent titleId="ai-team-modal-title" />
      </section>
    </div>
  );
}

function Phase3EmbeddedShowcase({ expansionSignal }: { expansionSignal: ExpansionSignal }) {
  return (
    <section id="phase3" className="section phase3-embedded">
      <SectionIntroBlock
        intro={{
          kicker: "",
          title: "Phase 3 is the future scale decision, not this offer.",
          text: "This offer should not carry the burden of building everything. Phase 1 creates the first evidence, Phase 2 can expand it if Lynxeye chooses, and Phase 3 should only follow what the evidence proves.",
        }}
      />

      <div className="showcase-block">
        <div className="phase-label">Future opportunity areas</div>
        <div className="phase3-grid">
          {phase3OpportunityCards.map((card) => (
            <article className="phase3-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <ExpandableItems items={card.items} expansionSignal={expansionSignal} openLabel="View examples" closeLabel="Hide examples" />
            </article>
          ))}
        </div>
      </div>
      <div className="phase3-closeout">
        <span>Current agreement boundary</span>
        <strong>First set up the real work, create early value, and use evidence to decide what deserves scale.</strong>
        <p>
          Phase 3 should be chosen from proof, not promised upfront: the current agreement lets Lynxeye start with Phase 1, decide after the checkpoint whether Phase 2 should continue or change, and make the next investment decision clearer.
        </p>
      </div>
    </section>
  );
}

type ProposalCard = {
  title: string;
  text: string;
  label?: string;
  variant?: "accent" | "muted";
};

type ProposalTableRow = {
  cells: string[];
};

type ProposalDetail = {
  title: string;
  body?: string;
  items?: string[];
};

const proposalValueCards: ProposalCard[] = [
  {
    title: "Less friction",
    text: "Employees spend less time restarting from zero, struggling with context, over-iterating or using AI without clear quality control.",
  },
  {
    title: "Stronger output",
    text: "Teams create sharper synthesis, clearer pitch material, better review routines and more tangible client-facing examples.",
  },
  {
    title: "Reusable capability",
    text: "Lynxeye keeps prompts, playbooks, examples, quality checks and workflow patterns that can be reused and scaled.",
  },
];

const proposalStakeholders: ProposalCard[] = [
  { title: "Employees", text: "Confidence, control and better daily work.", variant: "muted" },
  { title: "Teams", text: "Shared rhythm, less reinvention and more capacity." },
  { title: "Clients", text: "Sharper output, faster proof and clearer options." },
  { title: "Lynxeye", text: "Commercial leverage, reusable methods and scale choices.", variant: "accent" },
  { title: "Headquarters", text: "Infrastructure, governance, approved tools and adoption direction." },
];

const proposalTimeline: ProposalCard[] = [
  {
    label: "5 weeks",
    title: "Phase 1 - Setup & Early Value",
    text: "A standalone first engagement: set up the workbench, map stakeholders and current AI practice, connect to headquarters infrastructure, review proposed client cases, run first workflow tests and create the Phase 1 checkpoint evidence.",
  },
  {
    label: "Approx. 8 weeks",
    title: "Phase 2 - Expand & Create More Value",
    text: "An optional continuation after the Phase 1 checkpoint: deepen coaching, expand client-case work, mature reusable methods and adjust the scope based on what Phase 1 proves.",
    variant: "accent",
  },
  {
    label: "Separately scoped",
    title: "Phase 3 - Scale Across Lynxeye",
    text: "Phase 3 is not included in this offer. It should only be considered after Phase 2 evidence and can be delivered internally, externally, or through a blended model.",
    variant: "muted",
  },
];

const proposalPhaseRows: ProposalTableRow[] = [
  {
    cells: [
      "Phase 1 / Setup & Early Value / 5 weeks",
      "Stakeholder mapping, current-practice scan, HQ alignment, client movement scan, participant setup, proposed case review, anchor case selection and first workflow tests.",
      "Stakeholder map, AI practice map, HQ alignment notes, client movement scan, participant baseline, anchor case brief, early before/after examples, reusable methods v1, delivery hub v1 and Phase 1 checkpoint recommendation.",
      "Creates standalone value and gives Lynxeye the evidence to stop, continue or reshape Phase 2.",
    ],
  },
  {
    cells: [
      "Phase 2 / Expand & Create More Value / Approx. 8 weeks",
      "Optional deeper 1:1 coaching, team workflow sessions, expanded client-case work, quality routines, reusable method maturity and recommendation work after the Phase 1 decision.",
      "Stronger before/after examples, mature prompts and playbooks, delivery hub content, success signals and Phase 3 recommendation report.",
      "Expands value creation in real work and leaves Lynxeye with evidence-backed capability.",
    ],
  },
  {
    cells: [
      "Phase 3 / Scale Across Lynxeye / Separately scoped",
      "Scale proven methods across Lynxeye, automate repeatable workflows or develop new client-facing services based on proven Phase 2 value.",
      "Scoped separately after Phase 2 evidence.",
      "Allows Lynxeye to scale what has evidence, not what is assumed.",
    ],
  },
];

const proposalAnchorOptions: ProposalCard[] = [
  {
    title: "Option A: one anchor case",
    text: "Best when the goal is focus, speed and shared learning around a single desired client pitch or strategic opportunity.",
  },
  {
    title: "Option B: two anchor cases",
    text: "Useful if Lynxeye wants to test both a client-facing pitch flow and an internal workflow improvement case.",
  },
];

const proposalDeliverables: ProposalTableRow[] = [
  { cells: ["Five-stakeholder map", "Phase 1", "Employees, teams, clients, Lynxeye and headquarters listed with needs, constraints and value questions.", "Clarifies who must benefit and who can block adoption."] },
  { cells: ["Current AI practice map", "Phase 1", "How people use AI today, what creates value, where they hesitate and where friction remains.", "Shows where support can create practical improvement."] },
  { cells: ["HQ infrastructure alignment notes", "Phase 1", "Connection between local enablement and approved tools, governance, security and guardrails.", "Reduces adoption and compliance risk."] },
  { cells: ["Client movement scan", "Phase 1", "What clients are asking, expecting or already doing around AI.", "Links the work to external relevance."] },
  { cells: ["Proposed client case review", "Phase 1", "The proposed client, pitch or workflow cases reviewed and prioritized for practical learning.", "Starts value creation inside real work earlier."] },
  { cells: ["Anchor case brief", "Phase 1", "The agreed client, pitch or workflow case used as the practical learning context.", "Avoids abstract training."] },
  { cells: ["Participant setup baseline", "Phase 1", "Shared starting point for tools, prompting, context, voice, review habits and safe use.", "Creates a fair starting line."] },
  { cells: ["Early coaching and workflow tests", "Phase 1", "First practical support inside selected employees' and teams' actual work.", "Turns setup into immediate early value."] },
  { cells: ["Early before/after examples", "Phase 1", "First examples showing improved speed, clarity, quality or tangibility.", "Makes value visible before Phase 2 expansion."] },
  { cells: ["Reusable methods v1", "Phase 1", "First captured prompts, review habits and workflow patterns Lynxeye can keep using.", "Starts reusable company memory early."] },
  { cells: ["Living delivery hub v1", "Phase 1", "Initial shared repository of examples, decisions, prompts and working notes.", "Prevents early learning from disappearing between sessions."] },
  { cells: ["Expanded coaching and team sessions", "Phase 2", "Deeper practical support across selected employees, teams and client-case work.", "Expands capability from early proof into stronger practice."] },
  { cells: ["Mature prompts, playbooks and quality routines", "Phase 2", "Reusable methods refined into clearer playbooks, examples and review routines.", "Makes the capability repeatable beyond the first participants."] },
  { cells: ["Living delivery hub maturity", "Phase 2", "Delivery hub expanded with examples, decisions, playbooks, prompts, methods and recommendations.", "Turns the engagement into reusable Lynxeye infrastructure."] },
  { cells: ["Phase 1 checkpoint recommendation", "Phase 1", "Evidence-based view of whether Lynxeye should stop, continue into Phase 2 as planned or adjust Phase 2 scope.", "Protects Lynxeye from committing beyond what the evidence supports."] },
  { cells: ["Phase 3 recommendation report", "Phase 2", "Evidence-based view of what should scale, wait, automate or become a client-facing opportunity after optional Phase 2 expansion.", "Supports a responsible next investment decision."] },
];

const proposalSuccessRows: ProposalTableRow[] = [
  { cells: ["Employee confidence", "Participants use AI repeatedly without heavy support and know when to stop the AI loop.", "Participant reflections, examples and observed workflow change."] },
  { cells: ["Speed", "Selected workflows move faster without reducing quality.", "Before/after process snapshots and time-saved estimates where sensible."] },
  { cells: ["Quality", "Outputs become clearer, sharper and better structured.", "Output comparisons, review prompts and quality criteria."] },
  { cells: ["Team rhythm", "Teams reuse shared methods instead of each person improvising separately.", "Reusable workflows, meeting-to-output examples and shared templates."] },
  { cells: ["Client impact", "Client-facing material becomes more tangible earlier.", "Pitch fragments, prototypes, synthesis examples or client-ready options."] },
  { cells: ["HQ alignment", "Local methods fit approved tools, infrastructure and guardrails.", "Tool map, constraints list and adoption recommendations."] },
  { cells: ["Scale readiness", "Lynxeye can decide what should be scaled across Lynxeye, automated or developed further.", "Prioritized Phase 3 roadmap with rationale."] },
];

const proposalPriceCards: ProposalCard[] = [
  {
    title: "Phase 1 - Setup & Early Value",
    text: "5 weeks. Professional fee range: 350,000 to 390,000 NOK, excluding agreed-upon travel costs. Can be selected as a standalone engagement. Includes stakeholder mapping, current-practice scan, HQ alignment, proposed case review, first workflow tests, early value proof and the Phase 1 checkpoint.",
  },
  {
    title: "Phase 2 - Expand & Create More Value",
    text: "Approx. 8 weeks. Professional fee range: 460,000 to 540,000 NOK, excluding agreed-upon travel costs. Optional after Phase 1 and adjustable based on what Phase 1 proves. Includes deeper coaching, expanded team sessions, client-case work, mature reusable methods and recommendation report.",
    variant: "accent",
  },
  {
    title: "Phase 3 - Scale Across Lynxeye",
    text: "Outside the scope of this offer. Phase 3 is not included in Phase 1 or Phase 2 pricing and should be scoped separately only after Phase 2 evidence.",
    variant: "muted",
  },
];

const proposalPriceDetails: ProposalDetail[] = [
  {
    title: "Phase choice",
    body: "Lynxeye can start with Phase 1 only. After Phase 1, Lynxeye can stop collaboration, continue into Phase 2, or adjust Phase 2 based on the evidence created in Phase 1.",
  },
  {
    title: "If Phase 2 is selected",
    body: "If Lynxeye selects Phase 2 after Phase 1, the combined professional fee range is 810,000 to 930,000 NOK, excluding agreed-upon travel costs. Phase 2 can still be refined after the Phase 1 checkpoint.",
  },
  {
    title: "Suggested payment structure",
    body: "Recommended payment model: agree Phase 1 first, then confirm Phase 2 after the Phase 1 checkpoint if Lynxeye wants to continue. Payment timing can be adjusted to Lynxeye procurement preferences if needed.",
  },
  {
    title: "What changes the price",
    items: [
      "More participants than the agreed core group.",
      "More than one or two anchor cases.",
      "Deeper prototype, automation or integration work.",
      "Additional in-person delivery days or travel requirements.",
      "Additional documentation, executive reporting or client-facing packaging beyond the agreed scope.",
    ],
  },
];

const proposalTerms: ProposalTableRow[] = [
  { cells: ["Ownership of outputs", "Lynxeye owns the client-specific outputs, materials, examples and documentation produced for Lynxeye during the project."] },
  { cells: ["Pre-existing methods", "Pre-existing facilitation methods, templates, approaches and general AI enablement know-how remain with the provider, while Lynxeye receives the right to use the project outputs internally."] },
  { cells: ["Travel and logistics", "All professional fees are stated in Norwegian kroner (NOK) and exclude agreed-upon travel costs. Agreed travel, accommodation, room costs and related delivery logistics are covered by Lynxeye unless otherwise agreed in writing."] },
  { cells: ["Additional AI tools", "Any required third-party tools or licenses for participants, such as voice tools or expanded AI access, are agreed separately and covered by Lynxeye."] },
  { cells: ["Client data and confidentiality", "Work with client material should follow Lynxeye and headquarters policies for confidentiality, data handling and approved tools."] },
  { cells: ["Phase 1 checkpoint", "Phase 1 can be contracted as a standalone engagement. After Phase 1, Lynxeye can stop, continue into Phase 2 or adjust Phase 2 based on what was learned."] },
  { cells: ["Scope boundaries", "The offer includes enablement, coaching, workflow design, examples, documentation and recommendations. Production-grade automation, integrations and broader rollout are not included unless separately agreed."] },
  { cells: ["Phase 3", "Phase 3 is the future Scale Across Lynxeye decision. It is not included in this offer and should only be considered after Phase 2 evidence."] },
];

const proposalStakeholderDeliverables: ProposalTableRow[] = [
  { cells: ["Employees", "Current practice map, participant setup and first workflow tests", "Deeper coaching and reusable working habits", "Less friction, better prompting, stronger context, safer use and more confidence."] },
  { cells: ["Teams", "Team opportunity map and early workflow tests", "Expanded team workflow coaching", "Better meetings, stronger synthesis, faster shared production and less reinvention."] },
  { cells: ["Clients", "Client movement scan and proposed case review", "Expanded pitch and client-work examples", "Sharper recommendations, clearer options, faster iteration and visible strategic thinking."] },
  { cells: ["Lynxeye", "Strategic alignment map and delivery hub v1", "Mature delivery hub and scale recommendation", "Reusable intelligence, protected margin, stronger pitches and future scale options."] },
  { cells: ["Headquarters", "Infrastructure and governance map", "Local adoption implications and scale constraints", "Safer adoption, clearer tool boundaries and stronger fit with central initiatives."] },
];

const proposalFutureCards: ProposalCard[] = [
  { title: "Scale proven methods", text: "Take the strongest Phase 2 practices across Lynxeye using internal resources, external support or a blended model." },
  { title: "Automate and integrate", text: "Automate or integrate only the workflows Phase 2 proves valuable, repeatable and compatible with headquarters guardrails." },
  { title: "Create client offerings", text: "Turn proven internal capability into potential AI-enabled client services where the evidence is strong enough." },
];

type AgreementTabId = "overview" | "scope" | "success" | "responsibilities" | "exclusions" | "commercial" | "original";

const agreementTabs: { id: AgreementTabId; label: string }[] = [
  { id: "overview", label: "Agreement overview" },
  { id: "scope", label: "Scope & deliverables" },
  { id: "success", label: "Success criteria" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "exclusions", label: "Exclusions" },
  { id: "commercial", label: "Commercial terms" },
  { id: "original", label: "Original proposal" },
];

const agreementStatusCards: ProposalCard[] = [
  {
    label: "Included",
    title: "Phase 1 - Setup & Early Value",
    text: "5 weeks. 350,000 to 390,000 NOK, excluding agreed travel and third-party tools. The committed starting point and standalone value proof.",
  },
  {
    label: "Optional",
    title: "Phase 2 - Expand & Create More Value",
    text: "Approx. 8 weeks. 460,000 to 540,000 NOK, excluding agreed travel and third-party tools. Starts only after written confirmation following the Phase 1 checkpoint.",
    variant: "accent",
  },
  {
    label: "Not included",
    title: "Phase 3 - Scale Across Lynxeye",
    text: "Separately scoped after evidence. May include scale, automation, integrations, agentic flows, broader rollout or new client-facing services.",
    variant: "muted",
  },
];

const agreementScopeRows: ProposalTableRow[] = [
  {
    cells: [
      "Phase 1: Setup & Early Value",
      "5 weeks",
      "350,000 to 390,000 NOK, excluding agreed travel and third-party tools.",
      "Five-stakeholder map; current AI practice map; HQ infrastructure alignment notes; client movement scan; proposed client, pitch or workflow case review; anchor case brief; participant setup baseline; early coaching and workflow tests; early before/after examples; reusable methods v1; living delivery hub v1; Phase 1 checkpoint recommendation.",
    ],
  },
  {
    cells: [
      "Optional Phase 2: Expand & Create More Value",
      "Approx. 8 weeks",
      "460,000 to 540,000 NOK, excluding agreed travel and third-party tools. Starts only after written confirmation.",
      "Expanded coaching and team sessions; deeper client-case workflow work; stronger before/after examples; mature prompts, playbooks and quality routines; expanded living delivery hub; success signals and evidence summary; Phase 3 recommendation report.",
    ],
  },
  {
    cells: [
      "Phase 3: Scale Across Lynxeye",
      "Separately scoped",
      "Not included in this agreement.",
      "May include scale, automation, integrations, agentic flows, broader rollout or new client-facing services, but only after enough evidence exists.",
    ],
  },
];

const agreementSuccessRows: ProposalTableRow[] = [
  { cells: ["Employee confidence", "Participants use AI repeatedly without heavy support and know when to stop the AI loop.", "Participant reflections, examples and observed workflow change.", "Does not guarantee organization-wide adoption or individual usage levels after the engagement."] },
  { cells: ["Workflow speed", "Selected workflows move faster without reducing quality.", "Before/after process snapshots and time-saved estimates where sensible.", "Does not guarantee fixed productivity gains, capacity savings or financial return."] },
  { cells: ["Output quality", "Outputs become clearer, sharper and better structured.", "Output comparisons, review prompts and quality criteria.", "Does not replace Lynxeye's final review, validation or client-facing approval."] },
  { cells: ["Team rhythm", "Teams reuse shared methods instead of each person improvising separately.", "Reusable workflows, meeting-to-output examples and shared templates.", "Does not guarantee full change management adoption across every team."] },
  { cells: ["Client impact", "Client-facing material becomes more tangible earlier.", "Pitch fragments, prototypes, synthesis examples or client-ready options.", "Does not guarantee client wins, revenue impact or client acceptance."] },
  { cells: ["HQ alignment", "Local methods fit approved tools, infrastructure and guardrails.", "Tool map, constraints list and adoption recommendations.", "Does not constitute legal, security, procurement or compliance approval."] },
  { cells: ["Scale readiness", "Lynxeye can decide what should be scaled, automated or developed further.", "Prioritized Phase 3 roadmap with rationale.", "Does not include Phase 3 rollout, automation or implementation work."] },
];

const agreementResponsibilityColumns = [
  {
    title: "Henrik / threesixty1 provides",
    items: [
      "Structure and project framing.",
      "Facilitation and coaching.",
      "Workflow design.",
      "Practical examples from real work.",
      "Documentation and reusable methods.",
      "Before/after evidence capture.",
      "Recommendations and checkpoint input.",
      "Living delivery hub content.",
    ],
  },
  {
    title: "Lynxeye provides",
    items: [
      "Access to selected participants.",
      "Relevant real work examples.",
      "Approved tools, policies and boundaries.",
      "HQ, security and governance clarification.",
      "Decision-maker availability.",
      "Timely feedback and prioritization.",
      "Internal adoption support.",
      "Final review, approval and client-facing quality control.",
      "Business decisions and implementation after sessions.",
    ],
  },
];

const agreementExclusions = [
  "Production-grade automation.",
  "Custom software development.",
  "Integrations with internal systems.",
  "Full organization-wide rollout.",
  "Broad change management program.",
  "Legal, compliance or procurement review.",
  "Data processing agreement drafting.",
  "Guaranteed productivity improvements.",
  "Guaranteed revenue, margin, pitch-win or client-success outcomes.",
  "Final approval of client-facing material.",
  "Purchase or payment for third-party tools.",
  "Travel costs unless explicitly included.",
  "More participants than agreed.",
  "More anchor cases than agreed.",
  "Additional in-person days.",
  "Additional executive reporting.",
  "Phase 3 scaling work.",
];

const agreementCommercialDetails: ProposalDetail[] = [
  {
    title: "Phase 1 fee",
    body: "350,000 to 390,000 NOK, excluding agreed travel and third-party tools. Phase 1 is the committed starting point and can stand alone.",
  },
  {
    title: "Optional Phase 2 fee",
    body: "460,000 to 540,000 NOK, excluding agreed travel and third-party tools. Phase 2 is not booked or payable unless confirmed in writing after the Phase 1 checkpoint.",
  },
  {
    title: "Combined range",
    body: "If Lynxeye selects both phases, the combined Phase 1 and Phase 2 professional fee range is 810,000 to 930,000 NOK, excluding agreed travel and third-party tools.",
  },
  {
    title: "Phase 2 notice",
    body: "If Lynxeye does not want to continue into Phase 2, Lynxeye should give at least 7 calendar days' written notice before the agreed Phase 2 start date.",
  },
  {
    title: "Change request triggers",
    items: [
      "More participants or anchor cases.",
      "Deeper prototypes, automation or integration work.",
      "Additional in-person days, extra travel or extra executive reporting.",
      "Additional documentation or client-facing packaging beyond scope.",
      "Material scope changes after the Phase 1 checkpoint.",
    ],
  },
];

function ProposalCardGrid({ cards, columns = "three" }: { cards: ProposalCard[]; columns?: "two" | "three" | "five" }) {
  return (
    <div className={`proposal-card-grid proposal-card-grid-${columns}`}>
      {cards.map((card) => (
        <article className={`proposal-offer-card ${card.variant ? `proposal-offer-card-${card.variant}` : ""}`} key={card.title}>
          {card.label ? <span>{card.label}</span> : null}
          <h3>{card.title}</h3>
          <p>{card.text}</p>
        </article>
      ))}
    </div>
  );
}

function ProposalTable({ headers, rows }: { headers: string[]; rows: ProposalTableRow[] }) {
  return (
    <div className="proposal-table-wrap">
      <table className="proposal-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.cells.join("-")}>
              {row.cells.map((cell, index) => (
                <td key={`${row.cells[0]}-${index}`}>{index === 0 ? <strong>{cell}</strong> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProposalDetailBlock({ detail }: { detail: ProposalDetail }) {
  return (
    <details className="proposal-detail-block">
      <summary>{detail.title}</summary>
      {detail.body ? <p>{detail.body}</p> : null}
      {detail.items ? <CardList items={detail.items} /> : null}
    </details>
  );
}

function OriginalProposalContent({
  onDownloadPdf,
  onNavigate,
  titleId = "proposal-title",
}: {
  onDownloadPdf: () => void;
  onNavigate?: () => void;
  titleId?: string;
}) {
  const idPrefix = titleId;
  const isModalContent = titleId.includes("modal");

  return (
    <div className="proposal-summary-content">
      <div className="proposal-offer-hero">
        <div>
          <div className="kicker">Customer-facing offer</div>
          <h2 id={titleId}>Accelerating Lynxeye with AI</h2>
          <p className="proposal-offer-lede">
            A modular engagement where Lynxeye can start with Phase 1, stop after Phase 1, or continue into an adjusted Phase 2 based on what
            the first five weeks prove.
          </p>
          <p>
            The project combines stakeholder mapping, headquarters alignment, live workflow coaching and early work on proposed client cases.
            The aim is to create visible value in real Lynxeye work before Lynxeye commits to broader expansion, rollout or automation.
          </p>
        </div>
        <aside className="proposal-offer-status">
          <span>Offer choice</span>
          <strong>Start with Phase 1</strong>
          <p>Phase 2 is optional after the Phase 1 checkpoint. Phase 3 remains a separate Scale Across Lynxeye decision after evidence.</p>
        </aside>
      </div>

      <nav className="proposal-offer-nav" aria-label="Proposal sections">
        {[
          ["Objective", `${idPrefix}-objective`],
          ["Timeline", `${idPrefix}-timeline`],
          ["Investment", `${idPrefix}-pricing`],
          ["Terms", `${idPrefix}-terms`],
        ].map(([label, id]) => (
          <a
            href={`#${id}`}
            onClick={(event) => {
              if (!isModalContent) {
                return;
              }

              event.preventDefault();
              document.getElementById(id)?.scrollIntoView({ block: "start" });
            }}
            key={id}
          >
            {label}
          </a>
        ))}
      </nav>

      <section className="proposal-offer-section" id={`${idPrefix}-objective`}>
        <span>Project objective</span>
        <div className="proposal-two-col">
          <div>
            <h3>From scattered AI use to shared value creation</h3>
            <p>
              Lynxeye is already in a phase where AI is being explored by individuals, teams, clients and headquarters at the same time.
              The opportunity is to turn that exploration into practical ways of working that improve speed, quality, confidence and reuse.
            </p>
            <p>
              This engagement helps Lynxeye understand the current reality, connect local needs to headquarters infrastructure, and work
              inside real consulting, strategy, synthesis, pitch and delivery workflows.
            </p>
          </div>
          <blockquote>The goal is not more AI activity. The goal is better work, stronger client output and capability Lynxeye can keep using.</blockquote>
        </div>
      </section>

      <section className="proposal-offer-section proposal-offer-section-soft" id={`${idPrefix}-value-case`}>
        <span>Value case</span>
        <h3>Why this engagement creates value</h3>
        <p>
          Phase 1 creates standalone value by reducing friction, improving selected client-facing and team workflows, and capturing reusable
          methods. Phase 2 is the optional expansion path if the first phase proves enough value to continue.
        </p>
        <ProposalCardGrid cards={proposalValueCards} />
      </section>

      <section className="proposal-offer-section" id={`${idPrefix}-stakeholders`}>
        <span>Stakeholder scope</span>
        <h3>Five stakeholder groups included from Phase 1</h3>
        <p>
          Phase 1 maps the needs, constraints and value questions for all five stakeholder groups, then starts touching the proposed client
          cases earlier. Headquarters is included because approved tools, access, security, governance and infrastructure will shape what
          Lynxeye can safely and realistically scale.
        </p>
        <ProposalCardGrid cards={proposalStakeholders} columns="five" />
      </section>

      <section className="proposal-offer-section" id={`${idPrefix}-timeline`}>
        <span>Project timeline</span>
        <h3>Five-week standalone start, checkpoint, optional eight-week expansion</h3>
        <p>
          The engagement is structured so Lynxeye can set up the work, create early value inside real use cases, pause after Phase 1 if
          needed, or continue into Phase 2 with a scope shaped by Phase 1 evidence.
        </p>
        <ProposalCardGrid cards={proposalTimeline} />
      </section>

      <section className="proposal-offer-section">
        <span>Phase detail</span>
        <h3>What happens in each phase</h3>
        <ProposalTable headers={["Phase", "Core activities", "Outputs", "Value created"]} rows={proposalPhaseRows} />
      </section>

      <section className="proposal-offer-section">
        <span>Practical learning spine</span>
        <h3>Start with proposed client cases earlier</h3>
        <p>
          To keep the work practical, Phase 1 reviews the proposed client, pitch or opportunity cases and starts chipping away at the
          strongest use cases before Phase 2 expansion. The anchor case gives the team a shared context for examples, coaching, demos and
          evaluation.
        </p>
        <ProposalCardGrid cards={proposalAnchorOptions} columns="two" />
      </section>

      <section className="proposal-offer-section" id={`${idPrefix}-deliverables`}>
        <span>Deliverables</span>
        <h3>What Lynxeye receives</h3>
        <ProposalTable headers={["Deliverable", "Phase", "Description", "Why it matters"]} rows={proposalDeliverables} />
      </section>

      <section className="proposal-offer-section proposal-offer-section-soft">
        <span>Success signals</span>
        <h3>How value will be made visible</h3>
        <ProposalTable headers={["Value area", "Success signal", "Evidence to capture"]} rows={proposalSuccessRows} />
      </section>

      <section className="proposal-offer-section" id={`${idPrefix}-pricing`}>
        <span>Price and commercial structure</span>
        <h3>Investment</h3>
        <p>
          All amounts are stated in Norwegian kroner (NOK) and exclude agreed-upon travel costs. Phase 1 can be selected as a standalone
          engagement. If Lynxeye selects Phase 2 after the checkpoint, the two selected phases together are 810,000 to 930,000 NOK. Phase 3
          remains outside the scope of this offer.
        </p>
        <ProposalCardGrid cards={proposalPriceCards} />
        <div className="proposal-detail-grid">
          {proposalPriceDetails.map((detail) => (
            <ProposalDetailBlock detail={detail} key={detail.title} />
          ))}
        </div>
      </section>

      <section className="proposal-offer-section proposal-offer-section-soft" id={`${idPrefix}-terms`}>
        <span>Terms and conditions</span>
        <h3>Commercial assumptions</h3>
        <ProposalTable headers={["Area", "Terms"]} rows={proposalTerms} />
      </section>

      <section className="proposal-offer-section">
        <span>Supporting detail</span>
        <h3>Detailed deliverables by stakeholder</h3>
        <ProposalTable
          headers={["Stakeholder", "Setup & Early Value", "Expand & Create More Value", "Value created"]}
          rows={proposalStakeholderDeliverables}
        />
      </section>

      <section className="proposal-offer-section">
        <span>Phase 3 boundary</span>
        <h3>Scale Across Lynxeye is a separate next offer</h3>
        <ProposalCardGrid cards={proposalFutureCards} columns="three" />
      </section>

      <div className="proposal-next-step">
        <span>Decision needed</span>
        <p>Agree Phase 1 scope, selected participants, delivery format, client case focus, headquarters involvement and the checkpoint for deciding whether Phase 2 continues or changes.</p>
        <div className="proposal-next-actions">
          <a className="detail-toggle" href="#phases" onClick={onNavigate}>
            View project frame
          </a>
          <button className="detail-toggle detail-toggle-accent" type="button" onClick={onDownloadPdf}>
            Download PDF
          </button>
        </div>
      </div>

      <p className="proposal-footer-note">
        Customer-facing offer draft for Lynxeye AI enablement. All amounts are in Norwegian kroner (NOK) and exclude agreed-upon travel
        costs. Phase 1 can stand alone; Phase 2 is optional after the checkpoint; Phase 3 remains outside the scope of this offer. Final legal
        wording to be confirmed before submission.
      </p>
    </div>
  );
}

function AgreementOverviewPanel({ titleId }: { titleId: string }) {
  return (
    <div className="agreement-panel-stack">
      <div className="proposal-offer-hero agreement-hero">
        <div>
          <div className="kicker">Agreement overview</div>
          <h2 id={titleId}>Plain-English agreement summary</h2>
          <p className="proposal-offer-lede">
            This agreement frames a practical AI enablement engagement for Lynxeye. Phase 1 creates standalone value and evidence. After the
            Phase 1 checkpoint, Lynxeye can stop, continue into Phase 2, or adjust the next step based on what the first five weeks prove.
          </p>
          <p>
            The work is advisory, enablement, coaching, workflow design and documentation. It is designed to create practical value in real
            Lynxeye workflows while clarifying scope, responsibilities, decision points and success evidence.
          </p>
        </div>
        <aside className="proposal-offer-status">
          <span>Agreement frame</span>
          <strong>Phase 1 starts the work</strong>
          <p>Phase 2 is optional after written confirmation. Phase 3 is excluded and separately scoped after evidence.</p>
        </aside>
      </div>

      <ProposalCardGrid cards={agreementStatusCards} />

      <section className="proposal-offer-section proposal-offer-section-soft">
        <span>Basis for signature</span>
        <h3>Commercial summary, not final legal wording</h3>
        <p>
          This page is a commercial agreement summary and Statement of Work basis. Final legal wording, privacy terms and any required data
          processing agreement should be reviewed before signature.
        </p>
      </section>

      <section className="proposal-offer-section">
        <span>AI responsibility</span>
        <h3>Human review remains part of the work</h3>
        <p>
          AI-assisted outputs may contain inaccuracies, omissions or unsuitable suggestions. Lynxeye is responsible for reviewing, validating
          and approving all AI-assisted material before internal or client-facing use.
        </p>
      </section>
    </div>
  );
}

function AgreementScopePanel() {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section">
        <span>Scope and deliverables</span>
        <h3>What is included, optional and excluded</h3>
        <p>
          Phase 1 is the committed starting point. Phase 2 is optional after written confirmation following the checkpoint. Phase 3 is shown
          only as a future direction and is not part of this agreement.
        </p>
        <ProposalTable headers={["Phase", "Duration", "Commercial frame", "Deliverables and boundary"]} rows={agreementScopeRows} />
      </section>
      <ProposalCardGrid cards={agreementStatusCards} />
    </div>
  );
}

function AgreementSuccessPanel() {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section proposal-offer-section-soft">
        <span>Success criteria</span>
        <h3>Practical evidence, not guaranteed outcomes</h3>
        <p>
          The project will measure practical evidence of value. Success is visible when selected people and teams use AI-supported methods
          with more confidence, better structure and clearer quality control in real work. These signals support Lynxeye's decision-making,
          but they do not guarantee specific revenue, productivity, client-win or organization-wide adoption outcomes.
        </p>
        <ProposalTable headers={["Value area", "Success signal", "Evidence to capture", "What this does not guarantee"]} rows={agreementSuccessRows} />
      </section>
    </div>
  );
}

function AgreementResponsibilitiesPanel() {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section">
        <span>Responsibility split</span>
        <h3>Value is created when Lynxeye applies the methods in real work</h3>
        <p>
          The consultant is responsible for structure, coaching, examples, documentation and recommendations. Lynxeye is responsible for
          internal adoption, implementation, final review and business decisions.
        </p>
        <div className="agreement-responsibility-grid">
          {agreementResponsibilityColumns.map((column) => (
            <article className="agreement-responsibility-card" key={column.title}>
              <h4>{column.title}</h4>
              <CardList items={column.items} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function AgreementExclusionsPanel() {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section">
        <span>Not included unless separately agreed</span>
        <h3>Clear boundaries protect both sides</h3>
        <p>
          The engagement includes enablement, coaching, workflow design, practical examples, documentation and recommendations. The following
          items require separate agreement, scope and pricing.
        </p>
        <div className="agreement-checklist">
          {agreementExclusions.map((item) => (
            <div className="agreement-checklist-item" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AgreementCommercialPanel() {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section proposal-offer-section-soft">
        <span>Commercial terms</span>
        <h3>Phase 1 committed, Phase 2 optional</h3>
        <p>
          All amounts are stated in Norwegian kroner (NOK) and exclude agreed travel and third-party tools. Phase 2 is not booked or payable
          unless confirmed in writing after the Phase 1 checkpoint. If Lynxeye does not want to continue into Phase 2, Lynxeye should give at
          least 7 calendar days' written notice before the agreed Phase 2 start date.
        </p>
        <ProposalCardGrid cards={proposalPriceCards} />
        <div className="proposal-detail-grid">
          {agreementCommercialDetails.map((detail) => (
            <ProposalDetailBlock detail={detail} key={detail.title} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AgreementOriginalProposalPanel({
  onDownloadPdf,
  onNavigate,
  titleId,
}: {
  onDownloadPdf: () => void;
  onNavigate?: () => void;
  titleId: string;
}) {
  return (
    <div className="agreement-panel-stack">
      <section className="proposal-offer-section agreement-reference-intro">
        <span>Original proposal reference</span>
        <h3>Commercial proposal reference</h3>
        <p>
          This is the original customer-facing proposal framing. It is preserved here for reference. The Agreement tabs above translate the
          proposal into clearer scope, responsibilities, success criteria, exclusions and commercial terms.
        </p>
      </section>
      <OriginalProposalContent onDownloadPdf={onDownloadPdf} onNavigate={onNavigate} titleId={titleId} />
    </div>
  );
}

function AgreementPanel({
  tab,
  onDownloadPdf,
  onNavigate,
  titleId,
}: {
  tab: AgreementTabId;
  onDownloadPdf: () => void;
  onNavigate?: () => void;
  titleId: string;
}) {
  switch (tab) {
    case "overview":
      return <AgreementOverviewPanel titleId={titleId} />;
    case "scope":
      return <AgreementScopePanel />;
    case "success":
      return <AgreementSuccessPanel />;
    case "responsibilities":
      return <AgreementResponsibilitiesPanel />;
    case "exclusions":
      return <AgreementExclusionsPanel />;
    case "commercial":
      return <AgreementCommercialPanel />;
    case "original":
      return <AgreementOriginalProposalPanel onDownloadPdf={onDownloadPdf} onNavigate={onNavigate} titleId={titleId} />;
  }
}

const phaseStatusStripItems = [
  {
    label: "Phase 1",
    status: "Committed",
    text: "Starts if the Agreement is approved.",
    variant: "committed",
  },
  {
    label: "Phase 2",
    status: "Optional",
    text: "Only after written confirmation after the checkpoint.",
    variant: "optional",
  },
  {
    label: "Phase 3",
    status: "Excluded",
    text: "Separately scoped after evidence.",
    variant: "excluded",
  },
  {
    label: "Next decision",
    status: "Phase 1 checkpoint",
    text: "Stop, continue, adjust or pause.",
    variant: "decision",
  },
];

function PhaseStatusStrip() {
  return (
    <section className="phase-status-strip" aria-label="Agreement and project status">
      <div className="phase-status-heading">
        <span>Status layer</span>
        <strong>What is agreed, optional, excluded and still open.</strong>
      </div>
      <div className="phase-status-grid">
        {phaseStatusStripItems.map((item) => (
          <article className={`phase-status-item phase-status-item-${item.variant}`} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.status}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AgreementContent({
  onDownloadPdf,
  onNavigate,
  titleId = "agreement-title",
  printMode = false,
}: {
  onDownloadPdf: () => void;
  onNavigate?: () => void;
  titleId?: string;
  printMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<AgreementTabId>("overview");
  const visibleTabs = printMode ? agreementTabs : agreementTabs.filter((tab) => tab.id === activeTab);

  return (
    <div className="agreement-summary-content">
      {!printMode ? (
        <nav className="agreement-tabs" role="tablist" aria-label="Agreement sections">
          {agreementTabs.map((tab) => (
            <button
              className="agreement-tab-button"
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${titleId}-${tab.id}`}
              id={`${titleId}-${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              key={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      ) : null}

      <PhaseStatusStrip />

      {visibleTabs.map((tab) => (
        <section
          className="agreement-panel"
          role={!printMode ? "tabpanel" : undefined}
          aria-labelledby={!printMode ? `${titleId}-${tab.id}-tab` : undefined}
          id={`${titleId}-${tab.id}`}
          key={tab.id}
        >
          {printMode && tab.id !== "overview" ? (
            <div className="agreement-print-heading">
              <span>Agreement section</span>
              <h2>{tab.label}</h2>
            </div>
          ) : null}
          <AgreementPanel
            tab={tab.id}
            onDownloadPdf={onDownloadPdf}
            onNavigate={onNavigate}
            titleId={tab.id === "overview" ? titleId : `${titleId}-${tab.id}`}
          />
        </section>
      ))}
    </div>
  );
}

function AgreementPrintSection({ onDownloadPdf }: { onDownloadPdf: () => void }) {
  return (
    <section id="agreement" className="section proposal-summary proposal-print-section agreement-print-section" aria-labelledby="agreement-title">
      <AgreementContent onDownloadPdf={onDownloadPdf} printMode />
    </section>
  );
}

function AgreementModal({
  open,
  onClose,
  onDownloadPdf,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onDownloadPdf: () => void;
  onNavigate: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel proposal-panel agreement-panel-shell" role="dialog" aria-modal="true" aria-label="Agreement">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close agreement" onClick={onClose}>
          ×
        </button>
        <AgreementContent onDownloadPdf={onDownloadPdf} onNavigate={onNavigate} titleId="agreement-modal-title" />
      </section>
    </div>
  );
}

function ProposedMethodModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const methodFlow = [
    {
      number: "01",
      title: "Workbench ready",
      text: "Hardware, software, accounts, voice tools, browser workflows, context documents, examples, playbooks and safe ways of working.",
    },
    {
      number: "02",
      title: "Live Lynxeye cases",
      text: "Real material, real meetings and real friction become the source, not abstract AI exercises.",
    },
    {
      number: "03",
      title: "AI as partner",
      text: "AI listens, reviews, challenges, synthesizes, visualizes and supports production while people stay in charge.",
    },
    {
      number: "04",
      title: "Human direction",
      text: "Employees bring the context, define direction, judge quality, understand the client and decide the next move.",
    },
    {
      number: "05",
      title: "Reusable capability",
      text: "The work leaves behind shared learning, clearer workflows, stronger teams and company-owned methods.",
    },
  ];
  const timeBackItems = [
    "Better thinking",
    "Client understanding",
    "Senior judgment",
    "Creativity",
    "Real conversations",
    "Reusable learning",
  ];
  const orchestratorItems = [
    "Defines the direction.",
    "Brings the context.",
    "Judges quality.",
    "Understands the client.",
    "Decides what is good enough.",
    "Knows when the next move is a conversation.",
  ];

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel method-panel" role="dialog" aria-modal="true" aria-labelledby="method-title">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close methodology" onClick={onClose}>
          ×
        </button>

        <div className="method-hero">
          <div>
            <div className="kicker">Methodology</div>
            <h2 id="method-title">Human-led AI mastery</h2>
            <p className="method-lede">
              The real question is not only how Lynxeye should use AI. The deeper question is how Lynxeye's people stay in
              charge while AI changes the speed, shape and rhythm of work around them.
            </p>
          </div>
          <aside className="method-credibility" aria-label="Experience signal">
            <span>Experience signal</span>
            <strong>Practical AI building, grounded in 25+ years of leadership and change.</strong>
            <p>
              Years of testing, building, breaking, rebuilding and learning with AI tools, paired with leadership experience across
              teams of 50, 70, 500 and transformation contexts touching thousands of employees.
            </p>
          </aside>
        </div>

        <div className="method-chapter">
          <div className="method-copy">
            <p>That is where this methodology starts.</p>
            <p>
              I bring practical AI experience from years of testing, building, breaking, rebuilding and learning with these tools.
              But I also bring something that matters just as much: more than 25 years of leadership experience helping people,
              teams and organizations change how they work.
            </p>
            <p>
              Different scales. Different cultures. Different pressures. But the human pattern is often the same.
            </p>
          </div>

          <blockquote className="method-pullquote">People do not change because a new tool exists.</blockquote>

          <div className="method-copy method-copy-split">
            <p>
              They change when they understand why it matters, when the setup is clear, when the first steps feel useful,
              when confidence grows, and when they can see that the new way of working strengthens their role rather than
              reducing it.
            </p>
            <p>
              AI can make work faster. It can compress research, summarize meetings, draft material, structure thinking,
              create prototypes, review logic and help people move from blank page to first version much more quickly.
            </p>
          </div>
        </div>

        <MethodologyValueMap />

        <div className="methodology-folds" aria-label="Methodology principles">
          {[
            {
              title: "Belief",
              text: "AI should give Lynxeye more human attention, not just more volume.",
            },
            {
              title: "Human role",
              text: "The consultant defines the problem, context, audience, quality bar and final judgment.",
            },
            {
              title: "Quality protection",
              text: "The methodology builds in review, challenge, sources and stop-points so speed does not become generic, low-quality AI output.",
            },
            {
              title: "Scale logic",
              text: "Every useful workflow should leave behind reusable examples, playbooks or agent patterns.",
            },
          ].map((item, index) => (
            <details className="methodology-fold" key={item.title}>
              <summary>{item.title}</summary>
              <p>{item.text}</p>
            </details>
          ))}
        </div>

        <section className="method-time" aria-labelledby="method-time-title">
          <div>
            <span>Speed is not the goal</span>
            <h3 id="method-time-title">The value appears when AI gives people time and attention back.</h3>
            <p>
              If AI only creates more output, more polished text, more slides and more noise, Lynxeye has not gained much.
              The time it returns has to be used deliberately.
            </p>
          </div>
          <div className="method-time-grid">
            {timeBackItems.map((item) => (
              <strong key={item}>{item}</strong>
            ))}
          </div>
        </section>

        <div className="method-flow" aria-label="Methodology flow">
          {methodFlow.map((step) => (
            <article className="method-flow-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="method-work">
          <section>
            <span>How the work happens</span>
            <h3>We start hands-on, inside the work people already do.</h3>
            <p>
              We look at meetings, pitches, client preparation, research, synthesis, delivery, reviews and internal collaboration.
              Then we work with people inside live cases: real material, real meetings, real friction and real moments where someone
              needs to think, decide, challenge, create or move forward.
            </p>
          </section>
          <section>
            <span>What AI becomes</span>
            <h3>A working partner, not the leader.</h3>
            <p>
              AI becomes a structured listener, reviewer, challenger, synthesizer, visualizer and production support. It helps people
              see faster, test faster and create faster. But the person remains in charge.
            </p>
          </section>
        </div>

        <section className="method-orchestrator" aria-labelledby="method-orchestrator-title">
          <div className="method-orchestrator-core">
            <span>Core distinction</span>
            <h3 id="method-orchestrator-title">The person remains in charge.</h3>
            <p>That is the difference between using AI and being led by AI.</p>
          </div>
          <ul className="method-orchestrator-list">
            {orchestratorItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="method-copy method-future">
          <p>
            This means building a way of working that can survive the speed of AI development. Models will change. Tools will improve.
            New capabilities will appear across text, voice, images, coding, agents and automation.
          </p>
          <p>The real skill is not memorizing today's interface. The real skill is learning how to lead with AI as it keeps changing.</p>
        </div>

        <div className="method-closeout">
          <strong>The goal is not to make Lynxeye more AI-generated.</strong>
          <p>
            The goal is to help Lynxeye become more Lynxeye, with AI as an accelerator: confident people, stronger teams, clearer
            workflows, reusable company learning, and a rhythm where human intelligence sets the direction while AI increases capacity,
            speed and proof.
          </p>
        </div>
      </section>
    </div>
  );
}

type OperationalPhaseCard = {
  phase: string;
  status: string;
  duration: string;
  purpose: string;
  activation: string;
};

type OperationalWeek = {
  week: string;
  focus: string;
  activities: string[];
  henrik: string;
  lynxeye: string;
  outputs: string[];
  evidence: string;
  followUp: string;
};

type OperationalWorkstream = {
  title: string;
  purpose: string;
  activities: string[];
  outputs: string[];
};

type OperationalTableRow = {
  cells: string[];
};

type OperationalAccordionSection = {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
  headers?: string[];
  rows?: OperationalTableRow[];
  workstreams?: OperationalWorkstream[];
  inputs?: { item: string; purpose: string }[];
  evidence?: { category: string; capturedAs: string }[];
  checkpointQuestions?: string[];
  decisions?: { title: string; text: string }[];
  note?: string;
};

const operationalPhaseCards: OperationalPhaseCard[] = [
  {
    phase: "Phase 1: Setup & Early Value",
    status: "Committed if agreement is approved",
    duration: "5 weeks",
    purpose: "Create standalone value and decision-ready evidence.",
    activation: "Decision point: Phase 1 checkpoint.",
  },
  {
    phase: "Phase 2: Expand & Create More Value",
    status: "Optional",
    duration: "Approx. 8 weeks",
    purpose: "Deepen value creation through real work.",
    activation: "Only after written confirmation following the Phase 1 checkpoint.",
  },
  {
    phase: "Phase 3: Scale Across Lynxeye",
    status: "Not included",
    duration: "Separately scoped",
    purpose: "Future scale, automation, integration or new client-facing service development.",
    activation: "Separate decision after evidence.",
  },
];

const operationalWeeks: OperationalWeek[] = [
  {
    week: "Week 1",
    focus: "Kickoff, scope confirmation and workbench setup",
    activities: [
      "Kickoff meeting.",
      "Confirm ambition, success criteria, selected participants and headquarters involvement.",
      "Confirm approved AI tools, data boundaries, candidate cases, delivery hub structure and meeting rhythm.",
    ],
    henrik: "Lead kickoff, shape delivery hub v1, define evidence checklist and working rhythm.",
    lynxeye: "Confirm sponsor, participants, tool boundaries, candidate cases and communication channel.",
    outputs: ["Confirmed project rhythm.", "Participant list.", "Delivery hub v1.", "Case candidate list.", "Success evidence checklist."],
    evidence: "Baseline expectations, tool/data notes and initial case options.",
    followUp: "Confirm anchor case direction and who must attend Week 2 sessions.",
  },
  {
    week: "Week 2",
    focus: "Current practice, stakeholder map and HQ alignment",
    activities: [
      "Map current AI use, friction, confidence gaps and unclear use patterns.",
      "Map employees, teams, clients, Lynxeye and headquarters.",
      "Review headquarters infrastructure, security, governance and adoption constraints.",
    ],
    henrik: "Run mapping sessions, synthesize friction and opportunity list, document HQ alignment notes.",
    lynxeye: "Provide access to relevant people, current examples, HQ input and practical constraints.",
    outputs: ["Current AI practice map.", "Five-stakeholder map.", "HQ infrastructure alignment notes.", "Friction and opportunity list."],
    evidence: "Current practice patterns, blockers and alignment constraints.",
    followUp: "Confirm friction areas for Week 3 and proposed client, pitch or workflow case shortlist.",
  },
  {
    week: "Week 3",
    focus: "Client movement scan and anchor case selection",
    activities: [
      "Review what clients are asking, expecting or already doing around AI.",
      "Review proposed client, pitch or workflow cases.",
      "Select one primary anchor case, or two cases if scope allows.",
      "Define what better output should look like.",
    ],
    henrik: "Create client movement scan, case review and before/after evaluation frame.",
    lynxeye: "Provide client-facing context, case options and decision input on anchor case selection.",
    outputs: ["Client movement scan.", "Proposed case review.", "Anchor case brief.", "Before/after evaluation frame.", "Updated delivery hub content."],
    evidence: "Client relevance, selected learning context and quality criteria.",
    followUp: "Confirm anchor case and participants for Week 4 workflow testing.",
  },
  {
    week: "Week 4",
    focus: "Early workflow tests and participant setup",
    activities: [
      "Run early coaching and workflow tests in actual work.",
      "Test prompting, context, review, voice, transcript or browser-context workflows.",
      "Create first before/after examples and identify reusable method v1.",
    ],
    henrik: "Coach participants, run workflow tests, draft quality/review habits and capture before/after examples.",
    lynxeye: "Make participants available, bring real work material and review early outputs.",
    outputs: ["Early workflow test notes.", "Participant setup baseline.", "Early before/after examples.", "Reusable methods v1 draft.", "Quality and review habits draft."],
    evidence: "Workflow changes, participant reactions, output comparisons and reusable patterns.",
    followUp: "Choose examples for checkpoint and identify whether Phase 2 should deepen coaching, client-case work or team practice.",
  },
  {
    week: "Week 5",
    focus: "Evidence summary and Phase 1 checkpoint",
    activities: [
      "Summarize learnings, deliverables, success signals and visible value.",
      "Review what did not yet prove value.",
      "Recommend whether Phase 2 should continue, change or pause.",
      "Define optional Phase 2 adjustment points.",
    ],
    henrik: "Prepare checkpoint recommendation, evidence summary and Phase 2 recommendation.",
    lynxeye: "Attend checkpoint, review evidence and confirm stop, continue, adjust or pause decision.",
    outputs: ["Phase 1 checkpoint recommendation.", "Phase 1 deliverables summary.", "Success signal evidence.", "Phase 2 recommendation.", "Updated delivery hub v1."],
    evidence: "Decision-ready summary of value, uncertainty, risks and next-step logic.",
    followUp: "Stop after Phase 1, continue into Phase 2 as planned, continue into adjusted Phase 2, or pause and revisit later.",
  },
];

const operationalPhase2Workstreams: OperationalWorkstream[] = [
  {
    title: "Workstream 1: Expanded Coaching",
    purpose: "Deepen capability among selected employees and teams.",
    activities: ["1:1 coaching.", "Group sessions.", "Setup refinement.", "Prompt, context and review habits.", "Safe use and quality control."],
    outputs: ["Improved participant workflows.", "Reusable coaching patterns.", "Participant examples.", "Confidence and adoption signals."],
  },
  {
    title: "Workstream 2: Team Workflow Development",
    purpose: "Turn individual AI use into shared team methods.",
    activities: ["Meeting-to-output workflows.", "Research and synthesis workflows.", "Pitch material workflows.", "Review and red-team routines.", "Shared templates and playbooks."],
    outputs: ["Team workflow examples.", "Reusable templates.", "Quality routines.", "Shared method documentation."],
  },
  {
    title: "Workstream 3: Client Case and Pitch Work",
    purpose: "Make AI-supported work visible in client-facing outputs.",
    activities: ["Expand selected anchor case work.", "Create sharper pitch fragments.", "Create prototype or synthesis examples.", "Test before/after quality.", "Review client-facing readiness."],
    outputs: ["Client-case examples.", "Pitch fragments.", "Prototype or synthesis examples.", "Quality review notes."],
  },
  {
    title: "Workstream 4: Evidence, Hub and Scale Recommendation",
    purpose: "Capture reusable capability and prepare the next decision.",
    activities: ["Mature delivery hub.", "Capture examples and playbooks.", "Summarize evidence.", "Identify what should scale, wait, automate or become a client offering.", "Prepare Phase 3 recommendation report."],
    outputs: ["Mature prompts, playbooks and quality routines.", "Expanded living delivery hub.", "Success signals and evidence summary.", "Phase 3 recommendation report."],
  },
];

const operationalDeliverables = [
  ["Five-stakeholder map", "Phase 1", "Henrik", "Planned", "Sponsor, participants and HQ context.", "Map", "Stakeholder needs and blockers.", "Week 2", "Connects Agreement responsibilities to delivery."],
  ["Current AI practice map", "Phase 1", "Henrik", "Planned", "Current usage examples and participant input.", "Map", "Friction, confidence and unsafe/unclear patterns.", "Week 2", "Baseline for practical support."],
  ["HQ infrastructure alignment notes", "Phase 1", "Shared", "Planned", "Approved tools, governance and security expectations.", "Notes", "Tool and data boundaries.", "Week 2", "Prevents unsafe testing."],
  ["Client movement scan", "Phase 1", "Henrik", "Planned", "Client questions, examples and market context.", "Scan", "Client relevance signals.", "Week 3", "Links internal work to client value."],
  ["Proposed client/pitch/workflow case review", "Phase 1", "Shared", "Planned", "Candidate cases.", "Review", "Case fit and constraints.", "Week 3", "Feeds anchor case choice."],
  ["Anchor case brief", "Phase 1", "Henrik", "Planned", "Confirmed case and desired output quality.", "Brief", "Learning spine and evaluation frame.", "Week 3", "Avoids abstract training."],
  ["Participant setup baseline", "Phase 1", "Henrik", "Planned", "Participant access and current setup.", "Baseline", "Readiness and setup gaps.", "Week 4", "Supports coaching."],
  ["Early workflow tests", "Phase 1", "Henrik", "Planned", "Live work material.", "Test notes", "Workflow changes and limitations.", "Week 4", "First proof of practical value."],
  ["Early before/after examples", "Phase 1", "Henrik", "Planned", "Original and improved outputs.", "Examples", "Quality, speed or clarity comparison.", "Week 4", "Checkpoint material."],
  ["Reusable methods v1", "Phase 1", "Henrik", "Planned", "Strong workflow tests.", "Playbook draft", "Prompts, review habits and patterns.", "Week 4", "Starts reusable capability."],
  ["Living delivery hub v1", "Phase 1", "Henrik", "Planned", "Examples, decisions and notes.", "Delivery hub", "Shared project memory.", "Week 5", "Maintained during follow-up."],
  ["Phase 1 checkpoint recommendation", "Phase 1", "Henrik", "Planned", "Evidence and decision-maker review.", "Recommendation", "Stop, continue, adjust or pause logic.", "Week 5", "Required before Phase 2."],
  ["Expanded coaching and team sessions", "Phase 2", "Shared", "Optional", "Written Phase 2 confirmation.", "Sessions", "Adoption and confidence signals.", "Phase 2", "Not automatic."],
  ["Deeper client-case workflow work", "Phase 2", "Shared", "Optional", "Confirmed anchor case continuation.", "Workflow examples", "Client-facing quality and speed.", "Phase 2", "Adjusted after checkpoint."],
  ["Stronger before/after examples", "Phase 2", "Henrik", "Optional", "Live material and review access.", "Examples", "Improved outputs.", "Phase 2", "Supports scale recommendation."],
  ["Mature prompts, playbooks and quality routines", "Phase 2", "Henrik", "Optional", "Tested methods and team feedback.", "Playbooks", "Reuse and quality patterns.", "Phase 2", "Reusable Lynxeye capability."],
  ["Expanded living delivery hub", "Phase 2", "Henrik", "Optional", "Ongoing examples and decisions.", "Delivery hub", "Project memory and reusable assets.", "Phase 2", "Keeps learning visible."],
  ["Success signals and evidence summary", "Phase 2", "Henrik", "Optional", "Examples, reflections and observations.", "Evidence summary", "Decision support, not guarantees.", "Phase 2", "Prepares next decision."],
  ["Phase 3 recommendation report", "Phase 2", "Henrik", "Optional", "Phase 2 evidence.", "Report", "What to scale, wait, automate or commercialize.", "Phase 2 close", "Phase 3 remains separate."],
];

const operationalDecisionRows = [
  ["Participant group confirmed", "Lynxeye", "Needed to schedule and focus the work.", "Locks first participant group.", "Enables Week 1/2 rhythm.", "No change.", "Confirm attendance."],
  ["Anchor case selected", "Shared", "Creates practical learning context.", "Focuses workflow tests.", "Needed before Week 4.", "No change unless extra cases are added.", "Prepare case material."],
  ["Approved AI tool boundaries confirmed", "Lynxeye/HQ", "Protects safe use.", "May limit workflow choices.", "Needed before live testing.", "No change.", "Document boundaries in hub."],
  ["Phase 2 continuation confirmed", "Lynxeye", "Phase 2 cannot start automatically.", "Activates optional workstreams.", "Sets Phase 2 start.", "Activates optional fee range.", "Confirm written approval."],
  ["Additional participant added", "Lynxeye", "Broader adoption need.", "Adds coaching surface.", "May require adjustment.", "Review if material.", "Update plan and tracker."],
  ["Additional anchor case added", "Shared", "More value proof needed.", "Expands case work.", "May reduce depth elsewhere.", "Review if material.", "Confirm trade-off."],
  ["Phase 2 scope adjusted", "Shared", "Checkpoint evidence points elsewhere.", "Changes workstream priority.", "Rebaseline Phase 2.", "Review if material.", "Update delivery plan."],
  ["Phase 3 opportunity identified", "Shared", "Visible future scale option.", "Not included now.", "No current delivery impact.", "Separately scoped.", "Capture for recommendation report."],
];

const operationalRiskRows = [
  ["Participants do not have enough time", "Live workflow support depends on real availability.", "Confirm calendar blocks early and reduce case count if needed.", "Lynxeye", "Watch"],
  ["Tool access is unclear", "Testing stalls or moves into unsafe tools.", "Confirm approved AI tools before Week 4.", "Lynxeye/HQ", "Open"],
  ["Client data boundaries are unclear", "Sensitive material may be mishandled.", "Document what can and cannot be used.", "Lynxeye/HQ", "Open"],
  ["HQ infrastructure rules limit some use cases", "Some workflows may not be feasible.", "Review constraints and choose compatible cases.", "Shared", "Watch"],
  ["Too many cases are selected", "The plan loses depth and evidence quality.", "Prioritize one anchor case, two only if scope allows.", "Shared", "Watch"],
  ["Success criteria are read as guaranteed outcomes", "Evidence supports decisions but does not guarantee business results.", "Repeat non-guarantee wording in evidence and checkpoint sections.", "Henrik", "Managed"],
  ["Phase 2 is assumed before checkpoint evidence", "Commercial and responsibility boundary becomes unclear.", "Require written confirmation after Phase 1.", "Lynxeye", "Managed"],
  ["AI outputs are used without human review", "Quality and confidentiality risk increases.", "Build review habits into every workflow.", "Shared", "Watch"],
  ["Delivery hub is not maintained", "Learning disappears between sessions.", "Treat hub updates as a recurring output.", "Henrik", "Watch"],
  ["Internal adoption does not continue after sessions", "Capability remains event-based.", "Capture reusable routines and owner handoff notes.", "Lynxeye", "Watch"],
];

const operationalInputs = [
  { item: "Confirmed internal sponsor", purpose: "Clear ownership and decision path." },
  { item: "Participant list", purpose: "Scheduling, coaching and baseline mapping." },
  { item: "Calendar availability", purpose: "Protects delivery rhythm." },
  { item: "Approved AI tools", purpose: "Keeps workflow testing inside safe boundaries." },
  { item: "Security and data handling rules", purpose: "Clarifies client-material use." },
  { item: "Relevant client, pitch or workflow examples", purpose: "Makes the work practical." },
  { item: "HQ infrastructure information", purpose: "Aligns local practice with company guardrails." },
  { item: "Existing AI usage examples", purpose: "Shows current habits, gaps and early wins." },
  { item: "Access to relevant team members", purpose: "Enables mapping and live workflow support." },
  { item: "Feedback on early outputs", purpose: "Improves quality and checkpoint evidence." },
  { item: "Decision-maker availability for checkpoint", purpose: "Prevents Phase 2 ambiguity." },
];

const operationalEvidence = [
  { category: "Before/after examples", capturedAs: "Original and improved outputs with short notes on what changed." },
  { category: "Participant confidence reflections", capturedAs: "Short reflections from selected users before and after practical testing." },
  { category: "Workflow speed observations", capturedAs: "Observed time, friction or step reductions where sensible." },
  { category: "Output quality comparisons", capturedAs: "Review notes on clarity, structure, relevance and human judgment." },
  { category: "Reuse of prompts, templates and playbooks", capturedAs: "Examples added to the delivery hub and reused by more than one person." },
  { category: "Team rhythm changes", capturedAs: "Meeting-to-output, review and collaboration patterns." },
  { category: "Client-facing tangibility", capturedAs: "Pitch fragments, prototypes, synthesis examples or clearer client-ready options." },
  { category: "HQ alignment constraints", capturedAs: "Documented tool, data, security and governance notes." },
  { category: "Scale readiness signals", capturedAs: "Evidence for what should scale, wait, automate or become a client offering." },
];

const operationalCheckpointQuestions = [
  "What did we learn?",
  "What value was visible?",
  "What did not yet prove value?",
  "What should be stopped?",
  "What should continue?",
  "What should change before Phase 2?",
  "Is Phase 2 recommended?",
  "Should Phase 2 continue as planned, continue with changes, pause or stop?",
  "What Phase 3 opportunities are visible but not yet included?",
];

const operationalCheckpointDecisions = [
  { title: "Stop after Phase 1", text: "Use the Phase 1 deliverables as standalone value and do not activate Phase 2." },
  { title: "Continue into Phase 2 as planned", text: "Activate the optional expansion after written confirmation." },
  { title: "Continue into adjusted Phase 2", text: "Refocus Phase 2 based on evidence, capacity or case priorities." },
  { title: "Pause and revisit later", text: "Keep the evidence and delivery hub, then return when timing or ownership is clearer." },
];

const operationalSections: OperationalAccordionSection[] = [
  {
    id: "phase-1-plan",
    eyebrow: "Phase 1 delivery",
    title: "Week-by-week Phase 1 plan",
    body: "Phase 1 is the committed starting point if the agreement is approved. It creates standalone value and the evidence needed for the checkpoint.",
    headers: ["Week", "Focus", "Key activities", "Henrik / Threesixty1 responsibilities", "Lynxeye responsibilities", "Outputs", "Evidence captured", "Decision or follow-up needed"],
    rows: operationalWeeks.map((week) => ({
      cells: [week.week, week.focus, week.activities.join(" "), week.henrik, week.lynxeye, week.outputs.join(" "), week.evidence, week.followUp],
    })),
  },
  {
    id: "phase-2-workstreams",
    eyebrow: "Optional Phase 2",
    title: "Optional Phase 2 workstreams",
    body: "Phase 2 should not look automatic. It starts only after written confirmation following the Phase 1 checkpoint.",
    workstreams: operationalPhase2Workstreams,
  },
  {
    id: "deliverables-tracker",
    eyebrow: "Follow-up tool",
    title: "Deliverables tracker",
    body: "A practical tracker for follow-up calls and delivery reviews.",
    headers: ["Deliverable", "Phase", "Owner", "Status", "Input needed from Lynxeye", "Output format", "Evidence linked", "Due point", "Notes"],
    rows: operationalDeliverables.map((cells) => ({ cells })),
  },
  {
    id: "decision-log",
    eyebrow: "Governance",
    title: "Decision log",
    body: "A lightweight log for decisions that affect scope, timing, price or follow-up.",
    headers: ["Decision", "Owner", "Reason", "Impact on scope", "Impact on timeline", "Impact on price", "Follow-up needed"],
    rows: operationalDecisionRows.map((cells) => ({ cells })),
  },
  {
    id: "risks",
    eyebrow: "Dependencies",
    title: "Risk and dependency tracker",
    headers: ["Risk", "Why it matters", "Preventive action", "Owner", "Status"],
    rows: operationalRiskRows.map((cells) => ({ cells })),
  },
  {
    id: "inputs",
    eyebrow: "Lynxeye responsibilities",
    title: "Lynxeye input checklist",
    body: "These inputs connect directly to the Agreement responsibilities section. Without them, delivery quality and evidence capture become weaker.",
    inputs: operationalInputs,
  },
  {
    id: "evidence",
    eyebrow: "Value proof",
    title: "Evidence capture framework",
    body: "This evidence supports decision-making. It does not guarantee revenue, productivity, client wins or organization-wide adoption.",
    evidence: operationalEvidence,
  },
  {
    id: "checkpoint",
    eyebrow: "Phase 1 checkpoint",
    title: "Checkpoint view",
    body: "The checkpoint turns the first five weeks into a clear decision about what should stop, continue, change or wait.",
    checkpointQuestions: operationalCheckpointQuestions,
    decisions: operationalCheckpointDecisions,
    note: "Phase 3 opportunities can be named here, but they remain outside the current scope until separately decided.",
  },
];

function OperationalProjectPlanTable({ headers, rows }: { headers: string[]; rows: OperationalTableRow[] }) {
  return (
    <div className="project-plan-table-wrap">
      <table className="project-plan-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row.cells[0]}-${rowIndex}`}>
              {row.cells.map((cell, cellIndex) => (
                <td data-label={headers[cellIndex]} key={`${headers[cellIndex]}-${cell}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OperationalProjectPlanSection({ section, forceExpanded = false }: { section: OperationalAccordionSection; forceExpanded?: boolean }) {
  const [isOpen, setIsOpen] = useState(forceExpanded || section.id === "phase-1-plan");
  const isExpanded = forceExpanded || isOpen;

  return (
    <section className={`project-plan-accordion ${isExpanded ? "is-open" : ""}`}>
      <button
        className="project-plan-accordion-trigger"
        type="button"
        aria-expanded={isExpanded}
        onClick={() => !forceExpanded && setIsOpen((current) => !current)}
      >
        <span className="project-plan-accordion-kicker">{section.eyebrow}</span>
        <strong>{section.title}</strong>
        <span className="project-plan-accordion-marker" aria-hidden="true">
          {isExpanded ? "-" : "+"}
        </span>
      </button>

      {isExpanded ? (
        <div className="project-plan-accordion-panel">
          {section.body ? <p className="project-plan-section-body">{section.body}</p> : null}
          {section.rows && section.headers ? <OperationalProjectPlanTable headers={section.headers} rows={section.rows} /> : null}

          {section.workstreams ? (
            <div className="project-plan-workstream-grid">
              {section.workstreams.map((workstream) => (
                <article className="project-plan-workstream" key={workstream.title}>
                  <h4>{workstream.title}</h4>
                  <p>{workstream.purpose}</p>
                  <div className="project-plan-mini-columns">
                    <div>
                      <span>Activities</span>
                      <CardList items={workstream.activities} />
                    </div>
                    <div>
                      <span>Outputs</span>
                      <CardList items={workstream.outputs} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {section.inputs ? (
            <div className="project-plan-input-grid">
              {section.inputs.map((input) => (
                <article className="project-plan-input-card" key={input.item}>
                  <strong>{input.item}</strong>
                  <p>{input.purpose}</p>
                </article>
              ))}
            </div>
          ) : null}

          {section.evidence ? (
            <div className="project-plan-proof-grid">
              {section.evidence.map((evidence) => (
                <article className="project-plan-proof-row" key={evidence.category}>
                  <span>{evidence.category}</span>
                  <p>{evidence.capturedAs}</p>
                </article>
              ))}
            </div>
          ) : null}

          {section.checkpointQuestions ? (
            <div className="project-plan-decision-test">
              <span>Checkpoint questions</span>
              <ol>
                {section.checkpointQuestions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            </div>
          ) : null}

          {section.decisions ? (
            <div className="project-plan-checkpoint-grid">
              {section.decisions.map((decision) => (
                <article className="project-plan-checkpoint-card" key={decision.title}>
                  <strong>{decision.title}</strong>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
          ) : null}

          {section.note ? (
            <div className="project-plan-section-outcome">
              <span>Boundary</span>
              <p>{section.note}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function ProjectPlanContent({ titleId = "project-plan-title", expanded = false }: { titleId?: string; expanded?: boolean }) {
  return (
    <div className="project-plan-content">
      <div className="kicker">Lynxeye AI project plan</div>
      <h2 id={titleId}>A practical follow-up plan for delivering the Agreement.</h2>
      <p>
        The Project Plan translates the Agreement into a practical delivery rhythm. It shows what happens each week, what Lynxeye needs to
        provide, what outputs are created, what evidence is captured, and how the Phase 1 checkpoint determines whether Phase 2 should
        continue, change or pause.
      </p>

      <PhaseStatusStrip />

      <div className="project-plan-purpose">
        <span>Connection to Agreement</span>
        <strong>Agreement defines the commitment. Project Plan manages the work.</strong>
        <p>
          Agreement answers what is included, excluded, commercially framed and responsibility-bound. This plan operationalizes that scope
          without duplicating the commercial terms.
        </p>
      </div>

      <div className="project-plan-overview-grid" aria-label="Phase status">
        {operationalPhaseCards.map((phase) => (
          <article className="project-plan-overview-card" key={phase.phase}>
            <span>{phase.status}</span>
            <h3>{phase.phase}</h3>
            <p>{phase.duration}</p>
            <strong>{phase.purpose}</strong>
            <small>{phase.activation}</small>
          </article>
        ))}
      </div>

      <div className="project-plan-scale-note">
        <span>Evidence boundary</span>
        <strong>Evidence supports decisions. It is not a guarantee.</strong>
        <p>This evidence does not guarantee revenue, productivity, client wins or organization-wide adoption.</p>
      </div>

      <div className="project-plan-accordion-stack">
        {operationalSections.map((section) => (
          <OperationalProjectPlanSection section={section} forceExpanded={expanded} key={section.id} />
        ))}
      </div>
    </div>
  );
}

function ProjectPlanPrintSection() {
  return (
    <section className="section project-plan-print-section" aria-labelledby="project-plan-title">
      <ProjectPlanContent expanded />
    </section>
  );
}

function ProjectPlanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel project-plan-panel" role="dialog" aria-modal="true" aria-labelledby="project-plan-modal-title">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close project plan" onClick={onClose}>
          ×
        </button>
        <ProjectPlanContent titleId="project-plan-modal-title" />
      </section>
    </div>
  );
}

function MethodologyValueMap() {
  const valueMapSteps: MethodologyStep[] = [
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
      title: "Method-led workflows",
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

  return (
      <section className="methodology-value-map" aria-labelledby="methodology-value-title">
        <div className="kicker">Methodology value logic</div>
        <h2 id="methodology-value-title">Two paths: ping-pong with AI, or reusable capability.</h2>
        <p className="methodology-value-lede">
          Employees often start with AI in ping-pong mode: ask, answer, retry, move on. That can be useful, but the learning stays personal. The value creation unlock is designing how AI supports the work so context, quality, methods, workflows, automations and small solutions become reusable company capability.
        </p>
        <p className="infrastructure-note">
          Secure, approved infrastructure enables scaling, but value appears when people turn that foundation into daily practice and better ways of working.
        </p>

        <div className="value-map" aria-label="AI value creation map">
          <div className="value-plot">
            <div className="axis-label-y">Reusable company value</div>
            <div className="axis-label-x">AI maturity / methodology level</div>
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

        <div className="methodology-closeout">
          The goal is an AI-enabled operating system that frees capacity, builds capability, unlocks new ideas, and creates more company value.
        </div>
      </section>
  );
}

function AboutHenrikModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useModalFocus(open, onClose, closeButtonRef);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="modal-panel" role="dialog" aria-modal="true" aria-labelledby="about-henrik-title">
        <button ref={closeButtonRef} className="modal-close" type="button" aria-label="Close about Henrik" onClick={onClose}>
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

        <details className="about-detail-block">
          <summary>View selected credibility signals</summary>
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
        </details>

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
