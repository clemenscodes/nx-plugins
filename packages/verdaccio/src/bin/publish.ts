import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { readCachedProjectGraph } from '@nx/devkit';

function invariant(condition: boolean, message: string) {
    if (!condition) {
        console.error(message);
        process.exit(1);
    }
}

const registry = 'http://localhost:4873';

// Executing publish script: node path/to/publish.mjs {name} --version {version} --tag {tag}
// Default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, version, tag = 'next'] = process.argv;

// A simple SemVer validation to validate the version
const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/;
invariant(
    !!version && validVersion.test(version),
    `No version provided or version did not match Semantic Versioning, expected: #.#.#-tag.# or #.#.#, got ${version}.`,
);

const graph = readCachedProjectGraph();
const project = graph.nodes[name];

invariant(
    !!project,
    `Could not find project "${name}" in the workspace. Is the project.json configured correctly?`,
);

const outputPath = project.data?.targets?.['build']?.options?.outputPath;
invariant(
    outputPath,
    `Could not find "build.options.outputPath" of project "${name}". Is project.json configured  correctly?`,
);

process.chdir(outputPath);

try {
    const json = JSON.parse(readFileSync(`package.json`).toString());
    json.version = version;
    writeFileSync(`package.json`, JSON.stringify(json, null, 2));
} catch (e) {
    console.error(`Error reading package.json file from library build output.`);
}

execSync(`npm config set //localhost:4873/:_authToken "secretVerdaccioToken"`, {
    encoding: 'utf-8',
    stdio: 'inherit',
    env: {
        ...process.env,
        npm_config_registry: registry,
    },
});

// Execute "npm publish" to publish
execSync(`npm publish --access public --tag ${tag} --registry ${registry}`, {
    encoding: 'utf-8',
    stdio: 'inherit',
    env: {
        ...process.env,
        npm_config_registry: registry,
    },
});
