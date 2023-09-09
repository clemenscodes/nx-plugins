import { projectFile } from '../../config/projectFilePattern';
import { workspaceLayout } from '@nx/devkit';
import { CProjectType } from '../../models/types';

export const getProjectType = (file: string): CProjectType => {
    const directory = file.split('/').shift();
    if (!directory) {
        throw new Error('Failed to determine project type');
    }
    const { appsDir, libsDir } = workspaceLayout();
    if (directory !== appsDir && directory !== libsDir) {
        throw new Error('Failed to determine project type');
    }
    if (directory === appsDir) {
        return CProjectType.App;
    }
    const maybeTest = file.split(projectFile).shift().split('/').pop();
    if (maybeTest === 'test') {
        return CProjectType.Test;
    }
    return CProjectType.Lib;
};
