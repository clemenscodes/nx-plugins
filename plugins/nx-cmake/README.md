# nx-cmake [![CI](https://github.com/clemenscodes/nx-plugins/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/clemenscodes/nx-plugins/actions/workflows/ci.yml) ![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/clemenscodes/nx-plugins?filename=plugins%2Fnx-cmake%2Fpackage.json)

## Motivation

This [Nx](https://nx.dev) plugin was developed to enhance the developer experience when working with C or C++ projects. It streamlines the setup of CMake, automates boilerplate generation, and optimizes dependency management and caching strategies, making it quick and easy to kickstart a new C or C++ project within your Nx workspace.

## Key Features

### Comprehensive Support for CMake, C, and C++ in a Monorepo

- The plugin installs essential CMake utility functions and creates a `CMakeLists.txt` file in the root of your workspace, facilitating CMake usage within a monorepo setup.
- It scans the workspace for additional `CMakeLists.txt` files and generates a global include directory at the root, accessible to all projects.
- Optionally, you can generate opinionated formatting and linting rules for use with tools like `clang-format` and `clang-tidy`.
- Automatically updates the `nx.json` file at the root of your workspace for optimal caching behavior, target pipelines, and plugin initialization.

### Streamlined Generation of Binaries and Libraries

- After initializing the plugin, you can leverage the provided generators to create binaries.
- By default, binaries (applications) are placed in the `bin` directory, while libraries are stored in the `libs` directory.
- Binaries act as basic wrappers around libraries, simplifying testing.
- When creating a binary, two projects are generated: the primary binary and a testing binary.
- The library project receives a 'lib' prefix, and the test project is prefixed with 'test,' based on the chosen generator name.
- Libraries can be easily included in other projects using `#include </dirNameOfLibrary/pathInLibrary/fileNameOfLibrary.h>`.

### Automatic Project Inference

- Each `CMakeLists.txt` file instructs the plugin to register a new project and adds it to the project graph managed by the Nx daemon.
- Project configurations are automatically inferred for each `CMakeLists.txt` file, determining the appropriate project type.
- The plugin's generators create a `project.json` file, mirroring the inferred settings from the `CMakeLists.txt`. Changes to this file can override inferred settings, offering flexibility.

### Efficient Project Graph Processing

- Inferred projects are integrated into the project graph, enabling dependency analysis between them.
- Importing code from one library automatically updates the project graph, establishing dependencies.
- The Nx daemon's caching mechanisms optimize dependency tracking and graph calculations, particularly for larger projects.
- Dependency detection relies on `gcc -MM`, which tracks source file dependencies.
- The plugin performs a transitive reduction on the graph to minimize edges, ensuring dependencies are resolved in the correct order. This enhances caching efficiency and supports parallelization of tasks.

## Getting Started

### Prerequisites

Before getting started with this plugin, ensure you have the following tools installed:

- Nx v16.9 or higher (v2 plugin API)
- Node.js LTS (Node.js v18.18 or later) – [Download Node.js](https://nodejs.org/)
- CMake v3.21 or higher – [Download CMake](https://cmake.org/download)
- GCC (with POSIX thread model and mutex support)
- Make
- clang-format
- clang-tidy
- GDB

#### Windows

##### Installing Node.js

Node.js LTS can be downloaded [here](https://nodejs.org/)

Using chocolatey:

```powershell
choco install nodejs-lts
```

##### Installing CMake

CMake can be downloaded [here](https://cmake.org/download)

Using chocolatey:

```powershell
choco install cmake
```

**NOTE**: Make sure to add CMake to the PATH:

```powershell
Add-Content $env:PATH "C:\Program Files\CMake\bin"
```

##### Installing MSYS2 and tools

It is required to install [MSYS2](https://www.msys2.org/).

Afterwards, make sure to have the msys2 system in the PATH:

```powershell
Add-Content $env:PATH "C:\msys64"
Add-Content $env:PATH "C:\msys64\usr\bin"
Add-Content $env:PATH "C:\msys64\ucrt64\bin"
```

Using chocolatey:

```powershell
choco install msys2 
```

**NOTE**: chocolatey installs msys2 into `C:\tools\msys64` instead.

```powershell
Add-Content $env:PATH "C:\tools\msys64"
Add-Content $env:PATH "C:\tools\msys64\usr\bin"
Add-Content $env:PATH "C:\tools\msys64\ucrt64\bin"
```

Afterwards, launch a new shell and install the required tools:

```powershell
pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-make mingw-w64-ucrt-x86_64-cmake mingw-w64-ucrt-x86_64-gdb mingw-w64-ucrt-x86_64-clang mingw-w64-ucrt-x86_64-clang-tools-extra
```

### Installation

#### Installing from a preset

Using pnpm:

```shell
npx create-nx-workspace@latest <repoName> --preset=nx-cmake --pm pnpm
```

Using yarn:

```shell
npx create-nx-workspace@latest <repoName> --preset=nx-cmake --pm yarn
```

Using yarn:

```shell
npx create-nx-workspace@latest <repoName> --preset=nx-cmake --pm npm
```

#### Installing in an existing workspace

```shell
pnpm add -D nx-cmake
```

```shell
yarn add -D nx-cmake
```

```shell
npm install -D nx-cmake
```

After installing:

```shell
nx g nx-cmake:init
```

## Generators

Use Nx Console to see the full list of options for each generator. In general, settings in `nx.json` have higher precedence.

Generators provide the following options:

### `nx-cmake:init` (aliases: install, i)

#### Initialize this plugin and set up the boilerplate to support CMake, C and C++

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --language | Whether to use C or C++ by default for generators. |  "C", "C++" | "C" |
| --cmakeConfigDir | Where the configuration for CMake will be generated. | string | ".cmake" |
| --appsDir | Where the binaries will be generated. | string | "bin" |
| --libsDir | Where the libraries will be generated. | string | "libs" |
| --addClangPreset | Generate a clang preset. | boolean | true |

### `nx-cmake:binary` (aliases: bin, b)

#### Generate a C or C++ binary

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --name | The name of the binary to generate. | string | N/A |
| --language | Whether to use C or C++. |  "C", "C++" | "C++" |
| --generateTests | Whether to generate tests using googletest for C++ or cmocka for C. | boolean | true |

### `nx-cmake:library` (aliases: lib, l)

#### Generate a C or C++ library that can be used in binaries or other libraries

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --name | The name of the library to generate. | string | N/A |
| --language | Whether to use C or C++. |  "C", "C++" | "C++" |
| --generateTests | Whether to generate tests using googletest for C++ or CMocka for C. | boolean | true |

### `nx-cmake:link` (aliases: ld)

#### Link a library to another library or binary

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --source | The source project in which another library will be linked into. | string | N/A |
| --target | The target library to link into the source project. | string | N/A |
| --link | Whether to link statically or dynamically. |  "shared", "static" | "shared" |

## Executors

All the executors support these additional properties:

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --args | Optional arguments which will be forwarded to the underlying command | string[] | N/A |

### `nx-cmake:cmake`

#### Configure a C or C++ library with CMake

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Configure a C or C++ library with CMake in release mode. | boolean | false |

### `nx-cmake:compile`

#### Compile a C or C++ library with Make

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Build a C or C++ library with Make in release mode. | boolean | false |

### `nx-cmake:fmt`

#### Format a C or C++ project with clang-format

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --verbose | Whether to print verbose output when formatting a C or C++ project with clang-format. | boolean | true |
| --editFilesInPlace | Whether to format files in place. | boolean | true |

### `nx-cmake:lint`

#### Lint a C or C++ project with clang-tidy

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Wheter to lint in release mode | boolean | false |

### `nx-cmake:test`

#### Test a C library using CMocka or C++ library using googletest

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Test a C library using CMocka or a C++ library using googletest. | boolean | false |
| --outputOnFailure | Whether to print output on test failure. | boolean | true |

### `nx-cmake:execute`

#### Execute a C or C++ binary

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Execute a C or C++ binary in release mode. | boolean | false |

### `nx-cmake:debug`

#### Debug a C or C++ project using gdb

| Options | Description | Type | Default |
|---------|-------------|-----------|---------------|
| --release | Debug a C or C++ project using gdb in release mode. | boolean | false |

## Contributing

All contributions are welcome.

## Acknowledgements

This project was inspired by [monodon](https://github.com/cammisuli/monodon).

## Social

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/clemenscodes)](https://twitter.com/intent/follow?screen_name=clemenscodes)
