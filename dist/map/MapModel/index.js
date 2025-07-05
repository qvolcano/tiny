import { MapData } from '../MapData/index.js';

class MapModel {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.datas = [];
    }
    setup(width, height, datas) {
        this.datas = datas || [];
        this.width = width;
        this.height = height;
        let index = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                index++;
                this.datas[index] = datas ? datas[index] : new MapData();
            }
        }
    }
    getData(x, y) {
        return this.datas[x + y * this.height];
    }
    setData(x, y, data) {
        this.datas[x + y * this.height] = data;
    }
}

export { MapModel };
