import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { joinTable, leaveTable, sendMessage } from '../../utils/actions';

const TableActions = ({ table }) => {
  // Get the global state and dispatch from the context
  const [state, dispatch] = useStoreContext();

  // Implement the functionality to join, leave, and send messages
  const handleJoin = () => {
    dispatch(joinTable(table.id));
  };

  const handleLeave = () => {
    dispatch(leaveTable());
  };

  const handleMessage = () => {
    const message = prompt('Enter your message:');
    if (message) {
      dispatch(sendMessage(table.id, message));
    }
  };

  return (
    <div className="table-actions">
      <button onClick={handleJoin} disabled={state.joinedTable !== null}>Join</button>
      <button onClick={handleLeave} disabled={state.joinedTable === null}>Leave</button>
      <button onClick={handleMessage} disabled={state.joinedTable === null}>Send Message</button>
    </div>
  );
};

export default TableActions;