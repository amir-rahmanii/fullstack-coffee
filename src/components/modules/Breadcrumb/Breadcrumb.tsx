import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

type BreadcrumbLinkArrayItem = {
    name: string,
    path: string
}

type BreadcrumbSectionProps = {
    BreadcrumbLinkArray?: BreadcrumbLinkArrayItem[],
    BreadcrumbPageTitle: string
}

export function BreadcrumbSection({ BreadcrumbLinkArray, BreadcrumbPageTitle }: BreadcrumbSectionProps) {
    return (
        <div className="container pt-8 mt-[95px]">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">خانه</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {BreadcrumbLinkArray?.map((item, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </React.Fragment>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{BreadcrumbPageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
