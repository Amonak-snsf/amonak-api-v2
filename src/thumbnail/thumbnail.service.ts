import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import { join } from 'path';

@Injectable()
export class ThumbnailService {
    async createThumbnail(videoPath: string, outputDir: string): Promise<string> {
        const thumbnailPath = join(outputDir, 'thumbnail.png');
    
        return new Promise((resolve, reject) => {
          ffmpeg(videoPath)
            .screenshots({
              count: 1,
              folder: outputDir,
              filename: 'thumbnail.png',
              size: '320x240',
            })
            .on('end', () => resolve(thumbnailPath))
            .on('error', (err) => reject(err));
        });
      }
}
