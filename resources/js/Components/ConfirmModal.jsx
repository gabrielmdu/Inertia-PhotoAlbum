import { IconAlertCircle, IconQuestionMark } from "@tabler/icons-react";
import React from "react";
import Modal from "./Modal";

const ConfirmModal = ({ onConfirm, onCancel, className = '', children, ...props }) => {
    return (
        <Modal {...props}>
            <div className={'px-5 py-3 bg-gradient-to-b from-gray-100 to-gray-300 ' + className}>
                <div className="text-sky-600"><IconAlertCircle size={24} /></div>
                <div className="my-4">
                    {children}
                </div>

                <div className="flex items-center justify-end py-4 border-t-2 border-gray-300">
                    <button
                        type="button"
                        className="rounded px-5 py-2 mr-4 bg-green-600 text-gray-100 text-sm"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        type="button"
                        className="rounded px-5 py-2 bg-red-600 text-gray-100 text-sm"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;