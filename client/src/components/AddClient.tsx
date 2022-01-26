import { Component, ChangeEvent } from "react";
import ClientDataService from "../services/Service";
import IClientData from "../types/Client";
import Client from "./Client";

interface IProps {}

interface IState extends IClientData {
    submitted: boolean
}

export default class AddClient extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeMaxAge = this.onChangeMaxAge.bind(this);
        this.onChangeMinAge = this.onChangeMinAge.bind(this);
        this.onChangeSex= this.onChangeSex.bind(this);
        this.onChangeIsKid = this.onChangeIsKid.bind(this);
        this.onChangeIsVisible = this.onChangeIsVisible.bind(this);

        this.state = {
            _id: "",
            _rev: "",
            name:"",
            maxAge: 100,
            minAge: 0,
            sex: "M",
            isKid: false,
            isVisible: true,
            submitted: false
        }
    
    }

    onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        });
    }

    onChangeMaxAge = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            maxAge: Number(e.target.value)
        });
    }

    onChangeMinAge = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            minAge: Number(e.target.value)
        });
    }

    onChangeSex = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            sex: e.target.value
        });
    }

    onChangeIsKid = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isKid: e.target.checked ? true : false
        });
    }

    onChangeIsVisible = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isVisible: e.target.checked ? true : false
        });
    }

    saveClient = () => {
        const data: IClientData = {
            name: this.state.name,
            maxAge: this.state.maxAge,
            minAge: this.state.minAge,
            sex: this.state.sex,
            isKid: this.state.isKid,
            isVisible: this.state.isVisible
        };
        ClientDataService.create(data)
            .then((response: any) => {
                this.setState({
                    _id: response.data.id,
                    _rev: response.data.rev,
                    submitted: true
                });
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    }

    newClient() {
        this.setState({
            _id: "",
            _rev: "",
            name:"",
            maxAge: 100,
            minAge: 0,
            sex: "M",
            isKid: false,
            isVisible: true,
            submitted: false
        });
    }

    public render() {
        const { submitted, _id, name, maxAge, minAge, sex, isVisible, isKid } = this.state;

        return (
            <div>
                <section className={"hero is-small "+ (submitted ? "is-success": "is-info")}>
                    <div className="hero-body">
                        <p className="title">
                            {(submitted ? "OK" : "Nový herec")}
                        </p>
                        <p className="subtitle">
                            {(submitted ? "Herec " + name + " bol uložený" : "Vyplňte formulár a kliknite uložiť")}
                        </p>
                    </div>
                    </section>

                    <div className="columns">
                        <div className="column m-4 is-6">
                            <form className="">
                                <div className="field">
                                    <label className="label" htmlFor="name">Meno</label>
                                    <div className="control">
                                        <input
                                            required
                                            type="text"
                                            className="input is-medium"
                                            id="name"
                                            value={name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="minAge">Vek min</label>
                                    <div className="control">
                                        <input
                                            required
                                            type="number"
                                            className="input is-medium"
                                            id="minAge"
                                            value={minAge}
                                            onChange={this.onChangeMinAge}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="maxAge">Vek Max</label>
                                    <div className="control">
                                        <input
                                            required
                                            type="number"
                                            className="input is-medium"
                                            id="maxAge"
                                            value={maxAge}
                                            onChange={this.onChangeMaxAge}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="sex">Pohlavie</label>
                                        <div className="control">
                                            <label className="radio">
                                                <input
                                                    checked={sex==="F"}
                                                    className="mr-1"
                                                    type="radio" 
                                                    name="answer" 
                                                    value="F"
                                                    onChange={this.onChangeSex}
                                                />
                                                Žena
                                            </label>
                                            <label className="radio">
                                                <input
                                                    checked={sex==="M"}
                                                    className="mr-1"
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
                                    <div className="control is-rounded">
                                        <label className="chekbox" htmlFor="isKid">
                                            <input
                                                className="mr-1"
                                                type="checkbox" 
                                                id="isKid" 
                                                checked={isKid} 
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
                                                checked={isVisible} 
                                                onChange={this.onChangeIsVisible} 
                                                name="isVsible"
                                            />
                                            Zverejnený na stránke
                                        </label>
                                    </div>
                                </div>                           
                            </form>
                            <div className="buttons mt-4">
                                {
                                    submitted ? (
                                        <div>
                                            <a href={`/clients/${_id}`} className="button is-success is-rounded">
                                                Pridať fotky
                                            </a>
                                            <a href={`/clients`} className="button is-rounded">
                                                Domov
                                            </a>
                                        </div>
                                    ) : (
                                        <button
                                            disabled={name.length===0}
                                            type="submit"
                                            className="button is-info is-rounded"
                                            onClick={this.saveClient} 
                                        >
                                            Uložiť
                                        </button>
                                    )
                                }

                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}