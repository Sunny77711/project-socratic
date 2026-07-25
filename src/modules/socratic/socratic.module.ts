import { Module } from '@nitrostack/core';
import { SocraticController } from './socratic.controller.js';
import { SocraticResources } from './socratic.resources.js';
import { SocraticPrompts } from './socratic.prompts.js';

@Module({
  name: 'socratic',
  providers: [
    SocraticController,
    SocraticResources,
    SocraticPrompts
  ],
  exports: [
    SocraticController,
    SocraticResources,
    SocraticPrompts
  ]
})
export class SocraticModule {}
