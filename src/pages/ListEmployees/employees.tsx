import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetEmployees from '../../hooks/useGetEmployees';
import "./style.css";
import FilterComponent from '../../components/filter';

export default function ListEmployees() {

    const { employees, loading, filter, setFilter } = useGetEmployees();

    if (loading) return <div>Carregando...</div>

    const data = filter.length <= 0 ? employees : filter;

    return (
        <div className='container-list-employees'>
            <FilterComponent employees={employees} setFilter={setFilter} />

            <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right" sx={{ textAlign: "center" }}>Nome</TableCell>
                            <TableCell align="right" sx={{ textAlign: "center" }}>Cargo</TableCell>
                            <TableCell align="right" sx={{ textAlign: "center" }}>Data de Admissão</TableCell>
                            <TableCell align="right" sx={{ textAlign: "center" }}>Telefone</TableCell>
                            <TableCell align="right" sx={{ textAlign: "center" }}>Imagem</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((employee, index) => (
                            <TableRow
                                key={employee.id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#fff',
                                }}
                            >
                                <TableCell component="th" scope="row">{employee.id}</TableCell>
                                <TableCell align="right" sx={{ textAlign: "center" }}>{employee.name}</TableCell>
                                <TableCell align="right" sx={{ textAlign: "center" }}>{employee.job}</TableCell>
                                <TableCell align="right" sx={{ textAlign: "center" }}>{new Date(employee.admission_date).toLocaleDateString()}</TableCell>
                                <TableCell align="right" sx={{ textAlign: "center" }}>{employee.phone}</TableCell>
                                <TableCell align="right" sx={{ textAlign: "center" }}><img src={employee.image} alt="Imagem do funcionário" width="50" height="50" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
