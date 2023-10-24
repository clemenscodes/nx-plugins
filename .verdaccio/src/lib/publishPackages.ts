import { runCommand } from '@/command';
import { project } from './project';

export const publishPackages = () => {
    runCommand(`nx`, `run-many -t publish --exclude ${project}`);
};
