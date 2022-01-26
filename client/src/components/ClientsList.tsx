import { Component, ChangeEvent } from "react";
import ClientDataService from "../services/Service";
import IClientData from "../types/Client";

interface IProps {}

interface IState {
  clients: Array<IClientData>,
  currentClient: IClientData,
  currentIndex: number,
  searchClient: string
}

export default class ClientsList extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.retrieveClients = this.retrieveClients.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveClient = this.setActiveClient.bind(this);

        this.state = {
            clients: [],
            currentClient: {
                _id: "6553b679205be9bc7d9c77e9e8d13880",
                _rev: "",
                name:"",
                maxAge:-1,
                minAge:-1,
                sex: "",
                isKid: false,
                isVisible: false
            },
            currentIndex: -1,
            searchClient: ""
        }
    }

    componentDidMount () {
        this.retrieveClients();
    }

    retrieveClients() {
        ClientDataService.getAll()
            .then((response: any) => {
                console.log(response.data.data)
                this.setState({
                    clients: response.data.data
                })
                // console.log(response.data.data);
            }).catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveClients();
        this.setState({
            currentClient: {
                _id: "6553b679205be9bc7d9c77e9e8d13880",
                _rev: "",
                name:"",
                maxAge:-1,
                minAge:-1,
                sex: "",
                isKid: false,
                isVisible: false
            },
            currentIndex: -1
        })
    }

    setActiveClient(client: IClientData, index: number) {
        this.setState({
            currentClient: client,
            currentIndex: index
        });
    }

    public render() {
        const { clients, currentClient, currentIndex } = this.state;
        return (
            <div className="m-4">
                <div className="">
                    <div className="columns my-4 is-multiline">
                        {console.log(clients)}
                        {clients && 
                            clients.map((client: IClientData, index: number) => (
                                <div
                                    className={
                                        "column is-3 " + 
                                        (index === currentIndex ? "active" : "")
                                    }
                                    // onClick={() => this.setActiveClient(client, index)}
                                    onMouseOver={() => (this.setActiveClient(client, index))}
                                    key={index}
                                >
                                    {/* <div className="box" style={{cursor: "pointer"}}> */}
                                        {/* {client.name} */}
                                        
                                        <figure className="image" style={{cursor: "pointer"}}>    
                                            <a className="" href={"/clients/" + currentClient._id}>
                                                <img src={require(`../media/${client._id}.jpeg`)} />
                                            </a>
                                        </figure>
                                    </div>
                                // </div>
                            ))
                        }
                    </div>
                    {/* <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllClients}
                    >
                        Vymazat vsetky
                    </button> */}
                </div>
            </div>
        );
    }
}