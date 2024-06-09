import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getPlatforms } from '../../../http/platformApi';
import { editSchedule } from '../../../http/scheduleApi';
import { getTrains } from '../../../http/trainApi';
import { IPlatform } from '../../../interfaces/IPlatform';
import { ISchedule } from '../../../interfaces/ISchedule';
import { ISelect } from '../../../interfaces/ISelect';
import { ITrain } from '../../../interfaces/ITrain';
import { IScheduleCreateData } from './ScheduleCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISchedule,
}

export interface IScheduleEditData extends IScheduleCreateData {
    id: number
}

export const ScheduleEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IScheduleEditData>();
      const [trains, setTrains] = useState<ITrain[]>([]);
      const [platforms, setPlatforms] = useState<IPlatform[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IScheduleEditData) => {
        await editSchedule(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };


    const fetchTrains = async () => {
        await getTrains().then((data) => setTrains(data));
      };

      const fetchPlatforms = async () => {
        await getPlatforms().then((data) => setPlatforms(data));
      };

      useEffect(() => {
        fetchTrains();
        fetchPlatforms();
      }, []);

      const selectTrains = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...trains.map((train) => {
            return {
              value: train.id.toString(),
              label: `Id: ${train.id}, Name: ${train.name}`,
            };
          }),
        ];
      }, [trains]);

      const selectPlatforms = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...platforms.map((platform) => {
            return {
              value: platform.id.toString(),
              label: `Id: ${platform.id}, Name: ${platform.name}`,
            };
          }),
        ];
      }, [platforms]);
          
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
                  <label className="control-label">Departure date time</label>
                  <Controller
                    control={control}
                    name={"departureTime"}
                    rules={{
                      required: "enter dateTime",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.departureTime?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Arrival date time</label>
                  <Controller
                    control={control}
                    name={"arrivalTime"}
                    rules={{
                      required: "enter dateTime",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.arrivalTime?.message}</p>
                </div>
              <div className="form-group">
                <label className="control-label">Train</label>
                <Controller
                  control={control}
                  name={"trainId"}
                  rules={{
                    required: "enter train",
                    validate: (data) => (data != 0 ? undefined : "Select train"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectTrains.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.trainId?.message}</p>
              </div>
              <div className="form-group">
                <label className="control-label">Platform</label>
                <Controller
                  control={control}
                  name={"platformId"}
                  rules={{
                    required: "enter platform",
                    validate: (data) => (data != 0 ? undefined : "Select platform"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectPlatforms.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.platformId?.message}</p>
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
