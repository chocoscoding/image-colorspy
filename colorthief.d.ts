declare module 'colorthief' {
    export default class ColorThief {
      getPalette(img: HTMLImageElement | ImageData | Buffer | Uint8ClampedArray, colorCount?: number): Array<[number, number, number]> | null;
    }
  }
  