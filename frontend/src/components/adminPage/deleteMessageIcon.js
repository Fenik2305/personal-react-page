import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function DeleteMessageIcon(props) {
  const { user } = useAuthContext();
  const messageID = props._id;

  const deleteMessage = async () => {
    try {
      const response = await fetch(`/api/messages/${messageID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        console.log(`Message with ID ${messageID} deleted successfully`);
      } else {
        console.error(`Failed to delete message with ID ${messageID}`);
      }
    } catch (error) {
      console.error("Message deleting error: ", error);
    }
  }
  return (
    <div className='deleteIcon'>
      <DeleteForeverIcon onClick={deleteMessage}/>
    </div>
  );
}