import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editPlatform } from '../../../http/platformApi';
import { getStations } from '../../../http/stationApi';
import { IPlatform } from '../../../interfaces/IPlatform';
import { ISelect } from '../../../interfaces/ISelect';
import { IStation } from '../../../interfaces/IStation';
import { IPlatformCreateData } from './PlatformCreateModal';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IPlatform,
}

export interface IPlatformEditData extends IPlatformCreateData {
    id: number
}

export const PlatformEditModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IPlatformEditData>();
      const [stations, setStations] = useState<IStation[]>([]);
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IPlatformEditData) => {
        await editPlatform(data.id, data)
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
                  <label className="control-label">Notes</label>
                  <Controller
                    control={control}
                    name={"notes"}
                    rules={{
                      required: "enter notes",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.notes?.message}</p>
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
