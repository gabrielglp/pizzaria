import { useState, FormEvent } from "react"
import Head from "next/head"
import { Header } from "../../components/Header"

import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";

export default function Category() {
    const [name, setName] = useState('');

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if(name === '') {
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Cadastrada com sucesso!')
        setName('');

    }


    return (
        <>
            <Head>
                <title>
                    Nova Categoria - Sujeito Pizza
                </title>
            </Head>

            <div>
                <Header/>
                
                <main className="max-w-[720px] m-16 mx-auto px-8 flex justify-between flex-col">
                    <h1 className="text-white font-bold text-3xl">Cadastrar Categorias</h1>

                    <form className="flex flex-col my-4" onSubmit={handleRegister}>
                        <input 
                            type="text" 
                            placeholder="Digite o nome da categoria"
                            className="bg-dark-900 border border-gray-100 p-4 h-10 rounded-md text-white mb-4"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <button className="h-10 bottom-0 bg-green-900 font-bold rounded-md text-dark-700" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}