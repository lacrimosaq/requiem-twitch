
import { CommunityClientPage } from "./_components/community-client-page";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Community - Requiem.tv',
    icons: '/myicon.ico'
  }


const CommunityPage = () => {
    
    return(
        <CommunityClientPage/>
    );
}

export default CommunityPage;