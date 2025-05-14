'use client';
import Table from "@/components/Table/Table"
import api from '@/lib/api';
import FormAdd from "@/components/Form/FormAdd";
import FormEdit from "@/components/Form/FormEdit";
import { useEffect, useState } from "react";
import { Task } from '@/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [addForm, setAddForm] = useState(false)
  const [editForm, setEditForm] = useState(false)
  const [dataEdit, setDataEdit] = useState<Task | null>(null)

  useEffect(() => {
    api.get<Task[]>('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error('Failed to fetch tasks:', err));
  }, []);

  useEffect(() => {
    console.log(dataEdit);
    
  }, [dataEdit])

  return (
    <div className="w-screen h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full flex flex-col items-center">
        <div className="w-11/12 my-auto">
          <div className="relative w-full mt-5 flex flex-wrap items-center gap-6">
            <div className="text-sm lg:text-lg w-max px-6 py-1 cursor-pointer border-2 rounded-3xl transition-all duration-200 hover:bg-gray-500" onClick={() => setAddForm(true)}>
              Input Data
            </div>
            <div>
              <input className="border-b-2 focus:outline-none text-sm lg:text-lg" type="text" name="search" placeholder="Search Employees" autoComplete="off" />
            </div>
          </div>
          <div className="overflow-x-auto mb-10">
            <Table tasks={tasks} setDataEdit={setDataEdit} setEditForm={setEditForm} />
          </div>
        </div>
        {<FormAdd addForm={addForm} setAddForm={setAddForm} />}
        {dataEdit && <FormEdit tasks={tasks} dataEdit={dataEdit} setDataEdit={setDataEdit} editForm={editForm} setEditForm={setEditForm} />}
      </main>
    </div>
  );
}
