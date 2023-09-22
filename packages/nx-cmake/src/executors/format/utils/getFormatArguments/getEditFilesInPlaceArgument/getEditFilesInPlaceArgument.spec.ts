import { getEditFileInPlaceArgument } from './getEditFilesInPlaceArgument';

describe('getEditFileInPlaceArgument', () => {
    let editFilesInPlace: boolean;

    beforeEach(() => {
        editFilesInPlace = true;
    });

    it('should return ["-i"] when editFilesInPlace is true', () => {
        const result = getEditFileInPlaceArgument(editFilesInPlace);
        expect(result).toEqual(['-i']);
    });
    it('should return an empty array when editFilesInPlace is false', () => {
        editFilesInPlace = false;
        const result = getEditFileInPlaceArgument(editFilesInPlace);
        expect(result).toEqual([]);
    });
});
