import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { API_URL } from "../../app/constant";
import authHeader from "../../services/auth-header";

export default function SearchUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${API_URL}/users`, {
        headers: authHeader(),
      });
      setUsers(data);
    };
    getUser();
  }, []);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={users}
      getOptionLabel={(option) => option.email || ""}
      sx={{ width: 300 }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.email}
          </li>     
        );
      }}
      renderInput={(params) => {
        return <TextField {...params} label="Search" />;
      }}
    />
  );
}
