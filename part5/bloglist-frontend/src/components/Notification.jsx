const Notification = ({ message }) => {
  const normalStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const errorStyle = {
    ...normalStyle,
    color: 'red',
  }

  if (message === null || message.value === null) {
    return <></>
  }

  return (
    <div style={message.isError ? errorStyle : normalStyle}>
      {message.value}
    </div>
  )
}

export default Notification
