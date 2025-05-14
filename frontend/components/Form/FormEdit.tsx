'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ButtonSubmit } from '@/ui/Button';
import { CreatableSelect, InputDate, InputNumber, InputText } from '@/ui/Input';
import { OptionType, Task, InterfaceFormAdd, InterfaceFormEdit } from '@/types';
import 'react-datepicker/dist/react-datepicker.css';

import api from '@/lib/api';

const FormEdit = ({ dataEdit, setDataEdit, editForm, setEditForm }: InterfaceFormEdit) => {
    const [employee, setEmployee] = useState(`${dataEdit.employee_name}`);
    const [selectedOption, setSelectedOption] = useState<OptionType | null>({ value: `${dataEdit.task_description}|${dataEdit.date}`, label: dataEdit.task_description });
    const [date, setDate] = useState(`${dataEdit.date}`);
    const [hoursSpent, setHoursSpent] = useState(`${dataEdit.hours_spent}`);
    const [hourlyRate, setHourlyRate] = useState(`${dataEdit.hourly_rate}`);
    const [additionalCharges, setAdditionalCharges] = useState(`${dataEdit.additional_charges}`);

    const [options, setOptions] = useState<OptionType[]>([]);
    const router = useRouter();

    useEffect(() => {
        api.get<Task[]>('/tasks')
        .then(res => {
            res.data.forEach(item => {
                setOptions(prev => {
                    const curr_value = `${item.task_description}|${item.date}`
                    if (prev.filter(fill => fill.value === curr_value).length === 0) {
                        return [...prev, {
                            value: `${item.task_description}|${item.date}`,
                            label: item.task_description
                        }]
                    } else {
                        return [...prev]
                    }
                })
            })
        })
        .catch(err => console.error('Failed to fetch tasks:', err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formatDate = (date: string) => {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
            const day = String(d.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        };

        api.patch<Task[]>(`/tasks/${dataEdit.task_id}`, { 
            employee_name: employee,
            task_description: selectedOption?.label,
            date: formatDate(date),
            hours_spent: hoursSpent,
            hourly_rate: hourlyRate,
            additional_charges: additionalCharges,
        })
        .then(res => {
            if (res.status === 200) {
                setDataEdit(null)
                window.location.href = '/';
            }
        })
        .catch(err => console.log(err))
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setDataEdit(null)
            setEditForm(false)
        }
    };

    return (
        <div className={`fixed left-0 top-0 w-screen h-screen flex justify-center items-center min-h-screen overflow-auto bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-all ${editForm ? 'opacity-100 duration-1000' : 'opacity-0 duration-300 pointer-events-none'}`} onClick={handleCloseModal}>
            <form className="flex flex-col w-1/2 my-auto z-10" onSubmit={handleSubmit}>
                <InputText required name='employee' value={employee} onChange={setEmployee} />
                <div className='mt-5'>
                    <CreatableSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options} value={selectedOption} />
                </div>
                <InputDate onChange={setDate} selected={new Date(date)} />
                <InputNumber required onChange={setHoursSpent} name='hours_spent' value={hoursSpent} />
                <InputNumber required onChange={setHourlyRate} name='hourly_rate' value={hourlyRate} />
                <InputNumber onChange={setAdditionalCharges} name='additional_charges' value={additionalCharges} />
                <ButtonSubmit>Submit</ButtonSubmit>
            </form>
        </div>
    )
}

export default FormEdit;