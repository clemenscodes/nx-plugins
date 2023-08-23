import type { Link } from '../../models/types';

export interface LinkGeneratorSchema {
    library: string;
    project: string;
    link: Link;
    skipFormat: boolean;
}
