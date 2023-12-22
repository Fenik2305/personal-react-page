import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function RoleSelector(props) {
    const { user } = useAuthContext()

    const { email, actualRole, updateTable, updateTableParams  } = props;

    const updateUserRole = async () => {
        const newUserRole = document.getElementById(`role-selector-${email}`).value;
        
        try {
            const response = await fetch(`/api/user/updateByEmail/${email}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: newUserRole,
                }),
            });
      
            if (response.ok) {
              updateTable(updateTableParams[0], updateTableParams[1]);
            } else {
              updateTable(updateTableParams[0], updateTableParams[1]);
              alert(`Failed to update user ${email}`);
            }
          } catch (error) {
            updateTable(updateTableParams[0], updateTableParams[1]);
            alert("User updating error: ", error);
          }
    }

    return (
        <Box sx={{ minWidth: 60 }}>
        <FormControl fullWidth>
            <NativeSelect
                onChange={updateUserRole}
                defaultValue={actualRole}
                inputProps={{
                    name: 'role',
                    id: `role-selector-${email}`,
                }}>
                <option value={"user"}>user</option>
                <option value={"admin"}>admin</option>
            </NativeSelect>
        </FormControl>
        </Box>
    );
}