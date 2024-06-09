import { $authhost } from ".";
import { IStaffCreateData } from "../components/Models/Staff/StaffCreateModal";
import { IStaffEditData } from "../components/Models/Staff/StaffEditModal";

export const getStaffs = async () => {
    const { data } = await $authhost.get('api/Staffs')
    return data;
}

export const createStaff = async (formData: IStaffCreateData) => {
    const { data } = await $authhost.post('api/Staffs', formData)
    return data;
}

export const editStaff = async (id: number, formData: IStaffEditData) => {
    const { data } = await $authhost.put(`api/Staffs/${id}`, formData)
    return data;
}

export const deleteStaff = async (id: number) => {
    const { data } = await $authhost.delete(`api/Staffs/${id}`)
    return data;
}
