import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 sm:px-6 py-12 max-w-3xl mx-auto text-center">
      {/* Ícone de Destaque */}
      <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck className="w-9 h-9" />
      </div>

      {/* Título Principal Direto */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Você consegue identificar o que foi criado por{" "}
        <span className="text-blue-600">Inteligência Artificial?</span>
      </h1>

      {/* Descrição Concisa */}
      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
        Fotos falsas, correntes de mensagens e áudios manipulados circulam todos os dias.
        Faça o teste rápido, aprenda o método simples de checagem e descubra se você cairia nessas armadilhas.
      </p>

      {/* Botão de Ação Principal Único — Grande e Fácil de Clicar no Celular */}
      <div className="mt-8 w-full sm:w-auto flex items-center justify-center">
        <Link
          href="/pre-teste"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Começar Teste Rápido</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* 3 Passos Simples do Fluxo */}
      <div className="mt-14 pt-10 border-t border-slate-200 w-full grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
            1
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Pré-teste Rápido</h3>
            <p className="text-xs text-slate-500 mt-0.5">5 perguntas sobre como você consome notícias.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center shrink-0">
            2
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">O Método PARE</h3>
            <p className="text-xs text-slate-500 mt-0.5">Uma regra simples de 4 passos para checagem.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 font-bold text-sm flex items-center justify-center shrink-0">
            3
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Casos Práticos</h3>
            <p className="text-xs text-slate-500 mt-0.5">Analise fotos reais de IA e veja se acertou.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
