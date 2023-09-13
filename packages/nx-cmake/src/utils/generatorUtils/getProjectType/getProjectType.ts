import { PROJECT_FILE } from '../../../config/projectFilePattern';
import { CProjectType } from '../../../models/types';
import { getWorkspaceLayout } from '../getWorkspaceLayout/getWorkspaceLayout';

export const getProjectType = (file: string): CProjectType => {
    const { appsDir, libsDir } = getWorkspaceLayout();
    if (!file.includes('/') && !file.startsWith('test')) {
        return CProjectType.App;
    }
    const directory = file.split('/').shift();
    if (!directory) {
        throw new Error('Failed to determine project type');
    }
    if (directory !== appsDir && directory !== libsDir) {
        throw new Error('Failed to determine project type');
    }
    if (directory === appsDir) {
        return CProjectType.App;
    }
    const maybeTest = file.split(PROJECT_FILE).shift().split('/').pop();
    if (maybeTest === 'test') {
        return CProjectType.Test;
    }
    return CProjectType.Lib;
};
