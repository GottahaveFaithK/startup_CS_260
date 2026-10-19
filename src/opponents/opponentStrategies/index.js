import { chooseDuckMove } from './duck';
import { chooseVultureMove } from './vulture';
import { choosePeacockMove } from './peacock';
import { choosePigeonMove } from './pigeon';
import { chooseKeaMove } from './kea';

const opponentStrategies = {
    duck: chooseDuckMove,
    vulture: chooseVultureMove,
    peacock: choosePeacockMove,
    pigeon: choosePigeonMove,
    kea: chooseKeaMove,
};

export default opponentStrategies;