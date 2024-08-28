const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="specify">
        {message}
      </div>
    )
  }
  
  export default Notification