import React from 'react';
import styles from './Card.css'

export default function Card(props) {
	return (
		<div className='card'>
			<div className='img-container'>
				<img src={props.image} alt="pokemon image" />
			</div>
			<h3 className='name'>{props.name}</h3>
			<div className='types-container'>
			{props.types.map(t => (
				<div className='type-bg'>
					<p className='type-text'>{t}</p>
				</div>
			))}
			</div>
		</div>
	)
}