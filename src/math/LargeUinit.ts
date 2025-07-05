export class LargeUinit {
    compare(target: LargeUinit): -1 | 0 | 1 {
        let selfLen=this.values.length;
        let targetLen=target.values.length;
        if(selfLen>targetLen){
            return 1;
        }else if(targetLen>selfLen){
            return -1;
        }else{
            for(let i=this.values.length-1;i>=0;i++){
                if(this.values[i]>target.values[i]){
                    return 1;
                }else if(this.values[i]<target.values[i]){
                    return -1;
                }
            }
        }
        return 0;
    }
    /**
     * 
     * 
     */
    private decimal: number;
    private values: number[] = [0];
    constructor() {
        this.decimal = 10;
    }

    static create(value: number = 0) {
        let unit = new LargeUinit();
        unit.add(value);
        return unit;
    }

    static parseStr(str:string){
        let value=new LargeUinit();
        for(let i=0;i<str.length;i++){
            value.values[i]=Number(str.charAt(i));
        }
        return value;
    }

    public set(value: number, decimal: number = 0) {
        this.setUncheckValue(value, decimal);
    }

    public add(value: number, decimal: number = 0) {
        this.setUncheckValue((this.values[decimal] || 0) + value, decimal);
    }

    public addLarge(value: LargeUinit) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.add(values[i], i)
        }
    }

    public sub(value: number, decimal: number = 0) {
        this.setUncheckValue((this.values[decimal] || 0) - value, decimal);
    }

    public subLarge(value: LargeUinit) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.sub(values[i], i)
        }
    }

    private setUncheckValue(value: number, decimal: number) {
        let decimalValue = this.decimal;
        if (value > 0) {
            if (this.values.length <= decimal) {
                for (let i = this.values.length; i < decimal; i++) {
                    this.values[i] = 0;
                }
            }
            if (decimalValue) {
                if (value >= decimalValue) {
                    let up_value = value / decimalValue >> 0;
                    let cur_value = value % decimalValue;
                    this.values[decimal] = cur_value;
                    this.add(up_value, decimal + 1);
                } else {
                    this.values[decimal] = value;
                }
            }
        } else {

        }
    }

    public getValues(): ReadonlyArray<number> {
        return this.values;
    }

    public toString(): string {
        return this.values.toString();
    }
}