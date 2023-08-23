import type { BaseOptions } from '../../models/base';
import type { CTag } from '../../models/types';

export type ModuleGeneratorSchema = Required<
    Omit<BaseOptions, 'link', 'language'>
> & {
    resolvedProject: string;
    tag: CTag;
    include: string;
};
