import { useState } from "react"
import { toast } from 'react-toastify';

function FindCustomer() {
    const [email, setEmail] = useState<string>('')
    const [validationEmail, setValidationEmail] = useState(false)
    const [id, setId] = useState<string>('')
    const [name, setName] = useState<string>('')

    async function findCustomer(email: string): Promise<any> {
        return fetch(`http://localhost:3000/customer/email/${email}`, {
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
    async function handleSubmit(){

        await toast.promise(
            findCustomer( email),
            {
              pending: 'Buscando usuario...',
              success: 'Usuario encontrado com sucesso!',
              error: 'Não foi possivel encontrar usuario!',
            }
        ).then((response) => {
            console.log(response)
            setId(response.customer_id)
            setName(response.name)
        }).catch(() => {
            setId('')
            setName('')
        })

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

    return (
        <div>
            <div className="max-w-lg mx-auto">
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">E-mail <label className="text-red-700">*</label></label>
                    <input type="email" id="email" onBlur={(e) => handleEmailChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="email@email.com" required />
                    {validationEmail?<p className="mt-2 text-sm text-red-700">E-mail invalido!</p>: ""}
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary"> Buscar </button>
            </div>

            <div className="max-w-lg mx-auto">
                <table border={1}>
                   <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nome</td>
                        </tr>
                   </thead>
                   <tbody>
                    {id === '' && name === ''? <tr><td colSpan={2}>Nenhum registro encontrado</td></tr> : 
                        <tr>
                            <td>{id}</td>
                            <td>{name}</td>
                        </tr>
                    }
                   </tbody>
                </table>
            </div>
        </div>
    )
}

export { FindCustomer }