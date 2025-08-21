import "dotenv/config";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET!,
			signOptions: { expiresIn: "15min" },
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
