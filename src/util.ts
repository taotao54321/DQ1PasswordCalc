export const myParseInt = (s: string): number | undefined => {
    if (!/^[+-]?\d+$/.test(s)) return undefined;

    return parseInt(s);
};
