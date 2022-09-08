import React, { ReactNode } from 'react';

interface PlaygroundProps {
  children: ReactNode;
}

function Playground({ children }: PlaygroundProps) {
  return <div>{children}</div>;
}

export default Playground;
