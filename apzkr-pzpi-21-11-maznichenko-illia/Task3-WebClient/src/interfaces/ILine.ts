import { IStation } from "./IStation"

export interface ILine {
    id: number,
    name: string
    stations: IStation[]
}