import type { Tree } from '@nx/devkit';
import type { InitGeneratorSchema } from '@/config';
import { getDefaultInitGeneratorOptions } from '@/config';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateRootConfig } from './generateRootConfig';
import { normalizeLineEndings } from '../normalizeLineEndings/normalizeLineEndings';
import { readFileWithTree } from '../readFileWithTree/readFileWithTree';

describe('generateRootConfig', () => {
    let tree: Tree;
    let options: InitGeneratorSchema;
    let rootConfig: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        options = {
            ...getDefaultInitGeneratorOptions(),
            workspaceName: 'workspace',
        };
        rootConfig = 'CMakeLists.txt';
    });

    it('should generate root config', async () => {
        generateRootConfig(tree, options);
        expect(tree.exists(rootConfig)).toBe(true);
    });

    it('should generate root config correctly', async () => {
        generateRootConfig(tree, options);
        const readRootConfig = readFileWithTree(tree, rootConfig);
        const expectedRootConfig =
            `include(${options.cmakeConfigDir}/${options.workspaceName}.cmake)\n` +
            `cmake_minimum_required(VERSION 3.21)\n` +
            `project(${options.workspaceName} ${options.language})\n` +
            'add_projects()\n';
        expect(readRootConfig).toBe(normalizeLineEndings(expectedRootConfig));
    });
});
