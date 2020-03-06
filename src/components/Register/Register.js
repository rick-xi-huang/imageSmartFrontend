import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };

    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput">Name</label>
                    <input type="name" className="form-control" id="formGroupExampleInput" onChange={this.onNameChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput2">Email</label>
                    <input type="email" className="form-control" id="formGroupExampleInput2" onChange={this.onEmailChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="formGroupExampleInput3">Password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput3" onChange={this.onPasswordChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => this.props.onRouteChange("home")}>Submit</button>
            </form>
        )
    }
}

export default Register;