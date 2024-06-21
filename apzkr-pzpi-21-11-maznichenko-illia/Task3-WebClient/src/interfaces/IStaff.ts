import { IStation } from "./IStation";

export interface IStaff {
    id: number,
    name: string,
    surname: string,
    phone: string,
    stationId: number,
    station: IStation,
}