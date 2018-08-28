import React, { Component } from 'react';
import EventList from './EventList';

class EventListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: undefined
        };
    }

    async componentDidMount() {     
        let result = await fetch("https://dv-capstone-server.herokuapp.com/");
        result = await result.json();
        this.setState({ eventList: result });
    }


    render() {
        if (this.state.eventList === undefined)
            return <div>Loading...</div>;

        return <EventList events={this.state.eventList} />
    }
}

export default EventListContainer;
