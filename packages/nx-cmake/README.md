# nx-cmake

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/clemenscodes/nx-plugins?filename=packages%2Fnx-cmake%2Fpackage.json)

An [Nx](https://nx.dev) plugin that adds support for CMake, C and C++ in an Nx monorepo.

## Getting Started

### Prerequisites

NOTE: Windows is not natively supported. Using WSL2 and installing the dependencies should work though.

The following tools need to be installed for this plugin to work correctly:

- node
- gcc
- cmake
- make
- clang-format (optional for formatting)
- clang-tidy (optional for linting)
- gdb (optional for debugging)

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

### `nx-cmake:init`

> Initializes this plugin and sets up the boilerplate to support CMake, C and C++.
>
> ```shell
> nx g nx-cmake:init
> ```

### `nx-cmake:binary`

> Create a new binary.
>
> ```shell
> nx g nx-cmake:binary
> ```

### `nx-cmake:library`

> Creates a C or C++ library that can be used in binaries or other libraries, optionally generate tests.
>
> ```shell
> nx g nx-cmake:library
> ```

### `nx-cmake:link`

> Links a C or C++ library into another project.
>
> ```shell
> nx g nx-cmake:link
> ```

## Executors

All the executors support these additional properties:

- args (Optional arguments which will be forwarded) [array]
- release [boolean]

### `nx-cmake:build`

Build a C or C++ library with Make

### `nx-cmake:cmake`

Build a C or C++ library with CMake

### `nx-cmake:execute`

Execute a C or C++ binary

### `nx-cmake:test`

Test a C library using CMocka or C++ library using googletest

### `nx-cmake:format`

Lint a C or C++ project with clang-format

### `nx-cmake:lint`

Lint a C or C++ project with clang-tidy

### `nx-cmake:debug`

Debug a C or C++ project using gdb
