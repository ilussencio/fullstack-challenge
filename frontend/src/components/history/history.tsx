import { useEffect, useState } from "react";
import Modal from "../../utils/modal";
import ReviewModal from "../review/reviewModal";

interface Travel {
    travelId: number;
    driverName: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    date: string;
}

export default function History({ open, setOpen }: { open: boolean, setOpen: (open: boolean) => void}) {
    const [reviewOpen, setReviewOpen] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(0);
    const [customerId, setCustomerId] = useState(0);
    const [driverId, setDriverId] = useState(0);
    const [drivers, setDrivers] = useState<{ driver_id: number, name: string }[]>([]);
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationEmailText, setValidationEmailText] = useState('');
    const [travels, setTravels] = useState<Travel[]>([]);

    useEffect(() => {
        setTravels([]);
        findDriversByCustomer();
    }, [customerId]);

    async function review(travel: number) {
        console.log(travel)
        setSelectedTravel(travel);
        setReviewOpen(true);
    }

    async function getHistory() {
        setTravels([]);

        let url = '';
        if (driverId === 0)
            url = `${import.meta.env.VITE_API_URL}/ride/${customerId}`;
        else
            url = `${import.meta.env.VITE_API_URL}/ride/${customerId}?driver_id=${driverId}`;


        await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setTravels(data);
                console.log(data);
            })
            .catch(error => {
                setTravels([]);
                console.error(error);
            });
    }

    async function findCustomer(email: string): Promise<any> {
        return fetch(`${import.meta.env.VITE_API_URL}/customer/email/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            console.log(response)
            throw new Error('Failed to find customer')
        }).catch(error => {
            console.log(error)
            throw error
        })
    }

    async function handleEmailChange(value: string) {

        const emailValidationElement = document.getElementById('emailValidation');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            setValidationEmailText("Email inválido!");
            setValidationEmail(true);
            setCustomerId(0);
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-red-700";
            }
            return;
        }

        try {
            const response = await findCustomer(value);
            setValidationEmailText("Usuario: " + response.name);
            setValidationEmail(true);
            setCustomerId(response.customer_id)
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-green-700";
            }
        } catch {
            setValidationEmailText("Usuario não encontrado!");
            setValidationEmail(true);
            setCustomerId(0);
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-red-700";
            }
        }
    }

    async function findDriversByCustomer() {
        setDrivers([])

        await fetch(`${import.meta.env.VITE_API_URL}/driver/customer/${customerId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setDrivers(data)
                setDriverId(0)
            })
            .catch(() => {
                setDrivers([])
                setDriverId(0)
            });
    }

    function closeModal(){
        console.log('close')
        const emailFormElement = document.getElementById('emailForm') as HTMLInputElement;
        if (emailFormElement) {
            emailFormElement.value = '';
        }

        setDrivers([])
        setTravels([])
        setCustomerId(0)
        setValidationEmail(false)
        setOpen(false)
    }

    return (
        <>
            <ReviewModal open={reviewOpen} setClose={() =>{ setReviewOpen(false); setOpen(true)} } travel={selectedTravel} />

            <Modal open={open} onClose={closeModal} title="Historico de viagem">
                <div className="z-40">
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail <label className="text-red-700">*</label></label>
                        <input type="email" id="emailForm" onBlur={(e) => handleEmailChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email@email.com" required />
                        {validationEmail ? <p id="emailValidation">{validationEmailText}</p> : <p id="emailValidation"></p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="drivers" className="block mb-2 text-sm font-medium text-gray-900">Drivers <label className="text-red-700">*</label></label>
                        <select id="drivers" onChange={(e) => setDriverId(Number(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                            {drivers.length > 0? <option value={0}>Todos</option> : ""}
                            {drivers.length > 0?drivers.map((driver, index) => {
                                    return (
                                        <option key={index} value={driver.driver_id}>{driver.name}</option>
                                    )
                                })
                                : <option value={0}>Nenhum motorista encontrado</option>
                            }

                          </select>
                    </div>
                    <div className="mb-5">
                        <button onClick={getHistory} className="btn w-full">Filtrar</button>
                    </div>

                </div>


                <table className="flow-root max-h-96 overflow-y-auto w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Motorista</th>
                            <th scope="col" className="px-6 py-3">Origem</th>
                            <th scope="col" className="px-6 py-3">Destino</th>
                            <th scope="col" className="px-6 py-3">Distancia</th>
                            <th scope="col" className="px-6 py-3">Duração</th>
                            <th scope="col" className="px-6 py-3">Valor</th>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {travels.length === 0 ? <tr><td colSpan={8} className="text-center">Usuario não possui historico de viajem</td></tr> :
                            travels.map((travel, index) => {
                                return (

                                    <tr className="odd:bg-white  even:bg-gray-50" key={index}>
                                        <td className="px-6 py-4">{travel.driverName}</td>
                                        <td className="px-6 py-4">{travel.origin}</td>
                                        <td className="px-6 py-4">{travel.destination}</td>
                                        <td className="px-6 py-4">{travel.distance / 1000} km</td>
                                        <td className="px-6 py-4">{travel.duration}</td>
                                        <td className="px-6 py-4">R$ {travel.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4">{new Date(travel.date).toLocaleDateString('pt-br')}</td>
                                        <td className="px-6 py-4"><button className="btn" onClick={() => {review(travel.travelId); setOpen(false)}}>Avaliar</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Modal>
        </>)
}