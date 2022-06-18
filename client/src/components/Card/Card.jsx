import React from 'react';
import s from './Card.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetCards } from '../../redux/actions.js';

export default function Card(props) {
	
	return (
		<div className={s.card}>
			<div className={s.imgContainer}>
				<img src={props.image} alt="pokemon image" />
			</div>
			<h3 className={s.name}>{props.name}</h3>
			<div className={s.typesContainer}>
			{props.types?.slice(0,2).map(t => (
				<div className={s.typeBg} id={t.name}>
					<p className={s.typeText}>{t.name}</p>
				</div>
			))}
			</div>
		</div>
	)
}