import { Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { ProductInterface } from '.';

const ShoppingItem = ({ product, handleOnClickShop }: { product: ProductInterface; handleOnClickShop: (product: ProductInterface, operation?: string) => void }) => {
  const {
    user: { basket, currency },
  } = useContext(UserContext);

  if (!basket) return null;

  return (
    <Grid key={product.id} item xs={3}>
      <Card sx={{ height: '450px' }}>
        <CardHeader
          title={
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.title}
            </Typography>
          }
          sx={{ height: '20%' }}
        />
        <CardMedia component='img' height='60%' width='100%' image={product.image} alt={product.description} sx={{ objectFit: 'contain', width: '100%', '&:hover': { cursor: 'pointer', transform: 'scale3d(1.05,1,1.2)' } }} />
        <CardContent>
          {basket.items[product.id]?.count > 0 ? (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' color='error' onClick={() => handleOnClickShop(product, 'remove')}>
                -
              </Button>
              {basket.items[product.id].count}
              <Button variant='contained' color='success' onClick={() => handleOnClickShop(product)}>
                +
              </Button>
            </Box>
          ) : (
            <Button variant='outlined' onClick={() => handleOnClickShop(product)}>
              Buy for {currency}
              {product.price}
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ShoppingItem;
