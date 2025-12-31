import { Drawer as DrawerPrimitive } from "vaul";

type DrawerRootProps = React.ComponentProps<typeof DrawerPrimitive.Root>;

const DrawerOverlay = () => (
  <DrawerPrimitive.Overlay className="fixed inset-0 bg-black/60 z-40" />
);
const DrawerRoot = ({ children, ...props }: DrawerRootProps) => (
  <DrawerPrimitive.Root {...props} direction="right">
    {children}
  </DrawerPrimitive.Root>
);
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const DrawerContent = ({ children }: { children: React.ReactNode }) => (
  <DrawerPrimitive.Portal>
    <DrawerOverlay />
    <DrawerPrimitive.Content className="bg-[#2f2f2f] fixed top-0 right-0 h-full w-[400px] z-50 outline-none flex flex-col">
      <div className="p-4 overflow-y-auto flex-1">{children}</div>
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
);

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Close: DrawerClose,
};
