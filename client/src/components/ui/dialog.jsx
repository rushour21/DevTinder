import * as React from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext({})

const Dialog = ({ children, open, onOpenChange }) => {
    return (
        <DialogContext.Provider value={{ open, onOpenChange }}>
            {children}
        </DialogContext.Provider>
    )
}

const DialogTrigger = ({ asChild, children, ...props }) => {
    const { onOpenChange } = React.useContext(DialogContext)
    const Comp = asChild ? React.Children.only(children) : "button"

    return React.cloneElement(Comp, {
        onClick: (e) => {
            onOpenChange(true)
            children.props.onClick && children.props.onClick(e)
        },
        ...props
    })
}

const DialogContent = ({ children, className }) => {
    const { open, onOpenChange } = React.useContext(DialogContext)
    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenChange(false);
                }}
            />
            {/* Modal */}
            <div className={cn(
                "relative z-[10000] grid w-[95%] max-w-lg gap-4 border bg-background p-6 shadow-xl rounded-xl duration-200 animate-in fade-in-0 zoom-in-95",
                className
            )}>
                {children}
                <button
                    className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenChange(false);
                    }}
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>
            </div>
        </div>,
        document.body
    )
}

const DialogHeader = ({
    className,
    ...props
}) => (
    <div
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
        {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}) => (
    <div
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
        {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props} />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props} />
))
DialogDescription.displayName = "DialogDescription"

// Exports
export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
}
