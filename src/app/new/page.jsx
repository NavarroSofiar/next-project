"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

function NewPage({ params }) {
  //console.log(params);
  const router = useRouter()
  const [title, setTitle] = useState(" "); //para guardar los valores del input
  const [description, setDescription] = useState(" ");

  useEffect(() => {
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title)
          setDescription(data.description)

        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, []);



  const onSubmit = async (e) => {
    e.preventDefault()
    //const title = e.target.title.value
    //const description = e.target.description.value
    //console.log(title, description);

    if (params.id) {
      // console.log('updating');
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      console.log(data);
    } else {
      const res = await fetch('api/tasks', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
    }
    router.refresh() //para que refresque la página
    router.push('/')
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2"
        onSubmit={onSubmit}
      >

        <label htmlFor="title" className="font-bold text-sm">Título de la tarea</label>
        <input type="text"
          id="title"
          className="border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Título"
          onChange={(e) => setTitle(e.target.value)}
          value={title} />

        <label htmlFor="description" className="font-bold text-sm">Descripción de la tarea</label>
        <textarea rows="3" id="description" className="border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Contenido"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="flex justify-between">

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>

          {//type="button" debe ir si o si para que no envíe el formulario a diferencia de crear
            params.id && (
              <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded" type="button" 
              onClick={async () =>{ 
              const res = await  fetch(`/api/tasks/${params.id}`, {
                  method: 'DELETE',
                })
                const data = await res.json()
                
                router.refresh()
                router.push('/')
              }}>
                Delete
              </button>
            )}
        </div>
      </form>
    </div>
  )
}

export default NewPage
