import type { ExecutorContext } from '@nx/devkit';

export const extractRootsFromExecutorContext = (
    context: ExecutorContext,
): { workspaceRoot: string; projectRoot: string } => {
    const {
        root: workspaceRoot,
        projectName,
        projectsConfigurations,
    } = context;

    if (!projectsConfigurations) {
        throw new Error(`No projectsConfigurations found on executor context`);
    }

    if (!projectName) {
        throw new Error(`No projectName found on executor context`);
    }

    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;

    return {
        workspaceRoot,
        projectRoot,
    };
};
