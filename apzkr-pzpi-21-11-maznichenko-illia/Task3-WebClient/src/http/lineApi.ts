import { $authhost } from ".";
import { ILineCreateData } from "../components/Models/Line/LineCreateModal";
import { ILineEditData } from "../components/Models/Line/LineEditModal";

export const getLines = async () => {
    const { data } = await $authhost.get('api/Lines')
    return data;
}

export const createLine = async (formData: ILineCreateData) => {
    const { data } = await $authhost.post('api/Lines', formData)
    return data;
}

export const editLine = async (id: number, formData: ILineEditData) => {
    const { data } = await $authhost.put(`api/Lines/${id}`, formData)
    return data;
}

export const deleteLine = async (id: number) => {
    const { data } = await $authhost.delete(`api/Lines/${id}`)
    return data;
}
