import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { API_URL } from "../../app/constant";
import { useSelector } from 'react-redux';
import authHeader from "../../services/auth-header";


export default function ComboBox() {
    const [open, setOpen] = React.useState(false);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [users, setUsers] = React.useState([])
    const handleChange = (event, value) => {
        setSelectedOptions(value);
    }
    console.log(selectedOptions)
    React.useEffect(() => {

        const getUser = async () => {
            const { data } = await axios.get(`${API_URL}/users`, { headers: authHeader(), })
            setUsers(data);
            console.log(users)
        }
        getUser();
    }, [])


    return (
        <Autocomplete
            onChange={handleChange}
            disablePortal
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.email}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search" />}
        />
    );
}
