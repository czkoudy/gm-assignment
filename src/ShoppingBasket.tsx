import { Box, Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { ProductInterface } from '.';

const ShoppingBasket = ({ handleOnClickShop }: { handleOnClickShop: (product: ProductInterface, operation?: string) => void }) => {
  const {
    user: { basket, currency },
  } = useContext(UserContext);

  return (
    <Grid item sx={{ position: 'fixed' }}>
      <Card sx={{ width: '400px', minHeight: '100px' }}>
        <CardHeader title={<Typography variant='h5'>Shopping Basket</Typography>} />
        <CardContent>
          {basket && basket.totalCount <= 0 ? (
            'Shopping basket is empty!'
          ) : (
            <TableContainer>
              <Table sx={{}} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align='right'>Pcs</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basket &&
                    Object.entries(basket.items)?.map((row) => {
                      if (row[1]['count'] <= 0) return;

                      return (
                        <TableRow key={row[1]['id']} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component='th' scope='row'>
                            {row[1]['title']}
                          </TableCell>
                          <TableCell align='right'>{row[1]['count']}</TableCell>
                          <TableCell>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                              <Button sx={{ padding: '0px', margin: '0px', minWidth: '30px' }} variant='contained' color='error' onClick={() => handleOnClickShop(row['1'], 'remove')}>
                                -
                              </Button>

                              <Button sx={{ padding: '0px', margin: '0px', minWidth: '30px' }} variant='contained' color='success' onClick={() => handleOnClickShop(row['1'])}>
                                +
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total Price:</TableCell>
                    <TableCell align='right'>
                      {currency}
                      {Number(basket?.totalPrice).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ShoppingBasket;
