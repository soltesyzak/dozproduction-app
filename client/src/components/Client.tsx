import React, { Component, ChangeEvent } from 'react';
import ClientDataService from '../services/Service';
import IClientData from '../types/Client'
import UploadFile from './UploadFile';

interface IProps {
    id?: string;
}

interface IState {
    currentClient: IClientData;
    message: string;
    url: string;
    heroBanner: string;
    deleted: boolean;
}

export default class Client extends Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMaxAge = this.onChangeMaxAge.bind(this);
        this.onChangeMinAge = this.onChangeMinAge.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeIsKid = this.onChangeIsKid.bind(this);
        this.onChangeIsVisible = this.onChangeIsVisible.bind(this);

        this.getClient = this.getClient.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.removeClient= this.removeClient.bind(this);
        this.state = {
            currentClient: {
                _id: "",
                _rev: "",
                name:"",
                maxAge:0,
                minAge:0,
                sex: "",
                isKid: false,
                isVisible: false
            },
            heroBanner: "is-info",
            message: "",
            deleted: false,
            url: window.location.pathname
        }
    }

    componentDidMount() {
        const id: string = this.state.url.substring(this.state.url.lastIndexOf('/') + 1);
        this.getClient(id)
    }

    getClient(id: string) {
        ClientDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentClient: response.data
                })
                console.log(response.data)
            }).catch((e: Error) => {
                console.log(e)
            })
    }
    
    onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    name:name
                }
            }
        });
    }

    onChangeMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
        const age = Number(e.target.value);
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    maxAge:age
                }
            }
        });
    }

    onChangeMinAge = (e: ChangeEvent<HTMLInputElement>) => {
        const age = Number(e.target.value);
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    minAge:age
                }
            }
        });
    }

    onChangeSex = (e: ChangeEvent<HTMLInputElement>) => {
        const sex = e.target.value;
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    sex: sex
                }
            }
        });
    }

    onChangeIsKid = (e: ChangeEvent<HTMLInputElement>) => {
        const isKid = e.target.checked ? true : false
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    isKid: isKid
                }
            }
        });
    }

    onChangeIsVisible = (e: ChangeEvent<HTMLInputElement>) => {
        const isVisible = e.target.checked ? true : false
        this.setState((prevState) => {
            return {
                currentClient: {
                    ...prevState.currentClient,
                    isVisible: isVisible
                }
            }
        });
    }

    updateClient() {
        ClientDataService.update(
            this.state.currentClient,
            this.state.currentClient._id
        ).then((response: any) => {
            console.log(response);
            this.setState({
                currentClient:{
                    ...this.state.currentClient,
                    _rev: response.data.rev,
                },
                message: "Zmeny boli úspešne uložené",
                heroBanner: "is-success"
            });
            console.log(this.state)
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    removeClient() {
        ClientDataService.delete(this.state.currentClient._id, this.state.currentClient._rev)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    currentClient: {
                        _id: "",
                        _rev: "",
                        name:"",
                        maxAge:0,
                        minAge:0,
                        sex: "",
                        isKid: false,
                        isVisible: false
                    },
                    message: `Herec ${this.state.currentClient.name} bol uspesne vymazany!`,
                    heroBanner: "is-danger",
                    deleted: true
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    public render() {
    const { currentClient, heroBanner, deleted } = this.state;

    return (
        <div>
            {currentClient ? (
                <div className="form">
                    { this.state.message === "" ? (
                        <section className={"hero is-small is-info"}>
                            <div className="hero-body">
                                <p className="title">
                                    Upraviť klienta
                                </p>
                                <p className="subtitle">
                                    Sprav čo treba a klikni Uložiť
                                </p>
                            </div>
                        </section>  
                    ): (
                        <section className={"hero is-small " + heroBanner}>
                            <div className="hero-body">
                                <p className="title">
                                    OK!
                                </p>
                                <p className="subtitle">
                                    {this.state.message}
                                </p>
                            </div>
                        </section>                    
                    )}
                    <div className="columns m-4">
                        <div className="column is-6">
                            <form className="">
                                    <div className="field">
                                        <label className="label" htmlFor="name">Meno</label>
                                        <div className="control">
                                            <input
                                                type="text"
                                                className="input"
                                                id="name"
                                                value={currentClient.name}
                                                onChange={this.onChangeName}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label" htmlFor="minAge">Vek min</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                id="minAge"
                                                value={currentClient.minAge}
                                                onChange={this.onChangeMinAge}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label" htmlFor="maxAge">Vek Max</label>
                                        <div className="control">
                                            <input
                                                type="number"
                                                className="input"
                                                id="maxAge"
                                                value={currentClient.maxAge}
                                                onChange={this.onChangeMaxAge}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label" htmlFor="sex">Pohlavie</label>
                                            <div className="control">
                                                <label className="radio">
                                                    <input 
                                                        className="mr-1"
                                                        checked={currentClient.sex === "F"}
                                                        type="radio" 
                                                        name="answer" 
                                                        value="F"
                                                        onChange={this.onChangeSex}
                                                    />
                                                    Žena
                                                </label>
                                                <label className="radio">
                                                    <input 
                                                        className="mr-1"
                                                        checked={currentClient.sex === "M"}
                                                        type="radio" 
                                                        name="answer" 
                                                        value="M"
                                                        onChange={this.onChangeSex}
                                                    />
                                                    Muž
                                                </label>
                                            </div>
                                        </div>        
                                    <div className="field"> 
                                        <div className="control">
                                            <label className="chekbox" htmlFor="isKid">
                                                <input
                                                    className="mr-1"
                                                    type="checkbox" 
                                                    id="isKid" 
                                                    checked={currentClient.isKid} 
                                                    onChange={this.onChangeIsKid} 
                                                    name="isKid"
                                                />
                                                Detský herec
                                            </label>
                                        </div>
                                    </div>
                                    <div className="field"> 
                                        <div className="control">
                                            <label className="chekbox" htmlFor="isVsible">
                                                <input
                                                    className="mr-1"
                                                    type="checkbox" 
                                                    id="isVsible" 
                                                    checked={currentClient.isVisible} 
                                                    onChange={this.onChangeIsVisible} 
                                                    name="isVsible"
                                                />
                                                Zverejnený na stránke
                                            </label>
                                        </div>
                                    </div>
                            </form>
                        </div>
                        <div className="column is-6">
                            {
                                currentClient._id ? (
                                    <UploadFile _id={currentClient._id} />
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                    
                    <div className="m-4">
                        <div className="buttons">
                            {
                                !deleted ? (
                                    <div>
                                        <button
                                            type="submit"
                                            className="button is-info is-rounded"
                                            onClick={this.updateClient}
                                        >
                                            Uložiť
                                        </button>
                                        <button
                                            type="submit"
                                            className="button is-danger is-rounded"
                                            onClick={this.removeClient}
                                        >
                                            Vymazať
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                            
                            {
                            deleted ? (
                                <a 
                                    href="/clients"
                                    className="button is-rounded"
                                >
                                    Domov
                                </a> 
                            ) : (
                                <></>
                            )
                            }
                            
                        </div>
                    </div>                
                </div>
            ) : (
            <></>
            )}
        </div>
    )}
}