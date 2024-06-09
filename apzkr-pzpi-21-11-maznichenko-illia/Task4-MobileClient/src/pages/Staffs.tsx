import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { StaffCreateModal } from '../components/Models/Staff/StaffCreateModal';
import { StaffEditModal } from '../components/Models/Staff/StaffEditModal';
import { deleteStaff, getStaffs } from '../http/staffApi';
import { IStaff } from '../interfaces/IStaff';

export const Staffs = () => {
    const [staffs, setStaffs] = useState<IStaff[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IStaff>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IStaff) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getStaffs()
        .then((data) => {
            setStaffs(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteStaff(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <StaffCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></StaffCreateModal>
  
        <StaffEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></StaffEditModal>
        <h1>Staff</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Station</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.surname}</td>
                <td>{staff.phone}</td>
                <td>{staff.station?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(staff)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(staff.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
