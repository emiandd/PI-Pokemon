import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { createNewPokemon, getTypes } from '../../redux/actions.js';
import s from './Form.module.css';


function validation(input){

	let error = {};
	let regex = {
		name: /^[\w -]+$/,
		specialC: /^([0-9]{2}(\.\d{1,2})?)|$/,
		url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
	}

	

	if(!input.name){
		error.name = 'Name is required';
	}else if(!regex.name.test(input.name)){
		error.name = 'Invalid name'
	}

	if(!input.life){
		error.life = 'Life is required';
	}else if(!regex.specialC.test(input.life)){
		error.life = 'Special characters are not allowed';
	}else if(input.life < 1 || input.life > 100){
		error.life = 'Only numbers between the range of 1 to 100 are allowed';
	}

	if(!input.speed){
		error.speed = 'Speed is required';
	}else if(!regex.specialC.test(input.speed)){
		error.speed = 'Special characters are not allowed';
	}else if(input.speed < 1 || input.speed > 100){
		error.speed = 'Only numbers between the range of 1 to 100 are allowed';
	}

	if(!input.attack){
		error.attack = 'Attack is required';
	}else if(!regex.specialC.test(input.attack)){
		error.attack = 'Special characters are not allowed';
	}else if(input.attack < 1 || input.attack > 150){
		error.attack = 'Only numbers between the range of 1 to 150 are allowed';
	}

	if(!input.height){
		error.height = 'Height is required';
	}else if(!regex.specialC.test(input.height)){
		error.height = 'Special characters are not allowed';
	}else if(input.height < 1 || input.height > 500){
		error.height = 'Only numbers between the range of 1 to 500 are allowed';
	}

	if(!input.defense){
		error.defense = 'Defense is required';
	}else if(!regex.specialC.test(input.defense)){
		error.defense = 'Special characters are not allowed';
	}else if(input.defense < 1 || input.defense > 100){
		error.defense = 'Only numbers between the range of 1 to 100 are allowed';
	}

	if(!input.weight){
		error.weight = 'Weight is required';
	}else if(!regex.specialC.test(input.weight)){
		error.weight = 'Special characters are not allowed';
	}else if(input.weight < 1 || input.weight > 1000){
		error.weight = 'Only numbers between the range of 1 to 1000 are allowed';
	}

	if(!input.image){
		error.image = 'Image is required';
	}else if(!regex.url.test(input.image)){
		error.image = 'Only image URL format allowed';
	}

	if(input.types.length === 0){
		error.types = 'Select at least one type';
	}

	return error;

}

export default function Form() {

	const types = useSelector( state => state.allTypes );
	const msgPokemonCreated = useSelector( state => state.newPokemon);
	// console.log(typeof msgPokemonCreated);

	const dispatch = useDispatch();

	const [createBtn, setCreateBtn] = useState(true);
	const [error, setError]	= useState({})
	const [input, setInput] = useState({
		name: '',
		life: 1,
		speed: 1,
		attack: 1,
		height: 1,
		defense: 1,
		weight: 1,
		image: '',
		types: []
	});

	useEffect( () => {
		if(error.name ||
			 error.life || 
			 error.speed ||
			 error.attack || 
			 error.height ||
			 error.defense || 
			 error.weight || 
			 error.image || 
			 error.types){
			setCreateBtn(true)
		}else{
			setCreateBtn(false)
		}
	},);

	// console.log(input);
	
	function handleInputChange(e){
		e.preventDefault()
		// console.log(e.target.value);
		setInput({
			...input,
			[e.target.name]: e.target.value
		})

		setError(validation({...input,
		  [e.target.name]: e.target.value}))
	}

	function addOrDeleteType(e){
		// const array = [];
		setInput({
			...input,
			[e.target.name]: !input.types.includes(e.target.value) ? [...input.types, e.target.value] : input.types.filter( t => t !== e.target.value )
		})

		setError(validation({...input,
			[e.target.name]: [e.target.value]}))
	}										

	function handleSubmit(e){
		// console.log('enviando información');
		e.preventDefault()
		dispatch(createNewPokemon(input))
	}

	return (
		<div>
			<Navbar />
			<div>
				<form onSubmit={ (e) => handleSubmit(e)}>
					<div className={s.inputs}>
						<div className={s.notification}>
							{ Object.keys(msgPokemonCreated).length === 0 ? null : msgPokemonCreated.toString() }
						</div>
						<label className={error.name && s.errorLabel} htmlFor="" >Name: </label>
						<input onChange={handleInputChange}
									 value={input.name} 
									 type="text" 
									 placeholder='Name your Pokemon'
									 name='name'
									 className={error.name && s.error}
						/>
						{error.name && <p className={s.errorLabel}>{error.name}</p>}

						<label className={error.life && s.errorLabel} htmlFor=""  >Life: </label>
						<input onChange={handleInputChange}
									 value={input.life}
									 type="number" 
									 min='1' 
									 max='100' 
									 placeholder='60'
									 name='life'
									 className={error.life && s.error}
						/>
						{error.life && <p className={s.errorLabel}>{error.life}</p>}

						<label className={error.speed && s.errorLabel} htmlFor="" >Speed: </label>
						<input onChange={handleInputChange}
									 value={input.speed}
									 type="number" 
									 min='1' 
									 max='100' 
									 placeholder='40'
									 name='speed'
									 className={error.speed && s.error}
						/>
						{error.speed && <p className={s.errorLabel}>{error.speed}</p>}

						<label className={error.attack && s.errorLabel} htmlFor="" >Attack: </label>
						<input onChange={handleInputChange}
									 value={input.attack}
						 			 type="number" 
						 			 min='1' 
						 			 max='150' 
						 			 placeholder='65'
						 			 name='attack'
						 			 className={error.attack && s.error}
						/>
						{error.attack && <p className={s.errorLabel}>{error.attack}</p>}

						<label className={error.height && s.errorLabel} htmlFor="" >Height: </label>
						<input onChange={handleInputChange}
									 value={input.height}
									 type="number" 
									 min='1' 
									 max='500' 
									 placeholder='25'
									 name='height'
									 className={error.height && s.error}
						/>
						{error.height && <p className={s.errorLabel}>{error.height}</p>}

						<label className={error.defense && s.errorLabel} htmlFor="" >Defense: </label>
						<input onChange={handleInputChange}
									 value={input.defense}
									 type="number" 
									 min='1' 
									 max='100' 
									 placeholder='70'
									 name='defense'
									 className={error.defense && s.error}
						/>
						{error.defense && <p className={s.errorLabel}>{error.defense}</p>}

						<label className={error.weight && s.errorLabel} htmlFor="" >Weight: </label>
						<input onChange={handleInputChange}
									 value={input.weight}
						 			 type="number" 
						 			 min='1' 
						 			 max='1000' 
						 			 placeholder='40'
						 			 name='weight'
						 			 className={error.weight && s.error}
						/>
						{error.weight && <p className={s.errorLabel}>{error.weight}</p>}

						<label className={error.image && s.errorLabel} htmlFor="" >Image: </label>
						<input onChange={handleInputChange}
						 				value={input.image}
						 			  type="text"
						 			  placeholder='http://yourimage.com/image.jpg or png'
						 			  name='image'
						 			  className={error.image && s.error}
						/>
						{error.image && <p className={s.errorLabel}>{error.image}</p>}

						<button className={ createBtn ? s.buttonDisabled : s.buttonEnabled } type='submit'>Create Pokemon</button>
					</div>
					<div className={s.types}>
						<label className={error.types && s.errorLabel} htmlFor="" >Types: </label>
						<div>
							{types?.map( t  => 
								<p><input onChange={addOrDeleteType}
												  type="checkbox" 
												  value={t.name} 
												  name='types'
												  className={error.types && s.error}/>{t.name}</p>
							)}
						</div>
						{error.types && <p className={s.errorLabel}>{error.types}</p>}
					</div>
				</form>
			</div>
		</div>
	)
}