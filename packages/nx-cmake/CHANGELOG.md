# Changelog (nx-cmake)

## [0.2.4](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.2.3...nx-cmake-0.2.4) (2023-09-24)


### Bug Fixes

* **nx-cmake:** bump devkit version in plugin package.json ([d235683](https://github.com/clemenscodes/nx-plugins/commit/d235683f58de96c2bd202f15a4f3d641d3d972ab))
* **nx-cmake:** inferring projectName from filePath ([e3952fb](https://github.com/clemenscodes/nx-plugins/commit/e3952fb1a6fec2e302542767f86ecf596db3f278))

## [0.2.3](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.2.2...nx-cmake-0.2.3) (2023-09-22)


### Bug Fixes

* **nx-cmake:** binary links include all the library includes ([2714c30](https://github.com/clemenscodes/nx-plugins/commit/2714c30d666a52b60fb587aaed6bae5bb7c82da4))
* **nx-cmake:** format and lint have inputs, config files trigger cache invalidation now ([0fa4aed](https://github.com/clemenscodes/nx-plugins/commit/0fa4aedf8bd894ea945706424e34ab0dfe4a892f))

## [0.2.2](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.2.1...nx-cmake-0.2.2) (2023-09-22)


### Bug Fixes

* **nx-cmake:** include directories can be resolved from project root, include or src ([0bd8440](https://github.com/clemenscodes/nx-plugins/commit/0bd8440e62fa4b8b2153441ccf19f08e5382baf8))
* **nx-cmake:** test binaries are now generated in appsDir ([c010c10](https://github.com/clemenscodes/nx-plugins/commit/c010c10541c6dcbae54e7fa46a96f53291f09c9c))

## [0.2.1](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.2.0...nx-cmake-0.2.1) (2023-09-22)


### Bug Fixes

* **nx-cmake:** bug which caused e2e to fail randomly ([70a675e](https://github.com/clemenscodes/nx-plugins/commit/70a675e0940b8393951718acf5c3677f53ff3551))
* **nx-cmake:** check for windows and error if windows detected ([db4561f](https://github.com/clemenscodes/nx-plugins/commit/db4561f33dfdf9f0a634a0ad483190470861a43e))
* **nx-cmake:** consider cached dependencies when calculating project graph ([5265ed4](https://github.com/clemenscodes/nx-plugins/commit/5265ed41d0ee4507932545e54909fbd8710c9a34))
* **nx-cmake:** reduceGraph algo ([5b70f16](https://github.com/clemenscodes/nx-plugins/commit/5b70f16d135010a74edb7bac989ea9e7c146eacc))
* **nx-cmake:** reducing project graph allows caching cmake target now ([564a833](https://github.com/clemenscodes/nx-plugins/commit/564a8339c3f6fd337852d0943d80a4cd15a419be))

## [0.2.0](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.1.2...nx-cmake-0.2.0) (2023-09-17)


### Features

* **nx-cmake:** generate proper README.md for each project type ([1137fe3](https://github.com/clemenscodes/nx-plugins/commit/1137fe3efe3a07f6ee0a672295b5e191f960f662))
* **nx-cmake:** implement nx version check and preset generator ([b7fe0d7](https://github.com/clemenscodes/nx-plugins/commit/b7fe0d75fc9860a771b7b0a2642bfc4b48770d39))


### Bug Fixes

* **nx-cmake:** missing check if project is null when processing graph ([4776852](https://github.com/clemenscodes/nx-plugins/commit/477685207295b0befc8395367387b4d237f06a16))
* **nx-cmake:** process project files for graph properly ([f535a03](https://github.com/clemenscodes/nx-plugins/commit/f535a0339d9bf4ba5f463e73776d6ddc41ec5a0a))
* **nx-cmake:** processed project graph now gets transitively reduced ([319d7a5](https://github.com/clemenscodes/nx-plugins/commit/319d7a56881409002e99eb2fe709c8fed70206fb))

## [0.1.2](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.1.1...nx-cmake-0.1.2) (2023-09-15)


### Bug Fixes

* **nx-cmake:** check if clang-format exists in format executor, check for format file ([eda0a72](https://github.com/clemenscodes/nx-plugins/commit/eda0a7270dab1d4d99cb6979589bf8790b3412da))
* **nx-cmake:** dependency execution order ([d657c40](https://github.com/clemenscodes/nx-plugins/commit/d657c40f5e0283e3a0b3a0c58b9fe31e9d4196fd))
* **nx-cmake:** format executor formats projects files ([7069621](https://github.com/clemenscodes/nx-plugins/commit/706962139f60d47af3b054b1a0920eb13172f275))
* **nx-cmake:** linter runs on generated projects ([07a96b2](https://github.com/clemenscodes/nx-plugins/commit/07a96b23f821a6cb04b5a02ca87040d4a4eb2342))

## [0.1.1](https://github.com/clemenscodes/nx-plugins/compare/nx-cmake-0.1.0...nx-cmake-0.1.1) (2023-09-13)


### Bug Fixes

* **nx-cmake:** determine project types correctly to check if project can be linked ([1561237](https://github.com/clemenscodes/nx-plugins/commit/156123719dba3bb2b6c50d3a0ef0339c9fb68d87))

## 0.1.0 (2023-09-10)


### Features

* add nx-cmake-e2e ([833f4d8](https://github.com/clemenscodes/nx-plugins/commit/833f4d844cf5b28ff296e26eecd934ac38110e70))
* **nx-cmake:** download gtest and cmocka only once ([57aa141](https://github.com/clemenscodes/nx-plugins/commit/57aa14171d77be79ff1659840256c24998b22d6e))
* **nx-cmake:** generate basic tests in c and cpp ([0aca08c](https://github.com/clemenscodes/nx-plugins/commit/0aca08c65465c6ff45814dd6376480fd2a993551))


### Bug Fixes

* fix createNodes bug where test projects were not named correctly ([8adebda](https://github.com/clemenscodes/nx-plugins/commit/8adebdabbc27e8ff513d5e9337f2ffd4d7e776a3))
* **nx-cmake:** dont cache cmake step, will break builds ([85d244b](https://github.com/clemenscodes/nx-plugins/commit/85d244b9bf0885cab0a9aa2e3ee34c6496bdde46))
* **nx-cmake:** global include path does not contain test headers ([49d871c](https://github.com/clemenscodes/nx-plugins/commit/49d871cffbe4f9c6c661f8de55a6c85aa0fe1823))
* **nx-cmake:** including test frameworks and graph gen works ([2d64430](https://github.com/clemenscodes/nx-plugins/commit/2d64430d47940431aa86c1f30a1e6f5f23cb01cc))
* **nx-cmake:** link against test frameworks properly ([a1f7b94](https://github.com/clemenscodes/nx-plugins/commit/a1f7b94bf05d20ac96cb19510b1f6b5b9c18061c))
* **nx-cmake:** linting should now pass ([6919a4d](https://github.com/clemenscodes/nx-plugins/commit/6919a4d718153f28abbc2cb353ddb3cb366612f6))
* **nx-cmake:** proper check if project type is null, fix workspaceLayout ([b43f1c1](https://github.com/clemenscodes/nx-plugins/commit/b43f1c116a486828fc8f742550898ea977905fbe))
* **nx-cmake:** update include paths for test frameworks ([cd14e92](https://github.com/clemenscodes/nx-plugins/commit/cd14e922393a1b3b5a461fe4cec92b98d83cddbf))
* **nx-plugins:** fix ts error ([c17aa45](https://github.com/clemenscodes/nx-plugins/commit/c17aa4512169381f7b70936233ae8e6043c216d7))
* remove lint warnings ([9010721](https://github.com/clemenscodes/nx-plugins/commit/9010721a116a0348d31d8c1ae0b3bc6a7bbe259b))
