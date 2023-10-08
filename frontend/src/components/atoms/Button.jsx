import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  const { buttonText, buttonVariant, onClick } = props;

  const buttonClass = () => {
    switch (buttonVariant) {
      case 'primary':
        return 'rounded-md bg-primaryColor px-5 py-2 text-sm font-medium text-white hover:drop-shadow-2xl'
      case 'secondary':
        return 'rounded-md border-primaryColor border-2 border-solid px-5 py-2 text-sm font-medium text-primaryColor shadow hover:bg-primaryColor hover:text-white hover:shadow-2xl'
      default:
        break;
    }
  }

  return (
    <button
      type='button'
      className={buttonClass()}
      onClick={onClick}
    >
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  buttonText: PropTypes.string,
  buttonVariant: PropTypes.string,
  onClick: PropTypes.func
}

export default Button