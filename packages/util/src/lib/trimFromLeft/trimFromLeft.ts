export const trimFromLeft = (s: string, trim: string) =>
    s.replace(new RegExp(`^${trim}`), '');
