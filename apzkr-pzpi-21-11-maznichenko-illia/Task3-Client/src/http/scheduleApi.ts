import { $authhost } from ".";
import { IScheduleCreateData } from "../components/Models/Schedule/ScheduleCreateModal";
import { IScheduleEditData } from "../components/Models/Schedule/ScheduleEditModal";

export const getSchedules = async () => {
    const { data } = await $authhost.get('api/Schedules')
    return data;
}

export const createSchedule = async (formData: IScheduleCreateData) => {
    const { data } = await $authhost.post('api/Schedules', formData)
    return data;
}

export const editSchedule = async (id: number, formData: IScheduleEditData) => {
    const { data } = await $authhost.put(`api/Schedules/${id}`, formData)
    return data;
}

export const deleteSchedule = async (id: number) => {
    const { data } = await $authhost.delete(`api/Schedules/${id}`)
    return data;
}
