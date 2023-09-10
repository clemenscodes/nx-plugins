import { NxJsonConfiguration } from '@nx/devkit';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { getNxJsonConfiguration } from './getNxJsonConfiguration';

jest.mock('@nx/devkit', () => {
    const tempDir = mkdtempSync(join(tmpdir(), 'test-nx-json-'));
    const customNxJsonFilePath = join(tempDir, 'nx.json');
    const customNxJson: NxJsonConfiguration = {
        extends: 'nx/presets/npm.json',
    };
    writeFileSync(customNxJsonFilePath, JSON.stringify(customNxJson));
    const originalModule = jest.requireActual('@nx/devkit');
    return {
        ...originalModule,
        workspaceRoot: tempDir,
    };
});

describe('getNxJsonConfiguration', () => {
    afterAll(() => {
        jest.unmock('@nx/devkit');
    });

    it('should read the custom nx.json file', () => {
        const result = getNxJsonConfiguration();
        const customNxJson = { extends: 'nx/presets/npm.json' };
        expect(result).toEqual(customNxJson);
    });
});
