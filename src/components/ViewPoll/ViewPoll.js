import React, { Component, Fragment } from 'react';
import PollList from './PollsList/PollsList';
import Poll from './Poll/Poll';
import Modal from '../Modal/Modal';
import VotingAuth from '../VotingAuth/VotingAuth';
import Parse from "parse";

class ViewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
      pollData: [],
      selectedPoll: null,
      purchasing: false,
      isAuth: false,
      showAuth: false,
      dataLoaded: false,
      tag: null,
      name: null,
      test: false
    }
  }

  componentWillMount() {
    this.myPollsHandler();
  }

  myPollsHandler = async () => {
    let myPolls = [];
    if (Parse.User.current())
      myPolls = await Parse.Cloud.run('getMyPolls', null, Parse.User.current());


    for(let poll of myPolls){
      if(poll.results.VoteTarget !== ""){
        let desc = Parse.Object.extend('ChoiceDescriptions');
        let query = new Parse.Query(desc);
        query.equalTo('choice', poll.choices[poll.results.VoteTarget]);
        let res = await query.find();
        poll.img = res[0].get('image');

      }
    }


    this.setState({ polls: myPolls });
  }

  pollDetailsHandler = async (tag) => {
    let polls = await Parse.Cloud.run('getAllResults', null, Parse.User.current());
    let singlepoll;
    for (let el of polls) {
      if (el.tag === tag) {
        singlepoll = el;
      }
    }
    let desc = Parse.Object.extend('ChoiceDescriptions');
    let query = new Parse.Query(desc);
    let opts = []
    if (singlepoll)
      for (let choice of singlepoll.choices) {
        query.equalTo('choice', choice);
        let res = await query.find();
        let img = res[0].get('image');
        opts.push({ name: choice, link: img.url(), description: res[0].get('description') });
      }
    let pollData = { poll: singlepoll, opts: opts }
    this.setState({ selectedPoll: pollData, dataLoaded: true, tag: tag });
    this.purchaseHandler();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  voteHandler = (vote) => {
    this.setState({ showAuth: true, name: vote });
  }

  handleClick = () => {
    this.setState({ test: true })
  }

  fetchImages = () =>{

  }

  render() {
    return (
      <Fragment>

        <PollList data={this.state.polls} pollDetails={this.pollDetailsHandler}/>

        {this.state.dataLoaded ?
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {this.state.showAuth ? <VotingAuth props={this.props} elementtag={this.state.tag} elementoptions={this.state.name} /> : this.state.selectedPoll && <Poll pollData={this.state.selectedPoll} submitted={this.voteHandler} />}
          </Modal>
          : null}
      </Fragment>
    );
  };
}

export default ViewPoll;