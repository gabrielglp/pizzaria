import Modal from "react-modal";

import { FiX } from "react-icons/fi";

import { OrderItemProps } from "../../pages/dashboard";
import { transform } from "next/dist/build/swc";

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[];
    handleFinishOrder: (id: string) => void;
}

export function ModalOrder( { isOpen, onRequestClose, order, handleFinishOrder }: ModalOrderProps) {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '30px',
            backgroundColor: '#1d1d2e'
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >
            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748"/>
            </button>

            <div className="w-72 mm:w-80 sm:w-96 md:w-[620px] bg-dark-700 text-white">
                <h2 className="my-4">Detalhes do pedido</h2>
                <span className="text-2xl text-green-900">
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>

                {order.map(item => (
                    <section key={item.id} className="flex flex-col my-4 ">
                        <span className="">{item.amount} - <strong className="text-green-900">{item.product.name}</strong></span>
                        <span className="mt-2 break-all">{item.product.description}</span>
                    </section>
                ))}

                <button className="mt-6 bg-custom-black border-0 py-2 px-4 rounded text-red-900" onClick={ () => handleFinishOrder(order[0].order_id) }>
                    Concluir pedido
                </button>

            </div>
        </Modal>
    )
}