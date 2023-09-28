import type { WorkspaceLayout } from '../../models/types';

export type InitGeneratorSchema = {
    language: C;
    cmakeConfigDir: string;
    globalIncludeDir: string;
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    addClangPreset: boolean;
    skipFormat: boolean;
};
