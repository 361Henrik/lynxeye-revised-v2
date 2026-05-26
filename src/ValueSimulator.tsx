import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  buildCopyText,
  calculateSimulatorModel,
  defaultSimulatorInputs,
  formatDecimal,
  formatHours,
  formatHoursRange,
  formatNumber,
  formatPeople,
  formatSEKRange,
  formatSEKShort,
  scenarioPresets,
  type ScenarioName,
  type SimulatorInputs,
} from "./simulatorModel";

const scenarioOptions: { name: ScenarioName; title: string; text: string }[] = [
  {
    name: "small",
    title: "Small nucleus",
    text: "5 people, 3 useful hours per week. A careful first proof.",
  },
  {
    name: "bridge",
    title: "Bridge team",
    text: "10 people, 5 useful hours per week. The recommended executive case.",
  },
  {
    name: "expanded",
    title: "Expanded bridge",
    text: "15 people, 6 useful hours per week. Wider capability, still focused.",
  },
];

type SliderConfig = {
  id: keyof SimulatorInputs;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: string;
  info: string;
};

type NumberConfig = {
  id: keyof SimulatorInputs;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: string;
  info: string;
};

type ExpansionSignal = {
  action: "expand" | "collapse";
  version: number;
};

export function ValueSimulator({ expansionSignal }: { expansionSignal: ExpansionSignal }) {
  const [inputs, setInputs] = useState<SimulatorInputs>(defaultSimulatorInputs);
  const [activeScenario, setActiveScenario] = useState<ScenarioName | null>("bridge");
  const [copyStatus, setCopyStatus] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const copyStatusTimerRef = useRef<number | null>(null);
  const state = useMemo(() => calculateSimulatorModel(inputs), [inputs]);

  useEffect(() => {
    return () => {
      if (copyStatusTimerRef.current) {
        window.clearTimeout(copyStatusTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (expansionSignal.version === 0) {
      return;
    }

    const shouldOpen = expansionSignal.action === "expand";
    setAdvancedOpen(shouldOpen);
    setSourceOpen(shouldOpen);
  }, [expansionSignal]);

  function updateInput(key: keyof SimulatorInputs, value: number, shouldClearScenario = true) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));

    if (shouldClearScenario) {
      setActiveScenario(null);
    }
  }

  function handleScenario(name: ScenarioName) {
    setInputs((current) => ({
      ...current,
      ...scenarioPresets[name],
    }));
    setActiveScenario(name);
  }

  async function handleCopy() {
    const text = buildCopyText(state);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        copyTextFallback(text);
      }

      setCopyStatus("Copied. This model is not saved.");
      if (copyStatusTimerRef.current) {
        window.clearTimeout(copyStatusTimerRef.current);
      }
      copyStatusTimerRef.current = window.setTimeout(() => setCopyStatus(""), 3500);
    } catch {
      setCopyStatus("Copy unavailable. Select the model text on screen.");
    }
  }

  const mainLevers: SliderConfig[] = [
    {
      id: "cohortSize",
      label: "Methodology cohort size",
      min: 5,
      max: 15,
      step: 1,
      value: formatPeople(state.cohortSize),
      info:
        "Assumption: the number of people who become strong AI methodology users during the value pilot. Default: 10. This is the claim, not all 70 people.",
    },
    {
      id: "weeklyHours",
      label: "Useful hours returned / person / week",
      min: 1,
      max: 8,
      step: 0.5,
      value: `${formatDecimal(state.weeklyHours, 1)} hours`,
      info:
        "Assumption: time that is useful enough to matter after friction, review, and work creep. Default: 5 hours per cohort member per week.",
    },
  ];

  const advancedAssumptions: NumberConfig[] = [
    {
      id: "rate",
      label: "Blended value rate",
      min: 1500,
      max: 5000,
      step: 100,
      value: `${formatNumber(state.rate)} SEK/hr`,
      info:
        "Assumption: blended gross equivalent value rate across seniority levels. This is not net profit and does not include pricing, margin, demand, or tooling cost.",
    },
    {
      id: "workingWeeks",
      label: "Working weeks / year",
      min: 40,
      max: 52,
      step: 1,
      value: formatNumber(state.workingWeeks),
      info:
        "Assumption: working weeks used to translate weekly practice into annual capacity. Default: 46 weeks.",
    },
    {
      id: "uncertaintyBand",
      label: "Uncertainty band",
      min: 0,
      max: 30,
      step: 1,
      value: `${state.uncertaintyBand}%`,
      info:
        "Assumption: range around the directional capacity and value signal. Default: 15%, because Phase 2 still needs real Lynxeye evidence.",
    },
  ];

  return (
    <section id="value-simulator" className="section value-simulator-section">
      <div className="section-intro">
        <div className="kicker">Back of the envelope</div>
        <h2>If 10 of 70 people learn the AI methodology well, the value is already material.</h2>
        <p>
          This is not a claim that everyone becomes an AI power user. It sizes the value of a focused capability group creating reusable
          practice for the wider firm.
        </p>
      </div>

      <div className="simulator-scenario-grid" aria-label="Simulator presets">
        {scenarioOptions.map((scenario) => {
          const isActive = activeScenario === scenario.name;

          return (
            <button
              className={`simulator-scenario${isActive ? " is-active" : ""}`}
              type="button"
              aria-pressed={isActive}
              onClick={() => handleScenario(scenario.name)}
              key={scenario.name}
            >
              <strong>{scenario.title}</strong>
              <span>{scenario.text}</span>
            </button>
          );
        })}
      </div>

      <div className="simulator-shell">
        <div className="simulator-controls" aria-label="Simulator assumptions">
          <p className="simulator-label">Cohort claim</p>
          <div className="simulator-context-row" aria-label="Company context">
            <span>Total Lynxeye context</span>
            <strong>{formatPeople(state.totalEmployees)}</strong>
          </div>
          {mainLevers.map((control) => (
            <SliderControl control={control} inputs={inputs} onChange={updateInput} key={control.id} />
          ))}

          <div className="simulator-note">
            <strong>Executive guardrail.</strong> The cohort is the claim. The 70-person number is only the wider context and future scale
            ceiling after proof.
          </div>

          <details className="simulator-assumptions" open={advancedOpen} onToggle={(event) => setAdvancedOpen(event.currentTarget.open)}>
            <summary>{advancedOpen ? "Hide assumptions" : "View assumptions"}</summary>
            <div className="simulator-assumption-grid">
              {advancedAssumptions.map((control) => (
                <NumberControl control={control} inputs={inputs} onChange={updateInput} key={control.id} />
              ))}
            </div>
          </details>
        </div>

        <div className="simulator-output" aria-live="polite">
          <div className="simulator-print-assumptions" aria-label="Printed simulator assumptions">
            <span>Current assumptions</span>
            <div>
              <strong>{formatPeople(state.cohortSize)}</strong>
              <p>Methodology cohort</p>
            </div>
            <div>
              <strong>{formatDecimal(state.weeklyHours, 1)} hrs/week</strong>
              <p>Useful time returned</p>
            </div>
            <div>
              <strong>{formatNumber(state.rate)} SEK/hr</strong>
              <p>Blended value rate</p>
            </div>
          </div>

          <div className="simulator-output-head">
            <p>Cohort-first value signal at current settings</p>
            <button className="detail-toggle simulator-copy-button" type="button" onClick={handleCopy}>
              Copy current model
            </button>
          </div>
          <p className="simulator-copy-status" aria-live="polite">
            {copyStatus}
          </p>

          <div className="simulator-output-grid">
            <section className="simulator-output-group simulator-output-group-primary" aria-labelledby="main-simulator-output">
              <h3 id="main-simulator-output">Main signal</h3>
              <Metric
                label="Useful capacity / year"
                value={formatHoursRange(state.usefulLow, state.usefulHigh)}
                help={`${formatPeople(state.cohortSize)} x ${formatDecimal(state.weeklyHours, 1)} useful hours/week x ${
                  state.workingWeeks
                } weeks = ${formatHours(state.usefulHours)} before uncertainty.`}
                info="Formula: methodology cohort x useful hours per person per week x working weeks, shown with the uncertainty band. Interpretation: useful capacity created by the focused cohort."
                featured
              />
              <Metric
                label="Gross equivalent value"
                value={formatSEKRange(state.valueLow, state.valueHigh)}
                help={`At ${formatNumber(state.rate)} SEK/hour, this is the directional gross equivalent value of the focused cohort.`}
                info="Formula: useful capacity range x blended value rate. Caveat: this is not net profit, and it excludes tooling cost, engagement pricing, demand, and margin."
                featured
              />
              <Metric
                label="Company context"
                value={`${formatPeople(state.cohortSize)} of ${formatPeople(state.totalEmployees)}`}
                help={`${formatDecimal(state.companyShare, 0)}% of the firm carries the value claim. The remaining ${formatPeople(
                  state.remainingEmployees,
                )} can benefit from reusable practice without being counted as power users.`}
                info="Interpretation: the simulator deliberately avoids assuming universal adoption. It shows the size of a focused bridge team inside the 70-person company context."
              />
            </section>

            <section className="simulator-output-group" aria-labelledby="context-simulator-output">
              <h3 id="context-simulator-output">Executive translation</h3>
              <Metric
                label="Useful hours / methodology user"
                value={`${formatHours(state.hoursPerOrchestratorYear)} / year`}
                help="This is the visible behavioral claim per strong AI methodology user."
                info="Formula: useful hours per person per week x working weeks. Interpretation: the per-person lift the pilot must make believable."
              />
              <Metric
                label="Every extra cohort member"
                value={`${formatHours(state.additionalPersonHours)} / ${formatSEKShort(state.additionalPersonValueLow)} to ${formatSEKShort(
                  state.additionalPersonValueHigh,
                )}`}
                help="A simple sensitivity check for discussing 8, 10, or 15 strong users."
                info="Formula: one additional cohort member x current weekly useful hours x working weeks x blended value rate, with uncertainty."
              />
              <Metric
                label="What the cohort creates"
                value="Reusable habits, examples, review points, and workflow patterns."
                help="The wider firm value comes from shared practice, not from pretending everyone works the same way."
                info="Interpretation: the business value should compound through methods others can use. The simulator does not count that secondary effect in the main number."
                textValue
              />
            </section>
          </div>

          <section className="simulator-scale-ceiling" aria-labelledby="scale-ceiling-title">
            <div>
              <p className="simulator-section-kicker">Scale ceiling - not the pilot claim</p>
              <h3 id="scale-ceiling-title">If the same level later worked across all 70 people...</h3>
              <p>
                This is future scale after proof. It should stay visible enough to show the size of the opportunity, but secondary enough
                that the pilot does not sound grandiose.
              </p>
            </div>
            <div className="simulator-scale-grid">
              <article>
                <span>Useful capacity ceiling</span>
                <strong>{formatHoursRange(state.scaleCeilingLow, state.scaleCeilingHigh)}</strong>
              </article>
              <article>
                <span>Gross equivalent ceiling</span>
                <strong>{formatSEKRange(state.scaleCeilingValueLow, state.scaleCeilingValueHigh)}</strong>
              </article>
            </div>
          </section>

          <div className="simulator-sensitivity">
            The pilot should prove where the hours come from before Lynxeye treats the 70-person ceiling as a business case.
          </div>

          <ValueTranslation />
        </div>
      </div>

      <div className="simulator-hypothesis">
        <p>
          <strong>Directional Phase 2 potential.</strong> Useful hours are treated as already captured enough to matter. The pilot must
          prove the work patterns behind them before the wider scale story becomes credible.
        </p>
      </div>

      <SecondaryImplications />

      <details className="simulator-source-note" open={sourceOpen} onToggle={(event) => setSourceOpen(event.currentTarget.open)}>
        <summary>{sourceOpen ? "Hide assumptions and use limits" : "View assumptions and use limits"}</summary>
        <div className="details-body">
          <p>
            This model is a directional conversation tool. It does not include AI tooling cost, exact engagement pricing, profit impact,
            hiring impact, pitch conversion, or deal-size revenue.
          </p>
          <p>No entered values are saved by this MVP.</p>
        </div>
      </details>
    </section>
  );
}

function SliderControl({
  control,
  inputs,
  onChange,
}: {
  control: SliderConfig;
  inputs: SimulatorInputs;
  onChange: (key: keyof SimulatorInputs, value: number, shouldClearScenario?: boolean) => void;
}) {
  return (
    <div className="simulator-control">
      <div className="simulator-control-head">
        <span className="simulator-control-title">
          <label htmlFor={control.id}>{control.label}</label>
          <InfoTip label={`${control.label} assumption`}>{control.info}</InfoTip>
        </span>
        <span>{control.value}</span>
      </div>
      <input
        id={control.id}
        type="range"
        min={control.min}
        max={control.max}
        step={control.step ?? 1}
        value={inputs[control.id]}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(control.id, Number(event.target.value))}
      />
    </div>
  );
}

function NumberControl({
  control,
  inputs,
  onChange,
}: {
  control: NumberConfig;
  inputs: SimulatorInputs;
  onChange: (key: keyof SimulatorInputs, value: number, shouldClearScenario?: boolean) => void;
}) {
  return (
    <div className="simulator-number-control">
      <label htmlFor={control.id}>
        {control.label}
        <InfoTip label={`${control.label} assumption`}>{control.info}</InfoTip>
      </label>
      <input
        id={control.id}
        type="number"
        min={control.min}
        max={control.max}
        step={control.step ?? 1}
        value={inputs[control.id]}
        aria-label={`${control.label}: ${control.value}`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(control.id, event.target.value === "" ? 0 : Number(event.target.value))}
      />
    </div>
  );
}

function InfoTip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();

  return (
    <span className="simulator-info">
      <button type="button" aria-label={label} aria-describedby={id}>
        i
      </button>
      <span className="simulator-info-panel" id={id} role="tooltip">
        {children}
      </span>
    </span>
  );
}

function Metric({
  label,
  value,
  help,
  info,
  featured = false,
  textValue = false,
}: {
  label: string;
  value: string;
  help: string;
  info: string;
  featured?: boolean;
  textValue?: boolean;
}) {
  return (
    <div className={`simulator-metric${featured ? " simulator-metric-featured" : ""}`}>
      <p className="simulator-metric-label">
        {label}
        <InfoTip label={`${label} formula`}>{info}</InfoTip>
      </p>
      <p className={`simulator-metric-value${textValue ? " simulator-metric-value-text" : ""}`}>{value}</p>
      <p className="simulator-metric-help">{help}</p>
    </div>
  );
}

function ValueTranslation() {
  const cards = [
    {
      title: "For executives",
      text: "A material value story without needing to claim universal AI adoption.",
      info:
        "The calculator keeps the main claim small enough to be believable while still showing that a focused group can matter commercially.",
    },
    {
      title: "For the cohort",
      text: "Selected people learn to turn AI tools into repeatable workflow practice.",
      info:
        "The cohort is where behavior changes first. Their examples and methods become the material other teams can reuse.",
    },
    {
      title: "For the wider firm",
      text: "The other 60 people can benefit from playbooks without being counted as power users.",
      info:
        "This avoids the weak assumption that every employee changes equally. The wider value comes from reusable patterns, not identical adoption.",
    },
    {
      title: "For clients",
      text: "More senior attention can move into judgment, synthesis, review, and sharper client-facing work.",
      info:
        "Client value is still a hypothesis. The pilot should capture before/after evidence before any client impact is claimed.",
    },
  ];

  return (
    <section className="simulator-translation" aria-labelledby="simulator-translation-title">
      <p className="simulator-section-kicker" id="simulator-translation-title">
        What this means
      </p>
      <div className="simulator-translation-grid">
        {cards.map((card) => (
          <article className="simulator-translation-item" key={card.title}>
            <div>
              <h3>{card.title}</h3>
              <InfoTip label={`${card.title} value interpretation`}>{card.info}</InfoTip>
            </div>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SecondaryImplications() {
  const items = [
    {
      title: "Pitch speed",
      text: "Keep as a qualitative implication until Lynxeye has baseline pitch volume, cycle time, and win-rate evidence.",
    },
    {
      title: "Hiring pressure",
      text: "Frame as capacity pressure relief, not headcount reduction. Capability can absorb repeatable load while hiring stays a human judgment decision.",
    },
    {
      title: "Investment frame",
      text: "Discuss separately once scope and pricing are clear. The simulator should size upside, not force a payback promise.",
    },
  ];

  return (
    <details className="simulator-secondary-frame">
      <summary>View secondary implications kept outside the calculator</summary>
      <div className="simulator-secondary-grid">
        {items.map((item) => (
          <article className="simulator-secondary-item" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </details>
  );
}

function copyTextFallback(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error("Copy command failed");
  }
}
