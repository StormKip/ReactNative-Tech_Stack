import React, { Component } from 'react';
import { 
  Text, 
  TouchableWithoutFeedback, 
  View,
  LayoutAnimation,
  NativeModules
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

const { UIManager } = NativeModules;

class ListItem extends Component {

  constructor(props) { 
    super(props);

    if (UIManager) {
        return UIManager.setLayoutAnimationEnabledExperimental && 
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;

    if (expanded) {
      return (
        <CardSection>
        <Text style={styles.descriptionTextStyle}>
        {library.description}
        </Text>
        </CardSection>
      );
    } 
  }
  
  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library; 

    return (
      <TouchableWithoutFeedback
      onPress={() => this.props.selectLibrary(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionTextStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 10,
    paddingRight: 10
  }
};

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;

  return { expanded };
};

export default connect(mapStateToProps, actions)(ListItem);
