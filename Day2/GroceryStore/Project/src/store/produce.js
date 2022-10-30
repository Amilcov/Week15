import produceData from '../mockData/produce.json';

const POPULATE = 'produce/POPULATE';
const LIKED = 'produce/LIKED';

export const populateProduce = () => {
    console.log('I m action creator');
    return {
      type: POPULATE,
      produce: produceData
    }
};

export const likedProduce= (id) => {
    return {
        type: LIKED,
        id
    }

}

export default function produceReducer(state = {}, action) {
    console.log('I am produceReducer');
    let stateNew = {};
    switch (action.type) {
        case POPULATE:
        
            action.produce.forEach(product => {
                stateNew[product.id] = product
            });
            return stateNew;

        case LIKED:
            stateNew = {...state};
            console.log('I m ProduceReducer executing action LIKED', stateNew);
            stateNew[action.id].liked = !stateNew[action.id].liked;
            return stateNew;

        default:
            return state;
    }

};

