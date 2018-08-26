import React, { Component } from 'react';
const sha1 = require('sha1');
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie'

const mains = {
    //"1": {img: require("../../Data/Icons/1.png"), name: "Mario"},
    "1": require("../../Data/Icons/1.png"),
    "2": require("../../Data/Icons/2.png"),
    "3": require("../../Data/Icons/3.png"),
    "4": require("../../Data/Icons/4.png"),
    "4e": require("../../Data/Icons/4e.png"),
    "5": require("../../Data/Icons/5.png"),
    "6": require("../../Data/Icons/6.png"),
    "7": require("../../Data/Icons/7.png"),
    "8": require("../../Data/Icons/8.png"),
    "9": require("../../Data/Icons/9.png"),
    "10": require("../../Data/Icons/10.png"),
    "11": require("../../Data/Icons/11.png"),
    "12": require("../../Data/Icons/12.png"),
    "13": require("../../Data/Icons/13.png"),
    "13e": require("../../Data/Icons/13e.png"),
    "14": require("../../Data/Icons/14.png"),
    "15": require("../../Data/Icons/15.png"),
    "16": require("../../Data/Icons/16.png"),
    "17": require("../../Data/Icons/17.png"),
    "18": require("../../Data/Icons/18.png"),
    "19": require("../../Data/Icons/19.png"),
    "20": require("../../Data/Icons/20.png"),
    "21": require("../../Data/Icons/21.png"),
    "21e": require("../../Data/Icons/21e.png"),
    "22": require("../../Data/Icons/22.png"),
    "23": require("../../Data/Icons/23.png"),
    "24": require("../../Data/Icons/24.png"),
    "25": require("../../Data/Icons/25.png"),
    "25e": require("../../Data/Icons/25e.png"),
    "26": require("../../Data/Icons/26.png"),
    "27": require("../../Data/Icons/27.png"),
    "28": require("../../Data/Icons/28.png"),
    "28e": require("../../Data/Icons/28e.png"),
    "29": require("../../Data/Icons/29.png"),
    "30": require("../../Data/Icons/30.png"),
    "31": require("../../Data/Icons/31.png"),
    "32": require("../../Data/Icons/32.png"),
    "33": require("../../Data/Icons/33.png"),
    "36": require("../../Data/Icons/36.png"),
    "37": require("../../Data/Icons/37.png"),
    "38": require("../../Data/Icons/38.png"),
    "39": require("../../Data/Icons/39.png"),
    "40": require("../../Data/Icons/40.png"),
    "41": require("../../Data/Icons/41.png"),
    "42": require("../../Data/Icons/42.png"),
    "43": require("../../Data/Icons/43.png"),
    "44": require("../../Data/Icons/44.png"),
    "45": require("../../Data/Icons/45.png"),
    "46": require("../../Data/Icons/46.png"),
    "47": require("../../Data/Icons/47.png"),
    "48": require("../../Data/Icons/48.png"),
    "49": require("../../Data/Icons/49.png"),
    "50": require("../../Data/Icons/50.png"),
    "51": require("../../Data/Icons/51.png"),
    "54": require("../../Data/Icons/54.png"),
    "55": require("../../Data/Icons/55.png"),
    "56": require("../../Data/Icons/56.png"),
    "57": require("../../Data/Icons/57.png"),
    "58": require("../../Data/Icons/58.png"),
    "59": require("../../Data/Icons/59.png"),
    "60": require("../../Data/Icons/60.png"),
    "61": require("../../Data/Icons/61.png"),
    "62": require("../../Data/Icons/62.png"),
    "63": require("../../Data/Icons/63.png"),
    "64": require("../../Data/Icons/64.png"),
    "65": require("../../Data/Icons/65.png"),
    "66": require("../../Data/Icons/66.png"),
    "66e": require("../../Data/Icons/66e.png"),
    "67": require("../../Data/Icons/67.png")
}

class LoginContainer extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            loginUser: "",
            loginPass: "",
            regUser: "",
            regPass: "",
            eventName: "",
            eventState: "",
            message: "",
            selectedMain: "1"
        };

        this.US = [
            "AL",
            "AK",
            "AZ",
            "AR",
            "CA",
            "CO",
            "CT",
            "DE",
            "DC",
            "FL",
            "GA",
            "HI",
            "ID",
            "IL",
            "IN",
            "IA",
            "KS",
            "KY",
            "LA",
            "ME",
            "MD",
            "MA",
            "MI",
            "MN",
            "MS",
            "MO",
            "MT",
            "NE",
            "NV",
            "NH",
            "NJ",
            "NM",
            "NY",
            "NC",
            "ND",
            "OH",
            "OK",
            "OR",
            "PA",
            "RI",
            "SC",
            "SD",
            "TN",
            "TX",
            "UT",
            "VT",
            "VA",
            "WA",
            "WV",
            "WI",
            "WY"
        ]

        this.buttonPressed = this.buttonPressed.bind(this);
        this.regPressed = this.regPressed.bind(this);
        this.logout = this.logout.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.setMain = this.setMain.bind(this);

        this.handleLoginUser = this.handleLoginUser.bind(this);
        this.handleLoginPass = this.handleLoginPass.bind(this);

        this.handleRegUser = this.handleRegUser.bind(this);
        this.handleRegPass = this.handleRegPass.bind(this);

        this.handleEventName = this.handleEventName.bind(this);
        this.handleEventState = this.handleEventState.bind(this);

        this.handleMain = this.handleMain.bind(this);
    }

    componentWillMount() {
        const { cookies } = this.props;
        let newState = this.state;
        this.setState(newState);
    }

    async componentDidMount() {     
        //this.setState({ eventList: result });
    }

    async buttonPressed() { //login
        const { cookies } = this.props;

        let result = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.loginUser,
                password: sha1(this.state.loginPass),
            })
        });

        let resultJson = await result.json();
        console.log(resultJson);
        let message = "Failed to login.";
        if (resultJson.success)
            message = "Logged in successfully.";
        cookies.set('name', resultJson.username);
        cookies.set('loggedIn', resultJson.success ? true : '');
        cookies.set('main', resultJson.main);

        let newState = this.state;
        newState.loginPass = "";
        newState.loginUser = "";
        newState.message = message;

        this.setState(newState);
    }

    async regPressed() {
        const { cookies } = this.props;

        let result = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.regUser,
                password: sha1(this.state.regPass),
            })
        });

        let resultJson = await result.json();
        console.log(resultJson);
        let message = "Failed to register.";
        if (resultJson)
            message = "Registered successfully.";

        let newState = this.state;
        newState.loggedIn = false;
        newState.regPass = "";
        newState.regUser = "";
        newState.message = message;
        this.setState(newState);    
    }

    async logout() {
        const { cookies } = this.props;
        cookies.set('name', '');
        cookies.set('loggedIn', '');
        let newState = this.state;
        newState.loggedIn = false;
        newState.loginPass = "";
        newState.loginUser = "";
        newState.message = "";
        this.setState(newState);
    }

    async createEvent() {
        const { cookies } = this.props;

        let result = await fetch('http://localhost:3001/newevent', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.eventName,
                state: this.state.eventState,
                username: cookies.get('name')
            })
        });

        let resultJson = await result.json();
        console.log(resultJson);

        let newState = this.state;
        if (resultJson == true) {
            newState.message = "Event created successfully.";
            newState.eventName = "";
            newState.eventState = "AL";
        } else {
            newState.message = "Unable to create Event.";
        }

        this.setState(newState);
    }

    async setMain() {
        const { cookies } = this.props;

        let result = await fetch('http://localhost:3001/setmain', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: cookies.get('name'),
                main: this.state.selectedMain
            })
        });

        let resultJson = await result.json();
        console.log(resultJson);

        let newState = this.state;
        if (resultJson) {
            newState.message = "Updated main.";
            newState.selectedMain = "1";
            cookies.set('main', resultJson)
        } else {
            newState.message = "Unable to update main.";
        }

        this.setState(newState);
    }

    async handleEventName(event) {
        let newState = this.state;
        newState.eventName = event.target.value;
        this.setState(newState);
    }

    async handleEventState(event) {
        let newState = this.state;
        newState.eventState = event.target.value;
        this.setState(newState);
    }

    async handleLoginUser(event) {
        let newState = this.state;
        newState.loginUser = event.target.value;
        this.setState(newState);
    }

    async handleLoginPass(event) {
        let newState = this.state;
        newState.loginPass = event.target.value;
        this.setState(newState);
    }

    async handleRegUser(event) {
        let newState = this.state;
        newState.regUser = event.target.value;
        this.setState(newState);
    }

    async handleRegPass(event) {
        let newState = this.state;
        newState.regPass = event.target.value;
        this.setState(newState);
    }

    async handleMain(event) {
        let newState = this.state;
        newState.selectedMain = event.target.value;
        this.setState(newState);
    }

    render() {
        const { cookies } = this.props;

        if (!cookies.get('loggedIn'))
            return (
                <div>
                    <p>{this.state.message}</p>
                    <h3>Current User Login</h3>
                    <label>Username: </label><input value={this.state.loginUser} onChange={this.handleLoginUser} type="text"></input><br />
                    <label>Password: </label><input type="password" value={this.state.loginPass} onChange={this.handleLoginPass}></input><br />
                    <button onClick={this.buttonPressed}>Login</button> <br /><br />

                    <h3>New User Registration</h3>
                    <label>Username: </label><input value={this.state.regUser} onChange={this.handleRegUser} type="text"></input><br />
                    <label>Password: </label><input type="password" value={this.state.regPass} onChange={this.handleRegPass}></input><br />
                    <button onClick={this.regPressed}>Click me!</button> <br /><br />
                </div>
            );
        else
            return (
                <div>
                    <p>{this.state.message}</p>
                    <h3>User Dashboard</h3>
                    <p>Welcome, {cookies.get('name').charAt(0).toUpperCase() + cookies.get('name').slice(1)} <br />
                    {
                        cookies.get('main') && cookies.get('main') != "-1" ?
                            (<img src={mains[cookies.get('main')]} />) : null
                    }
                    </p>

                    <label>Set your main: </label><select value={this.state.selectedMain} onChange={this.handleMain}>
                    {
                        Object.keys(mains).map((m, index) => (
                            <option key={index} value={m}>{m}</option>
                        ))
                    }
                    </select><br />
                    <button onClick={this.setMain}>Set Main</button>
                    <br /><br />

                    <button onClick={this.logout}>Log Out</button>


                    <h3>Create a New Event</h3>
                    <p>Hosting a Smash event? Tell us its name and the state it's happening in!</p>
                    <label>Event Name: </label><input type="text" value={this.state.eventName} onChange={this.handleEventName}></input><br />
                    <label>Event State: </label>
                    <select value={this.state.eventState} onChange={this.handleEventState}>
                        {this.US.map((USState, index) => (
                            <option key={index} value={USState}>
                                {USState}
                            </option>
                        ))}
                    </select>
                    <br />
                    <button onClick={this.createEvent}>Create Event</button>
                </div>
        )
    }
}

export default withCookies(LoginContainer);
