# Blog System Documentation

## Overview

A complete blog system with WordPress GraphQL integration featuring:

- Main blog page with filterable categories
- Individual post pages
- Responsive design with 3-column grid
- Load more functionality with pagination
- Blue loading progress bar
- Category bubble filters

## Structure

### Pages

- `/blog` - Main blog listing page
- `/blog/[slug]` - Individual post pages

### Components

- `BlogLayout` - Main blog page layout with filters and grid
- `BlogCard` - Individual post card component
- `CategoryFilter` - Category filter sidebar with bubble UI
- `LoadingBar` - Blue progress bar component

### Features

#### Main Blog Page (`/blog`)

- **Header**: Simple title "Our Blog" with subtitle
- **Layout**: 2-column layout (sidebar + content)
- **Sidebar**: Category filters as clickable bubbles
- **Content**: 3-column responsive grid of post cards
- **Pagination**: Load more button with viewing count
- **Progress**: Blue loading bar showing viewing progress

#### Post Cards

Each card includes:

- Featured image (with fallback)
- Category badge
- Post title
- Excerpt (truncated to 120 chars)
- Date and reading time

#### Individual Post Pages (`/blog/[slug]`)

- Full post content with proper typography
- Featured image header
- Category badges
- Author, date, and reading time metadata
- SEO optimization with meta tags

### GraphQL Queries

#### Enhanced Post Query

```graphql
query GetPosts($first: Int, $after: String, $categoryIn: [ID]) {
  posts(first: $first, after: $after, where: { status: PUBLISH, categoryIn: $categoryIn }) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      title
      content
      excerpt
      slug
      date
      featuredImage { ... }
      categories { ... }
    }
  }
}
```

#### Categories Query

```graphql
query GetCategories {
  categories(where: { hideEmpty: true }) {
    nodes {
      id
      name
      slug
      count
    }
  }
}
```

### Custom Hooks

#### `useBlogPosts(first, categoryIn)`

- Fetches posts with pagination support
- Supports category filtering
- Returns posts, pageInfo, loading state, and fetchMore function

#### `useCategories()`

- Fetches all categories with post counts
- Returns categories array and loading state

### Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column post grid
- **Desktop**: 3-column post grid with sidebar
- **Sidebar**: Sticky positioning on desktop

### Loading States

- Skeleton loaders for post cards
- Loading button states
- Progressive loading bar
- Smooth transitions

## Usage

### Adding to Navigation

The blog is accessible at `/blog` and can be linked from navigation menus.

### WordPress Setup

Ensure your WordPress GraphQL endpoint includes:

- Posts with categories
- Featured images
- Post excerpts
- Category taxonomy with counts

### Customization

- Modify `BlogCard` for different post card layouts
- Adjust grid columns in `BlogLayout`
- Customize category filter styling in `CategoryFilter`
- Change loading bar color in `LoadingBar`

## Files Modified/Created

### New Files

- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/components/layout/BlogLayout.tsx`
- `src/components/ui/BlogCard.tsx`
- `src/components/ui/CategoryFilter.tsx`
- `src/components/ui/LoadingBar.tsx`
- `src/components/ui/index.ts`

### Modified Files

- `src/lib/queries.ts` - Added category support to post queries
- `src/types/wordpress.ts` - Added Category interface and enhanced Post type
- `src/hooks/useWordPressData.ts` - Added blog-specific hooks

## SEO Features

- Dynamic meta titles and descriptions
- Open Graph tags
- Twitter card support
- Semantic HTML structure
- Clean URLs with post slugs
