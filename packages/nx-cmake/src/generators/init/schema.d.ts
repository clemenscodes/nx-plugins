import type { WorkspaceLayout } from '../../models/types';

export interface InitGeneratorSchema {
    appsDir: WorkspaceLayout['appsDir'];
    libsDir: WorkspaceLayout['libsDir'];
    projectNameAndRootFormat: WorkspaceLayout['projectNameAndRootFormat'];
    cmakeConfigDir: string;
    addClangPreset: boolean;
    skipFormat: boolean;
}
