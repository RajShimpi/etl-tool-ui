export const PageSizeArray = [
    { value: 100, label: 100 },
    { value: 250, label: 250 },
    { value: 500, label: 500 }
]

export const paginationInitialState = {
    search: '',
    page: 1,
    itemsPerPage: 100,
    order: 'DESC'
}

export const paginiationMetaState = {
    hasNextPage: false,
    hasPreviousPage: false,
    itemCount: 0,
    itemsPerPage: 0,
    page: 1,
    pageCount: 0
}