import { formatFiles, type Tree } from '@nx/devkit';
import type { LinkGeneratorSchema } from './schema';
import { linkLibrary } from '../../utils/linkLibrary';

export async function linkGenerator(tree: Tree, options: LinkGeneratorSchema) {
    const { library, project, link, skipFormat } = options;
    linkLibrary(tree, project, link, library);
    if (!skipFormat) {
        await formatFiles(tree);
    }
}

export default linkGenerator;
