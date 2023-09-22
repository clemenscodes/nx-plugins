import type { WorkspaceLayout } from '../../models/types';

export type InitGeneratorSchema = {
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    projectNameAndRootFormat: WorkspaceLayout['projectNameAndRootFormat'];
    cmakeConfigDir: string;
    addClangPreset: boolean;
    skipFormat: boolean;
};
