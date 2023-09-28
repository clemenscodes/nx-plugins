# <%= name %>

## Generators

Use Nx Console to see the full list of options for each generator.
In general, settings in nx.json have higher precedence.

### `nx-cmake:init`

> aliases: install, i
>
> Initializes this plugin and sets up the boilerplate to support CMake, C and C++.
>
> --language (Whether to use C or C++ by default for generators) [choices: "C", "C++"] [default: "C"]
>
> --cmakeConfigDir (Where the configuration for CMake will be generated) [string] [default: ".cmake"]
>
> --globalIncludeDir (Where the global include directory will be generated) [string] [default: "include"]
>
> --appsDir (Where the binaries will be generated) [string] [default: "bin"]
>
> --libsDir (Where the libraries will be generated) [string] [default: "libs"]
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
