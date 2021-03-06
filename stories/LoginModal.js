import React from 'react';

import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs, button } from '@storybook/addon-knobs';

import { Provider } from 'react-redux'
import { createStore, logout } from 'oip-state'

import AccountButton from '../src/components/AccountButton/AccountButton.js'
import LoginModal from '../src/components/LoginModal/LoginModal.js'

import 'bootstrap/dist/css/bootstrap.min.css'

import StoreDebugHelper from './StoreDebugHelper'

// Setup Stories
const stories = storiesOf('LoginModal', module);
stories.addDecorator(withKnobs)

// Setup Store
const store = createStore()

stories.add('Example', () => {
	button("Dispatch Logout", () => { store.dispatch(logout()) })
	return (
		<Provider store={store}>
			<div>
				<AccountButton />
				<LoginModal />
				<hr />
				<StoreDebugHelper path={['Account', 'showLoginModal']} />
				<StoreDebugHelper path={['Account', 'showRegisterModal']} />
				<StoreDebugHelper path={['Account', 'isLoggedIn']} />
				<StoreDebugHelper path={['Account', 'loginFetching']} />
				<StoreDebugHelper path={['Account', 'registerFetching']} />
				<StoreDebugHelper path={['Account', 'Account', '_username']} />
			</div>
		</Provider>
	)
});