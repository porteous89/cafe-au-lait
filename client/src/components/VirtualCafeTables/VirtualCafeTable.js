// import React from 'react';
// import TableActions from './TableActions';

// const VirtualCafeTable = ({ table }) => {
//   return (
//     <div className="virtual-cafe-table">
//       <h3>{table.name}</h3>
//       <TableActions table={table} key={table.id} />
//     </div>
//   );
// };

// export default VirtualCafeTable;

import React from "react";
import TableActions from "./TableActions";
import "./VirtualCafeTable.css";
import { useStoreContext } from "../../utils/GlobalState";
import { useMutation } from "@apollo/client";
import { JOIN_TABLE } from "../../utils/mutations";
import { joinTable } from "../../utils/actions";

const VirtualCafeTable = ({ table, onUpdate }) => {
  const [joinTable_, { error }] = useMutation(JOIN_TABLE);
  const [state, dispatch] = useStoreContext();

  const setTaken = async (index, table) => {
    // joinTable(joinTable({ tableId: table._id, index }));
    //alert('im here');
    await joinTable_({
      variables: {
        tableId: table._id,
        index: index,
      },
    });
    await dispatch(joinTable({ tableId: table._id, index }));
    // await handleMessage(table);
    if (onUpdate) {
      return onUpdate();
    }
  };

  const getSeats = (table) => {
    let seats = new Array(table.capacity).fill(true).map((s, index) => {
      if (!table.seats || table.seats.length === 0) return true;
      if (table.seats.find((i) => i.index === index)) return false;
      return true;
    });
    return seats;
  };

  return (
    <div className="virtual-cafe-table">
      {table.capacity > 0 && (
        <div className="table">
          {getSeats(table).map((isAvailable, index) => (
            <div
              key={index}
              className={`seat ${isAvailable ? "available" : "taken"}`}
              onClick={() => setTaken(index, table)}
              style={{
                transform: `translate(${
                  Math.cos(((2 * Math.PI) / table.capacity) * index) * 75
                }px, ${
                  Math.sin(((2 * Math.PI) / table.capacity) * index) * 75
                }px)`,
              }}
            ></div>
          ))}
          <h3>{table.name}</h3>
        </div>
      )}
    </div>
  );
};

export default VirtualCafeTable;
