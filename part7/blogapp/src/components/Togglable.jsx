import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { changeVisible } from '../reducers/visibleReducer'
import Notification from './Notification'
import { Button, Flex } from '@radix-ui/themes'

const Togglable = (props) => {
  const visible = useSelector((state) => state.visible)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(changeVisible())
  }

  return (
    <Flex direction='column' gap='2'>
      <Notification />
      <div style={hideWhenVisible}>
        <Button variant='surface' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>{props.children}</div>
    </Flex>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
}

Togglable.displayName = 'Togglable'

export default Togglable
