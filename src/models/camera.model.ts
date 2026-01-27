export interface CameraDB {
    id: number;
    name: string;
    brand: string;
    price: number;
    original_price?: number | undefined;
    discount?: number | undefined;
    rating: number;
    image: string;
    features: string[];
    is_on_sale: boolean;
    sale_label?: string | undefined;
    megapixels: number;
    type: string;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
}

export interface Camera {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number | undefined;
    discount?: number | undefined;
    rating: number;
    image: string;
    features: string[];
    isOnSale: boolean;
    saleLabel?: string | undefined;
    megapixels: number;
    type: string;
}

export interface CreateCameraDTO {
    name: string;
    brand: string;
    price: number;
    originalPrice?: number | undefined;
    discount?: number | undefined;
    rating: number;
    image: string;
    features: string[];
    isOnSale: boolean;
    saleLabel?: string | undefined;
    megapixels: number;
    type: string;
}

export interface UpdateCameraDTO {
    name?: string | undefined;
    brand?: string | undefined;
    price?: number | undefined;
    originalPrice?: number | undefined;
    discount?: number | undefined;
    rating?: number | undefined;
    image?: string | undefined;
    features?: string[] | undefined;
    isOnSale?: boolean | undefined;
    saleLabel?: string | undefined;
    megapixels?: number | undefined;
    type?: string | undefined;
}

// Mapper: DB -> API
export function mapDbToCamera(dbCamera: CameraDB): Camera {
    return {
        id: dbCamera.id,
        name: dbCamera.name,
        brand: dbCamera.brand,
        price: Number(dbCamera.price),
        originalPrice: dbCamera.original_price !== undefined ? Number(dbCamera.original_price) : undefined,
        discount: dbCamera.discount !== undefined ? Number(dbCamera.discount) : undefined,
        rating: Number(dbCamera.rating),
        image: dbCamera.image,
        features: dbCamera.features,
        isOnSale: Boolean(dbCamera.is_on_sale),
        saleLabel: dbCamera.sale_label !== undefined ? dbCamera.sale_label : undefined,
        megapixels: Number(dbCamera.megapixels),
        type: dbCamera.type
    };
}

// Mapper: API -> DB
export function mapCameraToDb(camera: CreateCameraDTO): Omit<CameraDB, 'id' | 'created_at' | 'updated_at'> {
    return {
        name: camera.name,
        brand: camera.brand,
        price: camera.price,
        original_price: camera.originalPrice !== undefined ? camera.originalPrice : undefined,
        discount: camera.discount !== undefined ? camera.discount : undefined,
        rating: camera.rating,
        image: camera.image,
        features: camera.features,
        is_on_sale: camera.isOnSale,
        sale_label: camera.saleLabel !== undefined ? camera.saleLabel : undefined,
        megapixels: camera.megapixels,
        type: camera.type
    };
}