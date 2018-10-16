import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from "react-native";
import {Actions} from "react-native-router-flux";
import Button from 'react-native-button';
import PropTypes from 'prop-types'
import { List, ListItem } from 'react-native-elements';
import { SearchInput } from '.'


/**
 * A view with {@link SearchInput} on top and a FlatList of elements
 *
 * @see https://facebook.github.io/react-native/docs/flatlist
 * 
 * @todo Not tested or implemented yet
 *
 * @reactProps {Object} inputProps {@link SearchInput} prop types
 * @reactProps {Object} flatListProps
 * @reactProps {Object} containerStyle
 *
 */
export class SearchView extends Component {

  static propTypes = {
    flatListProps: FlatList.propTypes,
    inputProps: SearchInput.propTypes,
    containerStyle: View.propTypes.style
  }

  render()
    const { flatListProps , inputProps, containerStyle } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <SearchInput {...inputProps} />
        <FlatList
          keyExtractor={(item,index) => index.toString()}
          {...flatListProps}
          >
        </FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',

  },
});
