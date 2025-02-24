import { Employee } from "../@types/types";
import { FaSearch } from "react-icons/fa";
import "./style.css"

export default function FilterComponent({ employees, setFilter }: { employees: Employee[], setFilter: React.Dispatch<React.SetStateAction<Employee[]>> }) {

    const filterEmployees = (text: string) => {
        const filtered = employees.filter(employee =>
            employee.job.toLowerCase().includes(text.toLowerCase()) ||
            employee.name.toLowerCase().includes(text.toLowerCase()) ||
            employee.phone.toLowerCase().includes(text.toLowerCase()) ||
            new Date(employee.admission_date).toLocaleDateString().includes(text.toLowerCase()));
        setFilter(filtered);
    }

    return (
        <div>

            <div className="container-input">
                <div className="search-icon"> <FaSearch color="#fff" size={17} /></div>
                <input className="input" type="text" onChange={e => filterEmployees(e.target.value)} />
            </div>

        </div>
    )
}