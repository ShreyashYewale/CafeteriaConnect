import * as React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {BaseRoute} from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface BottomNavProp {
  sceneMap: {
    [key: string]: React.ComponentType<{
      route: BaseRoute;
      jumpTo: (key: string) => void;
    }>;
  };
  routes: BaseRoute[];
}

const BottomNav = ({sceneMap, routes}: BottomNavProp) => {
  const [index, setIndex] = React.useState(0);

  const renderScene = BottomNavigation.SceneMap(sceneMap);

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        compact
        shifting
        barStyle={{backgroundColor: '#f2f2f2'}}
      />
    </SafeAreaProvider>
  );
};

export default BottomNav;
