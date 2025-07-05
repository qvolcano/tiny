import { MapData } from "./MapData";

export class MapModel{
    width: number = 0;
    height: number = 0;
    datas: MapData[] =[];
    setup(width: number, height: number, datas?: MapData[]) {
        this.datas = datas || [];
        this.width = width;
        this.height = height;
        let index = 0;
        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++){
                index++;
                this.datas[index] = datas?datas[index]:new MapData();
            }
        }
    }

    getData(x: number, y: number): MapData{
        return this.datas[x + y * this.height];
    }

    setData(x: number, y: number, data: MapData) {
        this.datas[x + y * this.height] = data;
    }
}
