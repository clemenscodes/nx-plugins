import type { Link } from '../../models/types';

export type LinkGeneratorSchema = {
    source: string;
    target: string;
    link: Link;
};

export type LinkSchema = LinkGeneratorSchema & {
    sourceProjectRoot: string;
};
