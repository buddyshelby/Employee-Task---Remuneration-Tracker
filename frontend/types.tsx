import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface Task {
  task_id: number;
  employee_name: string;
  task_description: string;
  date: string;
  hours_spent: number;
  hourly_rate: number;
  additional_charges: number;
  total_hours?: number;
}

export interface InterfaceButtonSubmit {
    children: ReactNode;
}

export interface InterfaceCreatableSelect<T> {
    value?: T | null
    selectedOption: T | null;
    setSelectedOption: Dispatch<SetStateAction<T | null>>;
    options: T[]
}

export interface InterfaceTableCell {
    borderLeft?: boolean;
    children: ReactNode;
}

export type OptionType = {
  value: string;
  label: string;
};

export interface UiInputDate {
  selected?: Date;
  disabled?: boolean;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export interface UiInputText {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  required?: boolean;
}

export interface UiInputNumber {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: Dispatch<SetStateAction<string>>;
  required?: boolean;
}

export interface InterfaceTable {
  tasks: Task[];
  setDataEdit: Dispatch<SetStateAction<Task | null>>;
  setEditForm: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceFormAdd {
  addForm: boolean;
  setAddForm: Dispatch<SetStateAction<boolean>>;
}

export interface InterfaceFormEdit {
  tasks: Task[]
  dataEdit: Task
  setDataEdit: Dispatch<SetStateAction<Task | null>>;
  editForm: boolean;
  setEditForm: Dispatch<SetStateAction<boolean>>;
}