import { Callout, Flex } from '@radix-ui/themes'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)
  // console.log('msg', message?.value)

  if (!message) {
    return <div></div>
  }

  return (
    <Callout.Root color={message.isError ? 'red' : 'blue'}>
      <Callout.Text>{message.value}</Callout.Text>
    </Callout.Root>
  )
}

export default Notification
