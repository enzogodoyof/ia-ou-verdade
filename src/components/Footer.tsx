"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck, FileDown } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs mt-auto border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span>IA ou Verdade?</span>
          </div>

          {/* O botão 'Baixar Documentação' só aparece na página inicial */}
          {isHome && (
            <div>
              <a
                href="/api/download/relatorio"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-semibold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <FileDown className="w-4 h-4 text-blue-400" />
                <span>Baixar Documentação</span>
              </a>
            </div>
          )}
        </div>

        <div className="border-t border-slate-800/80 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-xs">
          <p className="text-slate-400 font-medium">Enzo Gabriel de Godoy Andrade</p>
          <p className="text-slate-500">© 2026</p>
        </div>
      </div>
    </footer>
  );
}
