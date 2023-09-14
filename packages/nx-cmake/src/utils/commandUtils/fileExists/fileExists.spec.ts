import { fileExists } from './fileExists';

describe('fileExists', () => {
    it('should return true if the file exists', async () => {
        const file = __filename;
        const exists = await fileExists(file);
        expect(exists).toBe(true);
    });

    it('should return false if the file does not exist', async () => {
        const filePath = 'path/to/your/nonexistent/file.txt';
        const exists = await fileExists(filePath);
        expect(exists).toBe(false);
    });
});
