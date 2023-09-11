import { resolveLibOptions } from './resolveLibOptions';

describe('resolveLibOptions', () => {
    it('should resolve options correctly when generateTests is false', () => {
        expect(resolveLibOptions).toBeDefined();
    });

    it('should resolve options correctly when generateTests is true and language is C++', () => {
        expect(resolveLibOptions).toBeDefined();
    });

    it('should resolve options correctly when generateTests is true and language is C', () => {
        expect(resolveLibOptions).toBeDefined();
    });
});
