import type { BaseOptions } from '../../models/types';
import { LinkGeneratorSchema } from '../link/schema';

export type BinGeneratorSchema = BaseOptions & {
    generateTests: boolean = true;
};

export type BinSchema = Required<BinGeneratorSchema> & {
    projectRoot: string;
    linkOptions: LinkGeneratorSchema;
};
