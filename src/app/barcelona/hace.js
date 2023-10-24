import { useState, useEffect } from 'react';

export default function Hace({ now }) {
  const [transcurrido, setTranscurrido] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => {
      const trans = Number(now !== 0 && (new Date().getTime() - new Date(now).getTime()) / 1000);
      setTranscurrido(trans.toFixed(0) - 1);
    }, 1000);
    return () => {
      clearInterval(intervalo);
    };
  }, [now]);

  return <span className='text-gray-200'>Actualizado hace {transcurrido} segundos </span>;
}
