import React, { Fragment, useState, useEffect } from 'react'
import { Form, Input, Checkbox, Row, Col, Layout } from "antd";
import './login.scss';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom'
import logo from '../../assets/img/churrasco_logo.png'

//Redux
import { connect } from 'react-redux'
import { setAlert } from '../../redux/actions/alertAction'
import PropTypes from 'prop-types'
import { login } from '../../redux/actions/authActions';


const {Footer} = Layout

const Login = ({ setAlert, login, errors, isAuthenticated, loading }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert('Debes completar todos los campos', null, 'error')
        } else {
            await login({ email, password })
        }
        
    }

    //If login was not successfull:
    useEffect(() => {
        if (errors) {
            errors.forEach(error => {
                //console.log(error);
                setTimeout(() => {
                    setAlert(error, null, 'error')
                }, 2)   // I had to do this because otherwise this got excecuted multiple times and we got the same alert a lot of times. I think its a problem with redux excecution.
            })
        }
    }, [errors, setAlert])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (isAuthenticated) {
        return <Redirect to='/sites' />
    }

    return (
        <Fragment>

            <Form
                name="normal_login"
                className="login-form"
                onSubmitCapture={e => onSubmitForm(e)}
            >


                <Row className='justify-content-center'>
                    <Col xs={24} sm={12} md={8} lg={6}>

                        <img className='logo' src={logo} alt="" />

                        <Form.Item className='small-gap'>
                            <Input
                                className='input input-email'
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                name="email"
                                value={email}
                                onChange={e => onChangeInput(e)}
                                type="email"
                                placeholder="Username" />
                            <Input.Password
                                className='input input-password'
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                name="password"
                                value={password}
                                onChange={e => onChangeInput(e)}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item >
                            <div className='d-flex space-between align-center'>
                                <Checkbox className='ml-1 remember'>remember</Checkbox>

                                <button className='btn btn-login btn-rounded' type="submit">
                                    Log in
                                 </button>
                            </div>
                        </Form.Item>

                    </Col>
                </Row>
            </Form>
            <Footer className='footer footer-bottom'>web services under your control</Footer>
        </Fragment>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    errors: state.authReducer.errors,
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading
})

export default connect(mapStateToProps, { setAlert, login })(Login)
