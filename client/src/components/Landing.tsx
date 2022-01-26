import React, { Component } from 'react';
import ClientsList from './ClientsList';

export default class LandingPage extends Component {
    public render() {
        return (
            <div className="m-4">
                <div className="columns">
                    <div className="column is-6">
                        <section className="section is-large">
                            <h1 className="title">DoZ production</h1>
                            <h2 className="subtitle">
                                zastupovanie hercov
                            </h2>
                        </section>
                    </div>
                    <div className="column is-6">
                        <figure style={{cursor: "pointer"}}>    
                            <a className="" href={"/clients/"}>
                                <img className="m-0 p-0" src={require(`../media/f24a2def368fa2bf6f3754202c5efa0e.jpeg`)} />
                            </a>
                        </figure>
                    </div>
                </div>
            </div>
        )
    }
}
