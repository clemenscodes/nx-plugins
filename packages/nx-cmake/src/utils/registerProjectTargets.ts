// import { workspaceLayout, type ProjectTargetConfigurator } from '@nx/devkit';
// import { getProjectTargets } from './getProjectTargets';
// import { CProjectType } from '../models/types';
// import { PATTERN } from '../config/projectFilePatterns';

// const projectTypeOfFile = (file: string): null | CProjectType => {
//     const directory = file.split('/').shift();
//     if (!directory) {
//         return null;
//     }
//     const { appsDir, libsDir } = workspaceLayout();
//     if (directory !== appsDir && directory !== libsDir) {
//         return null;
//     }
//     if (directory === appsDir) {
//         return CProjectType.App;
//     }
//     const maybeTest = file.split(`${PATTERN}`).shift().split('/').pop();
//     if (maybeTest === 'test') {
//         return CProjectType.Test;
//     }
//     return CProjectType.Lib;
// };

// export const registerProjectTargets: ProjectTargetConfigurator = (file) => {
//     const projectType = projectTypeOfFile(file);
//     if (!projectType) {
//         return { build: {} };
//     }
//     return getProjectTargets(projectType);
// };
