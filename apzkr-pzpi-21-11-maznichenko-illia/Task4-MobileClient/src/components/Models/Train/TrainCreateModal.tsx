import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createTrain } from '../../../http/trainApi';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export interface ITrainCreateData {
    name: string,
    model: string,
    capacity: number,
    currentLocationX: number,
    currentLocationY: number
}


export const TrainCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<ITrainCreateData>();
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: ITrainCreateData) => {
        await createTrain(data)
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
                 <div className="form-group">
                  <label className="control-label">Model</label>
                  <Controller
                    control={control}
                    name={"model"}
                    rules={{
                      required: "enter model",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.model?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Capacity</label>
                  <Controller
                    control={control}
                    name={"capacity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter capacity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.capacity?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Current location X</label>
                  <Controller
                    control={control}
                    name={"currentLocationX"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter location",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.currentLocationX?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Current location Y</label>
                  <Controller
                    control={control}
                    name={"currentLocationY"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter location",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.currentLocationY?.message}</p>
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
