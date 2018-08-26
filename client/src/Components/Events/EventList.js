import React from 'react';
import {
    Link
} from 'react-router-dom'

const EventList = ({ events }) => (
    <div>
        <h3>EVENTS</h3>
        {events.map((event, index) => (
            <article key={index}>
                <header>
                    <p>{event.name}: {event.state}   |   {event.createdBy.charAt(0).toUpperCase() + event.createdBy.slice(1)}</p>
                </header>
            </article>
        ))}
    </div>
);

export default EventList;