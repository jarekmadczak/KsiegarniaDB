
import Nav from '../components/Nav';
export default function Layout({children}){
    return(  <div className="bg-blue-900 w-screen h-max flex">
        <Nav />
       {/* Sekcja wyświetlania danych z kolekcji AdminUser */}
       <div className="bg-gray-100 p-4 w-screen min-h-screen h-max rounded shadow-md mt-2 mr-5 grid grid-cols-1 gap-10 content-start">
            {children}
        </div>
     </div>
   );
}