import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editLine } from '../../../http/lineApi';
import { ILine } from '../../../interfaces/ILine';
import { ILineCreateData } from './LineCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ILine,
}

export interface ILineEditData extends ILineCreateData {
    id: number
}

export const LineEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ILineEditData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ILineEditData) => {
        await editLine(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };


    return (
        <Modal show={show} onHide={onHide}>
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
                <Button variant="secondary" onClick={onHide}>
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
