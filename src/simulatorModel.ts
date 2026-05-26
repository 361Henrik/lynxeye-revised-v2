export type ScenarioName = "small" | "bridge" | "expanded";

export type SimulatorInputs = {
  totalEmployees: number;
  cohortSize: number;
  weeklyHours: number;
  workingWeeks: number;
  rate: number;
  uncertaintyBand: number;
};

export type SimulatorState = SimulatorInputs & {
  usefulHours: number;
  usefulLow: number;
  usefulHigh: number;
  valueLow: number;
  valueHigh: number;
  companyShare: number;
  remainingEmployees: number;
  hoursPerOrchestratorYear: number;
  scaleCeilingHours: number;
  scaleCeilingLow: number;
  scaleCeilingHigh: number;
  scaleCeilingValueLow: number;
  scaleCeilingValueHigh: number;
  additionalPersonHours: number;
  additionalPersonValueLow: number;
  additionalPersonValueHigh: number;
};

export const defaultSimulatorInputs: SimulatorInputs = {
  totalEmployees: 70,
  cohortSize: 10,
  weeklyHours: 5,
  workingWeeks: 46,
  rate: 3000,
  uncertaintyBand: 15,
};

export const scenarioPresets: Record<ScenarioName, Pick<SimulatorInputs, "cohortSize" | "weeklyHours">> = {
  small: {
    cohortSize: 5,
    weeklyHours: 3,
  },
  bridge: {
    cohortSize: 10,
    weeklyHours: 5,
  },
  expanded: {
    cohortSize: 15,
    weeklyHours: 6,
  },
};

export function calculateSimulatorModel(inputs: SimulatorInputs): SimulatorState {
  const totalEmployees = Math.max(1, Math.round(inputs.totalEmployees));
  const cohortSize = Math.min(totalEmployees, Math.max(0, Math.round(inputs.cohortSize)));
  const weeklyHours = Math.max(0, inputs.weeklyHours);
  const workingWeeks = Math.max(1, Math.round(inputs.workingWeeks));
  const rate = Math.max(0, inputs.rate);
  const uncertaintyBand = Math.max(0, inputs.uncertaintyBand);
  const uncertaintyRate = uncertaintyBand / 100;
  const usefulHours = cohortSize * weeklyHours * workingWeeks;
  const usefulLow = usefulHours * (1 - uncertaintyRate);
  const usefulHigh = usefulHours * (1 + uncertaintyRate);
  const valueLow = usefulLow * rate;
  const valueHigh = usefulHigh * rate;
  const scaleCeilingHours = totalEmployees * weeklyHours * workingWeeks;
  const scaleCeilingLow = scaleCeilingHours * (1 - uncertaintyRate);
  const scaleCeilingHigh = scaleCeilingHours * (1 + uncertaintyRate);
  const additionalPersonHours = weeklyHours * workingWeeks;

  return {
    totalEmployees,
    cohortSize,
    weeklyHours,
    workingWeeks,
    rate,
    uncertaintyBand,
    usefulHours,
    usefulLow,
    usefulHigh,
    valueLow,
    valueHigh,
    companyShare: (cohortSize / totalEmployees) * 100,
    remainingEmployees: Math.max(0, totalEmployees - cohortSize),
    hoursPerOrchestratorYear: weeklyHours * workingWeeks,
    scaleCeilingHours,
    scaleCeilingLow,
    scaleCeilingHigh,
    scaleCeilingValueLow: scaleCeilingLow * rate,
    scaleCeilingValueHigh: scaleCeilingHigh * rate,
    additionalPersonHours,
    additionalPersonValueLow: additionalPersonHours * (1 - uncertaintyRate) * rate,
    additionalPersonValueHigh: additionalPersonHours * (1 + uncertaintyRate) * rate,
  };
}

export function formatNumber(value: number) {
  return Number(value).toLocaleString("en-US");
}

export function trimDecimal(value: number, digits: number) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: digits,
  });
}

export function formatDecimal(value: number, digits: number) {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function roundTo(value: number, step: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value / step) * step;
}

export function roundHoursForDisplay(value: number) {
  const absoluteValue = Math.abs(value);
  const step = absoluteValue >= 10000 ? 100 : 10;
  return roundTo(value, step);
}

export function formatPeople(value: number) {
  return value === 1 ? "1 person" : `${formatNumber(value)} people`;
}

export function formatHours(value: number) {
  return `${formatNumber(Math.round(value))} hours`;
}

export function formatHoursRange(low: number, high: number) {
  return `${formatNumber(roundHoursForDisplay(low))} to ${formatNumber(roundHoursForDisplay(high))} hours`;
}

export function formatSEKShort(value: number) {
  if (value >= 1000000) {
    return `${trimDecimal(value / 1000000, 2)}M SEK`;
  }

  return `${formatNumber(Math.round(value / 1000))}k SEK`;
}

export function formatSEKRange(low: number, high: number) {
  return `${trimDecimal(low / 1000000, 1)} to ${trimDecimal(high / 1000000, 1)}M SEK`;
}

export function buildCopyText(state: SimulatorState) {
  return [
    "Accelerate Lynxeye with AI, selected-group back-of-envelope model",
    "",
    "Executive estimate",
    `What if ${formatPeople(state.cohortSize)} of ${formatPeople(state.totalEmployees)} become strong AI methodology users?`,
    "",
    "Inputs",
    `Total Lynxeye context: ${formatPeople(state.totalEmployees)}`,
    `Selected methodology group: ${formatPeople(state.cohortSize)}`,
    `Useful hours returned per cohort member per week: ${formatDecimal(state.weeklyHours, 1)}`,
    `Working weeks / year: ${state.workingWeeks}`,
    `Blended value rate: ${formatNumber(state.rate)} SEK/hour`,
    `Uncertainty band: ${state.uncertaintyBand}%`,
    "",
    "Outputs",
    `Useful capacity per year: ${formatHoursRange(state.usefulLow, state.usefulHigh)}`,
    `Gross equivalent value: ${formatSEKRange(state.valueLow, state.valueHigh)}`,
    `Cohort share of company: ${formatDecimal(state.companyShare, 0)}%`,
    `Useful hours per methodology user: ${formatHours(state.hoursPerOrchestratorYear)} / year`,
    "",
    "Future upside, not the pilot claim",
    `If the same level later worked across all ${state.totalEmployees} people: ${formatHoursRange(state.scaleCeilingLow, state.scaleCeilingHigh)} / ${formatSEKRange(
      state.scaleCeilingValueLow,
      state.scaleCeilingValueHigh,
    )}`,
    "",
    "Caveat",
    "This does not assume everyone becomes an AI power user. It estimates the value of a focused capability group creating reusable practice for the wider firm.",
    "The pilot should prove where the hours come from before Lynxeye treats the 70-person ceiling as a business case.",
    "Tooling cost, exact engagement pricing, win-rate impact, hiring impact, and profit impact are outside this primary calculator.",
    "This model is not saved.",
  ].join("\n");
}
