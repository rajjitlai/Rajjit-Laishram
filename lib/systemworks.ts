export interface SystemImage {
    src: string;
    alt: string;
}

export interface SystemVideo {
    src: string;
    poster: string;
}

export const nawaImages: SystemImage[] = [
    {
        src: "https://fra.cloud.appwrite.io/v1/storage/buckets/67d3d0570026dfe13b24/files/6a1d566200140cb8f9b9/view?project=67127ef4000008f86e51",
        alt: "Initial GCS Screen"
    },
    {
        src: "https://fra.cloud.appwrite.io/v1/storage/buckets/67d3d0570026dfe13b24/files/6a1d56a20035a18cac7e/view?project=67127ef4000008f86e51",
        alt: "GCS Screen during Detection"
    },
    {
        src: "https://fra.cloud.appwrite.io/v1/storage/buckets/67d3d0570026dfe13b24/files/6a1d56b80012ae6e8d49/view?project=67127ef4000008f86e51",
        alt: "GCS showing Overall communication between the drones"
    }
];

export const nawaVideo: SystemVideo = {
    src: "https://fra.cloud.appwrite.io/v1/storage/buckets/67d3d0570026dfe13b24/files/6a1d5e13001125ea7b5a/view?project=67127ef4000008f86e51",
    poster: "https://fra.cloud.appwrite.io/v1/storage/buckets/67d3d0570026dfe13b24/files/6a1d566200140cb8f9b9/view?project=67127ef4000008f86e51"
};
