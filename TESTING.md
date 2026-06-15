# Testing Guide

This project uses Vitest with React Testing Library for unit and integration tests.

## Running Tests

```powershell
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with interactive UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Contact Form Tests (`src/components/ContactForm.test.tsx`)
- ✅ Rendering and DOM structure
- ✅ Form field types and validation
- ✅ User interactions (typing, submitting)
- ✅ Success/error state handling
- ✅ Form clearing after submission
- ✅ Accessibility (labels, ARIA attributes)

### Server Function Tests (`src/server/kontakt.test.ts`)
- ✅ Input validation (required fields, email format)
- ✅ Whitespace trimming
- ✅ Optional field handling
- ✅ Brevo API integration
- ✅ HTML escaping (XSS prevention)
- ✅ Error handling (API errors, network failures)
- ✅ Email formatting (newlines to `<br>`)

### TinaCMS Integration Tests (`src/tests/tina-integration.test.tsx`)
- ✅ `useTina` hook behavior
- ✅ `tinaField` attribute generation
- ✅ Content type discrimination
- ✅ GraphQL connection handling
- ✅ Content transformations (sorting, slug generation)

## What's Tested

### ✅ Unit Tests
- Component rendering
- Form state management
- Server-side validation logic
- Data transformations
- Error handling

### ⚠️ Limited Testing
- **TinaCMS live preview**: Requires full admin UI running
- **Visual editing**: Requires iframe and authenticated session
- **Real API calls**: Mocked with `vi.fn()`

### ❌ Not Tested (Requires E2E)
- TinaCMS admin login flow
- Real-time content editing in CMS
- Image uploads through TinaCMS
- Publishing workflow
- Git commit integration

## TinaCMS Testing

TinaCMS functionality is partially testable in unit tests:

### What CAN Be Tested
```tsx
✅ useTina hook data flow
✅ tinaField attribute rendering
✅ Content queries structure
✅ Type safety and __typename checks
✅ Content transformations (sorting, filtering)
```

### What REQUIRES E2E Testing
```tsx
❌ Live preview in admin UI
❌ Visual editing (clicking on content)
❌ Form field updates in CMS
❌ Image media management
❌ Git commits on save
```

### E2E Testing with Playwright

For full TinaCMS testing, use Playwright or Cypress:

```typescript
// Example: tests/e2e/tina-cms.spec.ts
import { test, expect } from '@playwright/test'

test('should edit blog post in TinaCMS', async ({ page }) => {
  // Start dev server with TinaCMS
  await page.goto('http://localhost:3000/admin')
  
  // Login (requires Tina Cloud or local auth)
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  
  // Navigate to content
  await page.click('text=Blogginnlegg')
  await page.click('text=Test Post')
  
  // Edit content
  await page.fill('[name="title"]', 'Updated Title')
  await page.click('button:has-text("Save")')
  
  // Verify save
  await expect(page.locator('text=Saved successfully')).toBeVisible()
})
```

## Coverage

Generate coverage reports with:

```powershell
npm run test:coverage
```

Coverage reports are saved to `./coverage/` and show:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

Current target: **>80% coverage** for critical paths (contact form, validation, error handling).

## Mocking

### Environment Variables
```typescript
process.env.BREVO_API_KEY = 'test-api-key'
process.env.CONTACT_TO_EMAIL = 'test@filosamtale.no'
```

### Fetch API
```typescript
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
})
```

### TanStack Router
```typescript
vi.mock('@tanstack/react-router', () => ({
  getRouteApi: () => ({
    useLoaderData: () => ({ mockData }),
  }),
}))
```

### TinaCMS
```typescript
vi.mock('tinacms/dist/react', () => ({
  useTina: ({ data }) => ({ data }),
  tinaField: () => ({ 'data-tina-field': 'mock' }),
}))
```

## CI/CD Integration

Add to your CI pipeline (e.g., GitHub Actions):

```yaml
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
```

## Debugging Tests

### VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "test:watch"],
  "console": "integratedTerminal"
}
```

### Chrome DevTools
```powershell
node --inspect-brk ./node_modules/vitest/vitest.mjs run
```

## Best Practices

1. **Test user behavior, not implementation**
   - ✅ `await user.type(input, 'text')`
   - ❌ `component.state.value = 'text'`

2. **Use accessible queries**
   - ✅ `screen.getByRole('button', { name: /send/i })`
   - ❌ `document.querySelector('.submit-btn')`

3. **Wait for async updates**
   - ✅ `await waitFor(() => expect(...).toBeInTheDocument())`
   - ❌ `expect(...).toBeInTheDocument()` (flaky)

4. **Mock external dependencies**
   - API calls, third-party services, file system

5. **Keep tests isolated**
   - No shared state between tests
   - Use `beforeEach` and `afterEach` for cleanup

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TinaCMS Documentation](https://tina.io/docs)
