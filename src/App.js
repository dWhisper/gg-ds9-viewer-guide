import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment';

import Episodes from './data/ds9-combined-episodes.json';

const podStartDate = '2017-03-16';

class App extends Component {
    constructor (props) {
        super(props);
        //This is here because I don't want to spin up any data and I'm lazy
        this.buildEpisodeList();
        this.calcPodDates();
    }

    buildEpisodeList () {
        let totalEps = 0;

        let allEps = [];

        Episodes.forEach((season) => {
           totalEps +=  season.episodes.length

            const eps = season.episodes.map((ep) => {
                return `Season ${season.season}.${ep.episode} - ${ep.title.text}`
            });

           allEps = allEps.concat(eps);
        });

        this.numOfEps = totalEps;
        this.episodeList = allEps;

        return allEps;
    }

    calcPodDates () {
        let dates = [];
        let podDate = moment(podStartDate);
        for(var x = 0; x < this.numOfEps; x++) {
            dates.push(podDate.add(7, 'days').format('MMM DD, YYYY'));
        }

        this.podDates = dates;
    }

    getEpisodes() {
        return this.episodeList.map((episode, index) => {
            return (
                <div className="episode-table" key={index}>
                    {/*<div className="episode-table__date">*/}
                        {/*{this.podDates[index]}*/}
                    {/*</div>*/}
                    <div className="episode-table__episode-title">
                        {episode}
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="App">
                <div className="episodes">
                    {this.getEpisodes()}
                </div>
            </div>
        );
    }
}

export default App;
