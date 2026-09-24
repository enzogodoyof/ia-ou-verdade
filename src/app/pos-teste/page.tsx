"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { POST_TEST_QUESTIONS } from "@/lib/data/mockData";
import { ProgressBar } from "@/components/ProgressBar";
import { ArrowRight, BarChart2 } from "lucide-react";

export default function PosTestePage() {
  const router = useRouter();
  const [participantName, setParticipantName] = useState("");
  const [preScore, setPreScore] = useState<number>(2);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feelsPrepared, setFeelsPrepared] = useState<string>("sim");
  const [submitted, setSubmitted] = useState(false);
  const [postScore, setPostScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("extensao_participant_name") || "Participante";
    setParticipantName(savedName);
    const savedPre = localStorage.getItem("extensao_pre_score");
    if (savedPre !== null) {
      setPreScore(parseInt(savedPre, 10));
    }
  }, []);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const allAnswered = POST_TEST_QUESTIONS.every((q) => answers[q.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || isSubmitting) return;

    setIsSubmitting(true);

    let calculatedPostScore = 0;
    POST_TEST_QUESTIONS.forEach((q) => {
      const selected = answers[q.id];
      const opt = q.options.find((o) => o.id === selected);
      if (opt && opt.points > 0) calculatedPostScore += opt.points;
    });

    localStorage.setItem("extensao_post_score", calculatedPostScore.toString());
    localStorage.setItem("extensao_post_answers", JSON.stringify(answers));

    try {
      await fetch("/api/post-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: participantName,
          preScore,
          postScore: calculatedPostScore,
          feelsPrepared,
          answers,
        }),
      });
    } catch {
      // Fallback local
    }

    setPostScore(calculatedPostScore);
    setSubmitted(true);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const evolution = postScore !== null ? postScore - preScore : 0;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <ProgressBar currentStep={4} />

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Topo */}
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">
            Etapa Final
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Teste Final
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
            {participantName}, veja quanto você aprendeu com o Método PARE e o simulador:
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {POST_TEST_QUESTIONS.map((question, qIdx) => {
            const selectedOption = answers[question.id];

            return (
              <div
                key={question.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center shrink-0">
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
                            ? "bg-emerald-50 border-emerald-500 border-b-emerald-600 text-emerald-950 translate-y-0.5"
                            : "bg-white border-slate-200 border-b-slate-300 hover:border-emerald-300 text-slate-700 active:border-b-2 active:translate-y-0.5"
                        } ${submitted ? "pointer-events-none" : ""}`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={isSelected}
                          onChange={() => handleSelectOption(question.id, opt.id)}
                          className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
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

          {/* Pergunta de preparo */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="font-black text-slate-900 text-sm">
              Você se sente mais seguro para checar notícias suspeitas?
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "sim", label: "Sim, muito mais!" },
                { value: "parcialmente", label: "Parcialmente" },
                { value: "nao", label: "Ainda não" },
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFeelsPrepared(item.value)}
                  disabled={submitted}
                  className={`py-3 px-2 rounded-2xl border-2 border-b-4 text-xs font-black text-center transition-all ${
                    feelsPrepared === item.value
                      ? "bg-blue-600 border-blue-600 border-b-blue-800 text-white translate-y-0.5"
                      : "bg-white border-slate-200 border-b-slate-300 text-slate-700 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submissão ou Resultado */}
          {!submitted ? (
            <div className="pt-2">
              <button
                type="submit"
                disabled={!allAnswered || isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 border-b-4 border-emerald-800 disabled:border-slate-300 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? "Finalizando..." : "Ver Minha Evolução"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-center animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                  🎉 Parabéns! Desafio Concluído!
                </span>
                <h3 className="text-2xl font-black">
                  {participantName}, veja o seu resultado:
                </h3>
              </div>

              {/* Cards Comparativos Pré x Pós */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[11px] text-slate-400 block font-bold">Antes</span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-300 mt-1 block">
                    {preScore} / 5
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <span className="text-[11px] text-emerald-400 block font-black">Depois</span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">
                    {postScore} / 5
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-[11px] text-sky-400 block font-bold">Ganho</span>
                  <span className="text-2xl sm:text-3xl font-black text-sky-300 mt-1 block">
                    {evolution >= 0 ? `+${evolution}` : evolution} pts
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Você concluiu a oficina com sucesso e agora tem muito mais ferramentas práticas para não cair em fraudes e fake news!
              </p>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <BarChart2 className="w-5 h-5" />
                  <span>Ver Painel Geral de Resultados</span>
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
