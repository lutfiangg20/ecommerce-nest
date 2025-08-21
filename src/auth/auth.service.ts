import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, password: string) {
		const user = await this.userService.findUserByEmail(email);
		const validated = await verify(user.password, password);
		if (!validated) {
			throw new UnauthorizedException();
		}
		const payload = { sub: user.id, email: user.email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
