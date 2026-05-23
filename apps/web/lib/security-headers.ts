const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://www.facebook.com",
  "frame-src 'self' https://www.googletagmanager.com",
  "manifest-src 'self'",
  "upgrade-insecure-requests"
];

export const CONTENT_SECURITY_POLICY = cspDirectives.join("; ");

export const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CONTENT_SECURITY_POLICY
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin"
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff"
  },
  {
    key: "X-Frame-Options",
    value: "DENY"
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off"
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)"
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Origin-Agent-Cluster",
    value: "?1"
  }
];

export const NO_STORE_HEADERS = [
  {
    key: "Cache-Control",
    value: "no-store, max-age=0"
  }
];

export const ADMIN_ROUTE_HEADERS = [
  ...NO_STORE_HEADERS,
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive"
  }
];
