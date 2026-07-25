import { ResourceDecorator as Resource, ExecutionContext } from '@nitrostack/core';

// In-memory store for Checkpoint 1 MVP
const readingContextStore = new Map<string, any>();
const attentionTimelineStore = new Map<string, any[]>();
const interventionHistoryStore = new Map<string, any[]>();

export class SocraticResources {
  
  @Resource({
    uri: 'session://{id}/reading_context',
    name: 'reading-context',
    description: 'Stores active paragraph, section, visible duration, nearby context, and concept candidates.',
    mimeType: 'application/json',
  })
  async getReadingContext(ctx: ExecutionContext) {
    const data = {
      active_paragraph: 'The quantum superposition of states allows...',
      visible_duration_ms: 12000,
    };
    return {
      contents: [
        {
          uri: 'session://mock/reading_context',
          text: JSON.stringify(data, null, 2),
          mimeType: 'application/json',
        },
      ],
    };
  }

  @Resource({
    uri: 'session://{id}/attention_timeline',
    name: 'attention-timeline',
    description: 'Stores ONLY derived events (dwell started, low blink activity, reading resumed). No webcam frames.',
    mimeType: 'application/json',
  })
  async getAttentionTimeline(ctx: ExecutionContext) {
    const timeline = [
      { type: 'dwell_started', timestamp: Date.now() - 5000 },
      { type: 'low_blink_activity', timestamp: Date.now() - 1000 }
    ];
    return {
      contents: [
        {
          uri: 'session://mock/attention_timeline',
          text: JSON.stringify(timeline, null, 2),
          mimeType: 'application/json',
        },
      ],
    };
  }

  @Resource({
    uri: 'session://{id}/intervention_history',
    name: 'intervention-history',
    description: 'Stores previously explained concepts and learner responses',
    mimeType: 'application/json',
  })
  async getInterventionHistory(ctx: ExecutionContext) {
    const history: any[] = [];
    return {
      contents: [
        {
          uri: 'session://mock/intervention_history',
          text: JSON.stringify(history, null, 2),
          mimeType: 'application/json',
        },
      ],
    };
  }
}
