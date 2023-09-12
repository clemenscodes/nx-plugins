import type { BaseOptions } from '../../models/types';

export type BinGeneratorSchema = BaseOptions & {
    generateTests: boolean = true;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
};
