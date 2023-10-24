import { useState, useEffect } from 'react';

export default function Hace({ now }) {
  const [transcurrido, setTranscurrido] = useState(0);
  const [unidad, setUnidad] = useState('segundos');

  useEffect(() => {
    const intervalo = setInterval(() => {
      const trans = Number((Number(now !== 0 && (new Date().getTime() - new Date(now).getTime()) / 1000) - 1).toFixed(0));
      if (trans < 60) setUnidad('segundos');
      if (trans > 60) setUnidad('minuto/s');
      setTranscurrido(() => {
        if (trans > 60) {
          return (trans / 60).toFixed(1)[0];
        }
        return trans;
      });
    }, 1000);
    return () => {
      clearInterval(intervalo);
    };
  }, [now]);

  return (
    <span className='text-gray-200'>
      Actualizado hace {transcurrido} {unidad}{' '}
    </span>
  );
}
