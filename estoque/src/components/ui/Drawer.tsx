import { Drawer as DrawerPrimitive } from "vaul";

const DrawerOverlay = () => (
  <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/60 z-40" />
);
const DrawerRoot = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const DrawerContent = ({ children }: { children: React.ReactNode }) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content className="bg-[#2f2f2f] fixed bottom-0 left-0 right-0 rounded-t-2xl z-50 outline-none">
      <div className="mx-auto w-12 h-1.5 bg-gray-500 rounded-full my-4" />
      <div className="p-4">{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
);

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Close: DrawerClose,
};
