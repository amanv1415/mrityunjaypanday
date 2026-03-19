const fallbackBase = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
const configuredBase = process.env.NEXT_PUBLIC_API_BASE || fallbackBase;
const normalizedApiBase = configuredBase.replace(/\/+$/, '');

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedApiBase}${normalizedPath}`;
}
