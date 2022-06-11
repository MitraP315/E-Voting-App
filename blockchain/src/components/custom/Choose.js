import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Choose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: [],
            election_organizer: [],
            election_id: [],
            final: [],
            id: null,
        };
    }

    componentDidMount() {
        let currentComponent = this;

        axios.get('http://localhost:8000/api/electionName', {})
            .then(function (response) {
                var data = response.data;
                currentComponent.setState({
                    final: data
                })
            })
            .catch(function (err) {
                console.error(err);
            });

    }

    handleInputChange = (e) => {
        // console.log(e.target.innerHTML);
        var name = e.target.innerHTML;
        var index = 0;
        for (let i = 0; i < this.state.election_name.length; i++) {
            if (name === this.state.election_name[i]) {
                index = i;
                break;
            }
        }
        var id = this.state.election_id[index];
        this.setState({
            id: id
        })
    };


    render() {
        const electionList = this.state.final.map(election => {
            return (
                <div className="choose-contact" key={election.election_id}>
                    <li className="choose-avatar">
                        <i className="material-icons circle darken-2">ballot</i>
                        <Link style={{ color: "white" }} to={"/vote/" + election.election_id} className="choose-title" onClick={this.handleInputChange}>{election.election_name}</Link>
                    </li>
                </div>
                // <div className="contact" key={election.election_id}>
                //     <li className="collection-item avatar">
                //         <i className="material-icons circle blue darken-2">ballot</i>
                //         <Link to={"/vote/" + election.election_id} className="title" onClick={this.handleInputChange}>{election.election_name}</Link>
                //     </li>
                // </div>
            )
        })
        return (
            <div className="choose">
                <div className='choose-container'>
                    <ul>
                        <li className="collection-item avatar">
                            <h3>Elections</h3>
                        </li>
                        {electionList}
                    </ul>
                </div>
            </div>
            // <div className="container">
            //     <ul className="collection">
            //         <li className="collection-item avatar">
            //             <h3>Elections</h3>
            //         </li>
            //             {electionList}
            //     </ul>
            // </div>
        )
    }
}

export default Choose;