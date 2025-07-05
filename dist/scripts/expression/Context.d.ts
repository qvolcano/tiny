export declare class rple {
    grammars: {
        start: (char: string) => boolean;
        match: (char: string) => boolean;
    }[];
    eval(): void;
    compile(script: string): Function;
    readTokens(script: string): any[];
}
