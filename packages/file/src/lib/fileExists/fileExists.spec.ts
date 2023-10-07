import { fileExists } from './fileExists';

describe('fileExists', () => {
    it('should return true if the file exists', () => {
        const file = __filename;
        const exists = fileExists(file);
        expect(exists).toBe(true);
    });

    it('should return false if the file does not exist', () => {
        const filePath = 'path/to/your/nonexistent/file.txt';
        const exists = fileExists(filePath);
        expect(exists).toBe(false);
    });
});
