'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { InterfaceCreatableSelect, OptionType, UiInputText, UiInputNumber, UiInputDate } from '@/types';

export const InputText = ({ name, placeholder, value, onChange, required }: UiInputText) => {
    return (
        <input
            required={required}
            className="pl-2 py-1 mt-5 border-b-2 focus:outline-none"
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
        />
    )
}

export const InputNumber = ({ name, placeholder, value, onChange, required }: UiInputNumber) => {
    return (
        <input
            required={required}
            className="pl-2 py-1 mt-5 border-b-2 focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoComplete="off"
        />
    )
}

export const InputDate = ({ selected, disabled, onChange }: UiInputDate) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    useEffect(() => {
        if (selected) {
            onChange(String(selected));
        } else {
            onChange(String(selectedDate));
        }
    }, [selectedDate, selected])
    return (
        <DatePicker
        required
        selected={selected || selectedDate}
        disabled={disabled || false}
        className="w-full pl-2 py-1 mt-5 border-b-2 focus:outline-none"
        onChange={(date: Date | null) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Pick a date *"
        />
    )
}

export const CreatableSelect = ({ value, selectedOption, setSelectedOption, options }: InterfaceCreatableSelect<OptionType>) => {
    const CreatableSelect = dynamic(() => import("react-select/creatable"), { ssr: false });
    
    return (
        <CreatableSelect
            required
            options={options}
            value={value || selectedOption}
            onChange={(option: any) => setSelectedOption(option)}
            placeholder="Task Description *"
            isClearable
            styles={{
            control: (base) => ({
                ...base,
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                borderBottom: 'solid 2px',
                borderBottomColor: 'white',
                borderRadius: '0',
                boxShadow: 'none',
                outline: 'none',
                marginLeft: '0'
            }),
            singleValue: (base) => ({
                ...base,
                color: 'white',
            }),
            input: (base) => ({
                ...base,
                color: 'white',
            }),
            menu: (base) => ({
                ...base,
                backgroundColor: 'black',
                color: 'white',
            }),
            option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? '#333' : 'black',
                color: 'white',
            }),
            }}
        />
    )
}