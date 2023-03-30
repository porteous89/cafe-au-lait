import React from 'react';
import TableActions from './TableActions';

const VirtualCafeTable = ({ table }) => {
  return (
    <div className="virtual-cafe-table">
      <h3>{table.name}</h3>
      <TableActions table={table} />
    </div>
  );
};

export default VirtualCafeTable;