import { toast } from "react-toastify";
import Modal from "../../utils/modal";
import { useState } from "react";


export default function ReviewModal({ open, setClose, travel }: { open: boolean, setClose: (open: boolean) => void, travel: number }) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const [validationComment, setValidationComment] = useState(false);

    async function sendToReview() {
        await fetch(`${import.meta.env.VITE_API_URL}/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rating, comment, travel })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to review');
            })
            .catch(error => {
                throw error;
            });
    }

    async function handleComment(value: string){
        if(value === ''){
            setValidationComment(true);
            return;
        }
        setValidationComment(false);
        setComment(value);
    }

    async function handleSubmit() {
        if(comment === ''){
            setValidationComment(true);
            return;
        }
        toast.promise(
            sendToReview(),
            {
                pending: 'Processando avaliação...',
                success: 'Avaliação feita com sucesso!',
                error: 'Corrida já foi avaliada!',
            }
        ).then(() => {
            setClose(false);
        }).finally(() => {
            setValidationComment(false);
            setComment('');
            setRating(0);
            const commentElement = document.getElementById('comment') as HTMLTextAreaElement | null;
            if (commentElement) {
                commentElement.value = '';
            }
            const ratingElement = document.getElementById('rating') as HTMLSelectElement | null;
            if (ratingElement) {
                ratingElement.selectedIndex = 0;
            }

        })


    }

    return (
        <Modal open={open} onClose={() => setClose(false)} title="Avaliação">
            <div className="mb-5">
                <p className="font-light text-sm"><label className="text-red-700">*</label> Campos obrigatórios</p>
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Com quantas estrelas você avalia o motorista? <label className="text-red-700">*</label></label>
                <select id="rating" onChange={(value) => setRating(Number(value.target.value))}>
                    <option value={1}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select> / 5
            </div>

            <div className="mb-5">
                <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900">Comentario sobre a corrida <label className="text-red-700">*</label></label>
                <textarea id="comment" onChange={(e) => handleComment(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Deixe o seu comentario sobre a corrida!" required />
                {validationComment ? <p className="mt-2 text-sm text-red-700">Comentario não pode estar em branco!</p> : ""}
                
            </div>

            <div>
                <button type="submit" onClick={handleSubmit} className="w-full btn btn-primary"> Avaliar </button>
            </div>
        </Modal>

    )
}