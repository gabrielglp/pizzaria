import { useContext } from "react";

import Link from "next/link";
import { FiLogOut } from "react-icons/fi"

import { AuthContext } from "../../contexts/AuthContext";

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className="h-20 ">
            <div className="max-w-[1120px] h-20 mx-auto px-8 flex justify-between items-center">
                <Link href={"/dashboard"}>
                    <img src="/logo.svg" width={190} height={60}/>
                </Link>

                <nav className="flex items-center">
                    <Link href={"/category"}>
                        <span className="text-white pr-12 inline-block relative hover:text-red-900 transition-colors duration-700">Categoria</span>
                    </Link>

                    <Link href={"/product"}>
                        <span className="text-white px-2 inline-block relative hover:text-red-900 transition-colors duration-700">Cardapio</span>
                    </Link>

                    <button className="ml-8 transform transition-transform duration-800 hover:scale-120" onClick={signOut}>
                        <FiLogOut color="#FFF" size={24}/>
                    </button>
                </nav>
            </div>
        </header>
    )
}