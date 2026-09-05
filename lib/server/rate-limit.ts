import "server-only";

type RateLimitBucket = {
  count: number;
  expiresAt: number;
};

type RateLimitInput = {
  request: Request;
  namespace: string;
  limit: number;
  windowMs: number;
};

const rateLimitBuckets = new Map<string, RateLimitBucket>();
const MAX_TRACKED_BUCKETS = 500;

function getClientAddress(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function pruneExpiredBuckets(now: number) {
  if (rateLimitBuckets.size < MAX_TRACKED_BUCKETS) {
    return;
  }

  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.expiresAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}

export function checkRateLimit({
  request,
  namespace,
  limit,
  windowMs,
}: RateLimitInput) {
  const now = Date.now();
  const key = `${namespace}:${getClientAddress(request)}`;
  const currentBucket = rateLimitBuckets.get(key);

  pruneExpiredBuckets(now);

  if (!currentBucket || currentBucket.expiresAt <= now) {
    rateLimitBuckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (currentBucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((currentBucket.expiresAt - now) / 1000),
      ),
    };
  }

  currentBucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
