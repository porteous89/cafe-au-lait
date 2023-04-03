import { useStoreContext } from "../../utils/GlobalState";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import styled from "@emotion/styled";
import React, { useState } from "react";
import VirtualCafeTable from "./VirtualCafeTable";
import "./VirtualCafeTables.css";
import { useQuery, useSubscription } from "@apollo/client";
import { QUERY_ALL_TABLES, QUERY_MESSAGES } from "../../utils/queries";
// import TableActions from './TableActions';
import { leaveTable, sendMessage } from "../../utils/actions";
import { ADD_MESSAGE, NEW_MESSAGE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { LEAVE_TABLE } from "../../utils/mutations";
import { useBeforeunload } from "react-beforeunload";

const VirtualCafeTables = () => {
  const { loading, data, refetch } = useQuery(QUERY_ALL_TABLES, {
    variables: {},
    pollInterval: 1000,
  });
  const [leaveTable_, { error }] = useMutation(LEAVE_TABLE);

  const [addMessage] = useMutation(ADD_MESSAGE);
  const [message, setMessge] = useState("");
  const [state, dispatch] = useStoreContext();
  const { joinedTable } = state;

  useBeforeunload(async (event) => {
    if (joinedTable) {
      await handleLeaveTable();
    }
  });

  const handleLeaveTable = async () => {
    await leaveTable_({
      variables: {
        tableId: joinedTable,
      },
    });
    await dispatch(leaveTable({ tableId: joinedTable }));
    // await handleMessage(table);
    await refetch();
  };
  const result = useQuery(QUERY_MESSAGES, {
    variables: {
      tableId: joinedTable,
    },
    pollInterval: 1000,
  });
  let messages = [];
  let refetchResult = null;
  // alert(JSON.stringify(result.data))
  if (!result.loading && result.data) {
    messages = result.data?.allMessages;
    refetchResult = result.refetch;
  }
  // alert(JSON.stringify(messages?.data));

  const tables = data?.allTables || [];
  const handleMessage = async () => {
    if (state.joinedTable && message) {
      dispatch(sendMessage({ joinedTable, message }));
    }
    await addMessage({
      variables: {
        tableId: state.joinedTable,
        message: message,
      },
    });
    await setMessge("");
    await refetchResult({
      variables: {
        tableId: joinedTable,
      },
    });
  };

  const updated = async () => {
    await refetch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };
  const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessge(value);
  };

  return (
    <div>
      <div className="virtual-cafe-tables-container">
        {tables.map((table, index) => (
          <VirtualCafeTable
            key={table.id || index}
            table={table}
            onUpdate={() => {
              updated();
            }}
          />
        ))}
      </div>
      {joinedTable && (
        <div className="message-box">
          <span className="close-me" onClick={() => handleLeaveTable()}>
            X
          </span>
          <div className="messages">
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => (
                <p className="message" key={index}>
                  <label>{message.sender}</label>
                  <span>
                    <b>{message.from.firstName}:</b>
                    {message.message}
                  </span>
                </p>
              ))}
          </div>
          <div className="input-message">
            <input
              placeholder="enter your message"
              value={message}
              onChange={handleMessageChange}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                handleMessage();
              }}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualCafeTables;

// const VirtualCafeTables = () => {
//     const [state, dispatch] = useStoreContext();

//     const tablesData = [
//       { id: 1, name: 'Table 1', capacity: 4 },
//       { id: 2, name: 'Table 2', capacity: 6 },
//       { id: 3, name: 'Table 3', capacity: 8 },
//       { id: 4, name: 'Table 4', capacity: 10 },
//     ];

//     const joinTable = (tableId) => {
//     dispatch(selectTable(tableId));
//     };

//     return (
//       <div>
//         <h2>Virtual Cafe Tables</h2>
//         <div>
//           {tablesData.map((table) => (
//             <Card key={table.id}>
//               <CardContent>
//                 <Typography variant="h5" component="div">
//                   {table.name}
//                 </Typography>
//                 <Typography
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Seating capacity: {table.capacity}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => joinTable(table.id)}
//                   disabled={state.selectedTable === table.id}
//                 >
//                   {state.selectedTable === table.id ? 'Joined' : 'Join'}
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   };
