import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderFactory } from './file-uploader.factory';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const rootPath = configService.get<string>('file.uploadDirectory');
        return [
          {
            rootPath,
            serveRoot: SERVE_ROOT,
            serveStaticOptions: {
              fallthrough: true,
              etag: true,
            },
          },
        ];
      },
    }),
    PrismaClientModule,
  ],
  providers: [FileUploaderService, FileUploaderRepository, FileUploaderFactory],
  exports: [FileUploaderService],
})
export class FileUploaderModule {}
