interface Product {
    id: number,
    category: string,
    name: string,
    description: string,
    hasDiscount: boolean,
    inStock: boolean,
    wirless?: boolean,
    price: Array<number>,
    image: string,
    reviews: number,
    rating: number,
    features: Array<string>
}


export function filterByCategory(products: Array<Product>, categoryName: string): Array<Product> {
    try {
        return products.filter(product => product.category === categoryName)
    } catch (error) {
        console.error(error)
    }
}

export function filterByAvailability(products: Array<Product>, stockStatus: string): Array<Product> {
    const available = stockStatus.toLowerCase() === 'in stock';
    try {
        return products.filter(product => product.inStock === available)
    } catch (error) {
        console.error("Error filtering by availability:", error);
        return products; // Return original categories in case of error
    }
}
export function filterByPowerSource(products: Array<Product>, filterCondition: string): Array<Product> {

}

export function filterByConnectivity(products: Array<Product>, filterCondition: string): Array<Product> {

}

export function filterByCommunicationType(products: Array<Product>, filterCondition: string): Array<Product> {


}

export function filterByFeatures(products: Array<Product>, filterCondition: string): Array<Product> {

}

export function filterByDetectionType(products: Array<Product>, filterCondition: string): Array<Product> {

}

// 