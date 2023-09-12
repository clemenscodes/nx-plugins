import type { Link } from '../../models/types';

export type LinkGeneratorSchema = {
    source: string;
    target: string;
    link: Link;
    skipFormat: boolean;
};

export type LinkSchema = LinkGeneratorSchema & {
    sourceProjectRoot: string;
};
