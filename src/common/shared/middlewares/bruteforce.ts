import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { config } from '../../../core/config';
import { logger } from '../services';

let bruteForceLimiter: RateLimiterMemory | undefined;

const setupRateLimiter = async (): Promise<void> => {
  try {
    const opts = {
      points: 1, // Point budget.
      duration: 60 // Reset points consumption every 60 sec.
    }

    bruteForceLimiter = new RateLimiterMemory(opts);

    logger.info('Rate limiter configured.');
  } catch (error) {
    logger.error('Error setting up rate limiter', error as any);
  }
};

setupRateLimiter();

const bruteForceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (!bruteForceLimiter) {
    const error = new Error('Rate limiter not configured yet.');
    logger.error(error.message, error);
    res.status(500).json({
      message: 'Rate limiter not configured yet. Please try again later.',
    });
    return;
  }

  try {
    await bruteForceLimiter.consume(req.ip as string);
    next();
  } catch (rejRes: any) {
    const retrySecs = Math.ceil(rejRes.msBeforeNext / 1000) || 1;
    if (!config.runningProd) {
      res.set('Retry-After', String(retrySecs)); // Send Retry-After only in dev mode
    }
    logger.warn(
      `<Bruteforce Suspected> Too many attempts from IP: ${req.ip}. Retry after ${retrySecs} seconds.`,
    );
    res.status(429).json({
      message: `<Bruteforce Suspected> Too many attempts, please try again after ${Math.ceil(rejRes.msBeforeNext / 60000)} minutes.`,
    });
  }
};

export default bruteForceMiddleware;
