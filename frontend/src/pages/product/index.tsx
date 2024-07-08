import { useState, ChangeEvent, FormEvent } from "react"
import Head from "next/head"
import { Header } from "../../components/Header"

import { canSSRAuth } from "../../utils/canSSRAuth"

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"

type ItemProps = {
    id: string;
    name: string;
}

interface CategoryProps {
    categoryList: ItemProps[]
}

export default function Product({ categoryList }: CategoryProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if(!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if(!image) {
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png' || image.type === 'image/webp' || image.type === 'jpg') {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0])) // uma forma de aparecer as imagens selecionas da galeria
        }
    }

    // ao selecionar uma nova categoria na lista
    function handleChangeCategory(e) {
        setCategorySelected(e.target.value);
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        try {
            const data = new FormData();

            if(name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.warning('Preencha todos os campos!')
                return;
            }

            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('file', imageAvatar);
            data.append('category_id', categories[categorySelected].id);

            const apiClient = setupAPIClient();

            await apiClient.post('/products', data);

            toast.success('Cadastrado com sucesso!');

        } catch(err) {
            console.log(err)
            toast.error('Ops erro ao cadastrar!');
        }

        setName('');
        setPrice('');
        setDescription('');
        setAvatarUrl('');
        setImageAvatar(null);
    }

    return (
        <>
            <Head>
                <title>Novo Produto - Sujeito Pizza</title>
            </Head>

            <div>
                <Header/>

                <main className="max-w-[720px] m-16 mx-auto px-8 flex justify-between flex-col">
                    <h1 className="text-white font-bold text-3xl">Novo Produto</h1>

                    <form className="flex flex-col my-4" onSubmit={handleRegister}>
                        <label className="w-full h-72 bg-dark-900 mb-4 rounded-md flex justify-center items-center cursor-pointer">
                            <span className="z-50 absolute opacity-70 hover:opacity-100 hover:scale-120 transform transition-transform duration-800">
                                <FiUpload size={30} color="#FFF" />
                            </span>
                            <input className="hidden" type="file" accept="image/png, image/jpeg, image/webp, image/jpg" onChange={handleFile}/>

                            {avatarUrl && (
                                <img 
                                className="w-full h-full object-cover rounded-md" 
                                src={avatarUrl} 
                                alt="foto do produto" 
                                width={250} 
                                height={250}/>
                            )}
                        </label>

                        <select className="w-full h-10 rounded-md mb-4 bg-dark-900 text-white border border-gray-100 px-2" value={categorySelected} onChange={handleChangeCategory}>
                            {categories.map( (item, index) => {
                                return (
                                    <option key={item.id} value={index}>
                                        {item.name}
                                    </option>
                                )
                            })}
                        </select>

                        <input 
                        className="rounded-md mb-4 bg-dark-900 text-white border border-gray-100 h-10 px-2" 
                        type="text" placeholder="Digite o nome do produto" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>

                        <input 
                        className="rounded-md mb-4 bg-dark-900 text-white border border-gray-100 h-10 px-2" 
                        type="text" 
                        placeholder="Preço do produto" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)}/>

                        <textarea 
                        className="w-full min-h-32 resize-none rounded-md mb-4 bg-dark-900 text-white border border-gray-100 h-10 p-2" 
                        placeholder="Descreva o seu produto" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}/>

                        <button className="h-10 bottom-0 bg-green-900 font-bold rounded-md text-dark-700">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/list-category');

    return {
        props: {
            categoryList: response.data
        }
    }
})