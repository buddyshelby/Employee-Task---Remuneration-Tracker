'use client';
import { InterfaceSearchBar } from "@/types";
import { useEffect, useState } from "react";

const SearchBar = ({ tasks, setTasks }: InterfaceSearchBar) => {
    const [search, setSearch] = useState('')

    useEffect(() => {
        setTasks(
            tasks.filter(item => item.employee_name.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => a.task_description.localeCompare(b.task_description))
        )
    }, [search])

    return (
        <div>
            <input className="border-b-2 focus:outline-none text-sm lg:text-lg" type="text" placeholder="Search Employees" onChange={(e) => setSearch(e.target.value)} autoComplete="off" />
        </div>
    )
}

export default SearchBar;