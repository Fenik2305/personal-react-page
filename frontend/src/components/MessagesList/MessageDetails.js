import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MessageDetails = ( {message} ) => {
    return(
        <div className="message-details">
            <h4>{message.title}</h4>
            <p><strong>ID: </strong>{message._id}</p>
            <p><strong>Email </strong>{message.email}</p>
            <p><strong>Message </strong>{message.mssg}</p>
            <p><strong>Created: </strong>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</p>
            {message.createdAt !== message.updatedAt && <p><strong>Last updated: </strong>{formatDistanceToNow(new Date(message.updatedAt), { addSuffix: true })}</p>}
        </div>
    )
}

export default MessageDetails