
import Nav from '../components/Nav';
export default function Layout({children}){
    return(  <div className="bg-blue-900 w-screen h-screen flex">
        <Nav />
       {/* Sekcja wyświetlania danych z kolekcji AdminUser */}
       <div className="bg-gray-100 p-4 w-screen  rounded shadow-md mt-2 mr-2 flex-grow  items-center justify-center">
            {children}
        </div>
     </div>
   );
}