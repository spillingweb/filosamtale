import { describe, it, expect } from 'vitest'
import {
  getArrangementCategories,
  getArrangementCategoryLabels,
  getAlleArrangementer,
  filterArrangementerByCategory,
  groupArrangementerByMonth,
} from './utils'

// Minimal mock data factories that match the shape the utility functions access at runtime.
function makeArrangement(date: string, kategoriValue: string) {
  return { date, kategorier: { value: kategoriValue } } as ReturnType<typeof getAlleArrangementer>[number]
}

function makeArrangementerData(events: { date: string; kategoriValue: string }[]) {
  return {
    arrangementerConnection: {
      edges: events.map((e) => ({ node: makeArrangement(e.date, e.kategoriValue) })),
    },
  } as Parameters<typeof getAlleArrangementer>[0]
}

function makeKategorierData(categories: { value: string; label: string }[]) {
  return {
    kategorierConnection: {
      edges: categories.map((c) => ({ node: { value: c.value, label: c.label } })),
    },
  } as Parameters<typeof getArrangementCategories>[0]
}

describe('getArrangementCategories', () => {
  it('always includes "Alle" as the first entry', () => {
    const data = makeKategorierData([{ value: 'foredrag', label: 'Foredrag' }])
    expect(getArrangementCategories(data)[0]).toEqual({ value: 'all', label: 'Alle' })
  })

  it('appends dynamic categories after "Alle"', () => {
    const data = makeKategorierData([
      { value: 'foredrag', label: 'Foredrag' },
      { value: 'kurs', label: 'Kurs' },
    ])
    const categories = getArrangementCategories(data)
    expect(categories).toHaveLength(3)
    expect(categories[1]).toEqual({ value: 'foredrag', label: 'Foredrag' })
    expect(categories[2]).toEqual({ value: 'kurs', label: 'Kurs' })
  })

  it('returns only "Alle" when there are no dynamic categories', () => {
    expect(getArrangementCategories(makeKategorierData([]))).toEqual([{ value: 'all', label: 'Alle' }])
  })
})

describe('getArrangementCategoryLabels', () => {
  it('returns a Record mapping value → label', () => {
    const data = makeKategorierData([
      { value: 'foredrag', label: 'Foredrag' },
      { value: 'kurs', label: 'Kurs' },
    ])
    expect(getArrangementCategoryLabels(data)).toEqual({ foredrag: 'Foredrag', kurs: 'Kurs' })
  })

  it('returns an empty Record when no categories exist', () => {
    expect(getArrangementCategoryLabels(makeKategorierData([]))).toEqual({})
  })
})

describe('getAlleArrangementer', () => {
  it('sorts events by date ascending', () => {
    const data = makeArrangementerData([
      { date: '2025-09-01', kategoriValue: 'kurs' },
      { date: '2025-03-10', kategoriValue: 'foredrag' },
      { date: '2025-06-15', kategoriValue: 'foredrag' },
    ])
    const dates = getAlleArrangementer(data).map((e) => e.date)
    expect(dates).toEqual(['2025-03-10', '2025-06-15', '2025-09-01'])
  })

  it('filters out null/undefined edges', () => {
    const data = {
      arrangementerConnection: {
        edges: [
          null,
          { node: makeArrangement('2025-06-15', 'foredrag') },
          undefined,
        ],
      },
    } as Parameters<typeof getAlleArrangementer>[0]
    expect(getAlleArrangementer(data)).toHaveLength(1)
  })

  it('returns an empty array when there are no events', () => {
    expect(getAlleArrangementer(makeArrangementerData([]))).toEqual([])
  })
})

describe('filterArrangementerByCategory', () => {
  const events = [
    makeArrangement('2025-06-15', 'foredrag'),
    makeArrangement('2025-07-01', 'kurs'),
    makeArrangement('2025-08-10', 'foredrag'),
  ]

  it('returns all events when category is "all"', () => {
    expect(filterArrangementerByCategory(events, 'all')).toHaveLength(3)
  })

  it('returns only events matching the given category', () => {
    const result = filterArrangementerByCategory(events, 'foredrag')
    expect(result).toHaveLength(2)
    expect(result.every((e) => e.kategorier.value === 'foredrag')).toBe(true)
  })

  it('returns an empty array when no events match the category', () => {
    expect(filterArrangementerByCategory(events, 'ukjent')).toHaveLength(0)
  })
})

describe('groupArrangementerByMonth', () => {
  it('groups events under their year-month key', () => {
    const events = [
      makeArrangement('2025-06-15', 'foredrag'),
      makeArrangement('2025-06-28', 'kurs'),
      makeArrangement('2025-07-10', 'foredrag'),
    ]
    const grouped = groupArrangementerByMonth(events)
    expect(Object.keys(grouped)).toHaveLength(2)
    expect(grouped['2025-06'].events).toHaveLength(2)
    expect(grouped['2025-07'].events).toHaveLength(1)
  })

  it('capitalises the Norwegian month label', () => {
    const events = [makeArrangement('2025-06-15', 'foredrag')]
    const grouped = groupArrangementerByMonth(events)
    const label = grouped['2025-06'].label
    expect(label).toMatch(/juni/i)
    expect(label.charAt(0)).toBe(label.charAt(0).toUpperCase())
  })

  it('returns an empty object for an empty array', () => {
    expect(groupArrangementerByMonth([])).toEqual({})
  })
})
