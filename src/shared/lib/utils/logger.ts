const isDev = process.env.NODE_ENV === 'development';

const sensitivePatterns = [
  /password/i,
  /token/i,
  /secret/i,
  /credential/i,
  /auth/i,
  /email/i,
];

function sanitize(data: unknown): unknown {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (sensitivePatterns.some((pattern) => pattern.test(key))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitize(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      console.debug(`[DEBUG] ${message}`, data ? sanitize(data) : '');
    }
  },
  info: (message: string, data?: unknown) => {
    if (isDev) {
      console.info(`[INFO] ${message}`, data ? sanitize(data) : '');
    }
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data ? sanitize(data) : '');
  },
  error: (message: string, error?: Error | unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[ERROR] ${message}`, errorMessage);
  },
};
