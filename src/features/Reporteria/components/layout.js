export const REPORT_TYPES = {
    1: 'Operación relevante',
    2: 'Operación inusual',
    3: 'Operación interna preocupante',
}

const c = (n, name, type, len, x = {}) => ({ n, name, type, len, ...x })

// type: A = alfanumérico, N = numérico · exact: longitud fija · auto: se calcula solo
export const COLUMNS = [
    c(1, 'Tipo de reporte', 'A', 1, { exact: 1, auto: 1 }),
    c(2, 'Periodo del reporte', 'N', 8, { exact: 1, auto: 1 }),
    c(3, 'Folio', 'A', 6, { exact: 1, auto: 1 }),
    c(4, 'Órgano supervisor', 'A', 6, { exact: 1, auto: 1 }),
    c(5, 'Clave o número de registro del sujeto obligado', 'A', 8, { auto: 1 }),
    c(6, 'Localidad', 'A', 8, { exact: 1 }),
    c(7, 'Código postal de la sucursal', 'A', 5, { exact: 1 }),
    c(8, 'Tipo de operación', 'A', 2, { exact: 1 }),
    c(9, 'Instrumento monetario', 'A', 2, { exact: 1 }),
    c(10, 'Número de cuenta, contrato u operación', 'A', 16),
    c(11, 'Monto', 'N', 17),
    c(12, 'Moneda', 'A', 3),
    c(13, 'Fecha de la operación', 'N', 8, { exact: 1 }),
    c(14, 'Fecha de detección de la operación', 'N', 8, { exact: 1 }),
    c(15, 'Nacionalidad', 'A', 1, { exact: 1 }),
    c(16, 'Tipo de persona', 'A', 1, { exact: 1 }),
    c(17, 'Razón social o denominación', 'A', 125),
    c(18, 'Nombre', 'A', 60),
    c(19, 'Apellido paterno', 'A', 60),
    c(20, 'Apellido materno', 'A', 30),
    c(21, 'RFC', 'A', 13, { exact: 1 }),
    c(22, 'CURP', 'A', 18, { exact: 1 }),
    c(23, 'Fecha de nacimiento o constitución', 'N', 8, { exact: 1 }),
    c(24, 'Domicilio', 'A', 60),
    c(25, 'Colonia', 'A', 30),
    c(26, 'Ciudad o población', 'A', 8, { exact: 1 }),
    c(27, 'Teléfono', 'A', 40),
    c(28, 'Actividad económica', 'A', 7, { exact: 1 }),
    c(29, 'Consecutivo de cuentas y/o personas relacionadas', 'A', 2, { exact: 1, auto: 1 }),
    c(30, 'Número de cuenta, contrato, operación, póliza o NSS', 'A', 16),
    c(31, 'Clave del sujeto obligado (relacionada)', 'A', 7),
    c(32, 'Nombre del titular de la cuenta o persona relacionada', 'A', 60),
    c(33, 'Apellido paterno (relacionada)', 'A', 60),
    c(34, 'Apellido materno (relacionada)', 'A', 30),
    c(35, 'Descripción de la operación', 'A', 4000),
    c(36, 'Razones por las que se considera inusual o interna preocupante', 'A', 4000),
]

export const isStar = (n) => n === 14 || n >= 29

export const uid = () => Math.random().toString(36).slice(2, 9)
export const defaultPeriodo = (t) => (t === '1' ? '201603' : '20160331')

// Longitud efectiva según tipo de reporte
export function lenOf(col, type) {
    if (col.n === 2) return { len: type === '1' ? 6 : 8, exact: true }
    if (col.n === 5) return { len: type === '1' ? 7 : 8, exact: false }
    return { len: col.len, exact: !!col.exact }
}

// ¿La columna aplica a este tipo de reporte y tipo de fila?
export function applies(n, type, kind) {
    if (kind === 'rel') return n <= 5 || (n >= 29 && n <= 34)
    if (type === '1') return n <= 28 && n !== 14
    return n <= 29 || n >= 35
}

// Construye las filas finales de 36 valores (con autocalculados)
export function buildRows(header, rows) {
    let folio = 0
    let cons = 0
    return rows.map((r, i) => {
        const main = r.kind === 'main'
        if (main) { folio++; cons = 0 } else cons++
        const hasRel = main && rows[i + 1]?.kind === 'rel'
        const mask = COLUMNS.map((col) => applies(col.n, header.type, r.kind))
        const auto = {
            1: header.type,
            2: header.periodo,
            3: String(folio).padStart(6, '0'),
            4: header.organo,
            5: header.clave,
            29: main ? (hasRel ? '00' : '') : String(cons).padStart(2, '0'),
        }
        const vals = COLUMNS.map((col) =>
            !mask[col.n - 1] ? '' : col.n in auto ? auto[col.n] : r.vals[col.n] ?? ''
        )
        return { kind: r.kind, mask, vals }
    })
}

const isDate = (s) => {
    if (!/^\d{8}$/.test(s)) return false
    const y = +s.slice(0, 4), m = +s.slice(4, 6), d = +s.slice(6)
    const dt = new Date(y, m - 1, d)
    return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
}

function isRequired(n, g, type, kind) {
    if (kind === 'rel') return n <= 5 || n === 29 || n === 30 || n === 31
    switch (n) {
        case 14: return type !== '1'
        case 17: return g(16) === '2'
        case 18: case 19: case 20: return g(16) === '1'
        case 21: return !g(22) && !g(23)
        case 22: return !g(21) && !g(23)
        case 23: return !g(21) && !g(22)
        case 27: case 29: return false
        case 35: case 36: return type !== '1'
        default: return true
    }
}

export function validateCell(col, v, vals, type, kind) {
    const n = col.n
    const g = (k) => vals[k - 1]
    if (!v) return isRequired(n, g, type, kind) ? 'Campo obligatorio' : ''

    if (col.type === 'N' && n !== 11 && !/^\d+$/.test(v)) return 'Debe ser numérico'
    if (n === 11 && !/^\d{1,14}(\.\d{1,2})?$/.test(v))
        return 'Máx. 14 enteros y 2 decimales separados con punto'

    const { len, exact } = lenOf(col, type)
    if (n === 5 && type !== '1') {
        if (![7, 8].includes(v.length)) return 'Debe medir 7 u 8 caracteres'
    } else if (exact ? v.length !== len : v.length > len) {
        return exact ? `Debe medir ${len} caracteres` : `Máximo ${len} caracteres`
    }

    switch (n) {
        case 1:
            if (v !== type) return 'Debe ser igual al tipo de reporte'
            break
        case 3: case 4: case 7:
            if (!/^\d+$/.test(v)) return 'Solo números'
            break
        case 2:
            if (type === '1' ? !/^\d{4}(0[1-9]|1[0-2])$/.test(v) : !isDate(v))
                return type === '1' ? 'Formato AAAAMM' : 'Formato AAAAMMDD válido'
            break
        case 13:
            if (!isDate(v)) return 'Formato AAAAMMDD válido'
            if ((type === '1' ? v.slice(0, 6) : v) > g(2)) return 'Debe ser menor o igual al periodo del reporte'
            break
        case 14:
            if (!isDate(v)) return 'Formato AAAAMMDD válido'
            if (g(13) > v) return 'La fecha de operación debe ser menor o igual a la de detección'
            break
        case 23:
            if (!isDate(v)) return 'Formato AAAAMMDD válido'
            if (v <= '19000101') return 'Debe ser mayor a 19000101'
            if (g(13) && v >= g(13)) return 'Debe ser menor a la fecha de operación'
            break
        case 15:
            if (!['1', '2'].includes(v)) return '1 = Mexicana, 2 = Extranjero'
            break
        case 16:
            if (!['1', '2'].includes(v)) return '1 = Persona física, 2 = Persona moral'
            break
        case 21:
            if (!/^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/.test(v)) return 'Patrón LLLLAAMMDDXXX'
            break
        case 22:
            if (!/^[A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]\d$/.test(v)) return 'Patrón CURP inválido'
            break
        default:
    }
    return ''
}

export function validateAll(header, built) {
    const errors = {}
    const list = []
    built.forEach((r, i) => {
        COLUMNS.forEach((col) => {
            if (!r.mask[col.n - 1]) return
            const msg = validateCell(col, r.vals[col.n - 1], r.vals, header.type, r.kind)
            if (msg) {
                ; (errors[i] ||= {})[col.n] = msg
                list.push({ row: i + 1, n: col.n, name: col.name, msg })
            }
        })
    })
    return { errors, list }
}

// Nombre del archivo (Anexo 2): tipo + clave(6) + periodo(AAMM o AAMMDD) + "." + órgano(3)
export function fileName(h) {
    return `${h.type}${h.clave.padStart(6, '0').slice(-6)}${h.periodo.slice(2)}.${h.organo.slice(-3)}`
}

export function sampleRows(type) {
    const main = {
        6: '09010001', 7: '06600', 8: '01', 9: '01', 10: '1234567890123456',
        11: '150000.00', 12: 'MXN', 13: '20160315', 14: '20160320', 15: '1', 16: '1',
        18: 'JUAN JOSE', 19: 'MARTINEZ', 20: 'HERNANDEZ',
        21: 'MAHJ700124AB1', 22: 'MAHJ700124HDFRRN09', 23: '19700124',
        24: 'AV REFORMA 100', 25: 'JUAREZ', 26: '09010001', 27: '5555551234', 28: '8100001',
        35: 'DEPOSITOS EN EFECTIVO FRACCIONADOS',
        36: 'MONTOS INUSUALES PARA EL PERFIL DEL CLIENTE',
    }
    const rel = { 30: '6543210987654321', 31: '0013006', 32: 'MARIA LOPEZ', 33: 'LOPEZ', 34: 'GARCIA' }
    const rows = [{ id: uid(), kind: 'main', vals: main }]
    if (type !== '1') rows.push({ id: uid(), kind: 'rel', vals: rel })
    return rows
}