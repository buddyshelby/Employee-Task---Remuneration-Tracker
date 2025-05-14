'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ButtonSubmit } from '@/ui/Button';
import { CreatableSelect, InputDate, InputNumber, InputText } from '@/ui/Input';
import { OptionType, Task, InterfaceFormAdd } from '@/types';
import 'react-datepicker/dist/react-datepicker.css';

import api from '@/lib/api';

const formatDate = (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

const FormAdd = ({ addForm, setAddForm }: InterfaceFormAdd) => {
    const [employee, setEmployee] = useState('');
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [date, setDate] = useState(formatDate(`${new Date()}`));
    const [hoursSpent, setHoursSpent] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [additionalCharges, setAdditionalCharges] = useState('0');

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

        api.post<Task[]>('/tasks', { 
            employee_name: employee,
            task_description: selectedOption?.label,
            date: formatDate(date),
            hours_spent: hoursSpent,
            hourly_rate: hourlyRate,
            additional_charges: additionalCharges,
        })
        .then(res => {
            if (res.status === 200)
                window.location.href = '/';
        })
        .catch(err => console.log(err))
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setAddForm(false)
        }
    };

    return (
        <div className={`fixed left-0 top-0 w-screen h-screen flex justify-center items-center min-h-screen overflow-auto bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-all ${addForm ? 'opacity-100 duration-1000' : 'opacity-0 duration-300 pointer-events-none'}`} onClick={handleCloseModal}>
            <form className="flex flex-col w-1/2 my-auto z-10" onSubmit={handleSubmit}>
                <InputText required name='employee' placeholder='Employee Name *' onChange={setEmployee} />
                <div className='mt-5'>
                    <CreatableSelect selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={options} />
                </div>
                <InputDate onChange={setDate} selected={new Date(date)} />
                <InputNumber required onChange={setHoursSpent} name='hours_spent' placeholder='Hours Spent *' />
                <InputNumber required onChange={setHourlyRate} name='hourly_rate' placeholder='Hourly Rate *' />
                <InputNumber onChange={setAdditionalCharges} name='additional_charges' placeholder='Additional Charges' />
                <ButtonSubmit>Submit</ButtonSubmit>
            </form>
        </div>
    )
}

export default FormAdd;