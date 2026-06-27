import { describe, expect, it } from "vitest";
import { questions } from "./data";
import { buildPersonaAnswerMap, scoreQuiz } from "./scoring";
import type { PersonaId } from "./types";

describe("scoreQuiz", () => {
  it("keeps the quiz to 8 questions", () => {
    expect(questions).toHaveLength(8);
  });

  it.each<PersonaId>(["chadchart", "anucha", "joe", "mallika"])(
    "returns %s when every answer points to that persona",
    (personaId) => {
      const result = scoreQuiz(buildPersonaAnswerMap(personaId));

      expect(result.winner.persona.id).toBe(personaId);
      expect(result.winner.rawScore).toBeGreaterThan(0);
    },
  );

  it("keeps quiz scoring local without browser persistence APIs", () => {
    const source = `${scoreQuiz.toString()} ${buildPersonaAnswerMap.toString()}`;

    expect(source).not.toContain("fetch(");
    expect(source).not.toContain("localStorage");
    expect(source).not.toContain("sessionStorage");
    expect(source).not.toContain("navigator.sendBeacon");
  });
});
