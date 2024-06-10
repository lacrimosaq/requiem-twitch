
import { StreamClientPage } from "./_components/stream-client-page";
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Stream - Requiem.tv',
    icons: '/myicon.ico'
  }

interface StreamPageProps {
    params: {
        username: string;
    };
};

const StreamPage = ({
    params,
} : StreamPageProps) => {
   


    return(
        <StreamClientPage
            params={params}
        />
    );
}

export default StreamPage;