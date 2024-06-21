import { $authhost } from ".";
import { IStationCreateData } from "../components/Models/Station/StationCreateModal";
import { IStationEditData } from "../components/Models/Station/StationEditModal";

export const getStations = async () => {
    const { data } = await $authhost.get('api/Stations')
    return data;
}

export const createStation = async (formData: IStationCreateData) => {
    const { data } = await $authhost.post('api/Stations', formData)
    return data;
}

export const editStation = async (id: number, formData: IStationEditData) => {
    const { data } = await $authhost.put(`api/Stations/${id}`, formData)
    return data;
}

export const deleteStation = async (id: number) => {
    const { data } = await $authhost.delete(`api/Stations/${id}`)
    return data;
}
