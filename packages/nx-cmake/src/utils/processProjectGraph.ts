// import {
//     type ProjectGraph,
//     type ProjectGraphProcessorContext,
//     ProjectGraphBuilder,
// } from '@nx/devkit';
// import type { ProjectGraphProcessor } from '../models/types';
// import { addDependeniesToProjectGraph } from './addDependenciesToProjectGraph';
// import { filterProjects } from './filterProjects';
// import { getDependencies } from './getDependencies';

// export const processProjectGraph: ProjectGraphProcessor = async (
//     graph: ProjectGraph,
//     ctx: ProjectGraphProcessorContext
// ) => {
//     const { nodes } = graph;
//     const { fileMap, nxJsonConfiguration } = ctx;
//     const { workspaceLayout } = nxJsonConfiguration;
//     const { libsDir } = workspaceLayout;
//     const projects = filterProjects(nodes);
//     const deps = await getDependencies(libsDir, ctx, projects);
//     const builder = new ProjectGraphBuilder(graph, fileMap);
//     const updatedGraph = addDependeniesToProjectGraph(builder, deps);
//     return updatedGraph;
// };
