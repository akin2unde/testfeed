import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Feature, FeatureSchema } from 'src/models/db/feature';
import { FeatureService } from 'src/services/feature.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Feature.name, schema: FeatureSchema }])
  ],
  providers: [
    FeatureService
  ],
  exports:[FeatureService]
})
export class FeatureModule {}
