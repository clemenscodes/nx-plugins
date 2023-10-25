import { output } from '@nx/devkit';

export type NxOutputLevel = 'note' | 'log' | 'warn' | 'success' | 'error';

type NxOutput = typeof output;
type NxOutputNoteParamters = Parameters<typeof output.note>;
type NxOutputLogParamters = Parameters<typeof output.log>;
type NxOutputWarnParamters = Parameters<typeof output.warn>;
type NxOutputSuccessParamters = Parameters<typeof output.success>;
type NxOutputErrorParamters = Parameters<typeof output.error>;
type NxOutputParameters =
    | NxOutputNoteParamters
    | NxOutputLogParamters
    | NxOutputSuccessParamters
    | NxOutputWarnParamters
    | NxOutputErrorParamters;

export const mockNxOutput = (
    level: NxOutputLevel,
): jest.SpyInstance<void, NxOutputParameters> => {
    const nxOutput = jest.spyOn<NxOutput, NxOutputLevel>(output, level);
    return nxOutput;
};
