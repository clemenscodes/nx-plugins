import { ExecutorContext } from '@nx/devkit';
import { DebugExecutorSchema } from './schema';
import { runCommand } from '../../utils/runCommand/runCommand';
import { trimLib } from '../../utils/trimLib/trimLib';

export default async function* runExecutor(
    options: DebugExecutorSchema,
    ctx: ExecutorContext
) {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;
    const name = trimLib(projectName);
    const bin = `${workspaceRoot}/dist/${root}/${name}`;

    const { success } = await runCommand('gdb', bin, ...args);

    yield {
        success,
    };
}
