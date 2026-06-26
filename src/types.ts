export type AxisKey =
  | "opportunity_human_care"
  | "infrastructure_resilience"
  | "clean_transport_order"
  | "anti_corruption_transparency"
  | "law_enforcement_business_friction"
  | "ai_innovation_future_city";

export type PersonaId = "chadchart" | "anucha" | "joe" | "mallika";

export type AxisVector = Record<AxisKey, number>;

export type Choice = {
  id: string;
  label: string;
  persona: PersonaId;
  axes: Partial<AxisVector>;
};

export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
};

export type Persona = {
  id: PersonaId;
  name: string;
  color: string;
  vector: AxisVector;
  image: string;
  result: {
    headline: string;
    intro: string;
  };
};

export type AnswerMap = Record<string, string>;

export type RankedPersona = {
  persona: Persona;
  rawScore: number;
};

export type QuizResult = {
  winner: RankedPersona;
};
