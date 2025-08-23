import "dotenv/config";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repostory";

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET!,
			signOptions: { expiresIn: "15min" },
		}),
	],
	providers: [AuthService, AuthRepository],
	controllers: [AuthController],
})
export class AuthModule {}
