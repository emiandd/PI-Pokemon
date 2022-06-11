import Card from '../Card/Card.jsx';
import React, { Component } from 'react';
import { getAllPokemons } from '../../redux/actions.js';
import { connect } from 'react-redux';
import styles from './Cards.css';

class Cards extends Component {

	componentDidMount(){
		this.props.getAllPokemons();
		console.log(this.props.currentPokemons)
	}

	render() {
		return (
			<div className='cards-container'>
				{this.props.currentPokemons.map( p => (
					<Card
						image={p.image}
						name={p.name}
						types={p.types}
					/>
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
