import type { BaseOptions } from '../../models/base';
import type { CTag } from '../../models/types';

export type ModuleGeneratorSchema = Omit<BaseOptions, 'link'> & {
    resolvedProject?: string;
    include?: string;
    tag?: CTag;
};
