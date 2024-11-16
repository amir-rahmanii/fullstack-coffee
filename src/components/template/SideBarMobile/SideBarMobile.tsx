"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { bonManoIcon } from "../../icons/Svg/Svg"
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



export function SideBarMobile({ side, children }: SheetSideProps) {
  return (
    <div className="grid grid-cols-1">
      <Sheet key={side}>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader className="flex justify-center items-center">
            <SheetTitle>
              <div className='w-[121px] h-[85px]'>
                {bonManoIcon}
              </div>
            </SheetTitle>
          </SheetHeader>
          {/* Accordion */}
          <div className="grid py-8">
            <Accordion type="single" collapsible className="w-full flex flex-col gap-[18px]">
              <AccordionItem value="item-1">
                <AccordionTrigger>محصولات خانگی</AccordionTrigger>
                <AccordionContent>
                  نورسکا
                </AccordionContent>
                <AccordionContent>
                  کپسول اسپرسو
                </AccordionContent>

                <AccordionContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1-1" className="px-0">
                      <AccordionTrigger className="text-darknes pt-0">قهوه اسپرسو</AccordionTrigger>
                      <AccordionContent>
                        قهوه ترک
                      </AccordionContent>
                      <AccordionContent>
                        قهوه فرانسه
                      </AccordionContent>
                      <AccordionContent>
                        قهوه ترک
                      </AccordionContent>
                      <AccordionContent>
                        قهوه فرانسه
                      </AccordionContent>
                      <AccordionContent>
                        قهوه ترک
                      </AccordionContent>
                      <AccordionContent>
                        قهوه فرانسه
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>


              <AccordionItem value="item-2">
                <AccordionTrigger>محصولات هورکا</AccordionTrigger>
                <AccordionContent>
                  تخصصی
                </AccordionContent>
                <AccordionContent>
                  ترکیبی
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>مجله بن مانو</AccordionTrigger>
                <AccordionContent>
                  دانشنامه
                </AccordionContent>
                <AccordionContent>
                  سلامتی
                </AccordionContent>
              </AccordionItem>

              <div className="bg-[#F5F5F5] rounded-lg px-2 py-4 text-sm text-foreground">
                درباره ما
              </div>
              <div className="bg-[#F5F5F5] rounded-lg px-2 py-4 text-sm text-foreground">
                تماس با ما
              </div>
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
