export const STANDARDS = [
  {
    title: "Potable-water wash",
    description:
      "Three tanks at falling turbidity. Water is tested monthly and logged; the last water produce touches is the cleanest on the floor.",
  },
  {
    title: "Four-hour seal window",
    description:
      "The line is laid out backwards from the seal. Intake is graded before washing so nothing spends time it cannot recover.",
  },
  {
    title: "Batch and farm coding",
    description:
      "Every pack carries the date it was washed and a code for the farm it came from. That code is how a complaint is traced in minutes.",
  },
  {
    title: "HACCP principles",
    description:
      "Hazard points identified at intake, wash, cut, pack and dispatch, with a record kept at each. Audited internally twice a year.",
  },
  {
    title: "Cold handling",
    description:
      "2–4°C from cold room to vehicle to your door. Hotel drops land before 7am so nothing sits on a loading bay.",
  },
  {
    title: "Replacement guarantee",
    description:
      "Off-spec or past the seal window, we replace the batch or credit it in full against the code. No return required.",
  },
] as const;

export const EXPORT_PROCESS = [
  {
    title: "Spec agreed",
    description:
      "Cut, pack, grade and volume signed off in writing before a run is scheduled.",
  },
  {
    title: "Run and inspection",
    description:
      "Consignment prepared and presented for quarantine inspection at the facility.",
  },
  {
    title: "Documentation",
    description:
      "Phytosanitary certificate, certificate of origin, NAFDAC and NEPC references issued with the consignment.",
  },
  {
    title: "Load and photograph",
    description:
      "Loaded consignment photographed and shared before it leaves. Nothing ships unseen.",
  },
] as const;
