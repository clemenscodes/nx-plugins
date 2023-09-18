import type { BuildExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: BuildExecutorSchema;

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

    it.todo('should build project with make and return true');
    it.todo('should error if make is not installed');
    it.todo('should pass arguments to make');
    it.todo('should return false if make failed');
});
