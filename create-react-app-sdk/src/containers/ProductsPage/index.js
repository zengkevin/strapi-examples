/**
 * 
 * ProductsPage
 */

import React from 'react';
import { Link }  from 'react-router-dom';
import strapi from '../../utils/Strapi';
import Table from '../../components/Table';

import './styles.scss';

class ProductsPage extends React.PureComponent {
	state = { products: [], error: false };

	componentDidMount() {
		this.getProducts();
	}

	getProducts = async () => {
		try {
			const products = await strapi.getEntries('product');
			this.setState({ products });
		} catch(err) {
			// TODO handle error status 403 or 401
			this.setState({ error: true });
		}
	}

	onClick = (id) => {
    this.props.history.push(`/product/${id}`);
  }

	render() {
		const { error, products } = this.state;

		if (error) {
			return <div>An error occured</div>;
		}

		return (
			<div className="productPage">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<h1>Products</h1>
						</div>
						<div className="col-md-4 offset-md-4 productPageLink">
							<Link to="/product/create">Create a product</Link>
						</div>
					</div>
					<div className="row">
						<Table
						data={products}
						headers={['id', 'name', 'pictures', '']}
						onClick={this.onClick}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductsPage;