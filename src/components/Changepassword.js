import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';
import Container from 'react-bootstrap/Container'
import { FaSave } from "react-icons/fa";

function ChangePassword() {
	const { currentUser } = useContext(AuthContext);
	const [pwMatch, setPwMatch] = useState('');
	console.log(currentUser);

	const submitForm = async (event) => {
		event.preventDefault();
		const { currentPassword, newPasswordOne, newPasswordTwo } = event.target.elements;

		if (newPasswordOne.value !== newPasswordTwo.value) {
			setPwMatch('New Passwords do not match, please try again');
			return false;
		}

		try {
			await doChangePassword(currentUser.email, currentPassword.value, newPasswordOne.value);
			alert('Password has been changed, you will now be logged out');
		} catch (error) {
			alert(error);
		}
	};
	if (currentUser.providerData[0].providerId === 'password') {
		return (
			<div>

				{pwMatch && <h4 className='error'>{pwMatch}</h4>}
				<br />
				<h2 className="text-center">CHANGE PASSWORD</h2>
				<hr />
				<br />
				<Container>
					<form onSubmit={submitForm}>
						<div className='form-group row'>
							<label className="col-sm-2 col-form-label col-form-label-sm">
								CURRENT PASSWORD
							</label>
							<input
								className='form-control col'
								name='currentPassword'
								id='currentPassword'
								type='password'
								placeholder='Current Password'
								required
							/>

						</div>

						<div className='form-group row'>
							<label className="col-sm-2 col-form-label col-form-label-sm">
								NEW PASSWORD
							</label>
							<input
								className='form-control col'
								name='newPasswordOne'
								id='newPasswordOne'
								type='password'
								placeholder='Password'
								required
							/>

						</div>
						<div className='form-group row'>
							<label className="col-sm-2 col-form-label col-form-label-sm">
								CONFIRM NEW PASSWORD
							</label>
							<input
								className='form-control col'
								name='newPasswordTwo'
								id='newPasswordTwo'
								type='password'
								placeholder='Confirm Password'
								required
							/>

						</div>
						<button type="submit" class="btn btn-success float-right"> <FaSave /> CHANGE PASSWORD</button>

					</form>

					<br />
				</Container>
			</div>
		);
	} else {
		return (
			<div>
				<Container className="text-center">
					<br />
					<h2>You are signed in using a Social Media Provider, You cannot change your password</h2>
					<hr />
				</Container>
			</div>
		);
	}
}

export default ChangePassword;