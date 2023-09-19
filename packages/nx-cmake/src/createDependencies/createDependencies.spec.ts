import type { ProjectGraphDependencyWithFile } from '@nx/devkit';
import type { FilteredProject } from '../models/types';
import * as filterProjectsModule from '../utils/graphUtils/filterProjects/filterProjects';
import * as getDependenciesModule from '../utils/graphUtils/getDependencies/getDependencies';
import * as reduceDependenciesTransitivelyModule from '../utils/graphUtils/reduceDependenciesTransitively/reduceDependenciesTransitively';

describe('createDependencies', () => {
    let mockFilterProjects: jest.SpyInstance;
    let mockGetDependencies: jest.SpyInstance;
    let mockReduceDependenciesTransitively: jest.SpyInstance;
    let filteredProjectsReturnMock: FilteredProject[];
    let getDependenciesReturnMock: ProjectGraphDependencyWithFile[];
    let reducedDependenciesMock: ProjectGraphDependencyWithFile[];

    beforeEach(() => {
        mockFilterProjects = jest.spyOn(filterProjectsModule, 'filterProjects');
        mockGetDependencies = jest.spyOn(
            getDependenciesModule,
            'getDependencies'
        );
        mockReduceDependenciesTransitively = jest.spyOn(
            reduceDependenciesTransitivelyModule,
            'reduceDependenciesTransitively'
        );
        filteredProjectsReturnMock = [];
        getDependenciesReturnMock = [];
        reducedDependenciesMock = [];
        mockFilterProjects.mockReturnValue(filteredProjectsReturnMock);
        mockGetDependencies.mockReturnValue(getDependenciesReturnMock);
        mockReduceDependenciesTransitively.mockReturnValue(
            reducedDependenciesMock
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.todo('should return dependencies based on the provided context');
});
