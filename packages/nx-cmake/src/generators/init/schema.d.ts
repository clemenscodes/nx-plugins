import type { WorkspaceLayout } from '../../models/types';

export type InitGeneratorSchema = {
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    cmakeConfigDir: string;
    addClangPreset: boolean;
};
