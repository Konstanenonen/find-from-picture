import React from 'react';
import CorrectLocation from '../CorrectLocation/CorrectLocation';

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  waldo: Coordinates;
  odlaw: Coordinates;
  wizard: Coordinates;
}

interface CorrectLocationGroupProps {
  waldoLocation: boolean;
  wizardLocation: boolean;
  odlawLocation: boolean;
  correctLocations: CorrectLocations;
}

function CorrectLocationGroup({
  waldoLocation,
  wizardLocation,
  odlawLocation,
  correctLocations,
}: CorrectLocationGroupProps) {
  return (
    <>
      {waldoLocation && (
        <CorrectLocation
          top={correctLocations.waldo.y}
          left={correctLocations.waldo.x}
        />
      )}
      {wizardLocation && (
        <CorrectLocation
          top={correctLocations.wizard.y}
          left={correctLocations.wizard.x}
        />
      )}
      {odlawLocation && (
        <CorrectLocation
          top={correctLocations.odlaw.y}
          left={correctLocations.odlaw.x}
        />
      )}
    </>
  );
}

export default CorrectLocationGroup;
