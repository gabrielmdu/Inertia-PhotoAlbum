import { BUTTON_TYPE } from "@/common";
import { IconAlertCircle } from "@tabler/icons-react";
import React from "react";
import Button from "./Button/Button";
import Modal from "./Modal";

const ConfirmModal = ({ onConfirm, onCancel, className = '', children, ...props }) => {
    return (
        <Modal {...props}>
            <div className={'px-5 py-3 bg-gradient-to-b from-gray-100 to-gray-300 ' + className}>
                <div className="text-sky-600"><IconAlertCircle size={24} /></div>
                <div className="my-6">
                    {children}
                </div>

                <div className="flex items-center gap-4 justify-end pt-4 pb-2 border-t-2 border-gray-400 border-opacity-50">
                    <Button
                        colorType={BUTTON_TYPE.SUCCESS}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                    <Button
                        colorType={BUTTON_TYPE.ERROR}
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;