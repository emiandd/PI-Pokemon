import React from 'react';
import s from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function Landing() {
	return (
		<div className={s.container}>
			<Link className={s.btnText} to='/home'>
					<div className={s.btnHome}>
						<p >HOME</p>
					</div>
			</Link>
		</div>
	)
}

