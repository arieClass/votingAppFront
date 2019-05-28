import React, { Component, Fragment } from 'react';
import PollList from './PollsList/PollsList';
import Poll from './Poll/Poll';
import Modal from '../Modal/Modal';
import VotingAuth from '../VotingAuth/VotingAuth';
import Parse from "parse";
import { async } from 'q';

class viewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
      selectedPoll: null,
      purchasing: true,
      isAuth: false,
      showAuth: false
    }
  }

  componentWillMount() {
    this.myPollsHandler();
  }

  myPollsHandler = async () => {
    let myPolls = []
    if (Parse.User.current())
      myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());
    console.log(myPolls);
    console.log("=======");
    this.setState({ polls: myPolls });
  }

  pollDetailsHandler = async (tag) => {
    let params = { pollTag: tag }
    let polls = await Parse.Cloud.run('getAllResults', null, Parse.User.current());
    let singlepoll;
    for (let el of polls) {
      if (el.tag === tag) {
        singlepoll = el;
      }
    }
    console.log(singlepoll);
    console.log("=======");
    this.setState({ selectedPoll: singlepoll});
    this.purchaseHandler();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }
  
  voteHandler = (vote) => {
    this.setState({ showAuth: true });
    console.log(vote);
    console.log("========");
  };

  render() {
    return (
      <Fragment>
        <PollList data={this.state.polls} pollDetails={this.pollDetailsHandler} />
        {this.state.showAuth ?
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <VotingAuth />
          </Modal>
          :
          this.state.selectedPoll &&
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <Poll pollData={this.state.selectedPoll} submitted={this.voteHandler} />
          </Modal>
        }
      </Fragment>
    );
  };

}

export default viewPoll;