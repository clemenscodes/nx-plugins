import * as fileExistsModule from '../fileExists/fileExists';

describe('getConfigFile', () => {
    let fileExistsMock: jest.SpyInstance;

    beforeEach(() => {
        fileExistsMock = jest.spyOn(fileExistsModule, 'fileExists');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should return config file from project if it exists');
    it.todo(
        'should return config file from root if in project it does not exist'
    );
    it.todo('should error if config does not exist');
});
