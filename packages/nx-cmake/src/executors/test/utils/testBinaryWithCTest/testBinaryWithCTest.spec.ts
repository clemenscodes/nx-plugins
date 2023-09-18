import type { TestExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: TestExecutorSchema;

    beforeEach(() => {
        options = {
            args: [],
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
        checkCommandExistsMock = jest.spyOn(
            checkCommandExistsModule,
            'checkCommandExists'
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should test binary with ctest and return true');
    it.todo('should error if ctest is not installed');
    it.todo('should pass arguments to ctest');
    it.todo('should return false if ctest failed');
});
