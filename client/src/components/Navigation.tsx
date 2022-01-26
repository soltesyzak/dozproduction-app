import React, { Component } from 'react';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

interface IProps {}

interface IState {
    isActive: boolean
}

export default class Navigation extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onClickMenu = this.onClickMenu.bind(this);
        this.state = {
            isActive: false
        }
    }

    onClickMenu() {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    public render () {
        const { isActive } = this.state;
        return (
            <div style={{minHeight:"85px"}}>
                <nav className="p-0 navbar is-fixed-top" role="navigation" aria-label="main navigation" onClick={this.onClickMenu}>
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            LOGO
                            {/* <figure className="image">
                                <img />
                            </figure> */}
                        </a>
                        <a role="button" className={"navbar-burger"+ (isActive ? " is-active": "")} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarBasicExample" style={{minHeight:"85px"}} className={"navbar-menu"+ (isActive ? " is-active": "") }>
                        <div className="navbar-start">
                            <a className="navbar-item" href="/clients">
                                Herci
                            </a>
                            <a className="navbar-item" href="/clients">
                                Herečky
                            </a>
                            <a className="navbar-item" href="/clients">
                                Detskí herci
                            </a>
                            <a className="navbar-item" href="/about">
                                O nás
                            </a>
                        </div>
                        <div className="navbar-end">
                            <a className="navbar-item" target="_blank" href="https://facebook.com/DoZproduction/">
                                <FaFacebook style={{fontSize:"24px"}} />
                            </a>
                            <a className="navbar-item" target="_blank" href="https://instagram.com/doz_group">
                                <FaInstagram style={{fontSize:"24px"}} />
                            </a>
                            <a className="navbar-item" href="tel:+421902163191">
                                <FaPhone style={{fontSize:"24px"}} />
                            </a>
                            <a className="navbar-item" target="_blank" href="mailto:lukas.doza@gmail/com">
                                <FaEnvelope style={{fontSize:"24px"}} />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}