import React, { Component } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import { Link } from 'react-router-dom'
import "./styles.css"
class Vote extends Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Election.networks[networkId]
        if (networkData) {
            const election = new web3.eth.Contract(Election.abi, networkData.address)
            this.setState({ election })
            const candCount = await election.methods.candidatesCount().call()
            this.setState({ candCount })
            for (var i = 1; i <= candCount; i++) {
                const candidates = await election.methods.candidates(i).call()
                if (candidates.election_id === this.state.id) {
                    this.setState({
                        candidates: [...this.state.candidates, candidates]
                    })
                }
            }
            console.log(this.state.candidates)
        } else {
            window.alert('Election contract not deployed to detected network.')
        }
    }

    handleInputChange = (e) => {
        console.log(e.target.id)
        this.setState({
            selectedId: e.target.id,
        })
        this.vote(e.target.id);
    }


    vote(id) {
        console.log(this.state.selectedId)
        this.setState({ loading: true })
        this.state.election.methods.vote(id).send({ from: this.state.account })
            .once('receipt', (receipt) => {
                this.setState({ loading: false })
                window.location.assign("/");
            })
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({
            id: id,
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            account: '',
            election: null,
            candCount: 0,
            candidates: [],
            loading: true,
            selectedId: null
        }
    }

    render() {
        const electionList = this.state.candidates.map(candidates => {
            return (
                <div className="vote-contact" key={candidates.id}>
                    <li className="vote-avatar" >
                        <div className='vote-top'>
                            <i className="material-icons circle darken-2">ballot</i>
                            <p style={{ marginLeft: "1rem", fontSize: "1.6rem", marginBottom: "0px" }}><b>{candidates.name}</b></p>
                        </div>
                        <p style={{ fontSize: "1.2rem" }}>{candidates.details}</p>
                        <a href="" className="secondary-content"><button id={candidates.id} onClick={this.handleInputChange} className="waves-effect waves-light btn blue darken-2">Vote</button></a>
                        <div style={{ border: "1px solid #fff", marginTop: ".5rem" }}></div>
                    </li>
                </div>
                // <div className="contact" key={candidates.id}>
                //     <li className="collection-item avatar">
                //         <i className="material-icons circle blue darken-2">ballot</i>
                //         <p><b>{candidates.name}</b></p>
                //         <p>{candidates.details}</p>
                //         <a href="" className="secondary-content"><button id={candidates.id} onClick={this.handleInputChange} className="waves-effect waves-light btn blue darken-2">Vote</button></a>
                //     </li>
                // </div>
            )
        })
        return (
            <div className="vote">
                <ul className="vote-container">
                    <li className="collection-item avatar">
                        <h3 style={{ color: "white" }}>Candidates</h3>
                    </li>
                    {electionList}
                </ul>
            </div>
            // <div className="container">
            //     <ul className="collection">
            //         <li className="collection-item avatar">
            //             <h3>Candidates</h3>
            //         </li>
            //         {electionList}
            //     </ul>
            // </div>
        )
    }
}

export default Vote;