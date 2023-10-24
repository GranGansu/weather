'use client';

import { useState } from 'react';

export default function Pruebas() {
  const [listado, setListado] = useState([]);
  const [text, setText] = useState('');
  return (
    <div className='flex flex-col gap-y-6 max-w-4xl mx-auto py-6 dark:bg-black dark:text-white'>
      <h1 className='text-2xl font-bold'>Prueba 1</h1>
      <div className='border p-6 dark:bg-gray-600 '>
        <h3 className='mb-2'>Agregar:</h3>
        <form
          className='flex flex-col'
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              setListado((prev) => {
                const nuArray = Array.from(prev);
                nuArray.push(e.target.value);
                setText('');
                return nuArray;
              });
            }
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setListado((prev) => {
              const nuArray = Array.from(prev);
              nuArray.push(e.target.texto.value);
              return nuArray;
            });
          }}>
          <textarea
            autoFocus='true'
            className='border p-2'
            id='texto'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}></textarea>
          <button className='p-2 bg-blue-700 text-white'>Agregar</button>
        </form>
      </div>
      <div className='border p-6 dark:bg-gray-600'>
        <h2>Listado:</h2>
        <ul className='flex flex-col'>
          {listado.map((item, i) => {
            return (
              <li
                key={item + i}
                className='hover:bg-blue-100 cursor-pointer p-2 relative w-full'
                onClick={() => {
                  setListado((prev) =>
                    prev.filter((it) => {
                      return it !== item;
                    })
                  );
                }}>
                <p className='opacity-0 px-2 flex gap-x-1 items-center bg-red-300 hover:opacity-100 z-10 absolutes'>
                  <b>Delete</b> {item}
                </p>
                <p className='z-0 relative'>{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
