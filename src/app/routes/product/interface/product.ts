export interface Product {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string; // 条码
    images: string[];
    price: number;
    purchasePrice: number; // 进价
    inventory: number; // 库存
    supplier: any; // 供货商
    standard: string; // 规格
    remark: string;
}
