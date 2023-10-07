import { CProjectType } from '@/config';

export const getProjectName = (type: CProjectType, root: string): string => {
    const projectNameSplit = root.split('/');
    const appProjectName = projectNameSplit.pop();
    if (!appProjectName) {
        throw new Error(
            `Could not get application name from ${root.split('/')}`,
        );
    }
    const libProjectName = `lib${appProjectName}`;
    const testProjectName = `test${appProjectName}`;
    if (type === CProjectType.Lib) {
        return libProjectName;
    }
    if (type === CProjectType.Test) {
        return appProjectName === 'test'
            ? testProjectName
            : `test${appProjectName}`;
    }
    return appProjectName;
};
