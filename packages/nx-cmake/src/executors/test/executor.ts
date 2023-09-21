import type { TestExecutorSchema } from './schema';
import type { ExecutorContext } from '@nx/devkit';
import { testBinaryWithCtest } from './utils/testBinaryWithCtest/testBinaryWithCtest';

export default async function* runExecutor(
    options: TestExecutorSchema,
    ctx: ExecutorContext
): AsyncGenerator<{ success: boolean }> {
    const { root: workspaceRoot, projectName, projectsConfigurations } = ctx;
    const { projects } = projectsConfigurations;
    const project = projects[projectName];
    const { root: projectRoot } = project;

    const success = testBinaryWithCtest(workspaceRoot, projectRoot, options);

    yield {
        success,
    };
}
