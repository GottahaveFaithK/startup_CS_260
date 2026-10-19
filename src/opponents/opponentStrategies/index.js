import { chooseDuckMove } from './duck';
import { chooseVultureMove } from './vulture';
import { choosePeacockMove } from './peacock';
import { choosePigeonMove } from './pigeon';
import { chooseKeaMove } from './kea';
import { chooseMagpieMove } from './magpie';

const opponentStrategies = {
    duck: chooseDuckMove,
    vulture: chooseVultureMove,
    peacock: choosePeacockMove,
    pigeon: choosePigeonMove,
    kea: chooseKeaMove,
    magpie: chooseMagpieMove
};

export default opponentStrategies;