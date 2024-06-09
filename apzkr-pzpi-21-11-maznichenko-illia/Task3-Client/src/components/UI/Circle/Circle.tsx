import React from 'react'
import { IPostition } from '../../../interfaces/IPosition'
import cl from './Circle.module.css'

interface IProps {
    position: IPostition,
    name: string,
    color?: string
}

export const Circle = ({name, position, color}: IProps) => {
  return (
    <>
      <circle cx={position.x} cy={position.y} r={6} fill={color ?? "black"} />
      <text x={position.x + 10} y={position.y + 5} fill={color ?? "black"}>{name}</text>
    </>
  )
}
