import type { DebugExecutorSchema } from '../../schema';
import * as runCommandModule from '../../../../utils/commandUtils/runCommand/runCommand';
import * as checkCommandExistsModule from '../../../../utils/commandUtils/checkCommandExists/checkCommandExists';

describe('buildProjectWithMake', () => {
    let runCommandMock: jest.SpyInstance;
    let checkCommandExistsMock: jest.SpyInstance;
    let options: DebugExecutorSchema;

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

    it.todo('should debug binary with gdb and return true');
    it.todo('should error if gdb is not installed');
    it.todo('should pass arguments to gdb');
    it.todo('should return false if gdb failed');
});
