
import React from 'react';
import '../Styles/MasterCards.css';


const MasterCards = ({ setSelectedTab }) =>
{

    const handleCardClick = (tabKey) =>
    {
        setSelectedTab(tabKey);
    };

    return (
        <div className="master-cards">
            <div className="card" onClick={() => handleCardClick('company-master')}>
                Company Master
            </div>
            {/* <div className="card" onClick={() => handleCardClick('location-master')}>
                Location Master
            </div> */}
            <div className="card" onClick={() => handleCardClick('department-master')}>
                Department Master
            </div>
            {/* <div className="card" onClick={() => handleCardClick('cab-trip-status')}>
                Cab Trip Status
            </div> */}
            {/* <div className="card" onClick={() => handleCardClick('ride-type-master')}>
                Ride Type Master
            </div> */}
            {/* <div className="card" onClick={() => handleCardClick('courier-status-master')}>
                Courier Status Master
            </div> */}
            <div className="card" onClick={() => handleCardClick('domain-name')}>
                Allowed Domains
            </div>
            {/* <div className="card" onClick={() => handleCardClick('employee-status')}>
                Employee Status
            </div> */}
            {/* <div className="card" onClick={() => handleCardClick('is-admin')}>
                Is Admin
            </div> */}
            {/* <div className="card" onClick={() => handleCardClick('capacity')}>
                Capacity
            </div> */}
            <div className="card" onClick={() => handleCardClick('transmission-type')}>
                Transmission Type
            </div>
            {/* <div className="card" onClick={() => handleCardClick('rejection-reason')}>
                Rejection Reason
            </div> */}
            <div className="card" onClick={() => handleCardClick('dollar-value')}>
                Dollar Value
            </div>
            <div className="card" onClick={() => handleCardClick('id-type')}>
                ID Type
            </div>
            <div className="card" onClick={() => handleCardClick('brand')}>
                Brand Make
            </div>
            <div className="card" onClick={() => handleCardClick('country-code')}>
                Country Code
            </div>

            <div className="card" onClick={() => handleCardClick('intersity-master')}>
                Intercity
            </div>

            <div className="card" onClick={() => handleCardClick('airport-master')}>
                Airport
            </div>
        </div>
    );
};

export default MasterCards;
