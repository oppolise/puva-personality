import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { questions } from "./data";
import { scoreQuiz } from "./scoring";
import type { AnswerMap, QuizResult } from "./types";

type CustomProperties = CSSProperties & Record<`--${string}`, string | number>;

const shareUrl = () => `${window.location.origin}${window.location.pathname}`;

function Disclaimer() {
  return (
    <aside className="disclaimer">
      แบบทดสอบนี้จัดทำขึ้นเพื่อความบันเทิงและการเสียดสีสังคมเท่านั้น
      <br />
      ไม่มีความเกี่ยวข้องกับบุคคลจริงหรือหน่วยงานทางการใดๆ ทั้งสิ้น
      <br />
      โปรดใช้วิจารณญาณในการปวดหัวกับกรุงเทพฯ
    </aside>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <main className="hero-shell">
      <section className="hero">
        <div className="hero-poster">
          <img
            src="/hero-bangkok.webp"
            alt="ภาพวาดกรุงเทพฯ"
            width="659"
            height="683"
            decoding="async"
          />
        </div>
        <div className="hero-copy">
          <h2>ผู้ว่า Personality</h2>
          <p className="hero-lead">
            แบบทดสอบบุคลิกภาพเมืองกรุงฉบับไม่รับผิดชอบต่อชีวิตจริง
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onStart}>
              เริ่มกันเลย !!
            </button>
            <span>เหล่าแคนดิเดตในจินตนาการ</span>
          </div>
        </div>
      </section>
      <Disclaimer />
    </main>
  );
}

function Quiz({
  answers,
  onAnswer,
  onBack,
  onFinish,
}: {
  answers: AnswerMap;
  onAnswer: (questionId: string, choiceId: string) => void;
  onBack: () => void;
  onFinish: (questionId: string, choiceId: string) => void;
}) {
  const [pendingChoice, setPendingChoice] = useState("");
  const answeredCount = Object.keys(answers).length;
  const currentIndex = Math.min(answeredCount, questions.length - 1);
  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleNext = () => {
    if (!pendingChoice) {
      return;
    }

    if (isLastQuestion) {
      onFinish(question.id, pendingChoice);
      return;
    }

    onAnswer(question.id, pendingChoice);
    setPendingChoice("");
  };

  return (
    <main className="quiz-shell">
      <div className="topbar">
        <span>สถานการณ์ที่ {currentIndex + 1}</span>
        <span>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>
      <div className="progress-track" aria-label={`ทำไปแล้ว ${progress}%`}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <section className="question-panel" key={question.id}>
        <h2>{question.prompt}</h2>
        <div className="choices">
          {question.choices.map((choice) => (
            <button
              className="choice-button"
              aria-pressed={pendingChoice === choice.id}
              key={choice.id}
              onClick={() => setPendingChoice(choice.id)}
            >
              <span>{choice.label}</span>
            </button>
          ))}
        </div>
        <button className="primary-button next-button" disabled={!pendingChoice} onClick={handleNext}>
          {isLastQuestion ? "วาร์ปไปดูผล!" : "ต่อไป  →"}
        </button>
      </section>
      <button className="plain-back-button" onClick={onBack}>
        กลับหน้าเริ่มต้น
      </button>
    </main>
  );
}

function Result({ result, onRestart }: { result: QuizResult; onRestart: () => void }) {
  const [shareState, setShareState] = useState<"idle" | "sharing" | "copied">("idle");
  const winner = result.winner.persona;

  const handleShare = async () => {
    if (shareState === "sharing") {
      return;
    }

    setShareState("sharing");
    const url = shareUrl();

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ url });
        setShareState("idle");
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        return;
      }
    } catch {
      setShareState("idle");
      return;
    }

    setShareState("idle");
  };

  return (
    <main className="result-shell">
      <section className="result-hero" style={{ "--winner-color": winner.color } as CustomProperties}>
        <div className="result-illustration">
          <img
            src={winner.image}
            alt={`ภาพการ์ตูน ${winner.name}`}
            width="640"
            height="960"
            decoding="async"
          />
        </div>
        <div className="result-title-row">
          <h2>{winner.result.headline}</h2>
        </div>
      </section>

      <section className="result-summary">
        <h2>คุณเป็นสายไหน</h2>
        <p>{winner.result.intro}</p>
      </section>

      <div className="result-actions">
        <button
          className="primary-button"
          disabled={shareState === "sharing"}
          onClick={handleShare}
        >
          {shareState === "sharing"
            ? "กำลังเปิดหน้าต่างแชร์..."
            : shareState === "copied"
              ? "คัดลอกลิงก์แล้ว"
              : "↗ แชร์ผลให้เพื่อนได้เล่นกัน !!"}
        </button>
        <button className="ghost-button" onClick={onRestart}>
          ↻ เริ่มใหม่
        </button>
      </div>

      <Disclaimer />
    </main>
  );
}

export default function App() {
  const [mode, setMode] = useState<"home" | "quiz" | "result">("home");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const result = useMemo(() => scoreQuiz(answers), [answers]);

  const answerQuestion = (questionId: string, choiceId: string) => {
    setAnswers((current) => ({ ...current, [questionId]: choiceId }));
  };

  const restart = () => {
    window.history.replaceState(null, "", window.location.pathname);
    setAnswers({});
    setMode("home");
  };

  if (mode === "home") {
    return (
      <Hero
        onStart={() => {
          window.history.replaceState(null, "", window.location.pathname);
          setMode("quiz");
        }}
      />
    );
  }

  if (mode === "result") {
    return <Result result={result} onRestart={restart} />;
  }

  return (
    <Quiz
      answers={answers}
      onAnswer={answerQuestion}
      onBack={restart}
      onFinish={(questionId, choiceId) => {
        setAnswers((current) => {
          const nextAnswers = { ...current, [questionId]: choiceId };
          window.history.replaceState(null, "", window.location.pathname);
          return nextAnswers;
        });
        setMode("result");
      }}
    />
  );
}
