import * as devkit from '@nx/devkit';

export const mockFormatFiles = (): jest.SpyInstance<
    Promise<void>,
    [tree: devkit.Tree]
> => {
    const formatFilesMock = jest
        .spyOn(devkit, 'formatFiles')
        .mockImplementation(jest.fn());
    return formatFilesMock;
};
