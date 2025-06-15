import React from 'react'

const ConfirmDialog = ({message, onConfirm, onCancel}) => {
    return (
         <div className="fixed inset-0 flex items-center justify-center bg-transparant bg-opacity-50 z-50">
            <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white p-6 rounded-xl shadow-xl w-96 max-w-full text-center">
                <h2 className="text-lg font-semibold mb-4">{message}</h2>
                <div className="flex justify-center gap-4">
                    <button
                    className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-900 text-white font-bold"
                    onClick={onConfirm}
                    >
                        Yes
                    </button>
                    <button
                    className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-900 text-white font-bold"
                    onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
         </div>
    )
}



export default ConfirmDialog