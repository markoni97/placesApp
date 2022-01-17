import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import classes from './PlaceList.module.css';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className={`${classes['place-list']} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className={classes['place-list']}>
      {props.items.map((item) => {
        return (
          <PlaceItem
            key={item.id}
            id={item.id}
            image={item.imageUrl}
            title={item.title}
            description={item.description}
            address={item.address}
            creatorId={item.creator}
            coordinates={item.location}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
