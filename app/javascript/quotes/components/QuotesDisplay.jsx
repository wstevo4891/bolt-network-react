// app/javascript/quotes/components/QuotesDisplay.jsx
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteText from './QuoteText';
import QuoteNavigation from './QuoteNavigation';
import QuoteFooter from './QuoteFooter';

export class QuotesDisplay extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      quote: {},
      fireRedirect: false
    };
  }

  fetchQuote (id) {
    axios.get(`api/quotes/${id}`)
      .then(response => {
        this.setState({ quote: response.data });
      })
      .catch(error => {
        console.error(error);
        this.setState({ fireRedirect: true });
      })
  }

  setQuoteIdFromQueryString (qs) {
    console.log('running function setQuoteIdFromQueryString');
    console.log('qs argument: ' + qs);
    this.qsParams = queryString.parse(qs);
    console.log('this.qsParams: ' + JSON.stringify(this.qsParams));
    if (this.qsParams.quote) {
      // assign quote ID from the URL's query string
      this.quoteId = Number(this.qsParams.quote);
    } else {
      this.quoteId = this.props.startingQuoteId;
      // update URL in browser to reflect current quote in query string
      this.props.history.push(`/?quote=${this.quoteId}`);
    }
    console.log('this.props.startingQuoteId: ' + this.props.startingQuoteId);
    console.log('this.quoteId: ' + this.quoteId);
  }

  componentDidMount () {
    console.log('Component Did Mount');
    console.log('this.state: ' + JSON.stringify(this.state));
    console.log('this.props.location: ' + JSON.stringify(this.props.location));
    this.setQuoteIdFromQueryString(this.props.location.search);
    this.fetchQuote(this.quoteId);
  }

  componentWillReceiveProps (nextProps) {
    this.setQuoteIdFromQueryString(nextProps.location.search);
    this.fetchQuote(this.quoteId);
  }

  render () {
    const quote = this.state.quote;
    console.log('quote: ' + JSON.stringify(quote));
    const nextQuoteId = quote.next_id;
    const previousQuoteId = quote.previous_id;

    return (
      <div>
        <div className='quote-container'>
          {this.state.fireRedirect &&
            <Redirect to={'/'} />
          }
          {previousQuoteId &&
            <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} />
          }
          <QuoteText quote={this.state.quote} />
          {nextQuoteId &&
            <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} />
          }
        </div>
        {this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) &&
          <QuoteFooter startingQuoteId={this.props.startingQuoteId} />
        }
      </div>
    );
  }
}
