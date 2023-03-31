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

import React from 'react';
import TableActions from './TableActions';
import './VirtualCafeTable.css';

const VirtualCafeTable = ({ table }) => {
  return (
    <div className="virtual-cafe-table">
      <h3>{table.name}</h3>
      {table.seats && (
        <div className="table">
          {table.seats.map((isAvailable, index) => (
            <div
              key={index}
              className={`seat ${isAvailable ? 'available' : 'taken'}`}
              style={{
                transform: `translate(${Math.cos((2 * Math.PI / table.seats.length) * index) * 50}px, ${Math.sin(
                  (2 * Math.PI / table.seats.length) * index,
                ) * 50}px)`,
              }}
            ></div>
          ))}
        </div>
      )}
      <TableActions table={table} />
    </div>
  );
};

export default VirtualCafeTable;