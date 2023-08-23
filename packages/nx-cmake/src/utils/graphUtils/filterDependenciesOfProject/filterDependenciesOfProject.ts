import type {
    CreateDependenciesContext,
    ProjectGraphDependencyWithFile,
} from '@nx/devkit';
import type { FilteredProject } from '../../../models/types';
import { execSync } from 'child_process';
import { filterOutput } from '../filterOutput/filterOutput';
import { getDependenciesOfProject } from '../getDependenciesOfProject/getDependenciesOfProject';
import { getExternalFiles } from '../getExternalFiles/getExternalFiles';
import { trimLib } from '../../trimLib/trimLib';

const getWorkspaceIncludeDir = () => {
    return 'include';
};

export const filterDependenciesOfProject = async (
    project: FilteredProject,
    libsDir: string,
    ctx: CreateDependenciesContext,
    projects: FilteredProject[]
): Promise<ProjectGraphDependencyWithFile[]> => {
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
