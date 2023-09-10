import type { BaseOptions } from '../../models/base';

export type BinGeneratorSchema = BaseOptions & {
    generateTests: boolean = true;
};
