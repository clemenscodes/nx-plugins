import { getIncludeDirectoriesFlag } from './getIncludeDirectoriesFlag';
import * as fileModule from '@/file';
import * as utilsModule from '@/util';

describe('getIncludeDirectoriesFlag', () => {
    let getIncludeDirectoriesMock: jest.SpyInstance;
    let mockIncludeDirectories: string[];

    beforeEach(() => {
        mockIncludeDirectories = ['/some/path/include', '/some/path/include2'];
        getIncludeDirectoriesMock = jest
            .spyOn(fileModule, 'getIncludeDirectories')
            .mockReturnValue(mockIncludeDirectories);
        jest.spyOn(utilsModule, 'isWindows').mockReturnValue(false);
        jest.spyOn(utilsModule, 'isDarwin').mockReturnValue(false);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an empty string if no include directories are found', () => {
        getIncludeDirectoriesMock.mockReturnValue([]);
        const result = getIncludeDirectoriesFlag('/some/path');
        expect(result).toEqual('');
    });

    it('should return the correct include directories flag', () => {
        const result = getIncludeDirectoriesFlag('/some/path');
        expect(result).toEqual('-I /some/path/include -I /some/path/include2');
    });

    it('should format include directories flag with correct delimiter', () => {
        const result = getIncludeDirectoriesFlag('/some/path');
        expect(result.includes(' ')).toBe(true);
    });
});
