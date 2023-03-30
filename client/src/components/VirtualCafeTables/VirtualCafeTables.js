import { useStoreContext } from '../../utils/GlobalState';
import { selectTable } from '../../utils/actions';
import { Card as MuiCard, CardContent, Typography, Button } from '@material-ui/core';
import styled from '@emotion/styled';

const Card = styled(MuiCard)`
  margin: 1rem;
`;

const VirtualCafeTables = () => {
    const [state, dispatch] = useStoreContext();
  
    const tablesData = [
      { id: 1, name: 'Table 1', capacity: 4 },
      { id: 2, name: 'Table 2', capacity: 6 },
      { id: 3, name: 'Table 3', capacity: 8 },
      { id: 4, name: 'Table 4', capacity: 10 },
    ];
  
    const joinTable = (tableId) => {
    dispatch(selectTable(tableId));
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
                  disabled={state.selectedTable === table.id}
                >
                  {state.selectedTable === table.id ? 'Joined' : 'Join'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default VirtualCafeTables;