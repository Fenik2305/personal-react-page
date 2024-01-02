import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import UserIcon from './UserIcon';

export default function Header() {
  const { user } = useAuthContext();
  const [messagesNum, setMessagesNum] = useState(null);

  useEffect(() => {
    const countMessages = async () => {
      try {
        if (!user) {
          return;
        }

        const response = await fetch(`/api/messages/count/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const messagesCount = await response.json();
        setMessagesNum(messagesCount);
      } catch (error) {
        alert('Error while fetching messages count: ' + `${error}`);
      }
    };

    countMessages();
  }, [user]);

  return (
    <header className="Header">
      <nav className="HeaderNavigationBlock">
        <Link className="HeaderNavigationElement" to='/'>HOME</Link>
        <Link className="HeaderNavigationElement" to='/about'>ABOUT</Link>
        <Link className="HeaderNavigationElement" to='/contactus'>CONTACTS</Link>
      </nav>

      <div className="UserActions">
        {user && <div>{user.email}</div>}

        {user && (
          <Badge badgeContent={messagesNum ? (messagesNum > 0 ? messagesNum : 0) : 0} color='error'>
            <Link to='/messages'>
              <img className="UserActionsElement" src="/icons/mail-icon.png" alt="mail-icon" height={35} width={35} />
            </Link>
          </Badge>
        )}

        <UserIcon />
      </div>
    </header>
  );
}
