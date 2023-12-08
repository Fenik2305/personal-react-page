import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function RoleSelector(props) {
    const { user } = useAuthContext()

    const userID = props.userID;
    const actualRole = props.actualRole;
    
    const updateTableData = props.callback;


    const updateUserRole = async () => {
        const newUserRole = document.getElementById(`role-selector-${userID}`).value;
        
        try {
            const response = await fetch(`/api/user/${userID}`, {
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
              updateTableData()
              console.log(`User ${userID} updated successfully`);
            } else {
              updateTableData()
              console.error(`Failed to update user ${userID}`);
            }
          } catch (error) {
            console.error("User updating error: ", error);
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
                    id: `role-selector-${userID}`,
                }}>
                <option value={"user"}>user</option>
                <option value={"admin"}>admin</option>
            </NativeSelect>
        </FormControl>
        </Box>
    );
}