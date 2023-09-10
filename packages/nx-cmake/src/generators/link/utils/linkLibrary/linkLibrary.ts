import { type Tree, updateProjectConfiguration, getProjects } from '@nx/devkit';
import { Link } from '../../../../models/types';
import { trimLib } from '../../../../utils/generatorUtils/trimLib/trimLib';

export const linkLibrary = (
    tree: Tree,
    project: string,
    link: Link,
    lib: string
) => {
    const projects = getProjects(tree);
    const config = projects.get(project);
    const name = trimLib(lib);
    const { root } = config;
    const cmake = `${root}/CMakeLists.txt`;
    const cmakeBuffer = tree.read(cmake);
    const cmakeLink = `link_${link}_library(\${CMAKE_PROJECT_NAME} ${name})\n`;
    tree.write(cmake, `${cmakeBuffer.toString()}${cmakeLink}`);
    updateProjectConfiguration(tree, project, config);
};
