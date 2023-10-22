export const normalizeLineEndings = (input: string): string => {
    return input.replace(/\r/g, '');
};
