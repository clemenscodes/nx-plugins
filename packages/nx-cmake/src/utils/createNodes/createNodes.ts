import type { CreateNodes } from '@nx/devkit';
import { createNodesFunction } from '../createNodesFunction/createNodesFunction';
import { projectFilePattern } from '../../config/projectFilePattern';

export const createNodes: CreateNodes = [
    projectFilePattern,
    createNodesFunction,
];
