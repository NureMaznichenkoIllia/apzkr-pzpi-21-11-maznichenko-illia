import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { createLine } from '../../../http/lineApi';
import {Modal, Button} from 'react-bootstrap';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export interface ILineCreateData {
    name: string
}

export const LineCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ILineCreateData>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ILineCreateData) => {
        await createLine(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };
          
      return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
                 <div className="form-group">
                  <label className="control-label">Name</label>
                  <Controller
                    control={control}
                    name={"name"}
                    rules={{
                      required: "enter name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )
}
