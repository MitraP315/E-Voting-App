import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css"
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showComponents: false
        }
    }


    render() {
        return (
            // <div className="home container">
            //     <ul className="collection with-header">
            //         <li className="collection-header"><h3>Choose User Type</h3></li>
            //         <li className="collection-item"><div><h4>User<Link to="/choose" className="secondary-content"><i className="material-icons">send</i></Link></h4></div></li>
            //         <li className="collection-item"><div><h4>Admin<Link to="/login" className="secondary-content"><i className="material-icons">send</i></Link></h4></div></li>
            //     </ul>
            // </div>
            <div className="home">
                <div className='home-container'>
                    <h3>Choose User Type</h3>
                    <ul>
                        <li><h4><span>User</span><Link to="/choose" className=""><i className="material-icons">send</i></Link></h4></li>
                        <li><h4><span>Staff</span><Link to="" className=""><i className="material-icons">send</i></Link></h4></li>
                        <li><h4><span>Admin</span><Link to="/login" className=""><i className="material-icons">send</i></Link></h4></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home