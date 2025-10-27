declare module 'html-docx-js-typescript' {
  export interface DocumentOptions {
    orientation?: 'portrait' | 'landscape';
    margins?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    table?: {
      rowHeight?: number;
    };
  }

  export function asBlob(html: string, options?: Partial<DocumentOptions>): Promise<Blob | Buffer>;
}

