# Project: beolamtat - Nhập hàng Trung Quốc

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (via PostCSS)
- Package manager: pnpm

## Rules
- Viết code bằng TypeScript, dùng Tailwind CSS cho styling
- UI phải đẹp, hiện đại, responsive (mobile-first)
- Tiếng Việt cho nội dung hiển thị
- Font: Inter (Google Fonts, đã setup trong layout)
- Màu brand chính: #ff0036 (đỏ)
- Alias path: @/* → ./*

## Coding Standards (ECC-inspired)
### Immutability & Safety
- Prefer `const` over `let`, never use `var`
- Use readonly arrays and objects where possible
- Always handle error cases explicitly

### File Organization
- One component per file, named after the component
- Keep files under 300 lines — split if larger
- Group imports: external → internal → types → styles

### Git Workflow
- Commit format: `type(scope): description` (e.g., `feat(product): add product card`)
- Types: feat, fix, refactor, docs, style, test, chore
- Each commit should be atomic and pass all checks

### TypeScript Specific
- Strict mode always on
- Prefer interfaces over types for object shapes
- Use discriminated unions for state management
- Never use `any` — use `unknown` if type is truly unknown
- Always define return types for exported functions

### Performance
- Use dynamic imports for heavy components
- Optimize images with next/image
- Minimize client-side JavaScript — prefer Server Components
- Use React.memo only when profiling shows benefit

### Security
- Validate all user inputs
- Sanitize data before rendering (XSS prevention)
- Never expose API keys or secrets in client code
- Use environment variables for sensitive config

### Testing Approach
- Write tests before fixing bugs (reproduce → fix → verify)
- Test behavior, not implementation details
- Critical paths must have test coverage

## Research-First Development
Before implementing any feature:
1. Check if Next.js has a built-in solution
2. Search for established patterns in the ecosystem
3. Review existing codebase for similar patterns
4. Plan before coding — outline the approach first
