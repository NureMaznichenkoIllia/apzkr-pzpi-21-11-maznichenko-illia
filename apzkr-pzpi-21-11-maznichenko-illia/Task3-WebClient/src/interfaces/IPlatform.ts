import { IStation } from "./IStation";

export interface IPlatform {
    id: number,
    name: string,
    notes: string,
    stationId: number,
    station: IStation,
}