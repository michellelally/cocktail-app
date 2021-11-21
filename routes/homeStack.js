import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ListCocktails from '../client/components/ListCocktails';
import Recommendations from '../client/components/Recommendations';
import Home from '../client/components/Home';

const screens = {
    Home: {
        screen: Home
    },
    ListCocktails: {
        screen: ListCocktails
    },
    Recommendations: {
        screen: Recommendations
    }

}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);