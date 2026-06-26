import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { personas, questions } from "./data";
import { scoreQuiz } from "./scoring";
import type { AnswerMap, QuizResult } from "./types";

type CustomProperties = CSSProperties & Record<`--${string}`, string | number>;

const shareText = (result: QuizResult) =>
  `ฉันได้ผลลัพธ์เป็น "${result.winner.persona.result.headline}" ใน 4 ผู้ว่า 4 You คุณคือผู้ว่าฯสายไหน?`;

function Header() {
  return (
    <header className="site-header">
      <h1>4 ผู้ว่า 4 You</h1>
    </header>
  );
}

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
          <img src="/hero-bangkok.webp" alt="ภาพวาดกรุงเทพฯ" />
        </div>
        <div className="hero-copy">
          <h2>4 ผู้ว่า 4 You</h2>
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
      <Header />
      <div className="topbar">
        <span>สถานการณ์ที่ {currentIndex + 1}</span>
        <span>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>
      <div className="progress-track" aria-label={`ทำไปแล้ว ${progress}%`}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <section className="question-panel">
        <h2>{question.prompt}</h2>
        <div className="choices">
          {question.choices.map((choice) => {
            const persona = personas.find((item) => item.id === choice.persona)!;
            return (
              <button
                className="choice-button"
                aria-pressed={pendingChoice === choice.id}
                key={choice.id}
                onClick={() => setPendingChoice(choice.id)}
                style={{ "--choice-color": persona.color } as CustomProperties}
              >
                <span>{choice.label}</span>
              </button>
            );
          })}
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
  const [copied, setCopied] = useState(false);
  const winner = result.winner.persona;

  const handleShare = async () => {
    const text = shareText(result);
    if (typeof navigator.share === "function") {
      await navigator.share({ title: "4 ผู้ว่า 4 You", text, url: window.location.href });
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setCopied(true);
    }
  };

  return (
    <main className="result-shell">
      <Header />
      <section className="result-hero" style={{ "--winner-color": winner.color } as CustomProperties}>
        <div className="result-illustration">
          <img src={winner.image} alt={`ภาพการ์ตูน ${winner.name}`} />
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
        <button className="primary-button" onClick={handleShare}>
          {copied ? "คัดลอกแล้ว" : "↗ แชร์ไปให้โลกรับรู้ !!"}
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
    setAnswers({});
    setMode("home");
  };

  if (mode === "home") {
    return <Hero onStart={() => setMode("quiz")} />;
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
        setAnswers((current) => ({ ...current, [questionId]: choiceId }));
        setMode("result");
      }}
    />
  );
}
