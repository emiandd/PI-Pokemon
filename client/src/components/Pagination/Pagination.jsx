import React from 'react';
import styles from './Pagination.css';

export default function Pagination({pokemonsPerPage, allPokemons, paginated, currentPage}) {

	let pageNumbers = [];
	let totalPages = Math.ceil(allPokemons / pokemonsPerPage);

	for(let i = 0; i < totalPages; i++){
		pageNumbers.push(i + 1);
	}


	return (
		<div className='pagination-container'>
			<ul className='pagination'>
					{pageNumbers?.map( n => 
						<li className='number' key={n}>
							<button className={currentPage === n? 'activePage' : 'normalPage'}
											onClick={() => paginated(n)}>
								{n}
							</button>
						</li>
					)}		
			</ul>
		</div>
	)
}