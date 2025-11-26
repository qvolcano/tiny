declare class ValueTrigger {
    private TRIGGER_ID;
    private trigger_list;
    private valueStack;
    onTrigger?: (id: number, pass: boolean) => void;
    addTrigger(conditions: {
        key: string;
        value: number;
    }[], check: boolean): Number;
    removeTrigger(id: number): void;
    registerValue(key: string, defaultValue?: number, comparator?: (a: any, b: any) => 0 | 1): void;
    setValue(key: string, value: number): void;
    setTriggerMask(id: number, pass: boolean, index: number): void;
    checkTrigger(id: number): void;
    trigger(id: number, pass: boolean): void;
    static NumberComparator(a: number, b: number): 0 | 1;
}

export { ValueTrigger };
