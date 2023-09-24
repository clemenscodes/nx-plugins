# nx-cmake  ![GitHub](https://img.shields.io/github/license/clemenscodes/nx-plugins) [![codecov](https://codecov.io/github/clemenscodes/nx-plugins/graph/badge.svg?token=5053DT3DIF)](https://codecov.io/github/clemenscodes/nx-plugins) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/clemenscodes/nx-plugins?filename=packages%2Fnx-cmake%2Fpackage.json)

## Motivation

This [Nx](https://nx.dev) plugin was created to provide a better developer experience when developing using C or C++. By taking away the heavy lifting when setting up CMake, generating all the necessary boilerplate and setting up dependency management and caching strategies, spinning up a new C or C++ project becomes quick and easy, as it should be.

## Features

### CMake, C and C++ Support for a Monorepo

This plugin installs some CMake utility functions alongside with a `CMakeLists.txt` file in the root of the workspace.
This sets up initial support for using `CMake` in a monorepo setup.
The workspace is then analyzed for further `CMakeLists.txt` files.
An include directory in the root of the workspace is generated which can be included in all projects.
Optionally an opinionated set of formatting and linting rules can be generated to be used by `clang-format` and `clang-tidy`.

The `nx.json` file in the root of the workspace will be automatically updated for optimal caching behaviors, target pipelines and plugin initialisation.

After initializing the plugin, the generators for creating a binary can be used.

If not configured otherwise via `nx.json`, by default binaries (applications) will be placed  in `bin` and libraries will be placed in `libs`.

Binaries are by default just basic wrappers around libraries to make testing easy.
When creating a binary, a library will be created with two binary projects, one of which is the actual binary to be used and the other one is a testing binary.

The library project will have 'lib' prepended and the test project will have 'test' prepended to the name given to the generator.

When a library was created, it can be included from any other library or binary using `#include </dirNameOfLibrary/pathInLibrary/fileNameOfLibrary.h>`.

### Project Inference

Each `CMakeLists.txt` file tells this plugin to register another project and add it to the project graph managed by the Nx daemon.
A project configuration will be automatically inferred for each `CMakeLists.txt` file and the according project type.

The generators of this plugin will also generate a `project.json` file that is the equivalent of what this has plugin inferred for the `CMakeLists.txt`.
If no changes are made to the project.json file, it can also be deleted and this plugin will keep telling Nx how to deal with these C or C++ projects.
Changes made to the project.json file will override the inferred settings for the project so it is recommended to keep these files.

### Project Graph Processing

After adding the inferred projects to the project graph, the projects will be analyzed for dependencies between each other.
Including code from another library will automatically update the project graph and add a dependency between the dependent projects.

This utilizes the caching mechanisms of the Nx daemon to only analyze sources which have been updated by changes to avoid recalculating the dependency graph, which would otherwise get slow for bigger projects.
Detecting dependencies between projects works by utilizing `gcc -MM` under the hood, which tracks the dependencies of a source file.

The plugin then further processes the graph by performing a transitive reduction, making sure the graph contains as little edges as possible, to keep the graph clean and to ensure that dependencies for a project will be resolved in the correct order.
This allows for efficient caching mechanisms and parallelization of tasks.

## Getting Started

### Prerequisites

NOTE: Windows is not natively supported. Using WSL2 and installing the dependencies should work though.

The following tools need to be installed for this plugin to work correctly:

- nx 16.9+ (this plugin uses the latest Nx v2 plugin API)
- node
- gcc
- cmake
- make
- ctest
- clang-format
- clang-tidy
- gdb

### Installation

#### Installing from a preset

```shell
npx create-nx-workspace --preset=nx-cmake
```

#### Installing in an existing workspace

```shell
pnpm add -D nx-cmake
pnpm nx g nx-cmake:init
```

```shell
yarn add -D nx-cmake
yarn nx g nx-cmake:init
```

```shell
npm install -D nx-cmake
npx nx g nx-cmake:init
```

## Generators

Use Nx Console to see the full list of options for each generator.
In general, settings in nx.json have higher precedence.

### `nx-cmake:init`

> aliases: install, i
>
> Initializes this plugin and sets up the boilerplate to support CMake, C and C++.
>
> --appsDir (Where the binaries will be generated) [string] [default: "bin"]
>
> --libsDir (Where the libraries will be generated) [string] [default: "libs"]
>
> --cmakeConfigDir (Where the configuration for CMake will be generated) [string] [default: "cmake"]
>
> --addClangPreset (Generate a clang preset) [boolean] [default: true]
>
> ```shell
> nx g nx-cmake:init [appsDir] [options,...]
> ```

### `nx-cmake:binary`

> aliases: bin, b
>
> Generate a C or C++ binary
>
> --name (The name of the binary to generate) [string]
>
> --language (Whether to use C or C++) [choices: "C", "C++"] [default: "C++"]
>
> --generateTests (Whether to generate tests using googletest for C++ or cmocka for C) [boolean] [default: true]
>
> ```shell
> nx g nx-cmake:binary [name] [options,...]
> ```

### `nx-cmake:library`

> aliases: lib, l
>
> Creates a C or C++ library that can be used in binaries or other libraries, optionally generate tests.
>
> --name (The name of the library to generate) [string]
>
> --language (Whether to use C or C++) [choices: "C", "C++"] [default: "C++"]
>
> --generateTests (Whether to generate tests using googletest for C++ or cmocka for C) [boolean] [default: true]
>
> ```shell
> nx g nx-cmake:library [name] [options,...]
> ```

### `nx-cmake:link`

> aliases: ld
>
> Link a library to another library or binary
>
> --source (The source project in which another library will be linked into) [string]
>
> --target (The target library to link into the source project) [string]
>
> --link (Whether to link statically or dynamically) [string] [choices: "shared", "static"] [default: "shared"]
>
> ```shell
> nx g nx-cmake:link [source] [options,...]
> ```

## Executors

All the executors support these additional properties:

- args (Optional arguments which will be forwarded to the underlying command) [array]

### `nx-cmake:cmake`

> Configure a C or C++ library with CMake
>
> ```shell
> nx cmake <project>
> ```

### `nx-cmake:build`

> Build a C or C++ library with Make
>
> ```shell
> nx build <project>
> ```

### `nx-cmake:fmt`

> Format a C or C++ project with clang-format
>
> --verbose (Whether to print verbose output ) default: true
>
> --editFilesInPlace (Whether to format files in place) default: true
>
> ```shell
> nx fmt <project>
> ```

### `nx-cmake:lint`

> Lint a C or C++ project with clang-tidy
>
> ```shell
> nx lint <project>
> ```

### `nx-cmake:test`

> Test a C library using CMocka or C++ library using googletest
>
> ```shell
> nx test <testproject>
> ```

### `nx-cmake:execute`

> Execute a C or C++ binary
>
> ```shell
> nx execute <binaryproject>
> ```

### `nx-cmake:debug`

> Debug a C or C++ project using gdb
>
> ```shell
> nx debug <binaryproject>
> ```

## Contributing

All contributions are welcome.

## Acknowledgements

This project was inspired by [monodon](https://github.com/cammisuli/monodon).

## Social

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/clemenscodes)](https://twitter.com/intent/follow?screen_name=clemenscodes)
