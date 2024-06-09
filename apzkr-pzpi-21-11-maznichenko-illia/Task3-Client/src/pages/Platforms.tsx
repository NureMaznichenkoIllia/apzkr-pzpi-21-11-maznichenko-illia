import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { PlatformCreateModal } from '../components/Models/Platform/PlatformCreateModal';
import { PlatformEditModal } from '../components/Models/Platform/PlatformEditModal';
import { deletePlatform, getPlatforms } from '../http/platformApi';
import { IPlatform } from '../interfaces/IPlatform';

export const Platforms = () => {
    const [platforms, setPlatforms] = useState<IPlatform[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IPlatform>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IPlatform) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getPlatforms()
        .then((data) => {
            setPlatforms(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deletePlatform(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <PlatformCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></PlatformCreateModal>
  
        <PlatformEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></PlatformEditModal>
        <h1>Platforms</h1>
  
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
              <th>Notes</th>
              <th>Station</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((platform) => (
              <tr key={platform.id}>
                <td>{platform.id}</td>
                <td>{platform.name}</td>
                <td>{platform.notes}</td>
                <td>{platform.station?.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(platform)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(platform.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
