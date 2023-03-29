import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState , useEffect ,useContext} from "react";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import "../AdminApp.css";
import fecthContext from "../Hooks/FecthContext";
function createData(name, username, email, phone, website) {
 return { name, username, email, phone, website };
}
  

  
export default function AllStdudentData() {
 
 const context = useContext(fecthContext);
  const {data , getData} = context
 useEffect(() => {
    getData(`http://localhost:9002/api/user/getAllUser`)
 }, []);
  
 return (
  < div className="allStudentData">
   <TableContainer component={Paper} >
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell>Name</TableCell>
           <TableCell align="right">Mobail</TableCell>
           <TableCell align="right">Email</TableCell>
           <TableCell align="right">Age</TableCell>
           <TableCell align="right">Gender</TableCell>
           <TableCell align="right">profilevideoLink</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.length >0 &&data.map((row) => (
           <TableRow key={row._id}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell align="right">{row.mobile}</TableCell>
           
             <TableCell align="right">{row.email}</TableCell>
             <TableCell align="right">{row.age}</TableCell>
             <TableCell align="right">{row.gender}</TableCell>
             <TableCell align="right">{row.profileVideoLink}</TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
   </div>
 );
}