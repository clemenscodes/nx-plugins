import { workspaceLayout } from '@nx/devkit';
import type { WorkspaceLayout } from '../../models/types';
import { getNxJsonConfiguration } from '../getNxJsonConfiguration/getNxJsonConfiguration';

export const getWorkspaceLayout = (): WorkspaceLayout => {
    const nxJson = getNxJsonConfiguration();
    const layout = nxJson['workspaceLayout'];
    const defaultLayout = workspaceLayout();
    if (!layout) {
        return {
            ...defaultLayout,
            projectNameAndRootFormat: 'as-provided',
        };
    }
    if (!layout.appsDir) {
        layout.appsDir = defaultLayout.appsDir;
    }
    if (!layout.libsDir) {
        layout.libsDir = defaultLayout.libsDir;
    }
    if (!layout.projectNameAndRootFormat) {
        layout.projectNameAndRootFormat = 'as-provided';
    }
    return layout;
};
