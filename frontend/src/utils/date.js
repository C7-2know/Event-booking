export const shortDate = (date) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00`))

export const daysUntil = (date, from = new Date('2026-07-28')) => Math.ceil((new Date(`${date}T12:00`) - from) / 86400000)
