import { ILine } from "./ILine";

export interface IStation {
    id: number,
    name: string,
    locationLeftX: number,
    locationLeftY: number,
    locationRightX: number,
    locationRightY: number,
    lineId: number,
    line: ILine,
}