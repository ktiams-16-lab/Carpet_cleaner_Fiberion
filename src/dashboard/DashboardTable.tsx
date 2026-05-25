import { ReactNode } from 'react';

export function DashboardTable({
  title,
  columns,
  rows,
  emptyMessage = 'No records found.'
}: {
  title: string;
  columns: string[];
  rows: ReactNode[][];
  emptyMessage?: string;
}) {
  return (
    <section className="fiberion-panel p-4 sm:p-6">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.14em] text-gray-500">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-white/10 px-3 py-3 font-medium">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {rows.length ? rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, index) => (
                  <td key={index} className="border-b border-white/5 px-3 py-4">{cell}</td>
                ))}
              </tr>
            )) : (
              <tr>
                <td className="border-b border-white/5 px-3 py-8 text-center text-gray-500" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
