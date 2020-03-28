import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, List, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';

class About extends React.Component {
    render() {
        return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
    }

    renderPage() {
        return (
            <Container>
                <Header as="h2" textAlign="left">What is stuff?</Header>
                <p>
                    Here are some definitions of stuff:
                </p>
                <List bulleted>
                    <List.Item>matter, material, articles, or activities of a specified
                        or indeterminate kind that are being referred to, indicated, or implied.
                        &quot;she&apos;s good at the technical stuff&quot;</List.Item>
                    <List.Item>a person&apos;s belongings, equipment, or baggage.
                        &quot;he took his stuff and went&quot;</List.Item>
                    <List.Item>worthless or foolish ideas, speech,
                        or writing; rubbish. &quot;stuff and nonsense!&quot;</List.Item>
                </List>
            </Container>
        );
    }
}

About.propTypes = {
    stuffs: PropTypes.array.isRequired,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Stuff');
    return {
        stuffs: Stuffs.find({}).fetch(),
        ready: subscription.ready(),
    };
})(About);
