export type IbsType = "IBS-D" | "IBS-C" | "IBS-M" | "IBS-U";

export type IbsTypeInfo = {
  id: IbsType;
  label: string;
  shortLabel: string;
  badge: string;
  summary: string;
  symptoms: string[];
  /** Plain-language clue for people who don't know medical terms */
  clue: string;
};

export const IBS_TYPES: IbsTypeInfo[] = [
  {
    id: "IBS-D",
    label: "IBS-D — Diarrhea type",
    shortLabel: "Diarrhea (IBS-D)",
    badge: "D",
    summary: "Loose or urgent stools are your main pattern.",
    symptoms: ["Frequent loose stools", "Urgent bathroom trips", "Cramping before bowel movements"],
    clue: "If diarrhea or urgency happens more often than constipation, this is likely you.",
  },
  {
    id: "IBS-C",
    label: "IBS-C — Constipation type",
    shortLabel: "Constipation (IBS-C)",
    badge: "C",
    summary: "Hard stools, infrequent bowel movements, or feeling 'not empty'.",
    symptoms: ["Hard or lumpy stools", "Fewer than 3 bowel movements per week", "Bloating and straining"],
    clue: "If you’re usually blocked up or bloated more than you’re running to the bathroom, pick this.",
  },
  {
    id: "IBS-M",
    label: "IBS-M — Mixed type",
    shortLabel: "Mixed (IBS-M)",
    badge: "M",
    summary: "You swing between diarrhea and constipation — sometimes in the same week.",
    symptoms: ["Alternating loose and hard stools", "Unpredictable bowel days", "Both bloating and urgency"],
    clue: "If your gut feels like a coin flip day to day, mixed type fits best.",
  },
  {
    id: "IBS-U",
    label: "IBS-U — Unsure / not diagnosed",
    shortLabel: "Not sure yet",
    badge: "?",
    summary: "You suspect IBS but don't have a type from a doctor — or symptoms don't fit neatly.",
    symptoms: ["Not formally diagnosed", "Symptoms change a lot", "Still figuring out your pattern"],
    clue: "Totally okay — Gutfeel still works. We'll use general low FODMAP guidance until patterns emerge.",
  },
];

/** Symptom quiz → suggested IBS type */
export type SymptomQuizAnswer = {
  bowelPattern: "mostly_loose" | "mostly_hard" | "both" | "unsure";
  mainComplaint: "urgency" | "bloating" | "pain" | "unsure";
};

export function suggestIbsTypeFromQuiz(answers: SymptomQuizAnswer): IbsType {
  if (answers.bowelPattern === "mostly_loose") return "IBS-D";
  if (answers.bowelPattern === "mostly_hard") return "IBS-C";
  if (answers.bowelPattern === "both") return "IBS-M";
  if (answers.mainComplaint === "urgency") return "IBS-D";
  if (answers.mainComplaint === "bloating" || answers.mainComplaint === "pain") return "IBS-C";
  return "IBS-U";
}

export function getIbsTypeInfo(id: string): IbsTypeInfo | undefined {
  return IBS_TYPES.find(t => t.id === id);
}
