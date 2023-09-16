import * as filterProjectsModule from '../utils/graphUtils/filterProjects/filterProjects';
import * as getDependenciesModule from '../utils/graphUtils/getDependencies/getDependencies';

describe('createDependencies', () => {
    it('should return dependencies based on the provided context', () => {
        const mockFilterProjects = jest.spyOn(
            filterProjectsModule,
            'filterProjects'
        );

        const mockGetDependencies = jest.spyOn(
            getDependenciesModule,
            'getDependencies'
        );

        const filteredProjectsReturnMock = [];
        const getDependenciesReturnMock = [];

        mockFilterProjects.mockReturnValue(filteredProjectsReturnMock);
        mockGetDependencies.mockReturnValue(getDependenciesReturnMock);

        mockFilterProjects.mockRestore();
        mockGetDependencies.mockRestore();
    });
});
