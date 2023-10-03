/* eslint-disable */
export default {
    displayName: 'e2e-create-nx-cmake',
    preset: '../../jest.preset.js',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            { tsconfig: '<rootDir>/tsconfig.spec.json' },
        ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/e2e/e2e-create-nx-cmake',
    globalSetup: '../../tools/scripts/start-local-registry.ts',
    globalTeardown: '../../tools/scripts/stop-local-registry.ts',
};
