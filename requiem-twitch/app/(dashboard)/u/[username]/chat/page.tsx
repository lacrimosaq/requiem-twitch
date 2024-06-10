
import { ChatClientPage } from "./_components/chat-client-page";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Chat - Requiem.tv',
    icons: '/myicon.ico'
  }
const ChatPage = () => {

    return(
        <ChatClientPage/>
    );
}

export default ChatPage;