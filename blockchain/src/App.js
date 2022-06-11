import React, { Component } from 'react';
import NewElection from './components/custom/NewElection';
import NavBar from './components/custom/Navbar';
import Home from './components/custom/Home';
import Vote from './components/custom/Vote';
import AddVoter from './components/custom/AddVoter';
import VoteCount from './components/custom/VoteCount';
import ElectionData from './components/custom/ElectionData';
import ElectionDataVoteOnly from './components/custom/ElectionDataVoteOnly';
import ElectionDataAddCad from './components/custom/ElectionDataAddCad';
import Choose from './components/custom/Choose';
import { BrowserRouter, Route } from 'react-router-dom';
import NewCandidate from './components/custom/NewCandidate';
import Login from './components/custom/Login';

class App extends Component {

    getVal = () => {
        console.log('Test!')
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <NavBar getVal={this.getVal} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/newelection" component={NewElection} />
                    {/* <Route exact path="/elections" component={ElectionData} /> */}
                    <Route exact path="/elections" component={ElectionDataAddCad} />
                    {/* //update */}
                    <Route exact path="/elections-vote" component={ElectionDataVoteOnly} />
                    <Route exact path="/candidates/:id" component={NewCandidate} />
                    <Route exact path="/vote/:id" component={Vote} />
                    <Route exact path="/choose" component={Choose} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/voteCount/:id" component={VoteCount} />
                    <Route exact path="/addvoter" component={AddVoter} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
