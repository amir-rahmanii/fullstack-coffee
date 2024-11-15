"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { bonManoIcon } from "../Svg/Svg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




type SheetSideProps = {
  side: "top" | "right" | "bottom" | "left",
  children: React.ReactNode
}



export function SheetSide({ side, children }: SheetSideProps) {
  return (
    <div className="grid grid-cols-1">
      <Sheet key={side}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader className="flex justify-center items-center">
            <SheetTitle>
              {bonManoIcon}
            </SheetTitle>
          </SheetHeader>
          {/* Accordion */}
          <div className="grid py-4">
            <Accordion type="single" collapsible className="w-full flex flex-col gap-[18px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>محصولات خانگی</AccordionTrigger>
                <AccordionContent>
                
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>محصولات</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <SheetFooter>
            <SheetClose asChild>

            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
