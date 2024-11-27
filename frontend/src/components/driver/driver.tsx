import { toast } from "react-toastify";

import Modal from "../../utils/modal"
import { useState } from "react"   

interface driver {
    customer_id: string;
    driver_id: number;
    origin: string;
    destination: string;
    distance: number;
    duration: number;
    name: string;
    description: string;
    vehicle: string;
    value: number;
    comment: string;
    rating: number;
    setOpenHistory: (open: boolean) => void
}

export default function Driver({ customer_id, driver_id, origin, destination, distance, duration, name, description, vehicle, value, comment, rating, setOpenHistory }: driver) {

    const [open, setOpen] = useState(false)

    async function confirmTravel() {
        toast.promise(
            saveCustomer(),
            {
                pending: 'Processando corrida...',
                success: 'Corrida confirmada com sucesso!',
                error: 'Não foi possivel confirmar a corrida',
            }
        ).then(() => {
            setOpen(false)
            setOpenHistory(true)
        })
    }
    async function saveCustomer() {
        console.log({ 
            customer_id: customer_id,
            origin: origin,
            destination: destination,
            distance: distance,
            duration: duration,
            driver: {
                id: driver_id,
                name: name,
            },
            value: value
         })
       
        await fetch(`${import.meta.env.VITE_API_URL}/ride/confirm`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                //no cors
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                customer_id: customer_id,
                origin: origin,
                destination: destination,
                distance: distance,
                duration: duration,
                driver: {
                    id: driver_id,
                    name: name,
                },
                value: value
             })
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            console.log(response)
            throw new Error('Failed to save customer')
        }).catch(error => {
            console.log(error)
            throw error
        })
    }

    return (
        <li onClick={() => setOpen(true)} className="py-3 sm:py-4  cursor-pointer rounded-lg p-2 hover:bg-gray-300">
            <div className="flex items-center">
                <div className="flex-shrink-0 hover:bg-white">
                    <img className="w-14 h-14 rounded-full" src="/car.svg" alt="Car White" />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate ">
                        {name}
                    </p>
                    <p className="text-sm text-gray-500 truncate ">
                        {description.length > 10 ? `${vehicle.substring(0, 30)} ...` : vehicle}
                    </p>
                    <div className="flex items-center mt-2.5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {
                                Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} className={i >= rating ? "w-4 h-4 text-gray-200" : "w-4 h-4 text-yellow-300"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))
                            }

                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{rating.toFixed(1)}</span>
                    </div>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                    R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            </div>

            <Modal open={open} onClose={() => setOpen(false)} title="Corfime sua corrida">
                <div className="max-w-lg">
                    
                    <div className="font-bold text-lg mb-4">Endereços</div>
                    <div className="font-bold">Origem: <label className="font-light">{origin}</label></div>
                    <div className="font-bold">Destino: <label className="font-light">{destination}</label></div>
                    <div className="font-bold">Distancia: <label className="font-light">{distance / 1000} Km</label></div>
                    <div className="font-bold mb-5">Duraçao da viajem: <label className="font-light">{duration}</label></div>
                    <hr />
                    <div className="font-bold text-lg mb-4">Motorista</div>
                    <div className="font-bold">Nome: <label className="font-light">{name}</label></div>
                    <div className="font-bold">Descrição: <label className="font-light">{description}</label></div>
                    <div className="font-bold mb-5">Veiculo: <label className="font-light">{vehicle}</label></div>
                    <hr />
                    <div className="font-bold mt-5">Ultima Avaliação:  <label className="font-light">{comment}</label></div>
                    <div className="font-bold mb-5">Nota: <label className="font-light">{rating}/5</label></div>
                    <hr />
                    <div className="font-bold mt-5">Valor: </div>
                    <div className="text-2xl text-center">R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                    <div className="text-sm mt-5">*Revise todas as informações antes de confirmar a corrida*</div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setOpen(false)} className="btn danger mt-5">Cancelar</button>
                        <button onClick={confirmTravel} className="btn btn-primary mt-5">Confirmar corrida</button>
                    </div>
                    
                </div>
            </Modal>
        </li>

    );
}