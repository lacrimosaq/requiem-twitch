
import { Metadata } from 'next'
import { UserClientPage } from "./_components/user-client-page";
 
export const metadata: Metadata = {
  title: "params.username" + ' - Requiem.tv',
  icons: '/myicon.ico'
}
interface UserPageProps{
    params: {
        username: string;
    };
};

const UserPage = ({
    params
}: UserPageProps) => {
    metadata.title = params.username + ' - Requiem.tv';
    return(
        <UserClientPage
            params={params}
        />
    );
}
export default UserPage;