export interface Category {
    id: string,
    name: string,
    nameF: string,
    icon: string,
    image: string,
    count: number,
    parentId?: string,
    children? : Category[]
}