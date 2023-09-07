import type { FilteredProject } from '../../../models/types';

// export const GOOGLETEST_DEPS = 'gtest/_deps/googletest-src/googletest';
// export const GOOGLETEST_PROJECT = 'libgtest';

// export const CMOCKA_DEPS = 'cmocka/_deps/cmocka-src';
// export const CMOCKA_PROJECT = 'libcmocka';

export const getProjectRootOfFile = (file: string) => {
    if (file.includes('/include/')) {
        const [projectRoot] = file.split('/include');
        return projectRoot;
    }
    if (file.includes('/src/')) {
        const [projectRoot] = file.split('/src');
        return projectRoot;
    }
};

export const getProjectFromFile = (
    file: string,
    projects: FilteredProject[]
) => {
    // if (file.includes(GOOGLETEST_DEPS)) {
    //     return GOOGLETEST_PROJECT;
    // }
    // if (file.includes(CMOCKA_DEPS)) {
    //     return CMOCKA_PROJECT;
    // }
    const fileProjectRoot = getProjectRootOfFile(file);
    const project = projects
        .filter((project) => {
            const { root } = project;
            const includesRoot = fileProjectRoot === root;
            return includesRoot;
        })
        .map((project) => {
            const { name } = project;
            return name;
        })
        .pop();
    return project;
};
