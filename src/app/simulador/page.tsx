"use client";

import { useState } from "react";
import Link from "next/link";
import { SIMULATION_CASES } from "@/lib/data/mockData";
import { ProgressBar } from "@/components/ProgressBar";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function SimuladorPage() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [userVerdicts, setUserVerdicts] = useState<Record<string, string>>({});
  const [revealedCases, setRevealedCases] = useState<Record<string, boolean>>({});

  const currentCase = SIMULATION_CASES[currentCaseIndex];
  const totalCases = SIMULATION_CASES.length;
  const isCaseRevealed = !!revealedCases[currentCase.id];
  const userChoice = userVerdicts[currentCase.id];

  const handleSelectVerdict = (verdict: string) => {
    if (isCaseRevealed) return;
    setUserVerdicts((prev) => ({ ...prev, [currentCase.id]: verdict }));
  };

  const handleRevealAnalysis = () => {
    if (!userChoice) return;
    setRevealedCases((prev) => ({ ...prev, [currentCase.id]: true }));
  };

  const isCorrect = userChoice === currentCase.actualType;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <ProgressBar currentStep={3} />

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-5">
        {/* Barra de Progresso com os 7 Casos */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
            Desafio {currentCaseIndex + 1} de {totalCases}
          </span>
          <div className="flex gap-1.5 sm:gap-2">
            {SIMULATION_CASES.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentCaseIndex
                    ? "w-6 sm:w-8 bg-blue-600"
                    : revealedCases[SIMULATION_CASES[idx].id]
                    ? "w-3 sm:w-4 bg-emerald-500"
                    : "w-3 sm:w-4 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card do Caso */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden transition-all">
          {/* Foto em Alta Definição */}
          {currentCase.imageUrl && (
            <div className="w-full bg-slate-950 relative overflow-hidden group">
              <img
                src={currentCase.imageUrl}
                alt={currentCase.headline}
                className="w-full h-auto max-h-[380px] object-cover mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
                loading="eager"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white shadow-sm">
                {currentCase.category}
              </div>
            </div>
          )}

          <div className="p-5 sm:p-6 space-y-4">
            {/* Título direto sobre a foto */}
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {currentCase.headline}
            </h2>

            {/* Contexto da Imagem */}
            <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 leading-relaxed font-medium">
              {currentCase.bodyText}
            </p>

            {/* 2 Escolhas Diretas: Foto Real vs Criado por IA */}
            <div className="pt-1 space-y-3">
              <span className="block text-center text-xs font-black text-slate-500 uppercase tracking-wider">
                Qual é a sua aposta?
              </span>

              <div className="grid grid-cols-2 gap-3">
                {/* Botão Foto Real */}
                <button
                  type="button"
                  onClick={() => handleSelectVerdict("verdadeiro")}
                  disabled={isCaseRevealed}
                  className={`p-4 rounded-2xl font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1.5 transition-all ${
                    userChoice === "verdadeiro"
                      ? "bg-emerald-50 border-2 border-emerald-500 border-b-4 border-b-emerald-600 text-emerald-800 translate-y-0.5"
                      : "bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 hover:border-emerald-300 text-slate-700 hover:bg-emerald-50/20 active:border-b-2 active:translate-y-0.5"
                  } ${isCaseRevealed ? "cursor-default" : ""}`}
                >
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <span>Foto Real</span>
                </button>

                {/* Botão Criado por IA */}
                <button
                  type="button"
                  onClick={() => handleSelectVerdict("fake_ia")}
                  disabled={isCaseRevealed}
                  className={`p-4 rounded-2xl font-black text-sm sm:text-base flex flex-col items-center justify-center gap-1.5 transition-all ${
                    userChoice === "fake_ia"
                      ? "bg-red-50 border-2 border-red-500 border-b-4 border-b-red-600 text-red-800 translate-y-0.5"
                      : "bg-white border-2 border-slate-200 border-b-4 border-b-slate-300 hover:border-red-300 text-slate-700 hover:bg-red-50/20 active:border-b-2 active:translate-y-0.5"
                  } ${isCaseRevealed ? "cursor-default" : ""}`}
                >
                  <Sparkles className="w-6 h-6 text-red-600" />
                  <span>Criado por IA</span>
                </button>
              </div>

              {/* Botão de Verificação */}
              {!isCaseRevealed && (
                <button
                  type="button"
                  onClick={handleRevealAnalysis}
                  disabled={!userChoice}
                  className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 border-b-4 border-blue-800 disabled:border-slate-300 text-white font-black text-base transition-all active:border-b-0 active:translate-y-1 shadow-md disabled:cursor-not-allowed"
                >
                  Verificar Resposta
                </button>
              )}
            </div>

            {/* Revelação do Veredito com Feedback */}
            {isCaseRevealed && (
              <div className="pt-4 border-t-2 border-slate-100 space-y-4 animate-in fade-in duration-300">
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 border-2 ${
                    isCorrect
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                      : "bg-red-50 border-red-300 text-red-950"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-7 h-7 text-red-600 shrink-0" />
                  )}
                  <div>
                    <strong className="block text-base font-black">
                      {isCorrect ? "Mandou bem! Você acertou!" : "Caiu na pegadinha!"}
                    </strong>
                    <p className="text-xs mt-0.5 font-medium">{currentCase.verdictExplanation}</p>
                  </div>
                </div>

                {/* Explicação da Pegadinha */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <span className="font-black text-slate-800 block text-xs uppercase tracking-wider">
                    Como conferir pelo Método PARE:
                  </span>
                  <p><strong>• Pare:</strong> {currentCase.pareAnalysis.p}</p>
                  <p><strong>• Analise a fonte:</strong> {currentCase.pareAnalysis.a}</p>
                  <p><strong>• Rastreie evidências:</strong> {currentCase.pareAnalysis.r}</p>
                  <p><strong>• Examine o contexto:</strong> {currentCase.pareAnalysis.e}</p>
                </div>

                {/* Botão para Próximo Desafio ou Pós-teste */}
                <div className="pt-2">
                  {currentCaseIndex < totalCases - 1 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentCaseIndex((prev) => prev + 1)}
                      className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Próximo Desafio ({currentCaseIndex + 2} de {totalCases})</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <Link
                      href="/pos-teste"
                      className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Concluir Todos os 7 e Ir para o Teste Final</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
