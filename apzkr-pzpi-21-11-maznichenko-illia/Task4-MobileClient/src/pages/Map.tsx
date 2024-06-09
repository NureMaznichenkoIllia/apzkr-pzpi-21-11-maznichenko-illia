import React, { useEffect, useState, useMemo } from 'react'
import { Circle } from '../components/UI/Circle/Circle';
import { LineConnection } from '../components/UI/LineConnection/LineConnection';
import { getLines } from '../http/lineApi'
import { getTrains } from '../http/trainApi';
import { ILine } from '../interfaces/ILine';
import { ILineConnection } from '../interfaces/ILineConnection';
import { IPostition } from '../interfaces/IPosition';
import { ITrain } from '../interfaces/ITrain';
import cl from '../styles/Map.module.css';

interface IDot {
    position: IPostition,
    name: string
}

interface ILineDraw {
    lineName: string,
    dots: IDot[]
}

const colors = ["red", "blue", "black", 'pink', "yellow"]

export const Map = () => {
    const [lines, setLines] = useState<ILine[]>([]);
    const [trains, setTrains] = useState<ITrain[]>([]);

    const fetchLines = async () => {
        await getLines().then((data) => {
            setLines(data);
        })
    }

    const fetchTrains = async () => {
        await getTrains().then((data) =>{
            setTrains(data);
        })
    }

    useEffect(() => {
        fetchTrains();
        const interval = setInterval(() => {
            fetchTrains();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchLines();
    }, [])

    const normalizeLines = useMemo<ILineDraw[]>(() => {
        return lines.map((line) => {
            return {
                lineName: line.name,
                dots: line.stations.map((station) => ({
                    name: station.name,
                    position: {
                        x: (station.locationLeftX + station.locationRightX) / 2,
                        y: (station.locationLeftY + station.locationRightY) / 2,
                    }
                }))
            };
        });
    }, [lines]);

return (
    <div className={cl.container}>
      <div className={cl.map}>
        {normalizeLines.length > 0 && (
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={cl.svg}>
            {normalizeLines.map((line, lineIndex) => 
              line.dots.map((dot, index) =>
                  <>
                  {
                    index < line.dots.length - 1 &&
                    <LineConnection
                        color={colors[lineIndex]}
                        key={`${lineIndex}-${index}`}
                        lineConnection={{
                        startPosition: dot.position,
                        endPosition: line.dots[index + 1].position
                        }}
                    />
                  }
                    <Circle position={dot.position} name={dot.name}></Circle>
                  </>
              )
            )}
             {trains.map((train) => 
                <Circle position={{x: train.currentLocationX, y: train.currentLocationY}} name={train.id.toString()} color="green"></Circle>
            )}
          </svg>
        )}
      </div>
    </div>
  );
}
