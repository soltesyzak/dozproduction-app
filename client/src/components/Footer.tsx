import React, { Component } from "react";
import { SocialIcon } from 'react-social-icons';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

interface IProps {}

interface IState {}

export default class Footer extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {}
    }

    public render() {
        return (
            <div className="">
                <div 
                    style={{minHeight: "1px", background:"white"}}
                    className="mt-6"
                />
                <footer className="footer py-6 px-5 has-background-black">
                    <div className="content" >
                        <div className="columns my-4" style={{textAlign:"center"}}>

                            <div className="column is-4">
                                <div>
                                    <a className="has-text-white is-left" href="tel:+421902163191">
                                        <FaPhone className="" /> 
                                        <span className="ml-2">+421 902 163 191</span>
                                    </a>
                                </div>
                                <div>
                                    <a className="has-text-white" href="mailto:lukas.doza@gmail/com">
                                        <FaEnvelope />
                                        <span className="ml-2">lukas.doza@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                            <div className="column is-4">
                                    <SocialIcon target="_blank" className="ml-3" url="https://instagram.com/doz_group" />
                                    <SocialIcon target="_blank" className="ml-3" url="https://facebook.com/DoZproduction/" />
                            </div>
                            <div className="column is-4">
                                created by ™Yzo
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}