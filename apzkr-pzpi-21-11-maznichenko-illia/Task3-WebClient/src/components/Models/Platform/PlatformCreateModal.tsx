import React, { useEffect, useMemo, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createPlatform } from '../../../http/platformApi';
import { getStations } from '../../../http/stationApi';
import { ISelect } from '../../../interfaces/ISelect';
import { IStation } from '../../../interfaces/IStation';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export interface IPlatformCreateData {
    name: string,
    notes: string,
    stationId: number,
}

export const PlatformCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IPlatformCreateData>();
      const [stations, setStations] = useState<IStation[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IPlatformCreateData) => {
        await createPlatform(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
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
