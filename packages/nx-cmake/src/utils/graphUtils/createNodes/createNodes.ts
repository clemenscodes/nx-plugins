import type { CreateNodes } from '@nx/devkit';
import { projectFilePattern } from '../../../config/projectFilePattern';
import { createNodesFunction } from '../createNodesFunction/createNodesFunction';

export const createNodes: CreateNodes = [
    projectFilePattern,
    createNodesFunction,
];
