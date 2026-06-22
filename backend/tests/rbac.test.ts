import { describe, it, expect } from 'vitest';
import { requirePermission } from '../src/middleware/rbac';
import { UserRole } from '@prisma/client';

describe('RBAC Permission Engine', () => {
  it('should allow OWNER to manage billing', () => {
    const req = { user: { role: UserRole.OWNER } } as any;
    const res = { status: (code: number) => ({ json: (data: any) => ({ code, data }) }) } as any;
    let nextCalled = false;
    const next = () => { nextCalled = true; };

    requirePermission('manage_billing')(req, res, next);
    expect(nextCalled).toBe(true);
  });

  it('should deny MEMBER from managing billing', () => {
    const req = { user: { role: UserRole.MEMBER } } as any;
    const res = { status: (code: number) => ({ json: (data: any) => ({ code, data }) }) } as any;
    const next = () => {};

    const result: any = requirePermission('manage_billing')(req, res, next);
    expect(result.code).toBe(403);
  });
});
