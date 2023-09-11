import type { CTag, BaseOptions } from '../../models/types';

export type ModuleGeneratorSchema = Omit<BaseOptions, 'link'> & {
    resolvedProject?: string;
    include?: string;
    tag?: CTag;
};
