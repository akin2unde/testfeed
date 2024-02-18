import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FeatureController } from 'src/controllers/feature/feature.controller';
import { Feature, FeatureSchema } from 'src/models/db/feature';
import { FeatureService } from 'src/services/feature.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }])
  ],
  providers: [
    FeatureService
  ],
  controllers: [
    FeatureController
  ],
  exports:[FeatureService]
})
export class FeatureModule {}
