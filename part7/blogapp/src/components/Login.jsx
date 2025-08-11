import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { LoginUser } from '../reducers/userReducer'
import { resetMessage } from '../reducers/notificationReducer'
import Notification from './Notification'
import { useNavigate } from 'react-router'
import {
  Flex,
  Card,
  Box,
  Grid,
  Text,
  TextArea,
  Button,
  Heading,
} from '@radix-ui/themes'

const LoginForm = (props) => {
  const { reset: ureset, ...username } = useField('text')
  const { reset: prest, ...password } = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('1')
    try {
      await dispatch(
        LoginUser({ username: username.value, password: password.value })
      )
      navigate('/')
    } catch (error) {
      console.log(error)
      dispatch(
        resetMessage({ value: 'Wrong username or password', isError: true })
      )
    } finally {
      ureset()
      prest()
    }
  }
  return (
    <>
      {props.children}
      {/* <br /> */}
      <Box maxWidth='300px'>
        <Card size='2'>
          <Flex direction='column' gap='3'>
            <Flex asChild justify='center'>
              <Heading size='6'>Log in to application</Heading>
            </Flex>
            <Flex asChild justify='between'>
              <label>
                <Text color='gray' size='2'>
                  username:
                </Text>
                <input className='grow' {...username} />
              </label>
            </Flex>
            <Flex asChild justify='between'>
              <label>
                <Text color='gray' size='2'>
                  password:
                </Text>
                <input className='grow' {...password} />
              </label>
            </Flex>
            <Grid columns='1' gap='2'>
              <Button onClick={handleLogin}>login</Button>
            </Grid>
          </Flex>
        </Card>
      </Box>
    </>
  )
}

LoginForm.propTypes = {
  children: PropTypes.node,
}

const Login = () => {
  return (
    <div>
      <Flex direction='column' gap='3'>
        <LoginForm>
          <Notification />
        </LoginForm>
      </Flex>
    </div>
  )
}

export default Login
