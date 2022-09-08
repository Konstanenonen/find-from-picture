import React from 'react';
import CorrectLocation from '../CorrectLocation/CorrectLocation';

interface Coordinates {
  x: number;
  y: number;
}

interface CorrectLocations {
  firstCharacter: Coordinates;
  secondCharacter: Coordinates;
  thirdCharacter: Coordinates;
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
          top={correctLocations.firstCharacter.y}
          left={correctLocations.firstCharacter.x}
        />
      )}
      {odlawLocation && (
        <CorrectLocation
          top={correctLocations.secondCharacter.y}
          left={correctLocations.secondCharacter.x}
        />
      )}
      {wizardLocation && (
        <CorrectLocation
          top={correctLocations.thirdCharacter.y}
          left={correctLocations.thirdCharacter.x}
        />
      )}
    </>
  );
}

export default CorrectLocationGroup;
