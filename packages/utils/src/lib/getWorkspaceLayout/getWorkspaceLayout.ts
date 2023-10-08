import type { WorkspaceLayout } from '@/config';
import { workspaceLayout } from '@nx/devkit';
import { getNxJsonConfiguration } from '../getNxJsonConfiguration/getNxJsonConfiguration';

export const getWorkspaceLayout = (): WorkspaceLayout => {
    const nxJson = getNxJsonConfiguration();
    const layout = nxJson['workspaceLayout'];
    const defaultLayout = workspaceLayout();
    if (!layout) {
        return {
            ...defaultLayout,
        };
    }
    if (!layout.appsDir) {
        layout.appsDir = defaultLayout.appsDir;
    }
    if (!layout.libsDir) {
        layout.libsDir = defaultLayout.libsDir;
    }
    return {
        appsDir: layout.appsDir,
        libsDir: layout.libsDir,
    };
};
