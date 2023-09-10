import { CProjectType } from '../../models/types';

export const getProjectName = (type: CProjectType, root: string) => {
    const projectNameSplit = root.split('/');
    const appProjectName = projectNameSplit.pop();
    const libProjectName = `lib${appProjectName}`;
    const testProjectName = `test${projectNameSplit.pop()}`;
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
