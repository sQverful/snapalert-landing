// Prepend NEXT_PUBLIC_BASE_PATH to absolute asset paths.
// Next.js does not auto-rewrite plain <img src="/..."> tags when basePath is set,
// so we must prefix manually for static export served from a sub-path (e.g. GitHub Pages).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
