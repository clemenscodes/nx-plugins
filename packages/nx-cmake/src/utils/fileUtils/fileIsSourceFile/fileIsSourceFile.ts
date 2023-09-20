import { CProjectType } from '../../../models/types';
import { getAbsolutePath } from '../getAbsolutePath/getAbsolutePath';

export const fileIsSourceFile = (
    workspaceRoot: string,
    projectRoot: string,
    projectType: CProjectType,
    file: string
): boolean => {
    const root = getAbsolutePath(workspaceRoot, projectRoot);
    const testRoot = root.endsWith('/test')
        ? root
        : getAbsolutePath(root, 'test');
    const isTestFile = file.startsWith(testRoot);
    if (projectType !== CProjectType.Test && isTestFile) {
        return false;
    }
    if (projectType === CProjectType.Test && !isTestFile) {
        return false;
    }
    const isCFile = file.endsWith('.c');
    const isCppFile = file.endsWith('.cpp');
    const isHFile = file.endsWith('.h');
    const isHppFile = file.endsWith('.hpp');
    const isSourceFile = isCFile || isCppFile || isHFile || isHppFile;
    return isSourceFile;
};
