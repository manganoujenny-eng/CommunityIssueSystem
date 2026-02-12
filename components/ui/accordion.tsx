"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext<{
    value?: string
    onValueChange?: (value: string) => void
}>({})

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        type?: "single" | "multiple"
        collapsible?: boolean
        defaultValue?: string
        onValueChange?: (value: string) => void
    }
>(({ className, children, type = "single", collapsible, defaultValue, onValueChange, ...props }, ref) => {
    const [value, setValue] = React.useState<string | undefined>(defaultValue)

    const handleValueChange = (newValue: string) => {
        const nextValue = value === newValue && collapsible ? "" : newValue
        setValue(nextValue)
        onValueChange?.(nextValue)
    }

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleValueChange }}>
            <div ref={ref} className={className} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} data-value={value} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { value, onValueChange } = React.useContext(AccordionContext)
    // Find parent Item value
    // In a real implementation this should use context from Item, but for simplicity here we assume simple structure or Context propagation
    // Actually, to do this right without Radix, we need ItemContext.

    // Let's implement ItemContext
    return (
        <ItemContext.Consumer>
            {({ value: itemValue }) => (
                <button
                    ref={ref}
                    onClick={() => onValueChange?.(itemValue)}
                    className={cn(
                        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                        className
                    )}
                    data-state={value === itemValue ? "open" : "closed"}
                    {...props}
                >
                    {children}
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                </button>
            )}
        </ItemContext.Consumer>

    )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { value } = React.useContext(AccordionContext)
    return (
        <ItemContext.Consumer>
            {({ value: itemValue }) => {
                const isOpen = value === itemValue
                if (!isOpen) return null
                return (
                    <div
                        ref={ref}
                        className={cn("overflow-hidden text-sm transition-all animate-accordion-down", className)}
                        {...props}
                    >
                        <div className="pb-4 pt-0">{children}</div>
                    </div>
                )
            }}
        </ItemContext.Consumer>
    )
})
AccordionContent.displayName = "AccordionContent"

const ItemContext = React.createContext<{ value: string }>({ value: "" })

// Wrapper for Item to provide context
const AccordionItemWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => (
    <ItemContext.Provider value={{ value }}>
        <div ref={ref} className={cn("border-b", className)} {...props}>
            {children}
        </div>
    </ItemContext.Provider>
))
AccordionItemWrapper.displayName = "AccordionItem"

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent }
