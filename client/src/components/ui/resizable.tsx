import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "yesflex yesh-full yesw-full data-[panel-group-direction=vertical]:yesflex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "yesrelative yesflex yesw-px yesitems-center yesjustify-center yesbg-border after:yesabsolute after:yesinset-y-0 after:yesleft-1/2 after:yesw-1 after:yes-translate-x-1/2 focus-visible:yesoutline-none focus-visible:yesring-1 focus-visible:yesring-ring focus-visible:yesring-offset-1 data-[panel-group-direction=vertical]:yesh-px data-[panel-group-direction=vertical]:yesw-full data-[panel-group-direction=vertical]:after:yesleft-0 data-[panel-group-direction=vertical]:after:yesh-1 data-[panel-group-direction=vertical]:after:yesw-full data-[panel-group-direction=vertical]:after:yes-translate-y-1/2 data-[panel-group-direction=vertical]:after:yestranslate-x-0 [&[data-panel-group-direction=vertical]>div]:yesrotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="yesz-10 yesflex yesh-4 yesw-3 yesitems-center yesjustify-center yesrounded-sm yesborder yesbg-border">
        <GripVertical className="yesh-2.5 yesw-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
