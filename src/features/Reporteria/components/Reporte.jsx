import { useMemo, useState } from 'react'
import {
    COLUMNS, REPORT_TYPES, buildRows, validateAll, fileName,
    lenOf, isStar, sampleRows, defaultPeriodo, uid,
} from './layout'

const inputCls =
    'w-full rounded border border-slate-300 bg-white px-2 py-1.5 text-sm uppercase outline-none focus:ring-2 focus:ring-sky-400'

export default function Reporte() {
    const [header, setHeader] = useState({
        type: '1', periodo: '201603', clave: '013005', organo: '000002',
    })
    const [rows, setRows] = useState([])

    const built = useMemo(() => buildRows(header, rows), [header, rows])
    const { errors, list } = useMemo(() => validateAll(header, built), [header, built])
    const output = built.map((r) => r.vals.join(';')).join('\n')

    const setH = (k) => (e) => setHeader((h) => ({ ...h, [k]: e.target.value.toUpperCase() }))

    const changeType = (t) => {
        setHeader((h) => ({ ...h, type: t, periodo: defaultPeriodo(t) }))
        if (t === '1') setRows((rs) => rs.filter((r) => r.kind === 'main'))
    }

    const addRow = (kind) => setRows((rs) => [...rs, { id: uid(), kind, vals: {} }])

    const removeRow = (i) =>
        setRows((rs) => {
            let end = i + 1
            if (rs[i].kind === 'main') while (end < rs.length && rs[end].kind === 'rel') end++
            return [...rs.slice(0, i), ...rs.slice(end)]
        })

    const setCell = (i, n, val) =>
        setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, vals: { ...r.vals, [n]: val } } : r)))

    const download = () => {
        const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = fileName(header)
        a.click()
        URL.revokeObjectURL(a.href)
    }

    const colWidth = (col) => Math.min(Math.max(lenOf(col, header.type).len * 9 + 30, 110), 280)
    const lenLabel = (col) => {
        if (col.n === 2) return '6/8'
        if (col.n === 5) return '7/8'
        const { len, exact } = lenOf(col, header.type)
        return `${exact ? '' : '≤'}${len}`
    }

    return (
        <div className="min-h-screen bg-slate-100 p-4 text-slate-800 md:p-6">
            <div className="mx-auto max-w-[1600px] space-y-4">
                <header>
                    <h1 className="text-2xl font-bold">Layout de reportes de operaciones</h1>
                    <p className="text-sm text-slate-500">
                        Anexo 1 · DOF 30/05/2016 · Relevantes, inusuales e internas preocupantes (36 columnas)
                    </p>
                </header>

                {/* Datos generales */}
                <section className="grid gap-3 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
                    <label className="text-sm font-medium">
                        Tipo de reporte
                        <select
                            value={header.type}
                            onChange={(e) => changeType(e.target.value)}
                            className={inputCls + ' mt-1 normal-case'}
                        >
                            {Object.entries(REPORT_TYPES).map(([k, v]) => (
                                <option key={k} value={k}>{k} · {v}</option>
                            ))}
                        </select>
                    </label>
                    <label className="text-sm font-medium">
                        Periodo {header.type === '1' ? '(AAAAMM)' : '(AAAAMMDD)'}
                        <input value={header.periodo} onChange={setH('periodo')} maxLength={8} className={inputCls + ' mt-1 font-mono'} />
                    </label>
                    <label className="text-sm font-medium">
                        Clave del sujeto obligado
                        <input value={header.clave} onChange={setH('clave')} maxLength={8} className={inputCls + ' mt-1 font-mono'} />
                    </label>
                    <label className="text-sm font-medium">
                        Órgano supervisor
                        <input value={header.organo} onChange={setH('organo')} maxLength={6} className={inputCls + ' mt-1 font-mono'} />
                    </label>
                </section>

                {/* Acciones */}
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => addRow('main')} className="rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700">
                        + Operación principal
                    </button>
                    <button
                        onClick={() => addRow('rel')}
                        disabled={header.type === '1' || rows.length === 0}
                        className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        + Cuenta / persona relacionada
                    </button>
                    <button onClick={() => setRows(sampleRows(header.type))} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                        Cargar ejemplo
                    </button>
                    <button onClick={() => setRows([])} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50">
                        Limpiar
                    </button>
                </div>

                {/* Tabla */}
                <section className="overflow-auto rounded-xl bg-white shadow-sm" style={{ maxHeight: '60vh' }}>
                    <table className="border-collapse text-xs">
                        <thead>
                            <tr>
                                <th className="sticky left-0 top-0 z-30 min-w-[170px] bg-slate-800 px-2 py-2 text-left text-white">Fila</th>
                                {COLUMNS.map((col) => (
                                    <th
                                        key={col.n}
                                        style={{ minWidth: colWidth(col) }}
                                        className="sticky top-0 z-20 bg-slate-800 px-2 py-2 text-left align-top font-medium text-white"
                                    >
                                        <div className="text-[10px] text-slate-300">Col {col.n}{isStar(col.n) ? ' *' : ''}</div>
                                        <div className="leading-tight">{col.name}</div>
                                        <div className="text-[10px] text-slate-400">
                                            {col.type === 'N' ? 'Numérico' : 'Alfanum.'} · {lenLabel(col)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {built.length === 0 && (
                                <tr>
                                    <td colSpan={37} className="p-6 text-center text-slate-400">
                                        Sin filas. Agrega una operación principal o carga el ejemplo.
                                    </td>
                                </tr>
                            )}
                            {built.map((r, i) => (
                                <tr key={rows[i].id} className={r.kind === 'rel' ? 'bg-amber-50' : 'bg-white'}>
                                    <td className="sticky left-0 z-10 border bg-inherit px-2 py-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-medium">{i + 1} · {r.kind === 'main' ? 'Principal' : 'Relacionada'}</span>
                                            <button onClick={() => removeRow(i)} className="text-red-600 hover:underline">Quitar</button>
                                        </div>
                                    </td>
                                    {COLUMNS.map((col) => {
                                        const err = errors[i]?.[col.n]
                                        if (!r.mask[col.n - 1])
                                            return <td key={col.n} className="border bg-slate-100 text-center text-slate-300">—</td>
                                        if (col.auto)
                                            return (
                                                <td
                                                    key={col.n}
                                                    title={err}
                                                    className={`border bg-slate-50 px-2 py-1 font-mono ${err ? 'text-red-600' : 'text-slate-600'}`}
                                                >
                                                    {r.vals[col.n - 1]}
                                                </td>
                                            )
                                        return (
                                            <td key={col.n} className="border p-0">
                                                <input
                                                    value={rows[i].vals[col.n] ?? ''}
                                                    maxLength={lenOf(col, header.type).len}
                                                    title={err}
                                                    onChange={(e) => setCell(i, col.n, e.target.value.toUpperCase())}
                                                    className={`w-full px-2 py-1.5 font-mono outline-none focus:ring-2 focus:ring-inset focus:ring-sky-400 ${err ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-400' : 'bg-transparent'
                                                        }`}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <p className="text-xs text-slate-500">
                    * Las columnas 14 y 29 a 36 no aplican a operaciones relevantes. Las filas relacionadas solo usan las columnas 1-5 y 29-34.
                </p>

                {/* Errores */}
                <section className="rounded-xl bg-white p-4 shadow-sm">
                    <h2 className="mb-2 font-semibold">
                        Validaciones{' '}
                        <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${list.length ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {list.length ? `${list.length} errores` : 'Todo correcto'}
                        </span>
                    </h2>
                    {list.length > 0 && (
                        <ul className="max-h-40 space-y-1 overflow-auto text-sm text-red-700">
                            {list.slice(0, 60).map((e, k) => (
                                <li key={k}>Fila {e.row} · Col {e.n} ({e.name}): {e.msg}</li>
                            ))}
                        </ul>
                    )}
                </section>

                {/* Salida */}
                <section className="space-y-2 rounded-xl bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="font-semibold">
                            Archivo: <span className="font-mono text-sky-700">{fileName(header)}</span>
                        </h2>
                        <div className="flex gap-2">
                            <button onClick={() => navigator.clipboard.writeText(output)} disabled={!output} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 disabled:opacity-40">
                                Copiar
                            </button>
                            <button onClick={download} disabled={!output} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40">
                                Descargar .txt
                            </button>
                        </div>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        rows={5}
                        className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 font-mono text-xs"
                        placeholder="Aquí aparecerá el archivo separado por punto y coma..."
                    />
                </section>
            </div>
        </div>
    )
}