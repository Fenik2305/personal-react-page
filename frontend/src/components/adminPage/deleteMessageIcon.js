import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function DeleteMessageIcon(props) {
  const { user } = useAuthContext();

  const { messageIdx, updateTable, updateTableParams } = props;

  const deleteMessage = async () => {
    try {
      const response = await fetch(`/api/messages/${messageIdx}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        updateTable(updateTableParams[0], updateTableParams[1]);
      } else {
        updateTable(updateTableParams[0], updateTableParams[1]);
        alert(`Failed to delete message with Idx ${messageIdx}`);
      }
    } catch (error) {
      updateTable(updateTableParams[0], updateTableParams[1]);
      alert("Message deleting error: ", error);
    }
  }
  return (
    <div className='deleteIcon'>
      <DeleteForeverIcon onClick={deleteMessage}/>
    </div>
  );
}