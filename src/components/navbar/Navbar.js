import React, { Fragment } from 'react'
import { Layout, Menu } from 'antd';
import './navbar.scss'
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/authActions';

const { Header } = Layout;

const Navbar = ({ authReducer: { isAuthenticated, loading }, logout }) => {


    const loggedUserLinks = (
        <Header className='navbar'>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/sites'>Sites</Link></Menu.Item>
                <Menu.Item key="2"><Link onClick={logout} to='/login'>Logout</Link></Menu.Item>
            </Menu>
        </Header>

    )

    const guestUserLinks = (
        // Si queremos que se muestre un menu para los usuarios que no se han logueado:
        // (Quitar d-none)
        <Header className='navbar d-none'>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link to='/login'>Login</Link></Menu.Item>
            </Menu>
        </Header>
    )

    return (
        <Layout className="layout">

            {!loading && (
                <Fragment>
                    {isAuthenticated ? loggedUserLinks : guestUserLinks}
                </Fragment>
            )}

        </Layout>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    authReducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authReducer: state.authReducer
})

export default connect(mapStateToProps, { logout })(Navbar)
