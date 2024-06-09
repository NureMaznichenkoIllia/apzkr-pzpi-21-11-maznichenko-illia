import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { StationCreateModal } from '../components/Models/Station/StationCreateModal';
import { StationEditModal } from '../components/Models/Station/StationEditModal';
import { deleteStation, getStations } from '../http/stationApi';
import { IStation } from '../interfaces/IStation';

export const Stations = () => {
    const [stations, setStations] = useState<IStation[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IStation>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IStation) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getStations()
        .then((data) => {
            setStations(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteStation(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <StationCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></StationCreateModal>
  
        <StationEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></StationEditModal>
        <h1>Stations</h1>
  
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
              <th>Loc. left X</th>
              <th>Loc. left Y</th>
              <th>Loc. right X</th>
              <th>Loc. right Y</th>
              <th>Line</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id}>
                <td>{station.id}</td>
                <td>{station.name}</td>
                <td>{station.locationLeftX}</td>
                <td>{station.locationLeftY}</td>
                <td>{station.locationRightX}</td>
                <td>{station.locationRightY}</td>
                <td>{station.line?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(station)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(station.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
