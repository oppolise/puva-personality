import { emptyAxisVector, personas, questions } from "./data";
import type { AnswerMap, AxisVector, PersonaId, QuizResult, RankedPersona } from "./types";

const addAxisScores = (base: AxisVector, addition: Partial<AxisVector>) => {
  const next = { ...base };
  for (const key of Object.keys(addition) as (keyof AxisVector)[]) {
    next[key] += addition[key] ?? 0;
  }
  return next;
};

const dot = (a: AxisVector, b: AxisVector) =>
  (Object.keys(a) as (keyof AxisVector)[]).reduce((sum, key) => sum + a[key] * b[key], 0);

const magnitude = (vector: AxisVector) =>
  Math.sqrt((Object.values(vector) as number[]).reduce((sum, value) => sum + value * value, 0));

export const cosineSimilarity = (a: AxisVector, b: AxisVector) => {
  const divisor = magnitude(a) * magnitude(b);
  return divisor === 0 ? 0 : dot(a, b) / divisor;
};

export const scoreQuiz = (answers: AnswerMap): QuizResult => {
  let axisScores = emptyAxisVector();
  const personaScores = personas.reduce(
    (scores, persona) => ({ ...scores, [persona.id]: 0 }),
    {} as Record<PersonaId, number>,
  );

  for (const question of questions) {
    const answerId = answers[question.id];
    const selected = question.choices.find((choice) => choice.id === answerId);

    if (!selected) {
      continue;
    }

    personaScores[selected.persona] += 3;
    axisScores = addAxisScores(axisScores, selected.axes);
  }

  const ranking: RankedPersona[] = personas
    .map((persona) => {
      const similarity = cosineSimilarity(axisScores, persona.vector);
      const rawScore = personaScores[persona.id] + similarity * 4;
      return {
        persona,
        rawScore,
      };
    })
    .sort((a, b) => b.rawScore - a.rawScore);

  return {
    winner: ranking[0],
  };
};

export const buildPersonaAnswerMap = (personaId: PersonaId): AnswerMap =>
  Object.fromEntries(
    questions.map((question) => [
      question.id,
      question.choices.find((choice) => choice.persona === personaId)?.id ?? question.choices[0].id,
    ]),
  );
