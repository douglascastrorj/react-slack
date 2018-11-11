import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';


class Login extends Component {

  state = {
    email:'',
    password: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  }

  handleChange = (event) => { 
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  displayErrors = errors => errors.map((error,i) => <p key={i}> {error.message}</p>)

  handleSubmit = event => {
    event.preventDefault();
    if(this.isFormValid(this.state)){
      this.setState({
        errors: [],
        loading: true
      })

      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      })
    }
  }

  isFormValid = ({email, password}) => email && password;

  render() {
    const {
      email, 
      password, 
      errors,
      loading
    } = this.state;
    return (
      <div >
        <Grid textAlign="center" verticalAlign="middle" className="app">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" icon color="violet" textAlign="center">
              <Icon name="code branch" color="violet" />
              Login to DevChat
          </Header>

            <Form size="large"
                onSubmit={this.handleSubmit}
            >
              <Segment stacked>
               
                <Form.Input 
                  fluid 
                  name="email" 
                  icon="mail" 
                  iconPosition="left"
                  placeholder="Email Address" 
                  onChange={this.handleChange} 
                  type="email"
                  className={errors.some(error => error.message.toLowerCase().includes('email')) ? 'error' : ''}
                  value={email}
                />

                <Form.Input 
                  fluid 
                  name="password" 
                  icon="lock" 
                  iconPosition="left"
                  placeholder="Password" 
                  onChange={this.handleChange} 
                  type="password"
                  className={errors.some(error => error.message.toLowerCase().includes('password')) ? 'error' : ''}
                  value={password}
                />


                <Button 
                  className={loading? 'loading' : ''} 
                  color="violet" 
                  fluid 
                  size="large"
                > 
                  Submit 
                </Button>
              </Segment>
            </Form>
            {
              errors.length > 0 
              ?   <Message error> <h3>Error</h3> {this.displayErrors(errors)} </Message>
              : null            
            }
            <Message> 
              Don't have an account? <Link to="/register"> Register </Link> 
              </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;
