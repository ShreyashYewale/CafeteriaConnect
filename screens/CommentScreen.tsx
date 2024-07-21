import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {Appbar, List} from 'react-native-paper';

const CommentScreen = () => {
  return (
    <SafeAreaView className="bg-white pt-2">
      {/* Header */}

      <Appbar.Header>
        <Appbar.Content title="Comments" />
      </Appbar.Header>

      {/* Body */}

      <ScrollView
        className="bg-gray-100 h-full"
        contentContainerStyle={{paddingBottom: 100}}>
        {/*List  */}
        <List.Section>
          <List.Subheader>Some title</List.Subheader>
          <List.Item title="First Item" left={() => ''} />
          <List.Item
            title="Second Item"
            left={() => ''} // user img can be shown
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommentScreen;
