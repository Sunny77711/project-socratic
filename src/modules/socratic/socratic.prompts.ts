import { PromptDecorator as Prompt, ExecutionContext } from '@nitrostack/core';

export class SocraticPrompts {
  
  @Prompt({
    name: 'diagnose_learning_barrier',
    description: 'Determines whether the likely issue is vocabulary, prerequisite knowledge, abstract reasoning, etc.',
    arguments: [
      { name: 'paragraph', description: 'The paragraph the user is struggling with', required: true }
    ],
  })
  async diagnoseLearningBarrier(args: { paragraph: string }, ctx: ExecutionContext) {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Analyze this paragraph and determine the most likely cognitive barrier for a student:\n\n${args.paragraph}`
          }
        }
      ]
    };
  }

  @Prompt({
    name: 'simplify_concept',
    description: 'Generates a short explanation grounded in the paragraph and retrieved context.',
    arguments: [
      { name: 'paragraph', description: 'The paragraph', required: true },
      { name: 'concept', description: 'The concept to simplify', required: true },
      { name: 'academicContext', description: 'The scholarly context retrieved', required: true }
    ],
  })
  async simplifyConcept(args: { paragraph: string; concept: string; academicContext: string }, ctx: ExecutionContext) {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `System Context: You are Project Socratic, an ambient learning assistant. Be extremely concise. Generate analogies that a high schooler could understand.\n\nThe user is stuck on the concept "${args.concept}" in the following paragraph:\n\n"${args.paragraph}"\n\nHere is the scholarly context from arXiv: ${args.academicContext}\n\nProvide a simple 2-sentence analogy.`
          }
        }
      ]
    };
  }

  @Prompt({
    name: 'adapt_explanation',
    description: 'Produces a fundamentally different intervention instead of merely making the previous answer longer.',
    arguments: [
      { name: 'concept', description: 'The concept to adapt', required: true },
      { name: 'previousExplanation', description: 'The previous explanation that failed', required: true }
    ],
  })
  async adaptExplanation(args: { concept: string; previousExplanation: string }, ctx: ExecutionContext) {
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `The user did not understand this explanation for ${args.concept}:\n\n${args.previousExplanation}\n\nProvide a completely different approach (e.g. if the previous was an analogy, provide a step-by-step breakdown).`
          }
        }
      ]
    };
  }
}
