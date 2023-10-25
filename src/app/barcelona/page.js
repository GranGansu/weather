'use client';
import { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import Image from 'next/image';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import RefreshIcon from '@mui/icons-material/Refresh';
import Hace from './hace';

const indices = [
  {
    0: 'bajo',
    1: 'bajo',
    2: 'bajo',
    3: 'bajo',
    4: 'intermedio',
    5: 'intermedio',
    6: 'intermedio',
    7: 'alto',
    8: 'alto',
    9: 'alto',
    10: 'alto',
  },
];
dayjs().format();
export default function Barcelona() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUpdate((prev) => !prev);
    }, 600000);
    setLoading(true);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=41.390205&longitude=2.154007&hourly=temperature_2m,precipitation_probability,uv_index&forecast_days=2')
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
        setNow(dayjs().format());
        setData(data);
        const now = new Date();
        now.setSeconds(0);
        now.setMinutes(0);
        data.hourly.time.find((time, i) => {
          return new Date(time).toString() === now.toString() && setIndex(i);
        });
      });
    return () => {
      clearTimeout(timeout);
    };
  }, [update]);

  return (
    <div className='sm:p-4 flex flex-col gap-y-6'>
      {!data && (
        <div id='loading' className='w-full text-[80px] absolute h-full bg-red-100 left-0 top-0 z-50 flex items-center justify-center'>
          <FlashOnIcon fontSize='inherit' />
        </div>
      )}
      <div className='bg-gray-900 text-white sm:rounded  shadow w-full max-w-2xl mx-auto relative'>
        <div className='relative p-6'>
          <div className='w-full h-full from-gray-900 to-transparent bg-gradient-to-t absolute left-0 top-0 z-10'></div>
          <Image className='absolute left-0 top-0 w-full h-full object-cover rounded z-0 opacity-70' alt='barcelona' width='400' height='300' src='/bcn2.jpg'></Image>
          <div className='z-40 relative'>
            <button
              className='rounded-full p-1 border-gray-100 bg-white/10 border mr-1 mb-2 hover:bg-violet-600/60'
              onClick={() => {
                setUpdate((prev) => !prev);
              }}>
              <RefreshIcon />
            </button>
            <Hace now={now} />

            <h1 className='text-4xl font-bold mb-4'>Barcelona</h1>
          </div>
        </div>

        {data !== null && (
          <div className='p-6 pb-9'>
            <div className='grid grid-cols-2 gap-x-6'>
              <div className='border-b pb-4'>
                <span className='text-blue-400'>Ahora</span>
                <p className={`${loading && 'blur'} text-5xl`}>
                  <span id='now'>{data.hourly.temperature_2m[index]}</span>° <span className='text-sm text-gray-400 hidden'>{data.hourly.temperature_2m[index + 1]}</span>
                </p>
              </div>
              <div className='text-gray-400  pb-2 hover:text-white cursor-pointer'>
                <span className='text-gray-500'>
                  {dayjs(data.hourly.time[index + 1])
                    .format('HH:00')
                    .toString()}
                  hs
                </span>
                <p className={`${loading && 'blur'} text-4xl`}>
                  {data.hourly.temperature_2m[index + 1]}° <span className='text-sm text-gray-400 hidden'>{data.hourly.temperature_2m[index + 1]}</span>
                </p>
              </div>
            </div>
            <hr className='border-t my-4 border-transparent'></hr>
            <div className='font-bold  p-2 px-4 border border-gray-600 rounded grid grid-cols-3 items-center'>
              <div className='col-span-2'>
                UV <span className='capitalize text-gray-400 font-normal'>{indices[0][Math.round(data.hourly.uv_index[index])]}</span>
              </div>
              <div className='flex justify-end text-2xl'> {data.hourly.uv_index[index]} </div>
            </div>
            <div className='font-bold mt-2 p-2 px-4 border border-gray-600 rounded grid grid-cols-3 items-center'>
              <div className='col-span-2'>
                Rain prob. <span className='capitalize text-gray-400 font-normal'>{indices[0][Math.round(data.hourly.uv_index[index])]}</span>
              </div>
              <div className='flex justify-end text-2xl'> {data.hourly.precipitation_probability[index]}% </div>
            </div>
          </div>
        )}
      </div>
      <div className='mb-4 w-full max-w-2xl gap-y-2 px-6 select-none'>
        <h2 className='mb-2 text-white'>{dayjs().format('dddd D')}</h2>
        <div className='flex gap-2 flex-wrap'>
          {data &&
            data.hourly.temperature_2m.map((temp, i) => {
              return (
                i - 1 > new Date().getHours() &&
                i < 24 && (
                  <button key={i} className='p-2 select-none hover:scale-105 rounded bg-gray-600 text-white flex flex-col justify-center gap-y-2 items-center'>
                    <p className='text-gray-400'>{i}:00</p> <p className='text-2xl'>{temp.toFixed(1)}°</p>
                  </button>
                )
              );
            })}
        </div>
        <h2 className='mt-7 mb-2 text-white'>{dayjs().add(1, 'day').format('dddd D')}</h2>
        <div className='flex gap-2 flex-wrap'>
          {data &&
            data.hourly.temperature_2m.map((temp, i) => {
              return (
                i > 23 && (
                  <button key={i} className='p-2 select-none hover:scale-105 rounded bg-gray-600 text-white flex flex-col justify-center gap-y-2 items-center'>
                    <p className='text-gray-400'>{dayjs(data.hourly.time[i]).format('HH:mm')}</p> <p className='text-2xl'>{temp.toFixed(1)}°</p>
                  </button>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}
