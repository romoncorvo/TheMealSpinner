import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Details() {
  //   const [customer, setCustomer] = useState<Customer>();
  //   const [isEditing, setIsEditing] = useState(false);
  //   const [editingAddress, setEditingAddress] = useState<Address>();
  //   const params = useParams();

  //   const getAddresses = async (id: string) => {
  //     try {
  //       const response = await fetch(
  //         `https://localhost:7187/api/Customers/${id}/Addresses`
  //       );
  //       const json = await response.json();
  //       setCustomer(json);
  //     } catch (e: any) {
  //       throw new Error("Problems");
  //     }
  //   };

  //   const putNewAddress = async () => {
  //     try {
  //       const requestOptions = {
  //         method: editingAddress?.id ? "PUT" : "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           ...editingAddress,
  //           customerId: customer!.id,
  //         }),
  //       };

  //       if (editingAddress?.id) {
  //         await fetch(
  //           `https://localhost:7187/api/Addresses/${editingAddress!.id}`,
  //           requestOptions
  //         );
  //       } else {
  //         const response = await fetch(
  //           `https://localhost:7187/api/Addresses`,
  //           requestOptions
  //         );
  //         const json: Address = await response.json();
  //         if (customer && editingAddress) {
  //           setCustomer({
  //             ...customer,
  //             addresses: [...customer.addresses, json],
  //           });
  //         }
  //       }
  //     } catch (e: any) {
  //       throw new Error("Problems");
  //     }
  //   };

  //   useEffect(() => {
  //     if (params.id) {
  //       getAddresses(params.id);
  //     }
  //   }, [params]);

  //   const handleEdit = (addressId?: number) => {
  //     setIsEditing(true);
  //     if (addressId) {
  //       setEditingAddress(
  //         customer!.addresses!.find(address => address.id === addressId)
  //       );
  //     } else {
  //       setEditingAddress({} as Address);
  //     }
  //   };

  //   const handleDelete = (addressId: number) => {
  //     fetch(`https://localhost:7187/api/Addresses/${addressId}`, {
  //       method: "DELETE",
  //     });
  //     if (customer) {
  //       setCustomer({
  //         ...customer,
  //         addresses: [
  //           ...customer.addresses!.filter(address => address.id !== addressId),
  //         ],
  //       });
  //     }
  //   };

  //   function handleSubmit(e: { preventDefault: () => void }) {
  //     e.preventDefault();
  //     putNewAddress();
  //     if (customer && editingAddress && editingAddress.id) {
  //       setCustomer({
  //         ...customer,
  //         addresses: [
  //           ...customer.addresses!.filter(
  //             address => address.id !== editingAddress!.id
  //           ),
  //           editingAddress,
  //         ].sort((a, b) => a.id - b.id),
  //       });
  //       setEditingAddress({} as Address);
  //       setIsEditing(false);
  //     }
  //   }

  return <p></p>;
  //   (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       minHeight="50vh"
  //       flexDirection="column"
  //       gap="20px"
  //     >
  //       {customer && (
  //         <Typography variant="h2" gutterBottom mt={2}>
  //           {customer.name}
  //         </Typography>
  //       )}
  //       <TableContainer sx={{ width: "90%" }} component={Paper}>
  //         <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //           <TableHead>
  //             <TableRow>
  //               <TableCell>Address</TableCell>
  //               <TableCell align="right">City</TableCell>
  //               <TableCell align="right">Country</TableCell>
  //               <TableCell align="right">Primary Address</TableCell>
  //               <TableCell align="right"></TableCell>
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {customer &&
  //               customer.addresses.map(address => (
  //                 <TableRow
  //                   key={address.id}
  //                   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  //                 >
  //                   <TableCell component="th" scope="row">
  //                     {address.streetName} {address.streetNo}
  //                   </TableCell>
  //                   <TableCell align="right">{address.city}</TableCell>
  //                   <TableCell align="right">{address.country}</TableCell>
  //                   <TableCell align="right">
  //                     {address.primary ? "Yes" : "No"}
  //                   </TableCell>
  //                   <TableCell align="right">
  //                     <Button
  //                       type="button"
  //                       variant="contained"
  //                       sx={{ mr: 1 }}
  //                       onClick={() => handleEdit(address.id)}
  //                     >
  //                       Edit
  //                     </Button>
  //                     <Button
  //                       type="button"
  //                       variant="contained"
  //                       color="error"
  //                       onClick={() => handleDelete(address.id)}
  //                     >
  //                       Delete
  //                     </Button>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       {isEditing && editingAddress && (
  //         <Box sx={{ width: "90%" }}>
  //           <Box
  //             component="form"
  //             sx={{
  //               "& .MuiTextField-root": { m: 1, width: "25ch" },
  //             }}
  //             noValidate
  //             autoComplete="off"
  //             onSubmit={handleSubmit}
  //           >
  //             <TextField
  //               required
  //               id="filled-required-name"
  //               label="Street Name"
  //               defaultValue={editingAddress.streetName}
  //               onChange={e =>
  //                 setEditingAddress({
  //                   ...editingAddress,
  //                   streetName: e.target.value,
  //                 })
  //               }
  //               variant="filled"
  //             />
  //             <TextField
  //               required
  //               id="filled-required-no"
  //               label="Street Number"
  //               type="number"
  //               defaultValue={editingAddress.streetNo}
  //               onChange={e =>
  //                 setEditingAddress({
  //                   ...editingAddress,
  //                   streetNo: e.target.value,
  //                 })
  //               }
  //               variant="filled"
  //             />
  //             <TextField
  //               required
  //               id="filled-required-city"
  //               label="City"
  //               defaultValue={editingAddress.city}
  //               onChange={e =>
  //                 setEditingAddress({
  //                   ...editingAddress,
  //                   city: e.target.value,
  //                 })
  //               }
  //               variant="filled"
  //             />
  //             <TextField
  //               required
  //               id="filled-required-country"
  //               label="Country"
  //               defaultValue={editingAddress.country}
  //               onChange={e =>
  //                 setEditingAddress({
  //                   ...editingAddress,
  //                   country: e.target.value,
  //                 })
  //               }
  //               variant="filled"
  //             />
  //             <InputLabel id="demo-simple-select-label">
  //               Primary address
  //             </InputLabel>
  //             <Select
  //               labelId="demo-simple-select-label"
  //               variant="filled"
  //               id="demo-simple-select"
  //               value={editingAddress.primary ? 1 : 0}
  //               sx={{ m: 1, width: "25ch" }}
  //               onChange={e =>
  //                 setEditingAddress({
  //                   ...editingAddress,
  //                   primary: e.target.value ? true : false,
  //                 })
  //               }
  //             >
  //               <MenuItem value={1}>Yes</MenuItem>
  //               <MenuItem value={0}>No</MenuItem>
  //             </Select>
  //             <Button
  //               type="submit"
  //               variant="contained"
  //               sx={{ marginRight: 1, ml: 1 }}
  //             >
  //               {editingAddress.id ? "Update" : "Add"} address
  //             </Button>
  //             <Button
  //               type="button"
  //               variant="outlined"
  //               onClick={() => setIsEditing(false)}
  //             >
  //               Cancel changes
  //             </Button>
  //           </Box>
  //         </Box>
  //       )}
  //       <Box>
  //         {!isEditing && (
  //   <Button
  //     type="button"
  //     variant="contained"
  //     sx={{ marginRight: "10px" }}
  //     onClick={() => handleEdit()}
  //   >
  //     Add Address
  //   </Button>
  //         )}
  //         <Link
  //           className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
  //           to={`/`}
  //         >
  //           Go back to list
  //         </Link>
  //       </Box>
  //     </Box>
  //   );
}

export default Details;
