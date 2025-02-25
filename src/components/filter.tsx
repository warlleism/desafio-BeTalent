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
        setSearch(prevSearch =>
            prevSearch.includes(name)
                ? prevSearch.filter(s => s !== name)
                : [...prevSearch, name]
        );
    };

    useEffect(() => {
        filterEmployees()
    }, [text, search])

    return (
        <div>
            <div className="container-input">
                <div className="search-icon" onClick={() => filterEmployees()} style={{ cursor: "pointer" }}> <FaSearch color="#fff" size={17} /></div>
                <input placeholder={showSearch ? "Ex: Nome, Cargo, Telefone, Data de Admissão" : "Buscar por nome"} value={text} defaultValue={text} className="input" type="text" onChange={e => setText(e.target.value)} />
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
                                control={<Checkbox name="name" onChange={(e) => handleCheckboxChange(e.target.name)} sx={{ color: "#000" }} />}
                                label="Nome"
                                labelPlacement="end"
                                sx={{ color: "#2d2d2d" }}
                            />
                            <FormControlLabel
                                control={<Checkbox name="job" onChange={(e) => handleCheckboxChange(e.target.name)} sx={{ color: "#000" }} />}
                                label="Cargo"
                                labelPlacement="end"
                                sx={{ color: "#2d2d2d" }}
                            />
                            <FormControlLabel
                                control={<Checkbox name="admission_date" onChange={(e) => handleCheckboxChange(e.target.name)} sx={{ color: "#000" }} />}
                                label="Data de Admissão"
                                labelPlacement="end"
                                sx={{ color: "#2d2d2d" }}
                            />
                            <FormControlLabel
                                control={<Checkbox name="phone" onChange={(e) => handleCheckboxChange(e.target.name)} sx={{ color: "#000" }} />}
                                label="Telefone"
                                labelPlacement="end"
                                sx={{ color: "#2d2d2d" }}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
