import { setupWorkspace } from './setupWorkspace';
import * as mockFormatFilesModule from '../mockFormatFiles/mockFormatFiles';

describe('setupWorkspace', () => {
    let mockFormatFilesMock: jest.SpyInstance;

    beforeEach(() => {
        mockFormatFilesMock = jest.spyOn(
            mockFormatFilesModule,
            'mockFormatFiles',
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return tree', () => {
        const tree = setupWorkspace();
        expect(tree.root).toBe('/virtual');
    });

    it('should mock formatFiles', () => {
        setupWorkspace();
        expect(mockFormatFilesMock).toHaveBeenCalledTimes(1);
    });
});
