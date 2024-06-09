import { $authhost } from ".";
import { IPlatformCreateData } from "../components/Models/Platform/PlatformCreateModal";
import { IPlatformEditData } from "../components/Models/Platform/PlatformEditModal";

export const getPlatforms = async () => {
    const { data } = await $authhost.get('api/Platforms')
    return data;
}

export const createPlatform = async (formData: IPlatformCreateData) => {
    const { data } = await $authhost.post('api/Platforms', formData)
    return data;
}

export const editPlatform = async (id: number, formData: IPlatformEditData) => {
    const { data } = await $authhost.put(`api/Platforms/${id}`, formData)
    return data;
}

export const deletePlatform = async (id: number) => {
    const { data } = await $authhost.delete(`api/Platforms/${id}`)
    return data;
}
