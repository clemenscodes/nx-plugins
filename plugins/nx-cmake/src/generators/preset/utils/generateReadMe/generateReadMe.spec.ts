import type { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { generateReadMe } from './generateReadMe';
import { readFileWithTree } from '../../../../utils/generatorUtils/readFileWithTree/readFileWithTree';

describe('generateReadMe', () => {
    let tree: Tree;
    let name: string;
    let expectedReadMe: string;

    beforeEach(() => {
        tree = createTreeWithEmptyWorkspace();
        name = 'repoName';
        expectedReadMe =
            '# repoName\n' +
            '\n' +
            '## Generators\n' +
            '\n' +
            'Use Nx Console to see the full list of options for each generator.\n' +
            'In general, settings in nx.json have higher precedence.\n' +
            '\n' +
            '### `nx-cmake:init`\n' +
            '\n' +
            '> aliases: install, i\n' +
            '>\n' +
            '> Initializes this plugin and sets up the boilerplate to support CMake, C and C++.\n' +
            '>\n' +
            '> --language (Whether to use C or C++ by default for generators) [choices: "C", "C++"] [default: "C"]\n' +
            '>\n' +
            '> --cmakeConfigDir (Where the configuration for CMake will be generated) [string] [default: ".cmake"]\n' +
            '>\n' +
            '> --globalIncludeDir (Where the global include directory will be generated) [string] [default: "include"]\n' +
            '>\n' +
            '> --appsDir (Where the binaries will be generated) [string] [default: "bin"]\n' +
            '>\n' +
            '> --libsDir (Where the libraries will be generated) [string] [default: "libs"]\n' +
            '>\n' +
            '> --addClangPreset (Generate a clang preset) [boolean] [default: true]\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx g nx-cmake:init [appsDir] [options,...]\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:binary`\n' +
            '\n' +
            '> aliases: bin, b\n' +
            '>\n' +
            '> Generate a C or C++ binary\n' +
            '>\n' +
            '> --name (The name of the binary to generate) [string]\n' +
            '>\n' +
            '> --language (Whether to use C or C++) [choices: "C", "C++"] [default: "C++"]\n' +
            '>\n' +
            '> --generateTests (Whether to generate tests using googletest for C++ or cmocka for C) [boolean] [default: true]\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx g nx-cmake:binary [name] [options,...]\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:library`\n' +
            '\n' +
            '> aliases: lib, l\n' +
            '>\n' +
            '> Creates a C or C++ library that can be used in binaries or other libraries, optionally generate tests.\n' +
            '>\n' +
            '> --name (The name of the library to generate) [string]\n' +
            '>\n' +
            '> --language (Whether to use C or C++) [choices: "C", "C++"] [default: "C++"]\n' +
            '>\n' +
            '> --generateTests (Whether to generate tests using googletest for C++ or cmocka for C) [boolean] [default: true]\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx g nx-cmake:library [name] [options,...]\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:link`\n' +
            '\n' +
            '> aliases: ld\n' +
            '>\n' +
            '> Link a library to another library or binary\n' +
            '>\n' +
            '> --source (The source project in which another library will be linked into) [string]\n' +
            '>\n' +
            '> --target (The target library to link into the source project) [string]\n' +
            '>\n' +
            '> --link (Whether to link statically or dynamically) [string] [choices: "shared", "static"] [default: "shared"]\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx g nx-cmake:link [source] [options,...]\n' +
            '> ```\n' +
            '\n' +
            '## Executors\n' +
            '\n' +
            'All the executors support these additional properties:\n' +
            '\n' +
            '- args (Optional arguments which will be forwarded to the underlying command) [array]\n' +
            '\n' +
            '### `nx-cmake:cmake`\n' +
            '\n' +
            '> Configure a C or C++ library with CMake\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx cmake <project>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:build`\n' +
            '\n' +
            '> Build a C or C++ library with Make\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx build <project>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:fmt`\n' +
            '\n' +
            '> Format a C or C++ project with clang-format\n' +
            '>\n' +
            '> --verbose (Whether to print verbose output ) default: true\n' +
            '>\n' +
            '> --editFilesInPlace (Whether to format files in place) default: true\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx fmt <project>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:lint`\n' +
            '\n' +
            '> Lint a C or C++ project with clang-tidy\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx lint <project>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:test`\n' +
            '\n' +
            '> Test a C library using CMocka or C++ library using googletest\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx test <testproject>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:execute`\n' +
            '\n' +
            '> Execute a C or C++ binary\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx execute <binaryproject>\n' +
            '> ```\n' +
            '\n' +
            '### `nx-cmake:debug`\n' +
            '\n' +
            '> Debug a C or C++ project using gdb\n' +
            '>\n' +
            '> ```shell\n' +
            '> nx debug <binaryproject>\n' +
            '> ```\n';
    });

    it('should generate README.md', () => {
        generateReadMe(tree, name);
        const result = readFileWithTree(tree, `README.md`);
        expect(result).toStrictEqual(expectedReadMe);
    });
});
