import { describe, it, expect } from 'vitest';
import { tenantMiddleware } from '../src/middleware/tenant';

describe('Multi-tenant Isolation', () => {
  it('should reject requests without organizationId', () => {
    const req = { user: { id: '1' } } as any;
    const res = { status: (code: number) => ({ json: (data: any) => ({ code, data }) }) } as any;
    const next = () => {};

    const result: any = tenantMiddleware(req, res, next);
    expect(result.code).toBe(403);
  });

  it('should inject organization filter', () => {
    const req = { user: { id: '1', organizationId: 'org_123' } } as any;
    const res = {} as any;
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    tenantMiddleware(req, res, next);
    expect(req.tenantFilter.organizationId).toBe('org_123');
    expect(nextCalled).toBe(true);
  });
});
