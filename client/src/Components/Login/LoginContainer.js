import React, { Component } from 'react';
const sha1 = require('sha1');
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie'

const mains = {
    //"1": {img: require("../../Data/Icons/1.png"), name: "Mario"},
    "1": {img: require("../../Data/Icons/1.png"), name: "Mario"},
    "2": {img: require("../../Data/Icons/2.png"), name: "Donkey Kong"},
    "3": {img: require("../../Data/Icons/3.png"), name: "Link"},
    "4": {img: require("../../Data/Icons/4.png"), name: "Samus"},
    "4e": {img: require("../../Data/Icons/4e.png"), name: "Dark Samus"},
    "5": {img: require("../../Data/Icons/5.png"), name: "Yoshi"},
    "6": {img: require("../../Data/Icons/6.png"), name: "Kirby"},
    "7": {img: require("../../Data/Icons/7.png"), name: "Fox"},
    "8": {img: require("../../Data/Icons/8.png"), name: "Pikachu"},
    "9": {img: require("../../Data/Icons/9.png"), name: "Luigi"},
    "10": {img: require("../../Data/Icons/10.png"), name: "Ness"},
    "11": {img: require("../../Data/Icons/11.png"), name: "Captain Falcon"},
    "12": {img: require("../../Data/Icons/12.png"), name: "Jigglypuff"},
    "13": {img: require("../../Data/Icons/13.png"), name: "Peach"},
    "13e": {img: require("../../Data/Icons/13e.png"), name: "Daisy"},
    "14": {img: require("../../Data/Icons/14.png"), name:"Bowser"},
    "15": {img: require("../../Data/Icons/15.png"), name:"Ice Climbers"},
    "16": {img: require("../../Data/Icons/16.png"), name: "Sheik"},
    "17": {img: require("../../Data/Icons/17.png"), name: "Zelda"},
    "18": {img: require("../../Data/Icons/18.png"), name: "Dr. Mario"},
    "19": {img: require("../../Data/Icons/19.png"), name: "Pichu"},
    "20": {img: require("../../Data/Icons/20.png"), name: "Falco"},
    "21": {img: require("../../Data/Icons/21.png"), name: "Marth"},
    "21e": {img: require("../../Data/Icons/21e.png"), name: "Lucina"},
    "22": {img: require("../../Data/Icons/22.png"), name: "Young Link"},
    "23": {img: require("../../Data/Icons/23.png"), name: "Ganondorf"},
    "24": {img: require("../../Data/Icons/24.png"), name: "Mewtwo"},
    "25": {img: require("../../Data/Icons/25.png"), name: "Roy"},
    "25e": {img: require("../../Data/Icons/25e.png"), name: "Chrom"},
    "26": {img: require("../../Data/Icons/26.png"), name: "Mr. Game & Watch"},
    "27": {img: require("../../Data/Icons/27.png"), name: "Meta Knight"},
    "28": {img: require("../../Data/Icons/28.png"), name: "Pit"},
    "28e": {img: require("../../Data/Icons/28e.png"), name: "Dark Pit"},
    "29": {img: require("../../Data/Icons/29.png"), name: "Zero Suit Samus"},
    "30": {img: require("../../Data/Icons/30.png"), name: "Wario"},
    "31": {img: require("../../Data/Icons/31.png"), name: "Snake"},
    "32": {img: require("../../Data/Icons/32.png"), name: "Ike"},
    "33": {img: require("../../Data/Icons/33.png"), name: "Pokémon Trainer"},
    "36": {img: require("../../Data/Icons/36.png"), name: "Diddy Kong"},
    "37": {img: require("../../Data/Icons/37.png"), name: "Lucas"},
    "38": {img: require("../../Data/Icons/38.png"), name: "Sonic"},
    "39": {img: require("../../Data/Icons/39.png"), name: "King Dedede"},
    "40": {img: require("../../Data/Icons/40.png"), name: "Olimar"},
    "41": {img: require("../../Data/Icons/41.png"), name: "Lucario"},
    "42": {img: require("../../Data/Icons/42.png"), name: "R.O.B"},
    "43": {img: require("../../Data/Icons/43.png"), name: "Toon Link"},
    "44": {img: require("../../Data/Icons/44.png"), name: "Wolf"},
    "45": {img: require("../../Data/Icons/45.png"), name: "Villager"},
    "46": {img: require("../../Data/Icons/46.png"), name: "Mega Man"},
    "47": {img: require("../../Data/Icons/47.png"), name: "Wii Fit Trainer"},
    "48": {img: require("../../Data/Icons/48.png"), name: "Rosalina & Luma"},
    "49": {img: require("../../Data/Icons/49.png"), name: "Little Mac"},
    "50": {img: require("../../Data/Icons/50.png"), name: "Greninja"},
    "51": {img: require("../../Data/Icons/51.png"), name: "Mii Fighter"},
    "54": {img: require("../../Data/Icons/54.png"), name: "Palutena"},
    "55": {img: require("../../Data/Icons/55.png"), name: "Pac-Man"},
    "56": {img: require("../../Data/Icons/56.png"), name: "Robin"},
    "57": {img: require("../../Data/Icons/57.png"), name: "Shulk"},
    "58": {img: require("../../Data/Icons/58.png"), name: "Bowser Jr."},
    "59": {img: require("../../Data/Icons/59.png"), name: "Duck Hunt"},
    "60": {img: require("../../Data/Icons/60.png"), name: "Ryu"},
    "61": {img: require("../../Data/Icons/61.png"), name: "Cloud"},
    "62": {img: require("../../Data/Icons/62.png"), name: "Corrin"},
    "63": {img: require("../../Data/Icons/63.png"), name: "Bayonetta"},
    "64": {img: require("../../Data/Icons/64.png"), name: "Inkling"},
    "65": {img: require("../../Data/Icons/65.png"), name: "Ridley"},
    "66": {img: require("../../Data/Icons/66.png"), name: "Simon"},
    "66e": {img: require("../../Data/Icons/66e.png"), name: "Richter"},
    "67": {img: require("../../Data/Icons/67.png"), name: "King K. Rool"}
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

        let result = await fetch('https://dv-capstone-server.herokuapp.com/login', {
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

        let result = await fetch('https://dv-capstone-server.herokuapp.com/register', {
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

        let result = await fetch('https://dv-capstone-server.herokuapp.com/newevent', {
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

        let result = await fetch('https://dv-capstone-server.herokuapp.com/setmain', {
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
                    <label>Username: </label><input value={this.state.loginUser} onChange={this.handleLoginUser} type="text"></input><br /><br />
                    <label>Password: </label><input type="password" value={this.state.loginPass} onChange={this.handleLoginPass}></input><br /><br />
                    <button onClick={this.buttonPressed}>Login</button> <br /><br />

                    <h3>New User Registration</h3>
                    <label>Username: </label><input value={this.state.regUser} onChange={this.handleRegUser} type="text"></input><br /><br />
                    <label>Password: </label><input type="password" value={this.state.regPass} onChange={this.handleRegPass}></input><br /><br />
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
                            (<img src={mains[cookies.get('main')].img} />) : null
                    }
                    </p>

                    <label>Set your main: </label><select value={this.state.selectedMain} onChange={this.handleMain}>
                    {
                        Object.keys(mains).map((m, index) => (
                            <option key={index} value={m}>{mains[m].name}</option>
                        ))
                    }
                    </select><br /><br />
                    <button onClick={this.setMain}>Set Main</button>
                    <br /><br />

                    <button onClick={this.logout}>Log Out</button>


                    <h3>Create a New Event</h3>
                    <p>Hosting a Smash event? Tell us its name and the state it's happening in!</p>
                    <label>Event Name: </label><input type="text" value={this.state.eventName} onChange={this.handleEventName}></input><br /><br />
                    <label>Event State: </label>
                    <select value={this.state.eventState} onChange={this.handleEventState}>
                        {this.US.map((USState, index) => (
                            <option key={index} value={USState}>
                                {USState}
                            </option>
                        ))}
                    </select>
                    <br /><br />
                    <button onClick={this.createEvent}>Create Event</button>
                </div>
        )
    }
}

export default withCookies(LoginContainer);
