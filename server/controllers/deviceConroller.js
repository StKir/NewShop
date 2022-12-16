const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/apiError');

class DeviceController {
	async create(req, res, next) {
		try {
			let { name, price, id, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + '.jpg';
			img.mv(path.resolve(__dirname, '..', 'static', fileName));
			const device = await Device.create({
				name,
				price,
				id,
				brandId,
				typeId,
				img: fileName
			});

			if (info) {
				info = JSON.parse(info);

				info.forEach((i) => {
					Device.create({
						title: i.title,
						description: i.description,
						deviceId: device.id
					});
				});
			}

			return res.json(device);
		} catch (e) {
			next(ApiError.badRequset(e.massage));
		}
	}

	async getAll(req, res) {
		const { brandId, typeId, page, limit } = req.query;
		page = page || 1;
		limit = limit || 9;
		offset = page * limit - limit;
		let devices;
		if (!brandId && !typeId) {
			devices = await Device.findAndCountAll({ limit, offset });
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({
				where: { brandId },
				limit,
				offset
			});
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId },
				limit,
				offset
			});
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({
				where: { typeId, brandId },
				limit,
				offset
			});
		}
		return res.json(devices);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const device = await Device.findOne({
			where: { id },
			include: [{ model: DeviceInfo, as: 'info' }]
		});
		return res.json(device);
	}
}

module.exports = new DeviceController();
