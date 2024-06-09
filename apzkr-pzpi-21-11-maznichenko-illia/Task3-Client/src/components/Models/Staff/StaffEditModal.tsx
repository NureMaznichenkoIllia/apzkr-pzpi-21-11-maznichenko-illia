import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editStaff } from '../../../http/staffApi';
import { getStations } from '../../../http/stationApi';
import { ISelect } from '../../../interfaces/ISelect';
import { IStaff } from '../../../interfaces/IStaff';
import { IStation } from '../../../interfaces/IStation';
import { IStaffCreateData } from './StaffCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IStaff,
}

export interface IStaffEditData extends IStaffCreateData {
    id: number
}

export const StaffEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IStaffEditData>();
      const [stations, setStations] = useState<IStation[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IStaffEditData) => {
        await editStaff(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

    const fetchStations = async () => {
        await getStations().then((data) => setStations(data));
      };

      useEffect(() => {
        fetchStations();
      }, []);

      const selectStations = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...stations.map((station) => {
            return {
              value: station.id.toString(),
              label: `Id: ${station.id}, Name: ${station.name}`,
            };
          }),
        ];
      }, [stations]);
          
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
                  <label className="control-label">Surname</label>
                  <Controller
                    control={control}
                    name={"surname"}
                    rules={{
                      required: "enter surname",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.surname?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Phone</label>
                  <Controller
                    control={control}
                    name={"phone"}
                    rules={{
                      required: "enter phone",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Station</label>
                <Controller
                  control={control}
                  name={"stationId"}
                  rules={{
                    required: "enter station",
                    validate: (data) => (data != 0 ? undefined : "Select station"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectStations.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.stationId?.message}</p>
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
