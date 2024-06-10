import { redirect } from "next/navigation";
import { Results } from "./_components/results";
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Requiem.tv',
  icons: '/myicon.ico'
}

interface SearchPageProps{
    searchParams: {
        term?: string;
    };
};

const SearchPage = ({
    searchParams
}: SearchPageProps) => {
    if(!searchParams.term){
        redirect("/");
    }
    metadata.title = searchParams.term + ' - Requiem.tv';

    return(
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
        <Results
        term={searchParams.term}/>
    </div>);
}
export default SearchPage;