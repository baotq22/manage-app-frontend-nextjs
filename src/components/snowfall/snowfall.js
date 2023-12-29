import React from 'react';
import Snowflake from '../snowflake/Snowflake';

const Snowfall = ({ numberOfSnowflakes }) => {
  const snowflakes = Array.from({ length: numberOfSnowflakes }, (_, index) => (
    <Snowflake key={index} />
  ));

  return <div className="fixed pointer-events-none w-full h-full" style={{top: '0', left: '0'}}>{snowflakes}</div>;
};

export default Snowfall;
