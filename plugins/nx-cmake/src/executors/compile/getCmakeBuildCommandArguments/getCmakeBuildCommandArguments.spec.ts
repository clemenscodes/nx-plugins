import { CompileExecutorSchema } from '../../executor';
import { getCmakeBuildCommandArguments } from './getCmakeBuildCommandArguments';
import { join } from 'path';

describe('getCmakeBuildCommandArguments', () => {
    let workspaceRoot: string;
    let projectRoot: string;
    let options: CompileExecutorSchema;
    let expectedBuildPathArgument: string;
    let expectedConfigArgument: string;
    let expectedBuildArguments: string[];

    beforeEach(() => {
        workspaceRoot = '/root';
        projectRoot = '/projectRoot';
        options = {
            args: [],
            release: false,
        };
        expectedBuildPathArgument = join(`/root/dist/projectRoot`);
        expectedConfigArgument = `--config=Debug`;
        expectedBuildArguments = [
            '--build',
            expectedBuildPathArgument,
            expectedConfigArgument,
            ...options.args,
        ];
    });

    it('should get cmake build command arguments', () => {
        const buildArguments = getCmakeBuildCommandArguments(
            workspaceRoot,
            projectRoot,
            options,
        );
        expect(buildArguments).toStrictEqual(expectedBuildArguments);
    });
});
