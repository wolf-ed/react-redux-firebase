import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My first book',
    description: 'The first book blahblah'
  },
  {
    id: 'p2',
    price: 50,
    title: 'My sec book',
    description: 'The sec book blahblah'
  },
  {
    id: 'p3',
    price: 14,
    title: 'My thi book',
    description: 'The thi book blahblah'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product =>
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
