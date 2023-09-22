export const getStyleArgument = (clangFormatFile: string): string => {
    const styleArgument = `--style=file:${clangFormatFile}`;
    return styleArgument;
};
