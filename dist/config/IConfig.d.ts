type IConfig = {
    _size(): number;
    _find(): any;
    _findAll(): any;
} & {
    [key: string]: any;
};
