import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getLines } from '../../../http/lineApi';
import { editStation } from '../../../http/stationApi';
import { ILine } from '../../../interfaces/ILine';
import { ISelect } from '../../../interfaces/ISelect';
import { IStation } from '../../../interfaces/IStation';
import { IStationCreateData } from './StationCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IStation,
}

export interface IStationEditData extends IStationCreateData {
    id: number
}

export const StationEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IStationEditData>();
      const [lines, setLines] = useState<ILine[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IStationEditData) => {
        await editStation(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

    const fetchLines = async () => {
        await getLines().then((data) => setLines(data));
      };

      useEffect(() => {
        fetchLines();
      }, []);

      const selectLines = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...lines.map((line) => {
            return {
              value: line.id.toString(),
              label: `Id: ${line.id}, Name: ${line.name}`,
            };
          }),
        ];
      }, [lines]);
          
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
                <div className="form-group">
                  <label className="control-label">Location left X</label>
                  <Controller
                    control={control}
                    name={"locationLeftX"}
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
                  <p style={{ color: "red" }}>{errors.locationLeftX?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Location left Y</label>
                  <Controller
                    control={control}
                    name={"locationLeftY"}
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
                  <p style={{ color: "red" }}>{errors.locationLeftY?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Location right X</label>
                  <Controller
                    control={control}
                    name={"locationRightX"}
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
                  <p style={{ color: "red" }}>{errors.locationRightX?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Location right Y</label>
                  <Controller
                    control={control}
                    name={"locationRightY"}
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
                  <p style={{ color: "red" }}>{errors.locationRightY?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Lines</label>
                <Controller
                  control={control}
                  name={"lineId"}
                  rules={{
                    required: "enter line",
                    validate: (data) => (data != 0 ? undefined : "Select line"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectLines.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.lineId?.message}</p>
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
