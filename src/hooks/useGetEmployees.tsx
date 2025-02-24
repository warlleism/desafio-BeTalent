import { useEffect, useState } from "react";
import { Employee } from "../@types/types";

export default function useGetEmployees() {

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filter, setFilter] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:3000/employees')
            const data = await response.json()
            setEmployees(data)
            setLoading(true)
        } catch (error) {
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    return { employees, loading, filter, setFilter };

}   