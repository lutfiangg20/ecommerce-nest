import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { DatabaseService } from "src/database/database.service";
import { refreshTokenTable } from "src/database/schema/refreshTokenTable";
import { and, eq } from "drizzle-orm";
import { AuthRepository } from "./auth.repostory";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private authRepository: AuthRepository,
	) {}

	async signIn(email: string, password: string, userAgent: string) {
		const user = await this.userService.findUserByEmail(email);
		const validated = await verify(user.password, password);
		if (!validated) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, email: user.email, userAgent: userAgent };

		const [access_token, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, {
				expiresIn: "7d",
			}),
		]);

		await this.authRepository.createRefreshToken(
			user.id,
			refreshToken,
			userAgent,
		);

		return {
			access_token,
		};
	}

	async refreshToken(token: string) {
		const decoded: { sub: number; email: string; userAgent: string } =
			this.jwtService.decode(token);

		try {
			const refreshToken = await this.authRepository.findRefreshToken(
				decoded.sub,
				decoded.userAgent,
			);
			await this.jwtService.verifyAsync(refreshToken.token, {
				secret: process.env.JWT_SECRET!,
			});
		} catch (error) {
			throw new UnauthorizedException();
		}

		const user = await this.userService.findUserById(decoded.sub);

		const payload = {
			sub: user.id,
			email: user.email,
			userAgent: decoded.userAgent,
		};

		const access_token = await this.jwtService.signAsync(payload);

		return {
			access_token,
		};
	}

	async logout(token: string) {
		const decoded: { sub: number; email: string; userAgent: string } =
			this.jwtService.decode(token);

		const refreshToken = await this.authRepository.findRefreshToken(
			decoded.sub,
			decoded.userAgent,
		);

		this.authRepository.deleteRefreshToken(
			refreshToken.userId,
			refreshToken.userAgent,
		);
	}
}
