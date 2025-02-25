import { Employee } from "../@types/types";
import { FaSearch } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./style.css"
import { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function FilterComponent({ employees, setFilter }: { employees: Employee[], setFilter: React.Dispatch<React.SetStateAction<Employee[]>> }) {

    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string[]>([]);
    const [text, setText] = useState<string>("");

    const filterEmployees = () => {
        const filtered = employees.filter(employee => {
            if (search.length === 0) {
                return employee.name.toLowerCase().includes(text.trim().toLowerCase());
            }
            return text.split(',').every(t => {
                return search.some(s => {
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
                            return employee.name.toLowerCase().includes(t.trim().toLowerCase())
                    }
                })
            });
        });
        setFilter(filtered);
    }

    const handleCheckboxChange = (name: string) => {
        setText("");
        setSearch(prevSearch =>
            prevSearch.includes(name)
                ? prevSearch.filter(s => s !== name)
                : [...prevSearch, name]
        );
    };

    useEffect(() => {
        filterEmployees()
    }, [text])

    return (
        <div>
            <div className="container-input">
                <div className="search-icon"> <FaSearch color="#fff" size={17} /></div>
                <input placeholder={showSearch ? "Ex: Nome, Cargo, Telefone" : "Buscar por nome"} value={text} defaultValue={text} className="input" type="text" onChange={e => setText(e.target.value)} />
            </div>
            <div >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="container-filter" onClick={() => setShowSearch(!showSearch)}>
                        <span>Filtrar</span>
                        <IoFilter size={20} />
                    </div>

                    {
                        showSearch &&
                        <div style={{ cursor: "pointer" }} onClick={() => {
                            setSearch([])
                            setText("")
                            setShowSearch(!showSearch)
                        }}>
                            <IoMdClose size={30} />
                        </div>
                    }
                </div>
                {
                    showSearch &&
                    <div className="container-search">
                        <div className="container-checkbox">
                            <FormControlLabel
                                control={<Checkbox name="name" onChange={(e) => handleCheckboxChange(e.target.name)} />}
                                label="Nome"
                            />
                            <FormControlLabel
                                control={<Checkbox name="job" onChange={(e) => handleCheckboxChange(e.target.name)} />}
                                label="Cargo"
                            />
                            <FormControlLabel
                                control={<Checkbox name="admission_date" onChange={(e) => handleCheckboxChange(e.target.name)} />}
                                label="Data de Admissão"
                            />
                            <FormControlLabel
                                control={<Checkbox name="phone" onChange={(e) => handleCheckboxChange(e.target.name)} />}
                                label="Telefone"
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
