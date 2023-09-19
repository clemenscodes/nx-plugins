# nx-cmake

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/clemenscodes/nx-plugins?filename=packages%2Fnx-cmake%2Fpackage.json)

An [Nx](https://nx.dev) plugin that adds support for CMake, C and C++ in an Nx monorepo.

## Getting Started

### Prerequisites

NOTE: Windows is not natively supported. Using WSL2 and installing the dependencies should work though.

The following tools need to be installed for this plugin to work correctly:

- nx 16.7+ (this plugin uses the latest Nx v2 plugin API)
- node
- gcc
- cmake
- make
- ctest
- clang-format
- clang-tidy
- gdb

### Installation

```shell
pnpm add -D nx-cmake
pnpm nx g nx-cmake:init
```

```shell
bun install -D nx-cmake
bun run nx g nx-cmake:init
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
> --projectNameAndRootFormat (Whether to derive the project location or take it as provided) [string] [choices: "as-provided", "derived"] [default: "derived"]
>
> --cmakeConfigDir (Where the configuration for CMake will be generated) [string] [default: "cmake"]
>
> --addClangPreset (Generate a clang preset) [boolean] [default: true]
>
> --skipFormat (Skip formatting files) [boolean]
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
> --skipFormat (Skip formatting files) [boolean]
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
> --skipFormat (Skip formatting files) [boolean]
>
> ```shell
> nx g nx-cmake:library
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
> --link (Whether to link statically or dynamically)[string] [choices: "shared", "static"] [default: "shared"]
>
> --skipFormat (Skip formatting files) [boolean]
>
> ```shell
> nx g nx-cmake:link
> ```

## Executors

All the executors support these additional properties:

- args (Optional arguments which will be forwarded to the underlying command) [array]

### `nx-cmake:build`

> Build a C or C++ library with Make
>
> ```shell
> nx build <target>
> ```

### `nx-cmake:cmake`

> Build a C or C++ library with CMake
>
> ```shell
> nx cmake <target>
> ```

### `nx-cmake:fmt`

> Format a C or C++ project with clang-format
>
> --verbose (Whether to print verbose output ) default: true
>
> --editFilesInPlace (Whether to format files in place) default: true
>
> ```shell
> nx fmt <target>
> ```

### `nx-cmake:lint`

> Lint a C or C++ project with clang-tidy
>
> ```shell
> nx lint <target>
> ```

### `nx-cmake:execute`

> Execute a C or C++ binary
>
> ```shell
> nx execute <binarytarget>
> ```

### `nx-cmake:test`

> Test a C library using CMocka or C++ library using googletest
>
> ```shell
> nx test <testtarget>
> ```

### `nx-cmake:debug`

> Debug a C or C++ project using gdb
>
> ```shell
> nx debug <binarytarget>
> ```
