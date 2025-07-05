export declare class LargeUinit {
    compare(target: LargeUinit): -1 | 0 | 1;
    /**
     *
     *
     */
    private decimal;
    private values;
    constructor();
    static create(value?: number): LargeUinit;
    static parseStr(str: string): LargeUinit;
    set(value: number, decimal?: number): void;
    add(value: number, decimal?: number): void;
    addLarge(value: LargeUinit): void;
    sub(value: number, decimal?: number): void;
    subLarge(value: LargeUinit): void;
    private setUncheckValue;
    getValues(): ReadonlyArray<number>;
    toString(): string;
}
