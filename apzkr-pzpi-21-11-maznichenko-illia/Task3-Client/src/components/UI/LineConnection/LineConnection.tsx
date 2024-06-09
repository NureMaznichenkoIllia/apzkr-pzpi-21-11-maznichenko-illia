import React from "react";
import { ILineConnection } from "../../../interfaces/ILineConnection";
import { IPostition } from "../../../interfaces/IPosition";
import cl from './LineConnection.module.css';

interface IProps {
    lineConnection: ILineConnection,
    color: string
}

export const LineConnection = ({ lineConnection, color}: IProps) => {
    return (
        <>
        <path
          className={cl.line}
          d={`M ${lineConnection.startPosition.x} ${lineConnection.startPosition.y}
        L ${lineConnection.endPosition.x} ${lineConnection.endPosition.y}`}
          version="1.1"
          stroke={color}
          xmlns="http://www.w3.org/2000/svg"
        ></path>
        </>
    );
  };