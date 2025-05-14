'use client';
import { InterfaceFormDelete } from '@/types';
import api from '@/lib/api';

const ModalDelete = ({ dataDelete, deleteForm, setDeleteForm, setDataDelete }: InterfaceFormDelete) => {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        api.delete(`/tasks/${dataDelete.task_id}`)
        .then(res => {
            if (res.status === 200) {
                setDeleteForm(false)
                setDataDelete(null)
                window.location.href = '/';
            }
        })
        .catch(err => console.log(err))
    };

    const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setDeleteForm(false)
            setDataDelete(null)
        }
    };

    return (
        <div className={`fixed left-0 top-0 w-screen h-screen min-h-screen flex flex-col justify-center items-center text-center overflow-auto px-20 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-all ${deleteForm ? 'opacity-100 duration-1000' : 'opacity-0 duration-300 pointer-events-none'}`} onClick={handleCloseModal}>
            <div className='text-2xl mb-5'>
                Are you sure want to delete record of "{dataDelete.employee_name}" with their task "{dataDelete.task_description}" ?
            </div>
            <div className='w-full flex justify-evenly mt-5'>
                <div onClick={handleSubmit} className='cursor-pointer transition-all duration-500 hover:text-[rgba(255,255,255,0.7)]'>
                    YAY
                </div>
                <div onClick={handleCloseModal} className='cursor-pointer transition-all duration-500 hover:text-[rgba(255,255,255,0.7)]'>
                    NAY
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;