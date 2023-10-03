import type { BaseOptions } from '../../models/types';
import type { LinkGeneratorSchema } from '../link/schema';

export type BinGeneratorSchema = BaseOptions & {
    generateTests: boolean;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
    linkOptions: LinkGeneratorSchema;
};
