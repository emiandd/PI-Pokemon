import Card from '../Card/Card.jsx';
import React, { Component } from 'react';
import { getAllPokemons } from '../../redux/actions.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Cards.css';

class Cards extends Component {

	componentDidMount(){
		this.props.getAllPokemons();
		// console.log(this.props.currentPokemons);
	}

	render() {
		return (
			<div className='cards-container'>
				{this.props.currentPokemons?.map( p => (
					<Link className="link-styles" to={`/detail/${p.id}`}>
						<Card
							image={p.image}
							name={p.name}
							types={p.types}
						/>
					</Link>
				))}
			</div>
		)
	}
}

function mapStateToProps(state){
	return{
		allPokemons: state.allPokemons
	}
}


export default connect(mapStateToProps, {getAllPokemons})(Cards)
