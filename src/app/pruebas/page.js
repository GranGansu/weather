'use client';

import { useState } from 'react';

export default function Pruebas() {
  const [listado, setListado] = useState([]);
  return (
    <div className='flex flex-col gap-y-6 max-w-4xl mx-auto py-6'>
      <h1>Prueba 1</h1>
      <div className='border p-6 '>
        <h3>Agregar:</h3>
        <form
          className='flex flex-col'
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              console.log(e);

              setListado((prev) => {
                const nuArray = Array.from(prev);
                nuArray.push(e.target.value);
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
          <textarea className='border p-2' id='texto'></textarea>
          <button className='p-2 bg-blue-700 text-white'>Agregar</button>
        </form>
      </div>
      <div className='border p-6'>
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
                <p className='opacity-0 px-2 flex gap-x-1 items-center bg-red-300 hover:opacity-100 z-10 absolute w-full h-full left-0 top-0'>
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
