import { BUTTON_TYPE } from "@/common";
import { Link } from "@inertiajs/react";
import Button from "./Button";

const LinkButton = ({ href, children, ...props }) => {
    return (
        <Button
            ComponentType={Link}
            colorType={BUTTON_TYPE.INFO}
            as='button'
            href={href}
            {...props}
        >
            {children}
        </Button>
    );
};

export default LinkButton;