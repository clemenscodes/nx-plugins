import type { ExecuteExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let options: ExecuteExecutorSchema;

    beforeEach(() => {
        options = {
            args: [],
        };

        runCommandMock = jest.spyOn(runCommandModule, 'runCommand');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should execute binary and return true');
    it.todo('should pass arguments to binary');
    it.todo('should return false if binary does not exist');
});
