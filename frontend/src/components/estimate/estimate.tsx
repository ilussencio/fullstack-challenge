import { useState } from 'react';
import { toast } from 'react-toastify';
import Driver from '../driver/driver';
import History from '../history/history';
import { Customer } from '../customer/addCustomer';
import MapaGoogle from '../map/MapaGoogle';

function Estimate() {
    const [validationEmail, setValidationEmail] = useState(false);
    const [validationEmailText, setValidationEmailText] = useState('');
    const [validationOrigin, setValidationOrigin] = useState(false);
    const [validationDestination, setValidationDestination] = useState(false);
    const [history, setHistory] = useState(false)
    const [distance, setDistance] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [id, setId] = useState<number>(0)
    const [origin, setOrigin] = useState<string>('')
    const [destination, setDestination] = useState<string>('')
    const [submitOrigin, setSubmitOrigin] = useState<string>('')
    const [submitDestination, setSubmitDestination] = useState<string>('')
    const [drivers, setDrivers] = useState<any[]>([])
    const [driverMessage, setDriverMessage] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')

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
            throw new Error('Failed to find customer')
        }).catch(error => {
            throw error
        })
    }
    async function handleEmailChange(value: string) {

        const emailValidationElement = document.getElementById('emailValidationEstimate');
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regex.test(value)) {
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-red-700";
            }
            setValidationEmailText("Email inválido!");
            setValidationEmail(true);
            setId(0);
            return;
        }

        try {
            const response = await findCustomer(value);
            setValidationEmailText("Usuario: " + response.name);
            setValidationEmail(true);
            setId(response.customer_id);
            setEmail(response.email)
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-green-700";
            }
        } catch  {
            setValidationEmailText("Usuario não encontrado!");
            setEmail('')
            setValidationEmail(true);
            if (emailValidationElement) {
                emailValidationElement.className = "mt-2 text-sm text-red-700";
            }
            setId(0);
        }
    }
    function handlerOrigin(value: string) {
        if (value === '') {
            setValidationOrigin(true);
            return;
        }
        setValidationOrigin(false);
        setOrigin(value);
    }
    function handlerDestination(value: string) {
        if (value === '') {
            setValidationDestination(true);
            return;
        }
        setValidationDestination(false);
        setDestination(value);
    }
    async function estimate(id: number, origin: string, destination: string): Promise<any> {
        return fetch(`${import.meta.env.VITE_API_URL}/ride/estimate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_id: id,
                origin: origin,
                destination: destination
            })
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            if(response.status === 404) {
                return response.json()
            }
            throw new Error('Failed to estimate')
        }).catch(error => {
            throw error
        })

    }
    function handleSubmit() {
        setDrivers([])
        if (id === 0) {
            document.getElementById('emailValidation')?.scrollIntoView();
            document.getElementById('emailForm')?.focus();
            setValidationEmail(true);
            setValidationEmailText("Por favor, preencha com um email válido!");
            return;
        }

        if (origin === '') {
            document.getElementById('origin')?.scrollIntoView();
            document.getElementById('origin')?.focus();
            setValidationOrigin(true);
            return;
        }

        if (destination === '') {
            document.getElementById('destination')?.scrollIntoView();
            document.getElementById('destination')?.focus();
            setValidationDestination(true);
            return;
        }

        toast.promise(
            estimate(id, origin, destination),
            {
                pending: 'Calculando estimativa...',
                success: 'Estimativa calculada com sucesso!',
                error: 'Não foi possivel calcular a estimativa!'
            }
        ).then((response) => {

            if(response.error_code === "DRIVER_NOT_FOUND") {
                setDriverMessage(true)
                return
            }
            setDrivers(response.options)
            setDistance(response.distance)
            setDuration(response.duration)
            setSubmitOrigin(origin.toLowerCase())
            setSubmitDestination(destination.toLowerCase())
        }).catch(() => {
            setSubmitDestination('')
            setSubmitOrigin('')
            setDrivers([])
        })
    }

    return (<div>
        <History open={history} setOpen={setHistory}/>

        <div className='grid grid-cols-2 gap-2 pl-2 pr-2'>
            <Customer />
            <button className="btn btn-success w-full" onClick={() => setHistory(true)}>Historico de viagem</button>
        </div>

        <div className="flex flex-col  md:flex-col lg:flex-row">
            <div className="w-full md:w-full lg:w-1/4 p-10">
                <div className='lg:max-w-md'>
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">Faça uma nova viajem!</h5>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail <label className="text-red-700">*</label></label>
                        <input type="email" id="emailForm" onBlur={(e) => handleEmailChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email@email.com" required />
                        {validationEmail ? <p id="emailValidationEstimate">{validationEmailText}</p> : <p id="emailValidationEstimate"></p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="origin" className="block mb-2 text-sm font-medium text-gray-900">Origem <label className="text-red-700">*</label></label>
                        <input type="origin" id="origin" onBlur={(e) => handlerOrigin(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite um endereço!" required />
                        {validationOrigin ? <p className="mt-2 text-sm text-red-700">Por favor! entre com um endereço valido!</p> : ""}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900">Destino <label className="text-red-700">*</label></label>
                        <input type="destination" id="destination" onBlur={(e) => handlerDestination(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Digite um endereço!" required />
                        {validationDestination ? <p className="mt-2 text-sm text-red-700">Por favor! entre com um endereço valido!</p> : ""}
                    </div>
                    <div className='mb-5'>
                        <button type="submit" onClick={handleSubmit} className="btn btn-primary w-full"> Buscar </button>
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900">Motoristas Disponiveis</h5>
                </div>
                <div className="flow-root max-h-96 overflow-y-auto">

                    <ul role="list" className="divide-y divide-gray-200">
                        {drivers.length != 0 ? drivers.map((driver, index) => {
                            return <Driver key={index}
                                            customer_id={id}
                                            driver_id={driver.driver_id}
                                            origin={origin}
                                            destination={destination}
                                            distance={distance}
                                            duration={duration}
                                            name={driver.name} 
                                            description={driver.description} 
                                            vehicle={driver.vehicle} 
                                            value={driver.value} 
                                            comment={driver.review.comment} 
                                            rating={driver.review.rating}
                                            setOpenHistory={setHistory} />
                        }) : <li className="py-3 sm:py-4">
                            {driverMessage?"Nenhum motorista disponivel!":"Faça uma busca para visualizar os motoristas disponiveis!"}
                        </li>
                        }
                    </ul>
                </div>

            </div>

            <div className='w-3/4 z-0 relative'>
                <div className="absolute right-5 top-5 z-40 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-gray-900">Trajeto</h5>

                    </div>
                    <div>
                        <p><b>Origem: </b> {submitOrigin}</p>
                        <p><b>Destino: </b> {submitDestination}</p>
                        <p><b>Distancia:</b> {distance / 1000} km</p>
                        <p><b>Duração:</b> {duration}</p>
                    </div>
                </div>

                <div className='w-screen lg:w-full h-screen'>
                    <MapaGoogle origin={submitOrigin} destination={submitDestination} />
                </div>
            </div>
        </div>
    </div>)
}

export default Estimate;