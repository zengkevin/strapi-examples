/**
 * 
 * ProductsPage
 */

import React from 'react';
import strapi from '../../utils/Strapi';

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
			console.log(err);
			this.setState({ error: true });
		}
	}

	render() {
		const { error, products } = this.state;

		if (error) {
			return <div>An error occured</div>;
		}
		
		return (
			<div className="productPage">
				<h1>See all products</h1>
				<div className="container">
				</div>
			</div>
		);
	}
}

export default ProductsPage;