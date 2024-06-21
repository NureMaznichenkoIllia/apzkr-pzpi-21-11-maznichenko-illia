import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { ScheduleCreateModal } from '../components/Models/Schedule/ScheduleCreateModal';
import { ScheduleEditModal } from '../components/Models/Schedule/ScheduleEditModal';
import { deleteSchedule, getSchedules } from '../http/scheduleApi';
import { ISchedule } from '../interfaces/ISchedule';

export const Schedules = () => {
    const [schedules, setSchedules] = useState<ISchedule[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISchedule>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISchedule) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getSchedules()
        .then((data) => {
            setSchedules(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteSchedule(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <ScheduleCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></ScheduleCreateModal>
  
        <ScheduleEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></ScheduleEditModal>
        <h1>Schedules</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Depature date/time</th>
              <th>Arrival date/time</th>
              <th>Train</th>
              <th>Platform</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.departureTime}</td>
                <td>{schedule.arrivalTime}</td>
                <td>{schedule.train?.name}</td>
                <td>{schedule.platform?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(schedule)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(schedule.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
