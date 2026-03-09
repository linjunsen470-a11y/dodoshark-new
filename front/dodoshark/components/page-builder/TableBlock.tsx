import { getSharedBackgroundTheme } from './backgroundTheme'
import SectionHeader from './SectionHeader'

type TableRow = {
  _key?: string
  cells?: string[]
}

type TableValue = {
  _type?: 'table'
  rows?: TableRow[]
}

export type TableBlockData = {
  _type: 'tableBlock'
  _key?: string
  title?: string
  description?: string
  backgroundVariant?: 'default' | 'muted' | 'dark'
  table?: TableValue | TableRow[]
  hasHeaderRow?: boolean
  note?: string
}

function normalizeRows(rows: TableRow[]) {
  const maxCols = rows.reduce((max, row) => {
    return Math.max(max, row.cells?.length ?? 0)
  }, 0)

  if (maxCols === 0) return { rows: [] as string[][], maxCols: 0 }

  const normalized = rows.map((row) => {
    const cells = row.cells ?? []
    return Array.from({ length: maxCols }, (_, idx) => cells[idx] ?? '')
  })

  return { rows: normalized, maxCols }
}

function extractRows(table?: TableValue | TableRow[]) {
  if (Array.isArray(table)) return table
  return table?.rows ?? []
}

export default function TableBlock({ block }: { block: TableBlockData }) {
  const variant = block.backgroundVariant ?? 'muted'
  const theme = getSharedBackgroundTheme(variant)
  const isDark = variant === 'dark'
  const sourceRows = extractRows(block.table).filter((row) => (row.cells?.length ?? 0) > 0)
  const { rows } = normalizeRows(sourceRows)
  const hasHeader = Boolean(block.hasHeaderRow) && rows.length > 0
  const headerCells = hasHeader ? rows[0] : []
  const bodyRows = hasHeader ? rows.slice(1) : rows
  const sectionBorderClass = isDark ? 'border-y border-slate-800' : 'border-y border-slate-100'
  const subtitleClass = isDark ? theme.subtitle : theme.body

  if (!block.title && !block.description && rows.length === 0 && !block.note) return null

  return (
    <section className={`py-24 ${theme.section} ${sectionBorderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(block.title || block.description) && (
          <SectionHeader
            title={block.title}
            subtitle={block.description}
            isDark={isDark}
            className="mb-12"
            titleClassName={`text-3xl md:text-4xl font-display font-black tracking-tight ${theme.heading}`}
            subtitleClassName={`${subtitleClass} max-w-3xl mx-auto`}
          />
        )}

        <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
          {rows.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-sm">No table data.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                {hasHeader && (
                  <thead className="bg-slate-800 text-white">
                    <tr>
                      {headerCells.map((cell, idx) => (
                        <th
                          key={idx}
                          className="px-5 py-4 text-center text-xs md:text-sm font-black uppercase tracking-wider whitespace-nowrap"
                        >
                          {cell || '-'}
                        </th>
                      ))}
                    </tr>
                  </thead>
                )}

                <tbody>
                  {bodyRows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      {row.map((cell, cellIdx) => (
                        <td
                          key={`${rowIdx}-${cellIdx}`}
                          className="px-5 py-4 text-sm text-slate-600 text-center align-middle leading-relaxed"
                        >
                          {cell || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {block.note && (
          <p className={`mt-4 text-xs leading-relaxed whitespace-pre-line ${subtitleClass}`}>{block.note}</p>
        )}
      </div>
    </section>
  )
}
