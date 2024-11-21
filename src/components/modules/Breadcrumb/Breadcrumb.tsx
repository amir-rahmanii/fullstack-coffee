import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
                        <div key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </div>
                    ))}
                    <BreadcrumbItem>
                        <BreadcrumbPage>{BreadcrumbPageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
