import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function DeleteUserIcon( props ) {
    const { user } = useAuthContext();
    const { email, updateTable, updateTableParams } = props;

    const deleteUser = async () => {
      try {
        const response = await fetch(`/api/user/deleteByEmail/${email}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
  
        if (response.ok) {
          updateTable(updateTableParams[0], updateTableParams[1]);
        } else {
          updateTable(updateTableParams[0], updateTableParams[1]);
          alert(`Failed to delete user with email ${email}`);
        }
      } catch (error) {
        updateTable(updateTableParams[0], updateTableParams[1]);
        alert("User deleting error: ", error);
      }
    }

    return (
      <div className='deleteIcon'>
        <DeleteForeverIcon onClick={deleteUser}/>
      </div> 
    );
  }