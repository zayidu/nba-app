import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './newsList.css';
import Button from '../Buttons/Button';
import CardInfo from '../CardInfo/CardInfo';

export default class NewsList extends Component {
  state = {
    items: [],
    teams: [],
    start: this.props.start,
    end: this.props.start + this.props.end,
    amount: this.props.end,
  };

  async componentWillMount() {
    // debugger;
    this.request(this.state.start, this.state.end);
  }

  async request(start, end) {
    if (this.state.teams.length < 1) {
      await axios.get(`${URL}/teams`).then((response) => {
        this.setState({
          teams: response.data,
        });
      });
    }
    await axios
      .get(`${URL}/articles?_start=${start}&_end=${end}`)
      .then((response) => {
        this.setState({
          items: [...this.state.items, ...response.data],
          start,
          end,
        });
      });
  }

  loadmore() {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end);
  }

  renderNews(type) {
    let template = null;
    switch (type) {
      case 'card':
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter,
            }}
            timeout={500}
            key={i}
          >
            <div>
              <div className={styles.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo
                    teams={this.state.teams}
                    // currentTeam={this.state.teams
                    //   .filter((team) => {
                    //     if (team.id === item.team) {
                    //       return { ...team };
                    //     }
                    //   })
                    //   .map((team, i, teams = this.state.teams) => {
                    //     return {
                    //       ...teams[i],
                    //       date: item.date,
                    //       team: item.team,
                    //     };
                    //   })}
                    teamId={item.team}
                    date={item.date}
                  />
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;
      case 'cardMain':
        template = this.state.items.map((item, i) => (
          <CSSTransition
            classNames={{
              enter: styles.newsList_wrapper,
              enterActive: styles.newsList_wrapper_enter,
            }}
            timeout={500}
            key={i}
          >
            <Link to={`/articles/${item.id}`}>
              <div className={styles.flex_wrapper}>
                <div
                  className={styles.left}
                  style={{
                    background: `url('/images/articles/${item.image}')`,
                  }}
                >
                  <div></div>
                </div>
                <div className={styles.right}>
                  <CardInfo
                    teams={this.state.teams}
                    teamId={item.team}
                    date={item.date}
                  />
                  <h2>{item.title}</h2>
                </div>
              </div>
            </Link>
          </CSSTransition>
        ));
        break;
      default:
        template = null;
    }
    return template;
  }
  render() {
    console.log(this.state.items);
    return (
      <div>
        <TransitionGroup component="div" className="list">
          {this.renderNews(this.props.type)}
        </TransitionGroup>
        <Button
          type="loadmore"
          loadmore={() => this.loadmore()}
          cta="Load More News"
        />
      </div>
    );
  }
}
