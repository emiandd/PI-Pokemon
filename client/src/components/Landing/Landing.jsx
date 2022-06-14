import React from 'react';
import styles from './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
	return (
		<div className='container'>
			<Link className='btn-text' to='/home'>
					<div className='btn-home'>
						<p >HOME</p>
					</div>
			</Link>
		</div>
	)
}

