import * as getConfigFileModule from '../../../../utils/fileUtils/getConfigFile/getConfigFile';

describe('getFormatArguments', () => {
    let getConfigFileMock: jest.SpyInstance;

    beforeEach(() => {
        getConfigFileMock = jest.spyOn(getConfigFileModule, 'getConfigFile');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should get format arguments for clang-format');
    it.todo('should add arguments at the end');
    it.todo('should error if config file does not exist');
});
