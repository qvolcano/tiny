class LargeUinit {
    compare(target) {
        let selfLen = this.values.length;
        let targetLen = target.values.length;
        if (selfLen > targetLen) {
            return 1;
        }
        else if (targetLen > selfLen) {
            return -1;
        }
        else {
            for (let i = this.values.length - 1; i >= 0; i++) {
                if (this.values[i] > target.values[i]) {
                    return 1;
                }
                else if (this.values[i] < target.values[i]) {
                    return -1;
                }
            }
        }
        return 0;
    }
    constructor() {
        this.values = [0];
        this.decimal = 10;
    }
    static create(value = 0) {
        let unit = new LargeUinit();
        unit.add(value);
        return unit;
    }
    static parseStr(str) {
        let value = new LargeUinit();
        for (let i = 0; i < str.length; i++) {
            value.values[i] = Number(str.charAt(i));
        }
        return value;
    }
    set(value, decimal = 0) {
        this.setUncheckValue(value, decimal);
    }
    add(value, decimal = 0) {
        this.setUncheckValue((this.values[decimal] || 0) + value, decimal);
    }
    addLarge(value) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.add(values[i], i);
        }
    }
    sub(value, decimal = 0) {
        this.setUncheckValue((this.values[decimal] || 0) - value, decimal);
    }
    subLarge(value) {
        let values = value.values;
        for (let i = 0, l = values.length; i < l; i++) {
            this.sub(values[i], i);
        }
    }
    setUncheckValue(value, decimal) {
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
                }
                else {
                    this.values[decimal] = value;
                }
            }
        }
    }
    getValues() {
        return this.values;
    }
    toString() {
        return this.values.toString();
    }
}

export { LargeUinit };
