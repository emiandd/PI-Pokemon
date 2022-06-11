import React from 'react';
import styles from './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing() {
	return (
		<div className='container'>
			<Link to='/home'>
				<div className='btn-home'>
					<button>Home</button>
				</div>
			</Link>
		</div>
	)
}

