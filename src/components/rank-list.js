import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, FlatList} from "react-native";

export class RankList extends Component {

  keyExtractor(item,index) {
    return index.toString();
  }

  renderIndexes() {
    let data = this.props.data;
    return (
      <View style={styles.indexesView}>
        {data.map((item,index) => (
          <Text key={index.toString()} style={styles.index}>{index+1}.</Text>
        ))}
      </View>
    )
  }

  renderItem({item,index}) {
    return (
      <View style={styles.itemView}>
        {item.map((item,index,array) => {
          let style = styles.cell;
          return (
            <Text key={index}
              style={index === array.length-1 ? styles.ratingCell : styles.cell}>
              {item}
            </Text>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.view,this.props.containerStyle]}>
        {this.renderIndexes()}
        <FlatList bounces={false}
          keyExtractor={this.keyExtractor}
          data={this.props.data}
          renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'row',
  },
  itemView: {
    flexDirection: 'row',
    backgroundColor: 'yellow'
  },
  indexesView: {
    width: 20,
    backgroundColor: 'red',
  },
  cell: {
    borderWidth: 1,
    flex: 1,
  },
  index: {
  },
  ratingCell: {
    backgroundColor: 'blue',
    textAlign	: 'right',
    width: 40,
  }
})
