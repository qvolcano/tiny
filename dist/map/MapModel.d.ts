import { MapData } from "./MapData";
export declare class MapModel {
    width: number;
    height: number;
    datas: MapData[];
    setup(width: number, height: number, datas?: MapData[]): void;
    getData(x: number, y: number): MapData;
    setData(x: number, y: number, data: MapData): void;
}
