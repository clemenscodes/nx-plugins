import type { CTag } from '../../../../models/types';
import { hasValidExtension } from '../hasValidExtension/hasValidExtension';

export const isValidProjectFile = (file: string, tag: CTag) => {
    return (
        !file.startsWith('dist') &&
        !file.startsWith('include') &&
        hasValidExtension(file, tag)
    );
};
