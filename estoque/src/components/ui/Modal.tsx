import { Dialog } from "radix-ui";
import type { ReactNode } from "react";

type ModalContentProps = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const Root = Dialog.Root;

const Trigger = ({ children }: { children: ReactNode }) => {
  return <Dialog.Trigger asChild>{children}</Dialog.Trigger>;
};

const Content = ({ title, description, children }: ModalContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

      <Dialog.Content
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        bg-[#2F2F2F] shadow-xl rounded-xl p-6 w-[90%] max-w-3xl outline-none"
      >
        {title && (
          <Dialog.Title className="text-xl font-semibold text-white mb-1">
            {title}
          </Dialog.Title>
        )}

        {description && (
          <Dialog.Description className="text-sm text-white mb-4">
            {description}
          </Dialog.Description>
        )}

        {children}

        <Dialog.Close asChild></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export const Modal = {
  Root,
  Trigger,
  Content,
};
