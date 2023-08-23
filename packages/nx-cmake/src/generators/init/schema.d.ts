export interface InitGeneratorSchema {
    appsDir: string;
    libsDir: string;
    cmakeConfigDir: string;
    addClangFormatPreset: boolean;
    skipFormat: boolean;
}
