import { chooseDuckMove } from './duck';
import { chooseVultureMove } from './vulture';
import { choosePeacockMove } from './peacock';
import { choosePigeonMove } from './pigeon';

const opponentStrategies = {
    duck: chooseDuckMove,
    vulture: chooseVultureMove,
    peacock: choosePeacockMove,
    pigeon: choosePigeonMove,
};

export default opponentStrategies;