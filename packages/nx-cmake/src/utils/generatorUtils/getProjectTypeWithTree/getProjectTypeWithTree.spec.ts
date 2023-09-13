import type { BinGeneratorSchema } from './../../../generators/binary/schema';
import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { getProjectTypeWithTree } from './getProjectTypeWithTree';
import { CProjectType } from '../../../models/types';
import binGenerator from '../../../generators/binary/generator';

describe('getProjectTypeWithTree', () => {
    let tree: Tree;
    let binOptions: BinGeneratorSchema;

    beforeEach(async () => {
        tree = createTreeWithEmptyWorkspace();
        binOptions = {
            name: 'link',
            language: 'C++',
            skipFormat: false,
            generateTests: true,
        };
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
