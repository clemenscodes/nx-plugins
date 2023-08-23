import type { ProjectGraphProcessorContext } from '@nx/devkit';
import type { FilteredProject, Deps } from '../models/types';
import { execSync } from 'child_process';
import { filterOutput } from './filterOutput';
import { getDependenciesOfProject } from './getDependenciesOfProject';
import { getExternalFiles } from './getExternalFiles';
import { trimLib } from './trimLib';

const getWorkspaceIncludeDir = () => {
    return 'include';
};

export const filterDependenciesOfProject = async (
    project: FilteredProject,
    libsDir: string,
    ctx: ProjectGraphProcessorContext,
    projects: FilteredProject[]
): Promise<Deps[]> => {
    const { name, root: projectRoot, tag } = project;
    const trimmedName = trimLib(name);
    const fileName = `${projectRoot}/src/${trimmedName}.${tag}`;
    const includeDir = getWorkspaceIncludeDir();
    const cmd = `gcc -M ${fileName} -I ${projectRoot}/include -I ${libsDir} -I ${includeDir}`;
    const output = execSync(cmd, { encoding: 'utf-8' });
    const files = filterOutput(output);
    const externalFiles = getExternalFiles(files, libsDir);
    const dependencies = getDependenciesOfProject(
        name,
        externalFiles,
        ctx,
        projects
    );
    return dependencies;
};
