import { mockNxOutput } from '@/mocks';
import { logger } from './logger';

describe('logger', () => {
    let outputLogMock: jest.SpyInstance;

    beforeEach(() => {
        outputLogMock = mockNxOutput('log').mockImplementationOnce(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should not log if NX_VERBOSE_LOGGING is false', () => {
        process.env['NX_VERBOSE_LOGGING'] = 'false';
        logger('message');
        expect(outputLogMock).toHaveBeenCalledTimes(0);
    });

    it('should log if NX_VERBOSE_LOGGING is true', () => {
        process.env['NX_VERBOSE_LOGGING'] = 'true';
        logger('message');
        expect(outputLogMock).toHaveBeenCalledTimes(1);
        expect(outputLogMock).toHaveBeenCalledWith({
            bodyLines: [],
            title: 'message',
        });
    });
});
