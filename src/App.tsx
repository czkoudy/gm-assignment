import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import ShoppingItem from './ShoppingItem';
import ShoppingBasket from './ShoppingBasket';
import { ProductInterface } from '.';
import { UserContext } from './context/UserContext';

const App = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios('https://fakestoreapi.com/products?limit=18')
      .then((result) => setProducts(result.data))
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  if (isLoading) return <CircularProgress />;

  const handleOnClickShop = (product: ProductInterface, operation = 'add') => {
    setUser(
      (prevState: {
        basket: {
          items: { [x: string]: number }[];
          totalCount: number;
          totalPrice: any;
        };
      }) => ({
        ...prevState,
        basket: {
          items: {
            ...prevState.basket.items,
            //  {
            [product.id]: {
              ...product,
              count:
                operation === 'add'
                  ? typeof prevState?.basket?.items[product.id] === 'undefined'
                    ? 1
                    : prevState?.basket?.items[product.id]['count'] + 1
                  : prevState.basket.items[product.id]['count'] - 1,
            },
            // },
          },
          totalCount:
            operation === 'add'
              ? prevState.basket.totalCount + 1
              : prevState.basket.totalCount - 1,
          totalPrice:
            operation === 'add'
              ? parseFloat(Number(prevState.basket.totalPrice).toFixed(2)) +
                parseFloat(Number(product.price).toFixed(2))
              : parseFloat(Number(prevState.basket.totalPrice).toFixed(2)) -
                parseFloat(Number(product.price).toFixed(2)),
        },
      })
    );
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ paddingTop: '20px' }}>
        Jakub's Online Shop
      </Typography>
      <Grid
        container
        sx={{ width: '100%', marginTop: '50px', marginBottom: '50px' }}
      >
        <Grid item xs={8} sx={{ width: '80%' }}>
          <Grid
            container
            columnGap={5}
            rowGap={5}
            sx={{ justifyContent: 'center' }}
          >
            {products?.map((product) => (
              <ShoppingItem
                key={product.id}
                product={product}
                handleOnClickShop={handleOnClickShop}
              />
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: 'flex', justifyContent: 'center', minHeight: '300px' }}
        >
          <Grid container sx={{ justifyContent: 'center' }}>
            <ShoppingBasket handleOnClickShop={handleOnClickShop} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
