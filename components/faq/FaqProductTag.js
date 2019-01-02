import React, { Component } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'
import { findIndex, without } from 'lodash'

class FaqProductTag extends Component {
  constructor(props) {
    super(props)

    const productList = without(
      props.productList.map(product => product.name),
      props.products
    ).map(product => ({ id: product, text: product }))

    const products = props.products.map(product => ({
      id: product,
      text: product
    }))

    this.state = { products, productList }
  }

  handleProductDelete(id) {
    const { products, productList } = this.state
    const { isMandatory, onMandatoryError } = this.props
    if (products.length === 1 && isMandatory) {
      onMandatoryError()
      return
    }
    productList.push(products[id])
    products.splice(id, 1)
    this.setState({ productList, products })
    this.handleChange()
  }

  handleProductAdd(product) {
    const { products, productList } = this.state
    const selectedProductIndex = findIndex(productList, { text: product.text })
    if (selectedProductIndex > -1) {
      products.push(product)
      productList.splice(selectedProductIndex, 1)
      this.setState({ products, productList })
      this.handleChange()
    }
  }

  handleChange() {
    const { products } = this.state
    this.props.handleChange(products.map(product => product.text))
  }

  render() {
    return (
      <ReactTags
        tags={this.state.products}
        suggestions={this.state.productList}
        placeholder="Add Product"
        autofocus={false}
        handleDelete={this.handleProductDelete.bind(this)}
        handleAddition={this.handleProductAdd.bind(this)}
        minQueryLength={1}
      />
    )
  }
}

export default FaqProductTag
