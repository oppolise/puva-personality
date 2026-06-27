import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { questions } from "./data";
import { scoreQuiz } from "./scoring";
import type { Persona } from "./types";
import type { AnswerMap, QuizResult } from "./types";

type CustomProperties = CSSProperties & Record<`--${string}`, string | number>;

const shareText = (result: QuizResult) =>
  `ฉันได้ผลลัพธ์เป็น "${result.winner.persona.result.headline}" ใน ผู้ว่า Personality คุณคือผู้ว่าฯสายไหน?`;

const shareUrl = () => `${window.location.origin}${window.location.pathname}`;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const drawWrappedText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) => {
  const words = text.split(" ");
  let line = "";
  let cursorY = y;

  words.forEach((word, index) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > maxWidth && line) {
      context.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
      return;
    }

    line = nextLine;
    if (index === words.length - 1) {
      context.fillText(line, x, cursorY);
    }
  });
};

const createShareCard = async (persona: Persona) => {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  context.fillStyle = "#faf9f7";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = persona.color;
  context.fillRect(0, 0, canvas.width, 18);

  const image = await loadImage(persona.image);
  const imageHeight = 650;
  const imageWidth = (image.width / image.height) * imageHeight;
  context.drawImage(image, (canvas.width - imageWidth) / 2, 120, imageWidth, imageHeight);

  context.textAlign = "center";
  context.fillStyle = "#171717";
  context.font = '700 56px "Noto Sans Thai", system-ui, sans-serif';
  context.fillText("ผู้ว่า Personality", canvas.width / 2, 860);

  context.fillStyle = persona.color;
  context.font = '800 88px "Noto Sans Thai", system-ui, sans-serif';
  context.fillText(persona.result.headline, canvas.width / 2, 980);

  context.strokeStyle = persona.color;
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(310, 1016);
  context.lineTo(770, 1016);
  context.stroke();

  context.fillStyle = "#57534e";
  context.font = '500 34px "Noto Sans Thai", system-ui, sans-serif';
  drawWrappedText(context, persona.result.intro, canvas.width / 2, 1100, 780, 54);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png", 0.92),
  );

  if (!blob) {
    return null;
  }

  return new File([blob], `4-puva-4-you-${persona.id}.png`, { type: "image/png" });
};

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
    const text = shareText(result);
    const url = shareUrl();
    const shareMessage = `${text} ${url}`;

    try {
      const shareFile = await createShareCard(winner);
      const files = shareFile ? [shareFile] : undefined;

      if (
        files &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files })
      ) {
        await navigator.share({ title: "ผู้ว่า Personality", text: shareMessage, files });
        setShareState("idle");
        return;
      }

      if (typeof navigator.share === "function") {
        await navigator.share({ title: "ผู้ว่า Personality", text, url });
        setShareState("idle");
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareMessage);
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
            ? "กำลังเตรียมการ์ดแชร์..."
            : shareState === "copied"
              ? "คัดลอกลิงก์แล้ว"
              : "↗ แชร์ผลให้โลกรับรู้ !!"}
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
