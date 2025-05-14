'use client';
import { useEffect, useState } from 'react';
import TableCell from './TableCell';
import TableHeader from './TableHeader';
import { InterfaceTable } from '@/types';

export default function Table( { tasks, setDataEdit, setEditForm, setDeleteForm, setDataDelete }: InterfaceTable ) {
  const [total, setTotal] = useState(Object);

  useEffect(() => {
    const groupBy = tasks.reduce((acc, curr) => {
        const key = `${curr['task_description']}|${curr['date']}`;
       
        if (!acc[key]) {
            acc[key] = { total_hours: curr.hours_spent }
        } else {
            acc[key]['total_hours'] = acc[key]['total_hours'] + curr.hours_spent
        }
        return acc
    },{} as { [key: string]: { total_hours: number } })

    setTotal(groupBy)
    
  }, [tasks])
  
  const editHandler = (taskId: number) => {
    setEditForm(true)
    setDataEdit(tasks.filter(item => item.task_id === taskId)[0])
  }
  
  const deleteHandler = (taskId: number) => {
    setDeleteForm(true)
    setDataDelete(tasks.filter(item => item.task_id === taskId)[0])
  }

  return (
    <table className="w-max lg:w-full table-auto my-5">
        <thead className='bg-neutral-500'>
            <TableHeader />
        </thead>
        <tbody>
        {tasks.map((task) => {
            const key = `${task['task_description']}|${task['date']}`;
            const hoursSpent = task.hours_spent
            const hourlyRate = task.hourly_rate
            return total[key] && (
                <tr key={task.task_id} className='bg-neutral-800'>
                    <TableCell borderLeft>{task.employee_name}</TableCell>
                    <TableCell>{task.task_description}</TableCell>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>({hoursSpent}/{total[key]['total_hours']}) {(hoursSpent / total[key]['total_hours']).toFixed(2)}</TableCell>
                    <TableCell>x</TableCell>
                    <TableCell>({hourlyRate} x {total[key]['total_hours']}) {hourlyRate * total[key]['total_hours']}</TableCell>
                    <TableCell>+</TableCell>
                    <TableCell>{task.additional_charges}</TableCell>
                    <TableCell>{Math.floor(Number((hoursSpent / total[key]['total_hours']).toFixed(2)) * (hourlyRate * total[key]['total_hours']) + task.additional_charges)}</TableCell>
                    <TableCell>
                        <span className="material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all duration-500" onClick={() => editHandler(task.task_id)}>
                            edit
                        </span>
                        <span className="material-symbols-outlined cursor-pointer hover:text-gray-500 transition-all duration-500" onClick={() => deleteHandler(task.task_id)}>
                            delete
                        </span>
                    </TableCell>
                </tr>
            )
        })}
        </tbody>
    </table>
  );
}
