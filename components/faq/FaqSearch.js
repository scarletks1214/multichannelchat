import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import { flatten } from 'lodash'

class FaqSearch extends Component {
  constructor(props) {
    super(props)
    const { faqs } = props

    this.questions = flatten(
      faqs.map(({ questions, products }) =>
        questions.map(question => ({ question, products }))
      )
    )

    this.state = {
      value: '',
      suggestions: []
    }
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : this.questions.filter(
          ({ question }) =>
            question.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue(suggestion) {
    return suggestion.question
  }

  // Use your imagination to render suggestions.
  renderSuggestion(suggestion) {
    return (
      <div>
        <span className="react-autosuggest__text">{suggestion.question}</span>
        {suggestion.products.map((product, key) => (
          <span className="react-autosuggest__tag" key={key}>
            {product}
          </span>
        ))}
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    const { history } = this.props
    history.push(`/faqs/${suggestion.products[0]}`)
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange
    }
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default FaqSearch
