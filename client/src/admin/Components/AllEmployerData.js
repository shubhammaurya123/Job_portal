import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState , useEffect , useContext } from "react";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import "../AdminApp.css";
import axios from "axios";
import fecthContext from "../Hooks/FecthContext";
function createData(name, username, email, phone, website) {
 return { name, username, email, phone, website };
}
  
const rows = [];
  
export default function AllEmployerData() {

  const [val, setvalue] = useState([]);
  const context = useContext(fecthContext);
  const {data , getData} = context
 
  
 useEffect(() => {
    getData("http://localhost:9002/employer/getAllEmployer")
 }, []);
  
 return (
  < div className="allEmployerData">
   <TableContainer component={Paper} className="margin-left">
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell align="right">CompanName</TableCell>
           <TableCell align="right">DomainName</TableCell>
           <TableCell align="right">Email</TableCell>
           <TableCell align="right">Phone</TableCell>
           <TableCell align="right">Designation</TableCell>
           <TableCell align="right">PinCode</TableCell>
           <TableCell align="right">Address</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row._id}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="right">{row.companyName}</TableCell>
             <TableCell align="right">{row.domainName}</TableCell>
             <TableCell align="right">{row.email}</TableCell>
             <TableCell align="right">{row.number}</TableCell>
             <TableCell align="right">{row.designation}</TableCell>
             <TableCell align="right">{row.pinCode}</TableCell>
             <TableCell align="right">{row.address}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   </div>
 );
}