import React, { useEffect, Fragment } from 'react'
import { Card, Row, Col, Layout, Typography } from 'antd';
import './sites.scss'


//Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSites } from '../../redux/actions/sitesActions'

const { Footer } = Layout
const { Meta } = Card;
const { Title } = Typography;

const Sites = ({ sitesLoading, sites, getSites }) => {



    useEffect(() => {
        getSites()
    }, [getSites])


    if (sitesLoading) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <Fragment>
            <Title>Hey! Welcome to Churrasco Travel <span role="img" aria-label='emoji'>🥩</span><span role="img" aria-label='emoji'>🛩</span> </Title>
            <Title level={4}>These are some of the destinations we can offer FOR FREE!</Title>
            <small>DISCLAIMER: We only offer Google Maps based travels  <span role="img" aria-label='emoji'>😬</span>
            <br/> If you have any issues while traveling... it's Google's fault</small>
            <div className='mt-4'>
                <Row type="flex" gutter={[24, 24]}>
                    {sites.map((site, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <Card

                                cover={<div className='site-image' style={{backgroundImage: `url(${site.url_imagen})`}}></div>}
                            >

                                <div className="d-flex card-meta">
                                    <Meta title={site.nombre} description={site.descripcion} />
                                    <a className='btn btn-rounded' target='_blank' rel="noopener noreferrer" href={`https://maps.google.com?q=${site.ubicacion._lat},${site.ubicacion._long || site.ubicacion._lon}`}>Ver en Maps</a>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <Footer className='footer'>web services under your control</Footer>
        </Fragment>

    )





}

Sites.propTypes = {
    sitesLoading: PropTypes.bool,
    sites: PropTypes.array,
    getSites: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    sitesLoading: state.sitesReducer.loading,
    sites: state.sitesReducer.sites,
})

export default connect(mapStateToProps, { getSites })(Sites)
