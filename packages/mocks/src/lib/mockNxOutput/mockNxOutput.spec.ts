import { NxOutputLevel, mockNxOutput } from './mockNxOutput';
import { output } from '@nx/devkit';

const testMockNxOutput = (nxOutputLevel: { [key in NxOutputLevel]: true }) => {
    const levels = Object.keys(nxOutputLevel) as NxOutputLevel[];
    for (const level of levels) {
        it(`should mock nx ${level} output`, () => {
            jest.spyOn(output, level).mockImplementation(jest.fn());
            const nxOutputMock = mockNxOutput(level);
            expect(nxOutputMock).toHaveBeenCalledTimes(0);
            output[level]({ title: 'Mock call' });
            expect(nxOutputMock).toHaveBeenCalledTimes(1);
        });
    }
};

describe('mockNxOutput', () => {
    testMockNxOutput({
        error: true,
        log: true,
        note: true,
        success: true,
        warn: true,
    });
});
