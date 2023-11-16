import { FC, PropsWithChildren, ComponentProps } from "react";
import { Button as ButtonFlowbite, Spinner } from 'flowbite-react';

interface ButtonPropswithChildren {
    onClick?: ComponentProps<'button'>['onClick'];
    isLoading?: boolean;
    color?: ComponentProps <typeof ButtonFlowbite>['color'];
    size?: ComponentProps<typeof ButtonFlowbite>['size']
}

export const Button: FC<PropsWithChildren<ButtonPropswithChildren>> = ({ children, onClick, isLoading, color, size }) => {
    return (
        <ButtonFlowbite
            onClick={onClick}
            disabled={isLoading}
            //@ts-ignore
            color={color}
            size={size}
    >
      {isLoading ? (
        <>
          <div className="mr-3">
            <Spinner size="sm" light={true} />
          </div>
          Loading ...
        </>
      ) : (
        children
      )}
    </ButtonFlowbite>
    );
}