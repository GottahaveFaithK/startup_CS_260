import { chooseDuckMove } from './duck';
import { chooseVultureMove } from './vulture';
import { choosePeacockMove } from './peacock';

const opponentStrategies = {
    duck: chooseDuckMove,
    vulture: chooseVultureMove,
    peacock: choosePeacockMove,
};

export default opponentStrategies;