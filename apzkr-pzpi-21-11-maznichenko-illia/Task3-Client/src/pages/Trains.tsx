import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { TrainCreateModal } from '../components/Models/Train/TrainCreateModal';
import { TrainEditModal } from '../components/Models/Train/TrainEditModal';
import { deleteTrain, getTrains } from '../http/trainApi';
import { ITrain } from '../interfaces/ITrain';

export const Trains = () => {
    const [trains, setTrains] = useState<ITrain[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ITrain>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ITrain) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getTrains()
        .then((data) => {
            setTrains(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteTrain(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <TrainCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></TrainCreateModal>
  
        <TrainEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></TrainEditModal>
        <h1>Trains</h1>
  
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
              <th>Model</th>
              <th>Capacity</th>
              <th>Current loc. X</th>
              <th>Current loc. Y</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.id}>
                <td>{train.id}</td>
                <td>{train.name}</td>
                <td>{train.model}</td>
                <td>{train.capacity}</td>
                <td>{train.currentLocationX}</td>
                <td>{train.currentLocationY}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(train)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(train.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
