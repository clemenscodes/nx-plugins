import { type Tree } from '@nx/devkit';
import type { LinkSchema } from '../../schema';

export const linkLibrary = (tree: Tree, options: LinkSchema) => {
    const { target, link, targetProjectRoot } = options;
    const cmake = `${targetProjectRoot}/CMakeLists.txt`;
    const cmakeBuffer = tree.read(cmake);
    const cmakeLink = `link_${link}_library(\${CMAKE_PROJECT_NAME} ${target})\n`;
    tree.write(cmake, `${cmakeBuffer.toString()}${cmakeLink}`);
};
