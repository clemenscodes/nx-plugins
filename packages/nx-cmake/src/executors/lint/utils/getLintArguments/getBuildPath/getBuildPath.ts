export const getBuildPath = (
    workspaceRoot: string,
    projectRoot: string
): string => {
    const buildPath = `${workspaceRoot}/dist/${projectRoot}/compile_commands.json`;
    return buildPath;
};
