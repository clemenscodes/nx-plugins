import { getStyleArgument } from './getStyleArgument';

describe('getStyleArgument', () => {
    let clangFormatFile: string;

    beforeEach(() => {
        clangFormatFile = '/path/to/.clang-format';
    });

    it('should return the correct style argument', () => {
        const result = getStyleArgument(clangFormatFile);
        expect(result).toBe(`--style=file:${clangFormatFile}`);
    });
});
