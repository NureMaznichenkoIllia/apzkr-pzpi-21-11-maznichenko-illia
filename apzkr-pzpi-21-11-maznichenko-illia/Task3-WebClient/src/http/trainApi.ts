import { $authhost } from ".";
import { ITrainCreateData } from "../components/Models/Train/TrainCreateModal";
import { ITrainEditData } from "../components/Models/Train/TrainEditModal";

export const getTrains = async () => {
    const { data } = await $authhost.get('api/Trains')
    return data;
}

export const createTrain = async (formData: ITrainCreateData) => {
    const { data } = await $authhost.post('api/Trains', formData)
    return data;
}

export const editTrain = async (id: number, formData: ITrainEditData) => {
    const { data } = await $authhost.put(`api/Trains/${id}`, formData)
    return data;
}

export const deleteTrain = async (id: number) => {
    const { data } = await $authhost.delete(`api/Trains/${id}`)
    return data;
}
