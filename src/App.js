import { Component, useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import CounterItem from './counter-item/counter-item';

// class User extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			counter: 0,
// 			age: '21',
// 			isLogin: false,
// 		};
// 	}

// 	onIncrement = () => this.setState(prevState => ({ counter: prevState.counter + 1 }));

// 	onDecrement = () => this.setState(prevState => ({ counter: prevState.counter - 1 }));

// 	onRestart = () => this.setState({ counter: 0 });

// 	changeHandler = e => this.setState({ age: e.target.value });

// 	onToggleLogin = () => {
// 		this.setState(prevState => ({ isLogin: !prevState.isLogin }));
// 	};

// 	componentDidMount = () => {
// 		console.log('mount');
// 	};
// 	// componentDidUpdate = () => {
// 	// 	console.log('Update');
// 	// };
// 	componentDidCatch = () => {
// 		document.title = `Counter: ${this.state.counter}`;
// 		console.log('Catch');
// 	};
// 	componentWillUnmount = () => {
// 		document.title = `Counter: ${this.state.counter}`;
// 		// window.addEventListener('click', () => console.log('click'));
// 		console.log('Unmount');
// 	};

// 	render() {
// 		const { firstName, lastName, link } = this.props;
// 		const { age, counter } = this.state;

// 		return (
// 			<div className='w-50 mx-auto'>
// 				<div className='border p-3 mt-5'>
// 					<h4>
// 						Mening ismim - {firstName}, sharifim - {lastName} , Yoshim - {age}
// 					</h4>
// 					<a href={link}>Youtube kanalim</a>
// 					<div className='mt-3'>
// 						<p className='text-center'>{counter}</p>
// 						<div className='d-flex justify-content-center'>
// 							<button className='btn btn-primary ' onClick={this.onIncrement}>
// 								+
// 							</button>
// 							<button className='btn btn-outline-primary mx-2' onClick={this.onRestart}>
// 								Restart
// 							</button>
// 							<button className='btn btn-success' onClick={this.onDecrement}>
// 								+
// 							</button>
// 						</div>
// 					</div>
// 					<form>
// 						<span>Yoshingiz</span>
// 						<input type='text' className='form-control' onChange={e => this.changeHandler(e, 'Usman')} />
// 					</form>
// 					{this.state.isLogin ? <p>Login User</p> : null}

// 					<button className='btn btn-success' onClick={this.onToggleLogin}>
// 						Login
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	}
// }
//useMemo hooks
const bigCountNumber = number => {
	let i = 0;
	while (i < 1000000000) i++;
	console.log(i);
	return number * 2;
};
console.log(bigCountNumber);

const User = ({ firstName, lastName, link }) => {
	const [counter, setCount] = useState(0);
	const [isLogin, setIsLogin] = useState(false);
	const [active, setActive] = useState(true);

	const onIncrement = () => {
		setCount(prevState => prevState + 1);
		setCount(prevState => prevState + 1);
		//bu holatda biz hohlagandek ikkita birni qo'shib beradi
	};
	const colors = {
		fontWeight: 'bold',
		color: active ? 'black' : 'red',
	};

	//useMemo hook
	const number = useMemo(() => bigCountNumber(counter), [counter]);

	const onRestart = () => {
		setCount(0);
	};

	const onDecrement = () => {
		setCount(counter - 1);
		setCount(counter - 2);
		//Bu yerda eng ohirgi kelganini oladi va ikkitasi birdaniga ishlamaydi
	};

	const onToggleLogin = () => {
		setIsLogin(prevState => !prevState);
	};

	const onToggle = () => setActive(prevState => !prevState);
	//USECALLBACK
	const counterGenerate = useCallback(() => {
		return new Array(counter).fill('').map((_, idx) => `Counter number ${idx + 1}`);
	}, [counter]);

	useEffect(() => {
		//useEffectni hohlagancha ishlatish mumkin
		//didMount and update ishga tushira oladi
		console.log('effec'); //DidMount and DidUpdate
		document.title = `Counter ${counter}`;

		return () => console.log('deleted'); //WillUnmount
	}, []); //Qaram qilib qo'yilgan bo'sh massiv berib qo'yilsa User saytga kirganda birmartagina ishlaydi
	return (
		<div className='w-50 mx-auto'>
			<div className='border p-3 mt-5'>
				<h1>
					Mening ismim - {firstName}, sharifim - {lastName}
				</h1>
				<a href={link}>Youtube chanell</a>
				<p className='text-center h2' style={colors}>
					User activeted {number}
				</p>
				<div className='d-flex justify-content-center'>
					<button className='btn btn-outline-primary' onClick={onToggle}>
						Colors
					</button>
					<button className='btn btn-primary' onClick={onIncrement}>
						+
					</button>
					<button className='btn btn-warning mx-3' onClick={onRestart}>
						restart
					</button>
					<button className='btn btn-success mx-1' onClick={onDecrement}>
						-
					</button>
				</div>
				<div className='text-center mt-3'>
					{isLogin ? <p>LOGIN</p> : 'Siz Login qilishingiz kerak'}
					<br />
					<button className='btn btn-outline-primary' onClick={onToggleLogin}>
						Kirish
					</button>
				</div>
				<CounterItem counterGenerate={counterGenerate} />
			</div>
		</div>
	);
};

const App = () => {
	const [isDisplay, setIsDisplay] = useState(true);

	const deleteDisplayHandler = () => {
		setIsDisplay(false);
	};

	return (
		<>
			<button onClick={deleteDisplayHandler}>Display</button>
			{
				isDisplay && <User firstName={'Usman'} lastName={'Usmanov'} link={'youtube.com'} />
				// <User firstName={'Omar'} lastName={'Abdulloh'} link={'google.com'} />
			}
			<User firstName={'Omar'} lastName={'Abdulloh'} link={'google.com'} />
		</>
	);
};

export default App;
