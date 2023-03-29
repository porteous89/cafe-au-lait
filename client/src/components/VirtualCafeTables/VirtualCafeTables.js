import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';

const VirtualCafeTables = () => {
    const [selectedTable, setSelectedTable] = useState(null);
  
    const tablesData = [
      { id: 1, name: 'Table 1', capacity: 4 },
      { id: 2, name: 'Table 2', capacity: 6 },
      { id: 3, name: 'Table 3', capacity: 8 },
      { id: 4, name: 'Table 4', capacity: 10 },
    ];
  
    const joinTable = (tableId) => {
      setSelectedTable(tableId);
    };
  
    return (
      <div>
        <h2>Virtual Cafe Tables</h2>
        <div>
          {tablesData.map((table) => (
            <Card key={table.id}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {table.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Seating capacity: {table.capacity}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => joinTable(table.id)}
                  disabled={selectedTable === table.id}
                >
                  {selectedTable === table.id ? 'Joined' : 'Join'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default VirtualCafeTables;