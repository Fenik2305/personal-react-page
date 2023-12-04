import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuthContext } from '../../hooks/useAuthContext';

export default function DeleteUserIcon( props ) {
    const { user } = useAuthContext()
    const userID = props._id;
    const userMessages = props.messages;

    const deleteMessage = async (messageID) => {
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

    const deleteUserMessages = async () => {
      userMessages.forEach(message => {
        deleteMessage(message._id)
      });
    }

    const deleteUser = async () => {
      deleteUserMessages()

      try {
        const response = await fetch(`/api/user/${userID}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
  
        if (response.ok) {
          console.log(`User with ID ${userID} deleted successfully`);
        } else {
          console.error(`Failed to delete user with ID ${userID}`);
        }
      } catch (error) {
        console.error("User deleting error: ", error);
      }
    }

    

    return (
      <div className='deleteIcon'>
        <DeleteForeverIcon onClick={deleteUser}/>
      </div> 
    );
  }