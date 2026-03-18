import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, PUT } from '@/app/api/plan/route';

// Modern Vitest mock hoisting
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(),
}));

vi.mock('@/lib/mongodb', () => ({
  default: vi.fn().mockResolvedValue(true),
}));

vi.mock('@/models/StudyPlan', () => ({
  default: {
    findOne: vi.fn(),
    findOneAndUpdate: vi.fn(),
  },
}));

vi.mock('@/app/api/auth/[...nextauth]/route', () => ({
  authOptions: {},
}));

import { getServerSession } from 'next-auth';
import StudyPlan from '@/models/StudyPlan';

describe('API Route: /api/plan', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET Method', () => {
    it('should return 401 if user is not authenticated', async () => {
      // Mock unauthenticated session
      vi.mocked(getServerSession).mockResolvedValueOnce(null);

      const response = await GET();
      expect(response.status).toBe(401);
      
      const json = await response.json();
      expect(json.message).toBe('Unauthorized');
    });

    it('should return empty sections if no plan exists for authenticated user', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
         user: { id: 'test-user-id', isPro: true }
      } as any);
      
      vi.mocked(StudyPlan.findOne).mockResolvedValueOnce(null);

      const response = await GET();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.sections).toEqual([]);
    });

    it('should return sections if plan exists', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
         user: { id: 'test-user-id' }
      } as any);
      
      const mockPlan = { sections: [{ id: 's1', title: 'React', groups: [] }] };
      vi.mocked(StudyPlan.findOne).mockResolvedValueOnce(mockPlan);

      const response = await GET();
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.sections).toEqual(mockPlan.sections);
    });
  });

  describe('PUT Method', () => {
    it('should return 401 if unauthorized', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce(null);
      const req = new Request('http://localhost/api/plan', { method: 'PUT', body: JSON.stringify({}) });
      
      const response = await PUT(req);
      expect(response.status).toBe(401);
    });

    it('should return 400 Bad Request if Zod validation strictly fails on payload', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
         user: { id: 'test-user-id' }
      } as any);

      // Malformed payload (missing sections array)
      const req = new Request('http://localhost/api/plan', { 
        method: 'PUT', 
        body: JSON.stringify({ invalidRoot: true }) 
      });

      const response = await PUT(req);
      expect(response.status).toBe(400);

      const json = await response.json();
      expect(json.message).toBe('Invalid payload');
      expect(json.errors).toBeDefined();
    });

    it('should call findOneAndUpdate and return 200 on valid strictly mapped payload', async () => {
      vi.mocked(getServerSession).mockResolvedValueOnce({
         user: { id: 'test-user-id' }
      } as any);

      const validPayload = { sections: [{ id: 's1', title: 'SolidJS', groups: [] }] };
      const req = new Request('http://localhost/api/plan', { 
        method: 'PUT', 
        body: JSON.stringify(validPayload) 
      });

      vi.mocked(StudyPlan.findOneAndUpdate).mockResolvedValueOnce(validPayload);

      const response = await PUT(req);
      expect(response.status).toBe(200);

      const json = await response.json();
      expect(json.message).toBe('Plan updated');
      expect(json.sections).toEqual(validPayload.sections);
      
      // Verify Mongoose was called with the exact sanitized data
      expect(StudyPlan.findOneAndUpdate).toHaveBeenCalledWith(
        { userId: 'test-user-id' },
        { sections: validPayload.sections },
        { new: true, upsert: true }
      );
    });
  });

});
