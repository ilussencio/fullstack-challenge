import { useState } from "react"
import { toast } from 'react-toastify';
import Modal from "../../utils/modal"

function AddCustomer() {
    const [open, setOpen] = useState(false)
    const [validationName, setValidatioName] = useState(false)
    const [validationEmail, setValidationEmail] = useState(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    async function saveCustomer(name: string, email: string): Promise<any> {
        return fetch(`${import.meta.env.VITE_API_URL}/customer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
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

    async function handleSubmit(){
        if (name === '') {
            document.getElementById('name')?.focus()
            setValidatioName(true)
            return
        }

        if(email === ''){
            document.getElementById('email')?.focus()
            setValidationEmail(true)
            return
        }

        await toast.promise(
            saveCustomer(name, email),
            {
              pending: 'Processando cadastro...',
              success: 'Usuario cadastrado com sucesso!',
              error: 'Não foi possivel salvar o usuario',
            }
        ).then(() => {
            setOpen(false)
        }).finally(() => {
            setName('')
            setEmail('')
            setValidatioName(false)
            setValidationEmail(false)
            const nameInput = document.getElementById('name') as HTMLInputElement | null;
            if (nameInput) {
                nameInput.value = '';
            }

            const emailInput = document.getElementById('email') as HTMLInputElement | null;
            if (emailInput) {
                emailInput.value = '';
            }
        })
    }

    function handleNameChange(value: string){
        const regex = /^[a-zA-Z\s]*$/
        if(!regex.test(value)){
            setValidatioName(true)
            return
        }
        setValidatioName(false)
        setName(value)
    }

    function handleEmailChange(value: string){
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!regex.test(value)){
            setValidationEmail(true)
            return
        }
        setValidationEmail(false)
        setEmail(value)
    }

    return (<div>
        <button className="btn btn-danger w-full" onClick={() => setOpen(true)}> Adicionar Usuario</button>

        <Modal open={open} onClose={() => setOpen(false)} title="CADASTRO DE USUARIO">
            <div className="max-w-lg w-96 mx-auto">
                <div className="mb-5">
                    <p className="font-light text-sm"><label className="text-red-700">*</label> Campos Obrigatórios</p>
                </div>
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Nome completo <label className="text-red-700">*</label></label>
                    <input type="name" id="name" onChange={(e) => handleNameChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Nome completo" required />
                    {validationName?<p className="mt-2 text-sm text-red-700">Digite apenas letras e espaços!</p>: ""}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail <label className="text-red-700">*</label></label>
                    <input type="email" id="email" onBlur={(e) => handleEmailChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email@email.com" required />
                    {validationEmail?<p className="mt-2 text-sm text-red-700">E-mail invalido!</p>: ""}
                </div>

                <button type="submit" onClick={handleSubmit} className="w-full btn btn-primary"> Adicionar </button>
            </div>

        </Modal>

    </div>)
}

export { AddCustomer as Customer }