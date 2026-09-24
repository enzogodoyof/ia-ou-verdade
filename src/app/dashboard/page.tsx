"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_DEMO_METRICS } from "@/lib/data/mockData";
import { ProgressBar } from "@/components/ProgressBar";
import {
  BarChart3,
  Users2,
  TrendingUp,
  Award,
  Globe2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Download,
  KeyRound,
  FileSpreadsheet,
  FileJson,
  Eye,
  EyeOff,
} from "lucide-react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(INITIAL_DEMO_METRICS);
  const [adminKey, setAdminKey] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [exportStatus, setExportStatus] = useState("");

  useEffect(() => {
    const localPre = localStorage.getItem("extensao_pre_score");
    const localPost = localStorage.getItem("extensao_post_score");
    const localName = localStorage.getItem("extensao_participant_name");

    if (localPre && localPost) {
      const pre = parseInt(localPre, 10);
      const post = parseInt(localPost, 10);
      const evo = post - pre;

      setMetrics((prev) => {
        const alreadyIn = prev.recentSubmissions.some((s) => s.name.includes(localName || "Você"));
        if (alreadyIn) return prev;

        const newRecent = [
          {
            name: `${localName || "Você"} (Sua Sessão)`,
            preScore: pre,
            postScore: post,
            evolution: evo,
            date: "Agora mesmo",
          },
          ...prev.recentSubmissions,
        ];

        const newTotal = prev.totalParticipants + 1;
        const newAvgPre = Number(((prev.avgPreScore * prev.totalParticipants + pre) / newTotal).toFixed(1));
        const newAvgPost = Number(((prev.avgPostScore * prev.totalParticipants + post) / newTotal).toFixed(1));

        return {
          ...prev,
          totalParticipants: newTotal,
          avgPreScore: newAvgPre,
          avgPostScore: newAvgPost,
          evolutionAbsolute: Number((newAvgPost - newAvgPre).toFixed(1)),
          recentSubmissions: newRecent,
        };
      });
    }

    fetch("/api/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.totalParticipants > 0) {
          setMetrics(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleExport = async (format: "csv" | "json") => {
    if (!adminKey.trim()) {
      setExportStatus("⚠️ Digite a chave de administrador.");
      return;
    }

    setExportStatus("⏳ Exportando...");

    try {
      const res = await fetch(`/api/export?key=${encodeURIComponent(adminKey)}&format=${format}`);

      if (res.status === 401) {
        setExportStatus("🔒 Chave incorreta. Tente novamente.");
        return;
      }

      if (!res.ok) {
        setExportStatus("❌ Erro ao exportar dados.");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `participantes_extensao_${new Date().toISOString().split("T")[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportStatus(`✅ Arquivo .${format.toUpperCase()} baixado com sucesso!`);
    } catch {
      setExportStatus("❌ Erro de conexão. Verifique se o banco está ativo.");
    }
  };

  const handleViewJSON = async () => {
    if (!adminKey.trim()) {
      setExportStatus("⚠️ Digite a chave de administrador.");
      return;
    }

    window.open(`/api/participants?key=${encodeURIComponent(adminKey)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <ProgressBar currentStep={5} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Cabeçalho Limpo */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs text-center sm:text-left">
          <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </span>
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider">
              Painel Geral de Resultados
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Estatísticas da Oficina
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
            Acompanhe o impacto da atividade na evolução dos participantes contra a desinformação.
          </p>
        </div>

        {/* Grade de Indicadores Principais */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Participantes</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {metrics.totalParticipants}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Antes x Depois</span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
              {metrics.avgPreScore.toFixed(1)} ➔ {metrics.avgPostScore.toFixed(1)}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Taxa de Melhoria</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
              {metrics.improvementRatePercentage.toFixed(0)}%
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase block">Mais Seguros</span>
            <div className="text-2xl sm:text-3xl font-black text-sky-600 mt-1">
              {metrics.preparedRatePercentage.toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Gráfico Comparativo */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base sm:text-lg">
            Evolução Média da Turma
          </h3>

          <div className="space-y-4 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Nota Antes do Treinamento</span>
                <span>{metrics.avgPreScore.toFixed(1)} / 5,0</span>
              </div>
              <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-slate-400 rounded-full transition-all duration-1000"
                  style={{ width: `${(metrics.avgPreScore / 5) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-emerald-800 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Nota Depois do Método PARE
                </span>
                <span>{metrics.avgPostScore.toFixed(1)} / 5,0</span>
              </div>
              <div className="w-full h-4 rounded-full bg-emerald-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: `${(metrics.avgPostScore / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Submissões Recentes */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-black text-slate-900 text-base">
            Últimas Participações
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Nome</th>
                  <th className="py-2.5 px-3 text-center">Antes</th>
                  <th className="py-2.5 px-3 text-center">Depois</th>
                  <th className="py-2.5 px-3 text-center">Ganho</th>
                  <th className="py-2.5 px-3 text-right">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentSubmissions.map((sub, i) => (
                  <tr key={i} className="hover:bg-slate-50/70">
                    <td className="py-2.5 px-3 font-bold text-slate-900">{sub.name}</td>
                    <td className="py-2.5 px-3 text-center text-slate-500">{sub.preScore} / 5</td>
                    <td className="py-2.5 px-3 text-center font-bold text-emerald-600">
                      {sub.postScore} / 5
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                        +{sub.evolution}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400">{sub.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seção Admin — Exportar Dados */}
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => setShowAdmin(!showAdmin)}
            className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </span>
              <div className="text-left">
                <span className="text-sm font-black text-slate-900 block">
                  Área do Administrador
                </span>
                <span className="text-[11px] text-slate-500">
                  Exportar dados completos dos participantes
                </span>
              </div>
            </div>
            <span className={`text-slate-400 transition-transform duration-200 ${showAdmin ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {showAdmin && (
            <div className="border-t border-slate-200 p-5 space-y-4">
              {/* Campo de chave */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Chave de Administrador
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Digite a chave..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    type="button"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Botões de exportação */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleExport("csv")}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 active:scale-[0.98] transition-all shadow-sm"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Baixar CSV (Excel)
                </button>

                <button
                  onClick={() => handleExport("json")}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm"
                >
                  <FileJson className="w-4 h-4" />
                  Baixar JSON
                </button>

                <button
                  onClick={handleViewJSON}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-700 text-white font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Ver no Navegador
                </button>
              </div>

              {/* Status da exportação */}
              {exportStatus && (
                <p className="text-xs font-bold text-center text-slate-600 bg-slate-50 rounded-lg py-2">
                  {exportStatus}
                </p>
              )}

              {/* Instruções */}
              <div className="bg-violet-50 rounded-xl p-4 space-y-2">
                <p className="text-xs font-bold text-violet-800">📋 Como acessar os dados:</p>
                <ul className="text-[11px] text-violet-700 space-y-1 list-disc list-inside">
                  <li><strong>CSV (Excel)</strong> — Abre direto no Excel/Google Sheets com todas as colunas</li>
                  <li><strong>JSON</strong> — Formato técnico com todos os dados detalhados</li>
                  <li><strong>Ver no Navegador</strong> — Visualiza os dados JSON direto na tela</li>
                  <li>As URLs também funcionam direto: <code className="bg-violet-100 px-1 rounded">/api/export?key=SUA_CHAVE&format=csv</code></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
