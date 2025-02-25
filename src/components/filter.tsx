import { Employee } from "../@types/types";
import { FaSearch } from "react-icons/fa";
import "./style.css"

export default function FilterComponent({ employees, setFilter }: { employees: Employee[], setFilter: React.Dispatch<React.SetStateAction<Employee[]>> }) {

    const filterEmployees = (text: string) => {
        const filtered = employees.filter(employee => {
            return text.split(',').every(t => {
                return ['name', 'job', 'phone', 'admission_date'].some(s => {
                    switch (s) {
                        case "name":
                            return employee.name.toLowerCase().includes(t.trim().toLowerCase());
                        case "job":
                            return employee.job.toLowerCase().includes(t.trim().toLowerCase());
                        case "phone":
                            return employee.phone.toLowerCase().includes(t.trim().toLowerCase());
                        case "admission_date":
                            return new Date(employee.admission_date).toLocaleDateString().includes(t.trim().toLowerCase());
                        default:
                            return false;
                    }
                })
            });
        });
        setFilter(filtered);
    }

    return (
        <div>

            <div className="container-input">
                <div className="search-icon"> <FaSearch color="#fff" size={17} /></div>
                <input placeholder="Ex: Maria, Front-end, 14/03/2020, 5557894561230" className="input" type="text" onChange={e => filterEmployees(e.target.value)} />
            </div>
        </div>
    )
}
