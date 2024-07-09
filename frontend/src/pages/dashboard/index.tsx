import { useState } from "react";

import { canSSRAuth } from "../../utils/canSSRAuth";
import Head from "next/head";

import { Header } from "../../components/Header";
import { FiRefreshCcw } from 'react-icons/fi';

import { setupAPIClient } from "../../services/api";

import { ModalOrder } from "../../components/ModalOrder";

import Modal from 'react-modal';

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: string;
        banner: string;
    }
    order: {
        id: string;
        table: string;
        status: boolean;
        name: string | null;
    }
}


export default function DashBoard({ orders }: HomeProps) {

    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible, setModalVisible] = useState(false);

    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id,
            }
        })

        setModalItem(response.data);
        setModalVisible(true);
    }

    async function handleFinishItem(id: string) {
        const apiClient = setupAPIClient();

        await apiClient.put('/order/finish', {
            order_id: id,
        })

        const response = await apiClient.get('/orders');

        setOrderList(response.data);

        setModalVisible(false);
    }

    async function handleRefreshOrders() {
        const apiClient = setupAPIClient();

        const response = await apiClient.get('/orders');
        
        setOrderList(response.data);

    }

    Modal.setAppElement('#__next')

    return (
        <>
            <Head>
                <title>Painel - Sujeito Pizza</title>
            </Head>
            <div>
                <Header/>
                
                <main className="max-w-[720px] m-16 mx-auto px-8 flex flex-col">
                    <div className="flex flex-row">
                        <h1 className="text-white text-3xl mr-4">Últimos pedidos</h1>
                        <button onClick={handleRefreshOrders}>
                            <FiRefreshCcw 
                                color="#3fffa3"
                                size={25}
                            />
                        </button>
                    </div>
                    
                    <article className="flex flex-col my-4">

                        {orderList.length === 0 && (
                            <span className="text-gray-100 text-xl">
                                Nenhum pedido aberto foi encontrado...
                            </span>
                        )}

                        {orderList.map( item => (
                            <section key={item.id} className="flex flex-row bg-dark-900 mb-4 items-center rounded-md">
                                <button className="text-xl text-white h-16 items-center flex" onClick={ () => handleOpenModalView(item.id) }>
                                    <div className="w-2 bg-green-900 h-16 rounded-custom-1 mr-4"></div>
                                    <span>Mesa {item.table}</span>
                                </button>
                            </section>
                        ))}


                    </article>
                </main>
                { modalVisible && (
                    <ModalOrder isOpen={modalVisible} onRequestClose={handleCloseModal} order={modalItem} handleFinishOrder={handleFinishItem}/>
                )}
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (ctx) => {

    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/orders')
  
    return {
      props: {
        orders: response.data
      }
    }
  })