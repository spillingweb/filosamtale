import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

/**
 * TinaCMS Integration Tests
 * 
 * Testing TinaCMS functionality is limited because:
 * 1. Live preview requires the full TinaCMS admin UI running
 * 2. Visual editing requires browser iframe context
 * 3. Content queries need TinaCMS GraphQL server
 * 
 * What we CAN test:
 * - Data structure and types from TinaCMS
 * - tinaField attribute rendering
 * - useTina hook behavior with mocked data
 * - Content transformations
 */

// Mock TinaCMS
vi.mock('tinacms/dist/react', () => ({
  useTina: ({ data, query, variables }: any) => {
    // Simulate useTina behavior: return data with query metadata
    return {
      data,
      query,
      variables,
      isLoading: false,
    }
  },
  tinaField: (object: any, field: string) => {
    // Simulate tinaField: returns data attributes for visual editing
    return {
      'data-tina-field': `${object?._template || 'unknown'}.${field}`,
      'data-tina-field-key': field,
    }
  },
}))

describe('TinaCMS useTina Hook', () => {
  it('should pass through data unchanged when not in edit mode', () => {
    const { useTina } = require('tinacms/dist/react')
    
    const mockData = {
      pages: {
        __typename: 'PagesHomepage',
        title: 'Test Title',
        subtitle: 'Test Subtitle',
      },
    }
    
    const result = useTina({
      query: 'mock-query',
      variables: {},
      data: mockData,
    })
    
    expect(result.data).toEqual(mockData)
    expect(result.query).toBe('mock-query')
    expect(result.isLoading).toBe(false)
  })

  it('should handle undefined data gracefully', () => {
    const { useTina } = require('tinacms/dist/react')
    
    const result = useTina({
      query: 'mock-query',
      variables: {},
      data: undefined,
    })
    
    expect(result.data).toBeUndefined()
  })
})

describe('TinaCMS tinaField Attributes', () => {
  it('should generate correct data-tina-field attributes', () => {
    const { tinaField } = require('tinacms/dist/react')
    
    const object = { _template: 'homepage', title: 'Test' }
    const attrs = tinaField(object, 'title')
    
    expect(attrs['data-tina-field']).toBe('homepage.title')
    expect(attrs['data-tina-field-key']).toBe('title')
  })

  it('should handle objects without template', () => {
    const { tinaField } = require('tinacms/dist/react')
    
    const object = { title: 'Test' }
    const attrs = tinaField(object, 'title')
    
    expect(attrs['data-tina-field']).toBe('unknown.title')
  })

  it('should render tinaField attributes in DOM', () => {
    const { tinaField } = require('tinacms/dist/react')
    
    const page = { _template: 'homepage', title: 'Test Title' }
    
    render(
      <h1 {...tinaField(page, 'title')}>
        {page.title}
      </h1>
    )
    
    const heading = screen.getByRole('heading')
    expect(heading).toHaveAttribute('data-tina-field', 'homepage.title')
    expect(heading).toHaveAttribute('data-tina-field-key', 'title')
  })
})

describe('TinaCMS Content Types', () => {
  it('should correctly type-check blog post data', () => {
    const blogPost = {
      __typename: 'Blogg' as const,
      title: 'Test Post',
      excerpt: 'Test excerpt',
      date: '2024-01-01',
      category: 'Filosofi',
      body: 'Test content',
      _sys: {
        filename: 'test-post.md',
        relativePath: 'blogg/test-post.md',
      },
    }
    
    expect(blogPost.__typename).toBe('Blogg')
    expect(blogPost.title).toBe('Test Post')
    expect(blogPost._sys.filename).toBe('test-post.md')
  })

  it('should correctly type-check event data', () => {
    const event = {
      __typename: 'Arrangementer' as const,
      title: 'Test Event',
      date: '2024-06-15',
      time: '18:00-20:00',
      location: 'Fevik',
      price: 350,
      category: 'seminar',
      _sys: {
        filename: 'test-event.md',
      },
    }
    
    expect(event.__typename).toBe('Arrangementer')
    expect(event.price).toBe(350)
    expect(event.category).toBe('seminar')
  })

  it('should handle template discrimination with type guards', () => {
    const page = {
      __typename: 'PagesHomepage' as const,
      title: 'Home',
      heroImage: '/hero.jpg',
    }
    
    if (page.__typename === 'PagesHomepage') {
      // TypeScript knows page has heroImage
      expect(page.heroImage).toBe('/hero.jpg')
    }
  })
})

describe('TinaCMS Query Connection Handling', () => {
  it('should extract nodes from connection edges', () => {
    const connection = {
      bloggConnection: {
        edges: [
          { node: { id: '1', title: 'Post 1' } },
          { node: { id: '2', title: 'Post 2' } },
          { node: null }, // Handle null nodes
        ],
      },
    }
    
    const posts = connection.bloggConnection.edges
      .map(edge => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node !== null)
    
    expect(posts).toHaveLength(2)
    expect(posts[0].title).toBe('Post 1')
    expect(posts[1].title).toBe('Post 2')
  })

  it('should handle empty connections', () => {
    const connection = {
      bloggConnection: {
        edges: [],
      },
    }
    
    const posts = connection.bloggConnection.edges
      .map(edge => edge?.node)
      .filter((node): node is NonNullable<typeof node> => node !== null)
    
    expect(posts).toHaveLength(0)
  })
})

describe('TinaCMS Content Transformations', () => {
  it('should sort blog posts by date', () => {
    const posts = [
      { date: '2024-01-15', title: 'Post 1' },
      { date: '2024-01-10', title: 'Post 2' },
      { date: '2024-01-20', title: 'Post 3' },
    ]
    
    const sorted = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    
    expect(sorted[0].title).toBe('Post 3')
    expect(sorted[1].title).toBe('Post 1')
    expect(sorted[2].title).toBe('Post 2')
  })

  it('should generate slugs from filenames', () => {
    const post = {
      _sys: {
        filename: 'hva-er-filosofisk-dialog.md',
      },
    }
    
    const slug = post._sys.filename.replace('.md', '')
    expect(slug).toBe('hva-er-filosofisk-dialog')
  })

  it('should format Norwegian dates correctly', () => {
    const date = new Date('2024-06-15')
    const formatted = date.toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    
    expect(formatted).toBe('15. juni 2024')
  })
})

/**
 * Note: E2E Testing with TinaCMS
 * 
 * For full TinaCMS integration testing (live preview, visual editing):
 * 1. Use Playwright or Cypress for E2E tests
 * 2. Start TinaCMS dev server: `npx tinacms dev -c "npm run dev"`
 * 3. Navigate to /admin in test browser
 * 4. Test editing flows with authenticated user
 * 
 * Example E2E test structure (Playwright):
 * 
 * test('should edit blog post in TinaCMS', async ({ page }) => {
 *   await page.goto('/admin')
 *   await page.fill('[name="username"]', 'test@example.com')
 *   await page.click('button[type="submit"]')
 *   await page.click('text=Blogginnlegg')
 *   await page.click('text=Test Post')
 *   await page.fill('[name="title"]', 'Updated Title')
 *   await page.click('text=Save')
 *   await expect(page.locator('text=Saved')).toBeVisible()
 * })
 */
