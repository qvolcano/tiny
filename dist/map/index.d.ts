declare class MapData {
    x: number;
    y: number;
    z: number;
    data: any;
}

declare class MapModel {
    width: number;
    height: number;
    datas: MapData[];
    setup(width: number, height: number, datas?: MapData[]): void;
    getData(x: number, y: number): MapData;
    setData(x: number, y: number, data: MapData): void;
}

export { MapData, MapModel };
