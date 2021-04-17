import React from 'react';
import ContentCard from '../Cards/ContentCard';
import { Route, Redirect } from 'react-router-dom';

const Body = () => {
    return (
        <div className="main-body">
            <Redirect exact from="/" to="/lockups" />
            <Route path="/lockups" exact component={ContentCard} />
        </div>
    );
};

export default Body;