const ApiError = require('../error/apiError');
const bacrypt = require('bcrypt');
const { User, Basket } = require('../models/models');
const jwt = require('jsonwebtoken');

const generate = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: '24h'
	});
};

class UserController {
	async reqistration(req, res, next) {
		const { email, password, role } = req.body;
		if (!email || !password) {
			return next(ApiError.badRequset('Некорректный email или пароль'));
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return next(
				ApiError.badRequset('Пользователь с таким email уже сущетвует')
			);
		}
		const hashPassword = await bacrypt.hash(password, 5);
		const user = await User.create({
			email,
			password: hashPassword,
			role
		});
		const token = generate(user.id, user.email, user.role);
		const basket = await Basket.create({ userId: user.id, user_id: user.id });
		return res.json({ token });
	}

	async login(req, res, next) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return next(ApiError.badRequset('Такого пользователя нет'));
		}
		let comparePassword = bacrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.badRequset('Неверный пароль'));
		}
		const token = generate(user.id, user.email, user.role);
		return res.json({ token });
	}

	async check(req, res, next) {
		const { id, email, role } = req.user;
		const token = generate(id, email, role);
		return res.json({ token });
	}
}

module.exports = new UserController();
