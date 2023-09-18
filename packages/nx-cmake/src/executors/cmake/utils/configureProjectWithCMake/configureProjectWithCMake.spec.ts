import type { CmakeExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: CmakeExecutorSchema;

    beforeEach(() => {
        options = {
            args: [],
            release: false,
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

    it.todo('should configure project with cmake and return true');
    it.todo('should error if cmake is not installed');
    it.todo('should pass arguments to cmake');
    it.todo('should return false if cmake failed');
});
