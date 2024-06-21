import { IPlatform } from "./IPlatform";
import { ITrain } from "./ITrain";

export interface ISchedule {
    id: number,
    platform: IPlatform,
    platformId: number,
    train: ITrain,
    trainId: number,
    departureTime: string,
    arrivalTime: string,
}