import { ImageSource } from '@nativescript/core';
import { Images } from '../resources';

export class ImageService {
    private static instance: ImageService;
    private imageCache: Map<string, ImageSource> = new Map();

    private constructor() { }

    static getInstance(): ImageService {
        if (!ImageService.instance) {
            ImageService.instance = new ImageService();
        }
        return ImageService.instance;
    }

    async getPlaceholderAvatar(): Promise<ImageSource> {
        return this.getImage(Images.placeholders.userAvatar);
    }

    async getEventPlaceholder(): Promise<ImageSource> {
        return this.getImage(Images.placeholders.event);
    }

    async getGroupPlaceholder(): Promise<ImageSource> {
        return this.getImage(Images.placeholders.group);
    }

    async getLogo(white: boolean = false): Promise<ImageSource> {
        return this.getImage(white ? Images.logos.white : Images.logos.main);
    }

    async getAppIcon(): Promise<ImageSource> {
        return this.getImage(Images.logos.icon);
    }

    private async getImage(path: string): Promise<ImageSource> {
        if (this.imageCache.has(path)) {
            return this.imageCache.get(path)!;
        }

        try {
            const image = await ImageSource.fromUrl(path);
            this.imageCache.set(path, image);
            return image;
        } catch (error) {
            console.error('Erro ao carregar imagem:', path, error);
            throw error;
        }
    }

    clearCache() {
        this.imageCache.clear();
    }
} 