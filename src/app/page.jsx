import TaskCard from '@/components/TaskCard';
import { prisma } from '@/libs/prisma'

async function loadTasks() {
  //Obteniendo datos con peticiones

  /* const res = await fetch('http://localhost:3000/api/tasks')
  const data = await res.json()
  console.log('esto es',data); */

  //obteniendo datos de la BD
  const taks = await prisma.task.findMany()
  return taks

  /* Tambien puede ser
  return await prisma.task.findMany()
  
   */

}

async function HomePage() {
  const tasks = await loadTasks();

  return (
    <section className='container mx-auto'>
      <div className='grid grid-cols-3 gap-3 mt-10'>

        {tasks.map((task) => (
         <TaskCard task={task}  key={task.id}/>
        ))}

      </div>
    </section>
  )
}


export default HomePage

