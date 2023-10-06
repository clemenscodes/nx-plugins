export const snakeCaseToCamelCase = (input: string): string => {
    return input
        .replace(/^_/, '')
        .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
