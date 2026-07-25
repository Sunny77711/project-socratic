import { ControllerDecorator as Controller, ToolDecorator as Tool, ExecutionContext, z } from '@nitrostack/core';

@Controller()
export class SocraticController {
  
  @Tool({
    name: 'record_friction_event',
    description: 'Stores the detected cognitive friction event and supporting signals',
    inputSchema: z.object({
      sessionId: z.string(),
      dwellTimeMs: z.number(),
      blinkRateDrop: z.boolean(),
    })
  })
  async recordFrictionEvent(input: { sessionId: string; dwellTimeMs: number; blinkRateDrop: boolean }, ctx: ExecutionContext) {
    ctx.logger.info(`Friction event recorded for session ${input.sessionId}`);
    return {
      content: [
        { type: 'text', text: `Friction event recorded for session ${input.sessionId}` }
      ]
    };
  }

  @Tool({
    name: 'extract_blocking_concept',
    description: 'Identifies the central concept or prerequisite in the active paragraph',
    inputSchema: z.object({
      paragraph: z.string(),
    })
  })
  async extractBlockingConcept(input: { paragraph: string }, ctx: ExecutionContext) {
    return {
      content: [
        { type: 'text', text: 'Extracted concept: Superposition' } // Mocked
      ]
    };
  }

  @Tool({
    name: 'retrieve_scholarly_context',
    description: 'Calls Semantic Scholar or arXiv and returns relevant source material',
    inputSchema: z.object({
      query: z.string(),
    })
  })
  async retrieveScholarlyContext(input: { query: string }, ctx: ExecutionContext) {
    return {
      content: [
        { type: 'text', text: `Mocked scholarly definition for: ${input.query}` }
      ]
    };
  }

  @Tool({
    name: 'select_intervention',
    description: 'Chooses the intervention format (definition, analogy, prerequisite, derivation)',
    inputSchema: z.object({
      concept: z.string(),
    })
  })
  async selectIntervention(input: { concept: string }, ctx: ExecutionContext) {
    return {
      content: [
        { type: 'text', text: 'Selected format: analogy' }
      ]
    };
  }

  @Tool({
    name: 'generate_contextual_intervention',
    description: 'Generates structured content for the frontend widget',
    inputSchema: z.object({
      concept: z.string(),
      format: z.string(),
      explanation: z.string(),
      sourceUrl: z.string(),
    })
  })
  async generateContextualIntervention(input: { concept: string; format: string; explanation: string; sourceUrl: string }, ctx: ExecutionContext) {
    return {
      content: [
        { 
          type: 'text', 
          text: `Widget payload ready: Concept=${input.concept}, format=${input.format}` 
        }
      ]
    };
  }

  @Tool({
    name: 'record_intervention_outcome',
    description: 'Records if the learner resumed reading or requested a different explanation',
    inputSchema: z.object({
      sessionId: z.string(),
      action: z.enum(['helpful', 'explain_differently', 'dismiss', 'resumed']),
    })
  })
  async recordInterventionOutcome(input: { sessionId: string; action: 'helpful' | 'explain_differently' | 'dismiss' | 'resumed' }, ctx: ExecutionContext) {
    return {
      content: [
        { type: 'text', text: `Recorded outcome: ${input.action}` }
      ]
    };
  }

  @Tool({
    name: 'escalate_intervention',
    description: 'Produces a deeper/different explanation if the first fails',
    inputSchema: z.object({
      concept: z.string(),
      previousFormat: z.string(),
    })
  })
  async escalateIntervention(input: { concept: string; previousFormat: string }, ctx: ExecutionContext) {
    return {
      content: [
        { type: 'text', text: `Escalated explanation for ${input.concept}` }
      ]
    };
  }
}
