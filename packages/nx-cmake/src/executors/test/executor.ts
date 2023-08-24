import { TestExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { runCommand } from '../../utils/runCommand/runCommand';

export default async function* runExecutor(
    options: TestExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const { root } = projects[projectName];
    const { args } = options;

    let result = runCommand('nx', 'cmake', projectName, '--configuration=test');

    if (!result.success) {
        yield {
            success: false,
        };
    }

    result = runCommand('nx', 'build', projectName, '--configuration=test');

    if (!result.success) {
        yield {
            success: false,
        };
    }

    const testBin = `${workspaceRoot}/dist/${root}`;
    const { success } = runCommand('ctest', '--test-dir', testBin, ...args);

    yield {
        success,
    };
}
