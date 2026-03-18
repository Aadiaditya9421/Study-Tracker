import { describe, it, expect } from 'vitest';
import { PlanUpdateSchema, UserProgressSchema } from '@/lib/validations';

describe('Zod Validation Schemas', () => {

  describe('PlanUpdateSchema', () => {
    it('should successfully parse a valid deeply nested Study Plan', () => {
      const validPayload = {
        sections: [
          {
            id: 'section-1',
            title: 'Frontend Mastery',
            groups: [
              {
                id: 'group-1',
                title: 'React Fundamentals',
                subtitle: 'Hooks & State',
                tasks: [
                  { id: 'task-1', title: 'Learn useState' },
                  { id: 'task-2', title: 'Learn useEffect' }
                ]
              }
            ]
          }
        ]
      };

      const result = PlanUpdateSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it('should reject a payload with missing required fields (id)', () => {
      const invalidPayload = {
        sections: [
          {
            title: 'Missing ID Section',
            groups: []
          }
        ]
      };

      const result = PlanUpdateSchema.safeParse(invalidPayload);
      expect(result.success).toBe(false);
      // Ensure the error tree points to the missing string ID
      if (!result.success) {
        expect(result.error.flatten().fieldErrors).toBeDefined();
      }
    });

    it('should reject a payload if an injected malicious key exists due to .strict()', () => {
      const maliciousPayload = {
        sections: [
          {
            id: 'section-locked',
            title: 'Hacked Section',
            maliciousAdminFlag: true, // Should be rejected by strict()
            groups: []
          }
        ]
      };

      const result = PlanUpdateSchema.safeParse(maliciousPayload);
      expect(result.success).toBe(false);
    });
  });

  describe('UserProgressSchema', () => {
    it('should parse a valid array of task completion states', () => {
       const validPayload = {
         tasks: [
           { id: 'task-1', group: 'group-1', completed: true },
           { id: 'task-2', group: 'group-1', completed: false }
         ]
       };

       expect(UserProgressSchema.safeParse(validPayload).success).toBe(true);
    });

    it('should strictly reject tasks with unmapped attributes', () => {
       const invalidPayload = {
         tasks: [
           { id: 'task-1', group: 'group-1', completed: true, points: 50 } // points is invalid
         ]
       };

       expect(UserProgressSchema.safeParse(invalidPayload).success).toBe(false);
    });
  });

});
