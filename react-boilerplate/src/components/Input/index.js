import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Container from './styles/Container'
import InputStyled from './styles/InputStyled'
import Label from '../Label'


const InputStyle = {
  marginTop : '4px'
}
class Input extends PureComponent{
  
  static propTypes = {
    // ClassName of Input.
    className: PropTypes.string,
    // Label of Input.
    label: PropTypes.string.required,
    // Name of Input.
    name: PropTypes.string,
    // Method used when input's value change.
    onChange: PropTypes.func,
    //Additional style.
    style: PropTypes.object,
    // Type of Input. 
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'input'
  }

  render(){

    const { className, label,name, onChange, style, type } = this.props

    return(
      <Container className={className} style={style}>
        <Label>{label}</Label>
        <InputStyled name={name} onChange={onChange} style={InputStyle} type={type} />
      </Container>
    )
  }
}

export default Input