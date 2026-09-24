"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PRE_TEST_QUESTIONS } from "@/lib/data/mockData";
import { ProgressBar } from "@/components/ProgressBar";
import { ArrowRight, Sparkles } from "lucide-react";

export default function PreTestPage() {
  const router = useRouter();
  const [step, setStep] = useState<"name" | "questions">("name");
  const [participantName, setParticipantName] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("extensao_participant_name");
    if (savedName) {
      setParticipantName(savedName);
    }
  }, []);

  const handleStartQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = participantName.trim() || "Amigo";
    localStorage.setItem("extensao_participant_name", finalName);
    setStep("questions");
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const allAnswered = PRE_TEST_QUESTIONS.every((q) => answers[q.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || isSubmitting) return;

    setIsSubmitting(true);

    let calculatedScore = 0;
    PRE_TEST_QUESTIONS.forEach((q) => {
      const selectedOptId = answers[q.id];
      const opt = q.options.find((o) => o.id === selectedOptId);
      if (opt && opt.points > 0) calculatedScore += opt.points;
    });

    const finalName = participantName.trim() || "Participante";
    localStorage.setItem("extensao_pre_score", calculatedScore.toString());
    localStorage.setItem("extensao_pre_answers", JSON.stringify(answers));

    try {
      await fetch("/api/pre-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalName,
          score: calculatedScore,
          answers,
        }),
      });
    } catch {
      // Fallback local
    }

    setScore(calculatedScore);
    setSubmitted(true);
    setIsSubmitting(false);
    // NÃO faz scrollTo para o topo! A tela permanece suavemente onde o usuário está!
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <ProgressBar currentStep={1} />

      {/* TELA 1: Entrada com Nome */}
      {step === "name" ? (
        <div className="max-w-md mx-auto px-4 pt-12 text-center animate-in fade-in duration-300">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-blue-500 to-indigo-600 border-4 border-white shadow-xl flex items-center justify-center text-4xl shadow-blue-500/30">
              🤖
            </div>
            <div className="absolute -bottom-2 -right-1 bg-emerald-500 text-white p-1.5 rounded-full ring-4 ring-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider mb-2">
            Primeiro Passo
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Como podemos te chamar?
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xs mx-auto leading-relaxed">
            Seu nome ou apelido será usado para personalizar o teste e mostrar sua evolução.
          </p>

          <form onSubmit={handleStartQuestions} className="mt-8 space-y-4">
            <input
              type="text"
              autoFocus
              required
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              placeholder="Digite seu nome ou apelido"
              className="w-full text-center text-lg sm:text-xl font-bold py-4 px-6 rounded-2xl bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 focus:border-blue-500 focus:border-b-blue-600 focus:outline-none transition-all shadow-xs"
            />

            <button
              type="submit"
              disabled={!participantName.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-200 border-b-4 border-emerald-700 disabled:border-slate-300 active:border-b-0 active:translate-y-1 text-white font-black text-lg transition-all shadow-md disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Bora começar!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        /* TELA 2: Perguntas com Feedback Inline no final (sem saltar a tela) */
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-6 animate-in fade-in duration-300">
          <div className="text-center space-y-1">
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
              Diagnóstico Inicial
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Olá, {participantName || "Visitante"}!
            </h2>
            <p className="text-xs text-slate-500">
              Responda às 5 perguntas rápidas abaixo para medir seu ponto de partida:
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {PRE_TEST_QUESTIONS.map((question, qIdx) => {
              const selectedOption = answers[question.id];

              return (
                <div
                  key={question.id}
                  className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-xs transition-all space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {question.title.replace(/^[0-9]\.\s*/, "")}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {question.options.map((opt) => {
                      const isSelected = selectedOption === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectOption(question.id, opt.id)}
                          className={`p-3.5 rounded-2xl border-2 border-b-4 text-xs sm:text-sm font-semibold cursor-pointer transition-all flex items-start gap-3 ${
                            isSelected
                              ? "bg-blue-50 border-blue-500 border-b-blue-600 text-blue-950 translate-y-0.5"
                              : "bg-white border-slate-200 border-b-slate-300 hover:border-blue-300 text-slate-700 active:border-b-2 active:translate-y-0.5"
                          } ${submitted ? "pointer-events-none" : ""}`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            checked={isSelected}
                            onChange={() => handleSelectOption(question.id, opt.id)}
                            className="mt-0.5 text-blue-600 focus:ring-blue-500"
                            disabled={submitted}
                          />
                          <span className="flex-1 leading-relaxed">{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Resultado inline logo abaixo das perguntas (sem rolar a tela de volta pro topo) */}
            {!submitted ? (
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!allAnswered || isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 border-b-4 border-blue-800 disabled:border-slate-300 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Calculando..." : "Ver Meu Ponto de Partida"}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4 animate-in fade-in duration-300">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
                  🎯 Diagnóstico Pronto!
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white">
                  {score} <span className="text-xl text-slate-400 font-normal">/ 5 acertos</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Agora confira as regras do <strong>Método PARE</strong> e prepare-se: o simulador de casos tem 
                  <strong> pegadinhas difíceis</strong> que vão testar sua atenção!
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/metodo-pare")}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>Avançar para o Método PARE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
