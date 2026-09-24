import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { ArrowRight, ShieldCheck, Sparkles, AlertTriangle } from "lucide-react";

export default function MetodoParePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ProgressBar currentStep={2} />

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Título Direto */}
        <div className="text-center space-y-1">
          <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
            Regra de Ouro
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            O Método PARE
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
            Antes de clicar em compartilhar ou acreditar em qualquer foto, siga estes 4 passos:
          </p>
        </div>

        {/* 4 Cartões Simples */}
        <div className="space-y-3">
          {/* P */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 font-black text-xl flex items-center justify-center shrink-0">
              P
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-slate-900 text-base">Pare antes de repassar</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Notícias falsas apelam para a raiva ou medo para você agir no susto. Respire e contenha o impulso.
              </p>
            </div>
          </div>

          {/* A */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 font-black text-xl flex items-center justify-center shrink-0">
              A
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-slate-900 text-base">Analise a fonte</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Quem publicou? É um site confiável ou um print solto? Pesquise no Google se outros jornais confirmam.
              </p>
            </div>
          </div>

          {/* R */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-600 font-black text-xl flex items-center justify-center shrink-0">
              R
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-slate-900 text-base">Rastreie evidências</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Tem provas de verdade? Use a pesquisa por imagem do Google para descobrir de onde a foto realmente saiu.
              </p>
            </div>
          </div>

          {/* E */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 font-black text-xl flex items-center justify-center shrink-0">
              E
            </div>
            <div className="space-y-0.5">
              <h3 className="font-black text-slate-900 text-base">Examine o contexto</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Cuidado com fotos antigas de 5 anos atrás republicadas como se tivessem acontecido ontem!
              </p>
            </div>
          </div>
        </div>

        {/* Alerta de Pegadinhas no Simulador */}
        <div className="p-4 rounded-3xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed font-medium">
            <strong className="block text-amber-900 font-black text-sm">Atenção ao Simulador:</strong>
            Os próximos casos são <strong>pegadinhas difíceis</strong>! Algumas coisas que parecem mentira são reais, e algumas fotos que parecem normais foram feitas por IA. Olhe com muita atenção antes de responder!
          </div>
        </div>

        {/* Botão de Avanço Estilo Duolingo */}
        <div className="pt-2">
          <Link
            href="/simulador"
            className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 text-white font-black text-base shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span>Encarar o Desafio das Pegadinhas</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
