import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    state = {
        location: "/"
        // location: "/" impro
    }

    componentWillReceiveProps() {
        // console.log(this.props)

        // this.setState({
        //     location: this.props.history.location.pathname
        // })

        const loc = window.location.pathname;
        this.setState({
            location: loc,
        })


        // console.log(this.props.history.location.pathname)
        // console.log("window path" + window.location.pathname)
    }
    render() {
        console.log(this.state.location);
        // if (this.state.location === "/" || this.state.location === "/choose" || this.state.location === "/vote" || this.state.location === "/login") {
        // if (window.location.pathname === "/newelection") {
        if (this.state.location === "/newelection") {
            return (

                <nav className="nav-wrapper black darken-2">
                    <div className="container">
                        <a className="brand-logo">
                            <NavLink to="/">E-Election</NavLink>
                        </a>
                        <ul className="right">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/newelection">New Election</NavLink></li>
                            <li><NavLink to="/elections">Elections</NavLink></li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav className="nav-wrapper black darken-2">
                    <div className="container">
                        <a className="brand-logo">
                            <NavLink to="/">E-Election</NavLink>
                        </a>
                        <ul className='right'>
                            <li><NavLink to="/elections-vote">Results</NavLink></li>

                        </ul>
                    </div>
                </nav>
            )
        }


    }
}

export default withRouter(Navbar)

