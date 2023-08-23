import { projectFile } from './../config/projectFilePattern';
import { workspaceLayout } from '@nx/devkit';
import { getProjectTargets } from './getProjectTargets';
import { CProjectType } from '../models/types';

export const projectTypeOfFile = (file: string): null | CProjectType => {
    const directory = file.split('/').shift();
    if (!directory) {
        return null;
    }
    const { appsDir, libsDir } = workspaceLayout();
    if (directory !== appsDir && directory !== libsDir) {
        return null;
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

export const registerProjectTargets = (file: string) => {
    const projectType = projectTypeOfFile(file);
    if (!projectType) {
        return { build: {} };
    }
    return getProjectTargets(projectType);
};
