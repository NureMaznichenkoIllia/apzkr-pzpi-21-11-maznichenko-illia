import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { LineCreateModal } from '../components/Models/Line/LineCreateModal';
import { LineEditModal } from '../components/Models/Line/LineEditModal';
import { deleteLine, getLines } from '../http/lineApi';
import { ILine } from '../interfaces/ILine';

export const Lines = () => {
    const [lines, setLines] = useState<ILine[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ILine>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ILine) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getLines()
        .then((data) => {
            setLines(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteLine(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <LineCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></LineCreateModal>
  
        <LineEditModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></LineEditModal>
        <h1>Lines</h1>
  
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.id}>
                <td>{line.id}</td>
                <td>{line.name}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(line)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(line.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
