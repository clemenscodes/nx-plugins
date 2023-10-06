import type { BinGeneratorSchema } from '@/types';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { getProjectTypeWithTree } from './getProjectTypeWithTree';
import { CProjectType } from '@/types';
import { binGenerator } from '../binGenerator/binGenerator';
import * as devkit from '@nx/devkit';

describe('getProjectTypeWithTree', () => {
    let tree: Tree;
    let binOptions: BinGeneratorSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        binOptions = {
            name: 'link',
            language: 'C++',
            generateTests: true,
        };
        jest.spyOn(devkit, 'formatFiles').mockImplementation(jest.fn());
        await binGenerator(tree, binOptions);
    });

    it('should get app project type with tree', () => {
        const projectType = getProjectTypeWithTree(tree, 'link');
        expect(projectType).toBe(CProjectType.App);
    });

    it('should get lib project type with tree', () => {
        const projectType = getProjectTypeWithTree(tree, 'liblink');
        expect(projectType).toBe(CProjectType.Lib);
    });

    it('should get lib project type with tree', () => {
        const projectType = getProjectTypeWithTree(tree, 'testlink');
        expect(projectType).toBe(CProjectType.Test);
    });
});
