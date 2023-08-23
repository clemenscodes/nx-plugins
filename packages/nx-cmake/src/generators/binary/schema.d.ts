import type { BaseOptions } from '../../models/base';

export type BinGeneratorSchema = Omit<BaseOptions, 'project' | 'link'> & {
    generateTests: boolean = true;
};
